
## 1. 常用数据类型
1. String
2. Hash
3. List
4. Set
5. ZSet（Sorted Set）
6. Hyperloglog
7. Geo
8. BitMap
9. Pub/Sub

## 2. 使用场景

### 1. String

它的结构类似于Java中的Map<Key,Value>结构。
一般用于将热点数据，例如字典数据，验证码或者一些比较小的对象数据JSON化放置在其中,计数器等功能。

计数器
```
Redis::set("v:z:1",1); //设置点赞

//增加点赞数
Redis::incr("v:z:1",1);
//得到点赞数
dd(Redis::get("v:z:1"));
```

### 2.Hash
它的结构类似于Java中的Map<Key,Map<Key,Value>>结构。
一般用于复杂点多key-value对应场景，或者计数器等功能
```
Redis::hset('video:1','likes',1); //视频点赞数
Redis::hset('video:1','collections',1); //视频收藏

//增加视频、点赞
Redis::hIncrBy('video:1','likes',1);
Redis::hIncrBy('video:1','collections',1);

//减少点赞数
 Redis::hIncrBy('video:1','likes',-1);
//获取点赞数
 Redis::hget('video:1','goods:4');
```

> tips: [Redis 选择hash还是string 存储数据？](https://juejin.cn/post/6844903872834584590)


### 3.List
### 4.Set
该两种数据类型是是类型的，区别在于Set不能存储重复的元素，所以用途方面类同

List 有序，不保证数据唯一。
Set 保证数据唯一，不保证顺序。

这里的有序不是指的升序或者降序。
而是说插入、删除数据是按照一定排列进行的。

用途目前主要在类似排行榜这种结构的数据存储。

### 5. ZSet（Sorted Set）

主要用于用于延时队列。介于ZSet的特性，一个线程循环扫描zRangeByScore，获取需要执行的任务即可。

```java
   /**
     * 延时队列机器开始运作
     */
    private synchronized void startDelayQueueMachine() {
        log.info("延时队列机器{}开始运作", setDelayQueueName());

        // 监听redis队列
        while (!Thread.interrupted() && !destroyFlag) {
            try {
                // 获取当前时间的时间戳
                long now = System.currentTimeMillis() / 1000;
                // 获取当前时间前的任务列表
                Set<DefaultTypedTuple> tuples = cache.zRangeByScore(setDelayQueueName(), 0, now);

                // 如果任务不为空
                if (CollUtil.isNotEmpty(tuples)) {
                    log.info("延时任务开始执行任务:{}", JSONUtil.toJsonStr(tuples));

                    for (DefaultTypedTuple tuple : tuples) {
                        String jobId = (String) tuple.getValue();
                        // 移除缓存，如果移除成功则表示当前线程处理了延时任务，则执行延时任务
                        Long num = cache.zRemove(setDelayQueueName(), jobId);
                        // 如果移除成功, 则执行
                        if (num > 0) {
                            ThreadPoolUtil.execute(() -> invoke(jobId));
                        }
                    }
                }

            } catch (Exception e) {
                log.error("处理延时任务发生异常,异常原因为{}", e.getMessage(), e);
            } finally {
                // 间隔5秒钟搞一次
                try {
                    TimeUnit.SECONDS.sleep(5L);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        }
    }

```


###  6. Hyperloglog
用于类似计数的功能，性能优于incr，常用于计算pv等。

###  7. Geo
存储坐标类型数据。


###  8. BitMap
二进制数组结构，类似布隆过滤器


###  9. Pub/Sub

发布订阅型消息队列，只支持1：N客户端，广播式生产消费
缺点：
1.  没有活跃的客户端时，存在消息丢失
2.  没有ACK机制
3.  仅支持广播式消费
4.  并发度比不上主流MQ



//TODO 待补充


