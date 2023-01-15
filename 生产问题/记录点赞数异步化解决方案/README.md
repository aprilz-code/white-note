### <center>CPU飙高

***
在高并发的场景下，异步是一个极其重要的优化方向。

前段时间，生产环境发生一次事故，笔者认为事故的场景非常具备典型性 。

写这篇文章，笔者想和大家深入探讨该场景的架构优化方案。希望大家读完之后，可以对异步有更深刻的理解。

### 1 业务场景
老师登录教研平台，会看到课程列表，点击课程后，课程会以视频的形式展现出来。

![img](https://file.losey.top/blog/202301101031466.png)

访问课程详情页面，包含两个核心动作：

* 读取课程视频信息 :

从缓存服务器 Redis 获取课程的视频信息 ，返回给前端，前端通过视频组件渲染。

* 写入课程观看行为记录 :

当教师观看视频的过程中，浏览器每隔3秒发起请求，教研服务将观看行为记录插入到数据库表中。而且随着用户在线人数越多，写操作的频率也会指数级增长。


上线初期，这种设计运行还算良好，但随着在线用户的增多，系统响应越来越慢，大量线程阻塞在写入视频观看进度表上的 Dao 方法。上。

首先我们会想到一个非常直观的方案，**提升写入数据库的能力**。

        优化 SQL 语句；
        提升 MySQL 数据库硬件配置 ;
        分库分表。

这种方案其实也可以满足我们的需求，但是通过扩容硬件并不便宜，另外写操作可以允许适当延迟和丢失少量数据，那这种方案更显得性价比不足。

那么架构优化的方向应该是：**“减少写动作的耗时，提升写动作的并发度”**， 只有这样才能让系统更顺畅的运行。


于是，我们想到了第二种方案：写请求异步化。

* 线程池模式
* 本地内存 + 定时任务
* MQ 模式
* Agent 服务 + MQ 模式

### 2 线程池模式
2014年，笔者在艺龙旅行网负责红包系统相关工作。运营系统会调用红包系统给特定用户发送红包，当这些用户登录 app 后，app 端会调用红包系统的激活红包接口 。

激活红包接口是一个写操作，速度也比较快(20毫秒左右)，接口的日请求量在2000万左右。

应用访问高峰期，红包系统会变得不稳定，激活接口经常超时，笔者为了快速解决问题，采取了一个非常粗糙的方案：

**"控制器收到请求后，将写操作放入到独立的线程池中后，立即返回给前端，而线程池会异步执行激活红包方法"。**

当时按照这种粗糙的方法优化后，红包系统非常稳定，再也没有出现接口响应超时的问题。

回到教研的场景，见下图，我们也可以设计类似线程池模型的方案：
![img2](https://file.losey.top/blog/202301101031489.png)

使用线程池模式，需要注意如下几点：

    线程数不宜过高，避免占用过多的数据库连接 ;
    需要考虑评估线程池队列的大小，以免出现内存溢出的问题。

### 3 本地内存 + 定时任务

开源中国统计浏览数的方案非常经典。

用户访问过一次文章、新闻、代码详情页面，访问次数字段加 1 , 在 oschina 上这个操作是异步的，访问的时候只是将数据在内存中保存，每隔固定时间将这些数据写入数据库。
![img3](https://file.losey.top/blog/202301101031891.png)

示例代码如下：

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;


public class VisitStatService extends TimerTask {

    private final static Log log = LogFactory.getLog(VisitStatService.class);
    private static boolean start = false;
    private static VisitStatService daemon;
    private static Timer click_timer;
    private final static long INTERVAL = 60 * 1000;
    /**
     * 支持统计的对象类型
     */
    private final static byte[] TYPES = new byte[]{
            0x01, 0x02, 0x03, 0x04, 0x05
    };
    //内存队列
    private final static ConcurrentHashMap<Byte, ConcurrentHashMap<Long, Integer>> queues =
            new ConcurrentHashMap<Byte, ConcurrentHashMap<Long, Integer>>() {
                {
                    for (byte type : TYPES) {
                        put(type, new ConcurrentHashMap<Long, Integer>());
                    }
                }

            };

    /**
     * 记录访问统计
     * eparam type
     *
     * @param obj_id
     */
    public static void record(byte type, long obj_id) {
        ConcurrentHashMap<Long, Integer> queue = queues.get(type);
        if (queue != null) {
            Integer nCount = queue.get(obj_id);
            nCount = (nCount == null) ? 1 : nCount + 1;
            queue.put(obj_id, nCount.intValue());
            System.out.printf("record (type=%d,id=%d,count=%d)\n", type, obj_id, nCount);

        }
    }

    /**
     * 启动统计数据写入定时器
     */
    public static void start() {
        if (!start) {
            daemon = new VisitStatService();
            click_timer = new Timer("VisitStatservice", true);
            click_timer.schedule(daemon, INTERVAL, INTERVAL);//运行间隔l分钟
            start = true;
            log.info("VisitstatService started.");
        }
    }

    /**
     * 释放Service
     */
    public static void destroy() {
        if (start) {
            click_timer.cancel();
            start = false;
        }
        log.info("VisitstatService stopped.");
    }

    @Override
    public void run() {
        for (byte type : TYPES) {
            ConcurrentHashMap<Long, Integer> queue = queues.remove(type);
            queues.put(type, new ConcurrentHashMap<Long, Integer>());
            try {
                _flush(type, queue);
            } catch (Throwable t) {
                log.fatal("Failed to flush click stat data.", t);
                //此处发送异常报告
            } finally {
                //此处关闭数据库连接
            }
        }
    }

    @Override
    public boolean cancel() {
        boolean b = super.cancel();
        //写回剩余数据，Tomcat停止时不会丢失数据
        this.run();
        return b;
    }

    /**
     * 写访问统计数据到数据库
     *
     * @param type
     * @param queue
     */
    private void _flush(byte type, ConcurrentHashMap<Long, Integer> queue) {
        if (queue.size() == 0)
            return;
        switch (type) {
            //数据写入数据库，···
        }

        System.out.printf("Flush to database:type=%d\n", type);
    }
}
    
```

我们可以借鉴开源中国的方案 ：

控制器接收请求后，观看进度信息存储到本地内存 LinkedBlockingQueue 对象里；

异步线程每隔1分钟从队列里获取数据 ，组装成 List 对象，最后调用 Jdbc batchUpdate 方法批量写入数据库；

批量写入主要是为了提升系统的整体吞吐量，每次批量写入的 List 大小也不宜过大 。

这种方案优点是：不改动原有业务架构，简单易用，性能也高。该方案同样需要考虑内存溢出的风险。

### 4 MQ模式
很多同学们会想到 MQ 模式 ，消息队列最核心的功能是异步和解耦，MQ 模式架构清晰，易于扩展。
![img4](https://file.losey.top/blog/202301101031680.png)

核心流程如下：

    控制器接收写请求，将观看视频行为记录转换成消息 ；
    教研服务发送消息到 MQ  ，将写操作成功信息返回给前端 ；
    消费者服务从 MQ 中获取消息 ，批量操作数据库 。

这种方案优点是：

    MQ 本身支持高可用和异步，发送消息效率高 , 也支持批量消费;
    消息在 MQ 服务端会持久化，可靠性要比保存在本地内存高；
    不过 MQ 模式需要引入新的组件，增加额外的复杂度。

### 5 Agent 服务 + MQ 模式
互联网大厂还有一种常见的异步的方案：Agent 服务 + MQ 模式。
![img5](https://file.losey.top/blog/202301101031007.png)
教研服务器上部署 Agent 服务（独立的进程） , 教研服务接收写请求后，将请求按照固定的格式（比如 JSON ）写入到磁盘中，然后给前端返回成功信息。

Agent 服务会监听文件变动，将文件内容发送到消息队列 , 消费者服务获取观看行为记录，将其存储到 MySQL 数据库中。

这种方案最大的优点是：架构分层清晰，业务服务不需要引入 MQ 组件。

笔者原来接触过的性能监控平台，或者日志分析平台都使用这种模式。

### 6 总结
学习需要一层一层递进的思考。

第一层：什么场景下需要异步

    大量写操作占用了过多的资源，影响了系统的正常运行；
    写操作异步后，不影响主流程，允许适当延迟；

第二层：异步的外功心法

本文提到了四种异步方式：
线程池模式  
本地内存 + 定时任务  
MQ 模式  
Agent 服务 + MQ 模式  

它们的共同特点是：将写操作命令存储在一个池子后，立刻响应给前端，减少写动作的耗时。任务服务异步从池子里获取任务后执行。

第三层：异步的本质

在笔者看来，异步是更细粒度的使用系统资源的一种方式。

在教研课程详情场景里，数据库的资源是固定的，但写操作占据大量数据库资源，导致整个系统的阻塞，但写操作并不是最核心的业务流程，它不应该占用那么多的系统资源。

不能为了异步而异步，无论是使用线程池，还是本地内存 + 定时任务 ，亦或是 MQ ，对数据库资源的使用都需要在合理的范围内，否则异步就达不到我们想要的效果。
