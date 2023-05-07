## 前言

看技术博文时发现NameServer集群部署后，Name Server 集群中的多个实例，彼此之间是不通信的，
这意味着某一时刻，不同实例上维护的元数据可能是不同的，客户端获取到的数据也可能是不一致的。



## 正文

> tips :
NameServer是一个非常简单的Topic路由注册中心，其角色类似Dubbo中的zookeeper，
支持Broker的动态注册与发现。主要包括两个功能：Broker管理，NameServer接受Broker集群的注册信息并且保存下来作为路由信息的基本数据。
然后提供心跳检测机制，检查Broker是否还存活；路由信息管理，每个NameServer将保存关于Broker集群的整个路由信息和用于客户端查询的队列信息。
然后Producer和Conumser通过NameServer就可以知道整个Broker集群的路由信息，从而进行消息的投递和消费。
NameServer通常也是集群的方式部署，各实例间相互不进行信息通讯。Broker是向每一台NameServer注册自己的路由信息，
所以每一个NameServer实例上面都保存一份完整的路由信息。当某个NameServer因某种原因下线了，
Broker仍然可以向其它NameServer同步其路由信息，Producer,Consumer仍然可以动态感知Broker的路由的信息。


### NameServer如何保证数据的最终一致
NameServer作为一个名称服务，需要提供服务注册、服务剔除、服务发现这些基本功能，但是NameServer节点之间并不通信，
在某个时刻各个节点数据可能不一致的情况下，如何保证客户端可以最终拿到正确的数据。下面分别从路由注册、路由剔除，路由发现三个角度进行介绍。

#### 路由注册
对于Zookeeper、Etcd这样强一致性组件，数据只要写到主节点，内部会通过状态机将数据复制到其他节点，Zookeeper使用的是Zab协议，etcd使用的是raft协议。

但是NameServer节点之间是互不通信的，无法进行数据复制。RocketMQ采取的策略是，在Broker节点在启动的时候，轮训NameServer列表，与每个NameServer节点建立长连接，发起注册请求。NameServer内部会维护一个Broker表，用来动态存储Broker的信息。

同时，Broker节点为了证明自己是存活的，会将最新的信息上报给NameServer，然后每隔30秒向NameServer发送心跳包，心跳包中包含 BrokerId、Broker地址、Broker名称、Broker所属集群名称等等，然后NameServer接收到心跳包后，会更新时间戳，记录这个Broker的最新存活时间。

NameServer在处理心跳包的时候，存在多个Broker同时操作一张Broker表，为了防止并发修改Broker表导致不安全，路由注册操作引入了ReadWriteLock读写锁，这个设计亮点允许多个消息生产者并发读，保证了消息发送时的高并发，但是同一时刻NameServer只能处理一个Broker心跳包，多个心跳包串行处理。这也是读写锁的经典使用场景，即读多写少。

![img-1679456104439](https://file.losey.top/blog/img-1679456104439.png)


#### 路由剔除
正常情况下，如果Broker关闭，则会与NameServer断开长连接，Netty的通道关闭监听器会监听到连接断开事件，然后会将这个Broker信息剔除掉。

异常情况下，NameServer中有一个定时任务，每隔10秒扫描一下Broker表，如果某个Broker的心跳包最新时间戳距离当前时间超多120秒，也会判定Broker失效并将其移除。

特别的，对于一些日常运维工作，例如：Broker升级，RocketMQ提供了一种优雅剔除路由信息的方式。如在升级一个节Master点之前，可以先通过命令行工具禁止这个Broker的写权限，发送消息到这个Broker的请求，都会收到一个NO_PERMISSION响应，客户端会自动重试其他的Broker。

当观察到这个broker没有流量后，再将这个broker移除。


#### 路由发现
路由发现是客户端的行为，这里的客户端主要说的是生产者和消费者。具体来说：

对于生产者，可以发送消息到多个Topic，因此一般是在发送第一条消息时，才会根据Topic获取从NameServer获取路由信息。

对于消费者，订阅的Topic一般是固定的，所在在启动时就会拉取。

那么生产者/消费者在工作的过程中，如果路由信息发生了变化怎么处理呢？如：Broker集群新增了节点，节点宕机或者Queue的数量发生了变化。细心的读者注意到，前面讲解NameServer在路由注册或者路由剔除过程中，并不会主动推送会客户端的，这意味着，需要由客户端拉取主题的最新路由信息。

事实上，RocketMQ客户端提供了定时拉取Topic最新路由信息的机制，这里我们直接结合源码来讲解。

DefaultMQProducer和DefaultMQConsumer有一个pollNameServerInterval配置项，用于定时从NameServer并获取最新的路由表，默认是30秒，它们底层都依赖一个MQClientInstance类。

MQClientInstance类中有一个updateTopicRouteInfoFromNameServer方法，用于根据指定的拉取时间间隔，周期性的的从NameServer拉取路由信息。 在拉取时，会把当前启动的Producer和Consumer需要使用到的Topic列表放到一个集合中，逐个从NameServer进行更新。以下源码展示了这个过程：
```java
public void updateTopicRouteInfoFromNameServer() {
 
    //1 需要更新路由信息的Topic集合
    Set<String> topicList = new HashSet<String>();
 
    //2 添加消费者需要使用到的Topic到集合中
    {
        Iterator<Entry<String, MQConsumerInner>> it = this.consumerTable.entrySet().iterator();
        while (it.hasNext()) {
            Entry<String, MQConsumerInner> entry = it.next();
            MQConsumerInner impl = entry.getValue();
            if (impl != null) {
                Set<SubscriptionData> subList = impl.subscriptions();
                if (subList != null) {
                    for (SubscriptionData subData : subList) {
                        topicList.add(subData.getTopic());
                    }
                }
            }
        }
    }
 
    //3 添加生产者需要使用到的topic到集合中
    {
        Iterator<Entry<String, MQProducerInner>> it = this.producerTable.entrySet().iterator();
        while (it.hasNext()) {
            Entry<String, MQProducerInner> entry = it.next();
            MQProducerInner impl = entry.getValue();
            if (impl != null) {
                Set<String> lst = impl.getPublishTopicList();
                topicList.addAll(lst);
            }
        }
    }
 
    //4 逐一从NameServer更新每个Topic的路由信息
    for (String topic : topicList) {
        this.updateTopicRouteInfoFromNameServer(topic);
    }
}

```

然而定时拉取，还不能解决所有的问题。因为客户端默认是每隔30秒会定时请求NameServer并获取最新的路由表，意味着客户端获取路由信息总是会有30秒的延时。这就带来一个严重的问题，客户端无法实时感知Broker服务器的宕机。如果生产者和消费者在这30秒内，依然会向这个宕机的broker发送或消费消息呢？

这个问题，可以通过客户端重试机制来解决。


参考： https://blog.csdn.net/wuyuxiu123/article/details/113063122