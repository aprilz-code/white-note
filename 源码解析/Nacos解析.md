## Nacos源码中的注册表结构
注册示例：POST /nacos/v1/ns/instance
注册代码：nacos-naming中InstanceController中register方法
调用ServiceManager.registerInstance(namespaceId，serviceName，instance)。

* 在ServiceManager中维护了Map<String,Map<String,Service>> serviceMap = new ConcurrentHashMap<>();
* 第一个key是namespaceId，第二个key是group拼接服务名（group::serviceName）
* 在Service中维护了Map<String,Cluster>，key就是集群名称
* 在Cluster中维护了Set，具体是实例

![image-1678246556342](https://file.losey.top/blog/image-1678246556342.png)


	Nacos作为一个第三方服务，提供客户端注册发现和配置管理热更新等功能（集合eureka，config，bus等多个SpringCloud组件功能整合）
    下面主要说明作为第三方服务注册表的功能流程:
    
    客户端启动，发送一个Post请求到Nacos，然后注册自身到nacos中，按照默认30s一次发送Put请求，心跳机制续约自身健康状态（三次周期没有获取心跳机制则置为下线）。其他客户端定期发送Get请求获取Nacos上保存的注册表信息（也就是图上的serviceMap），刷新本地缓存注册实例表，内部服务在需要请求其他客户端时，通过ribbon选定的负载均衡策略请求到具体的实例，获取到请求数据返回。



## 文章列表

- 1、《[要学习微服务的服务发现？先来了解一些科普知识吧](https://mp.weixin.qq.com/s/mZ-IVHDaJUOBykpBzVr5og)》
- 2、《[微服务的灵魂摆渡者——Nacos，来一篇原理全攻略](https://mp.weixin.qq.com/s/BIPdW34VKvp_Ced3nzUVvQ)》
- 3、《[你也对阅读源码感兴趣，说说我是如何阅读Nacos源码的](https://mp.weixin.qq.com/s/4pVWPRKGwy9MpEzGL4rgLA)》
- 4、《[Spring Cloud集成Nacos服务发现源码解析？翻了三套源码，保质保鲜！](https://mp.weixin.qq.com/s/JuzRf2E4AvdoQW4hrfJKVg)》
- 5、《[学习Nacos？咱先把服务搞起来，实战教程]( https://mp.weixin.qq.com/s/CflYusFuOy5QstWQFLdWwg)》
- 6、《[微服务之：服务挂的太干脆，Nacos还没反应过来，怎么办？](https://mp.weixin.qq.com/s/fDtcQD1EL-NgVV1BMiPx4g)》
- 7、《[微服务之吐槽一下Nacos日志的疯狂输出](https://mp.weixin.qq.com/s/SHd3SHlaH_uFyDFXSMWCiw)》
- 8、《[一个实例，轻松演示Spring Cloud集成Nacos实例](https://mp.weixin.qq.com/s/3EQ1M_Z5Lk5Pyaisg6qp-w)》
- 9、《[微服务：剖析一下源码，Nacos的健康检查竟如此简单](https://mp.weixin.qq.com/s/jcnQOXuyMvo-uhc2XeP01Q)》
- 10、《[微服务架构：Nacos本地缓存 PK 微服务优雅下线](https://mp.weixin.qq.com/s/Ge6gN1wCsGI0tRtzK_AuyQ)》


## 基础知识点

- 《[Nacos源码中为什么使用了String.intern方法？](https://mp.weixin.qq.com/s/jC3Gv3Fi0bo0d7rP5ngqpw)》
- 《[Nacos中已经有Optional使用案例了，是时候慎重对待这一语法了](https://mp.weixin.qq.com/s/ZjJX2muwDRKFdtYU5UeZPQ)》

部分参考：
https://github.com/secbr/nacos-learn
https://reurl.cc/GeexoA