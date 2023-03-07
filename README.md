# 📙Aprilz的学习笔记

[comment]: <> (## 关于我)

[comment]: <> ([**Aprilz**]&#40;https://gitee.com/moxi159753/LearningNotes/raw/master/doc/images/qq/添加Aprilz.png&#41; 是一个从三本院校一路摸滚翻爬上来的程序员。目前就职于字节跳动的Data广告部门，是字节跳动全线产品的商业变现研发团队。这两天创建了一个 **微信公众号【[Aprilz教你学编程]&#40;https://gitee.com/moxi159753/LearningNotes/raw/master/doc/images/qq/公众号2.jpg&#41;】**，未来将会在公众号上持续性的输出很多原创小知识以及学习资源，欢迎各位小伙伴关注我，和我一起共同学习，同时我也希望各位小伙伴能够给 **LearningNotes** 项目多多 **Star** 支持，您的**点赞**就是我维护的动力！)


[comment]: <> (🔗友情链接：我的好友阿秀前段时间收集了超过1000本计算机经典书籍的PDF，包括C++、Java、Python、操作系统、计算机网络、数据库等方面的书籍都有收录，基本上你能听过的都在里面了。这是他的仓库 [CS-Books]&#40;https://github.com/forthespada/CS-Books&#41;，大家可以去看看，以后看书不花钱不是梦了哈哈，欢迎Star⭐)

## 项目介绍

个人学习笔记，主要来源于B站上视频的学习，同时会记录平时一些学习和项目中遇到的问题，如果笔记对您有帮助的话，欢迎star支持，谢谢~

笔记主要涵盖：**Java**，**JVM**、**JUC**、**Spring**，**SpringCloud**，**计算机网络**，**操作系统**，**Vue** 等

本仓库有来源自己总结、网上收集、视频笔记，如果有侵权之处，可以联系我进行删除

因个人能力有限，笔记中可能还有**很多错误**的地方，还请大家能够多多指出交流，也欢迎各位小伙伴能够提交 **Pull Request** 请求进行完善。

参考 : 陌溪




## Java

> 来源Bilibili尚硅谷周阳老师学习视频：[点我传送](https://www.bilibili.com/video/BV15J4112785)

- [equals和等等的区别](校招面试/基础面试题/1_equals和等等的区别/README.md)
- [代码块](./校招面试/基础面试题/2_代码块/README.md)
- [分布式锁](./校招面试/基础面试题/3_分布式锁/README.md)
- [MySQL的存储引擎](./校招面试/基础面试题/4_MySQL的存储引擎/README.md)
- [JDK动态代理和CGLIB动态代理](./校招面试/基础面试题/5_JDK动态代理和CGLIB动态代理/README.md)
- [Java注解和反射](./Java/Java注解和反射/README.md)
- [泛型的类型擦除](./Java/泛型的类型擦除/README.md)
- [Java使用Redis删除指定前缀Key](./Java/Java使用Redis删除指定前缀Key/README.md)
- [前端的一些跨域问题](./Java/前端的一些跨域问题/README.md)
- [使用Ip2region替代淘宝IP接口](./Java/使用Ip2region替代淘宝IP接口/README.md)
- [聊一聊-Java泛型中的通配符T，E，K，V](http://www.moguit.cn/#/info?blogUid=0aa459dc0ae9f9ad82cd22665d08a20d)
- [JVM类加载机制](./Java/JVM类加载机制/README.md)
- [VisualVM安装VisualGC插件](./Java/VisualVM安装VisualGC插件/README.md)
- [谈谈你对ThreadLocal的理解](./Java/谈谈你对ThreadLocal的理解/README.md)
- [谈谈你对AQS的理解](./Java/谈谈你对AQS的理解/README.md)
- [ArrayList扩容机制](./Java/ArrayList扩容机制/README.md)
- [Queue-API](./Java/Queue-API/README.md)


## Java8新特性

> 来源Bilibili尚硅谷李贺飞老师学习视频：[Java8新特性](https://www.bilibili.com/video/BV1ut411g7E9)

- [HashMap变化](./Java8新特性/1_HashMap变化/Java8新特性之HashMap.md)
- [Lambda表达式](./Java8新特性/2_Lambda表达式/README.md)
- [方法引用和构造器](./Java8新特性/3_方法引用和构造器/README.md)
- [强大的Stream](./Java8新特性/4_强大的Stream/README.md)
- [并行流](./Java8新特性/5_并行流/README.md)
- [Optional容器类](./Java8新特性/6_Optional容器类/README.md)

## NIO

- [NIO是什么](./校招面试/NIO/NIO是什么/README.md)
- [IO到NIO的演变](./校招面试/NIO/NIO的使用案例/README.md)
- [IO和NIO的区别](http://www.moguit.cn/#/info?blogUid=28d61ec002594fc5a9c441ec8560f3ad)

## 生产排查

- [CPU飙高](./生产排查/CPU飙高/README.md)

## 生产问题

- [记录点赞数异步化解决方案](./生产问题/记录点赞数异步化解决方案/README.md)
- [JVM 优化踩坑记](https://www.javazhiyin.com/106110.html)
- [MySQL 上亿大表如何优化？](https://www.javazhiyin.com/106056.html)
- [nps导致cpu飙升90+%](./生产问题/nps导致cpu飙升90+%，解决方案.md)
  
## 解决方案

- [秒杀系统难点](./解决方案/1_秒杀系统难点解决方案/README.md)
- [Excel大批量导出](./解决方案/2_excel大批量导出解决方案/README.md)
- [HashMap取出任意位置元素最效率](./解决方案/3_HashMap取出任意位置元素最效率/HashMap取出任意位置元素最效率.md)
- [Mysql与Redis一致性解决方案](./解决方案/Mysql与Redis一致性解决方案.md)

## JVM

> 来源Bilibili尚硅谷宋红康老师JVM教程：[硅谷2020最新版宋红康JVM教程](https://www.bilibili.com/video/BV1PJ411n7xZ)

- [JVM与Java体系结构](JVM/1_内存与垃圾回收篇/1_JVM与Java体系结构/README.md)
- [类加载子系统](./JVM/1_内存与垃圾回收篇/2_类加载子系统/README.md)
- [运行时数据区概述及线程](./JVM/1_内存与垃圾回收篇/3_运行时数据区概述及线程/README.md)
- [程序计数器](./JVM/1_内存与垃圾回收篇/4_程序计数器/README.md)
- [虚拟机栈](./JVM/1_内存与垃圾回收篇/5_虚拟机栈/README.md)
- [本地方法接口](./JVM/1_内存与垃圾回收篇/6_本地方法接口/README.md)
- [本地方法栈](./JVM/1_内存与垃圾回收篇/7_本地方法栈/README.md)
- [堆](./JVM/1_内存与垃圾回收篇/8_堆/README.md)
- [方法区](./JVM/1_内存与垃圾回收篇/9_方法区/README.md)
- [对象实例化内存布局与访问定位](./JVM/1_内存与垃圾回收篇/10_对象实例化内存布局与访问定位/README.md)
- [直接内存](./JVM/1_内存与垃圾回收篇/11_直接内存/README.md)
- [执行引擎](./JVM/1_内存与垃圾回收篇/12_执行引擎/README.md)
- [StringTable](./JVM/1_内存与垃圾回收篇/13_StringTable/README.md)
- [垃圾回收概述](./JVM/1_内存与垃圾回收篇/14_垃圾回收概述/README.md)
- [垃圾回收相关算法](./JVM/1_内存与垃圾回收篇/15_垃圾回收相关算法/README.md)
- [垃圾回收相关概念](./JVM/1_内存与垃圾回收篇/16_垃圾回收相关概念/README.md)
- [垃圾回收器](./JVM/1_内存与垃圾回收篇/17_垃圾回收器/README.md)
- [垃圾回收器2](./JVM/1_内存与垃圾回收篇/18_垃圾回收器2/README.md)
- [什么是GCRoots能做什么](./JVM/1_内存与垃圾回收篇/19_什么是GCRoots能做什么/README.md)
- [JVM参数调优](./JVM/1_内存与垃圾回收篇/20_JVM参数调优/README.md)
- [Java中的强引用_软引用_弱引用_虚引用分别是什么](./JVM/1_内存与垃圾回收篇/21_Java中的强引用_软引用_弱引用_虚引用分别是什么/README.md)
- [Java内存溢出OOM](./JVM/1_内存与垃圾回收篇/22_Java内存溢出OOM/README.md)
- [JVM体系结构](./JVM/1_内存与垃圾回收篇/JVM体系结构/README.md)

## JUC

>来源Bilibili尚硅谷周阳老师学习视频：[尚硅谷Java大厂面试题第二季](https://www.bilibili.com/video/BV18b411M7xz)

- [Volatile和JMM内存模型的可见性](./JUC/1_谈谈Volatile/1_Volatile和JMM内存模型的可见性/README.md)
- [Volatile不保证原子性](./JUC/1_谈谈Volatile/2_Volatile不保证原子性/README.md)
- [Volatile禁止指令重排](./JUC/1_谈谈Volatile/3_Volatile禁止指令重排/README.md)
- [Volatile的应用](./JUC/1_谈谈Volatile/4_Volatile的应用/README.md)
- [CAS底层原理](./JUC/2_谈谈CAS/5_CAS底层原理/README.md)
- [原子类AtomicInteger的ABA问题](./JUC/3_谈谈原子类的ABA问题/6_原子类AtomicInteger的ABA问题/README.md)
- [ArrayList为什么是线程不安全的](./JUC/4_ArrayList为什么线程不安全/ArrayList线程不安全的举例/README.md)
- [值传递和引用传递](./JUC/5_值传递和引用传递/README.md)
- [Java锁之读写锁](./JUC/6_Java的锁/Java锁之读写锁/README.md)
- [Java锁之公平锁和非公平锁](./JUC/6_Java的锁/Java锁之公平锁和非公平锁/README.md)
- [Java锁之可重入锁和递归锁](./JUC/6_Java的锁/Java锁之可重入锁和递归锁/README.md)
- [Java锁之自旋锁](./JUC/6_Java的锁/Java锁之自旋锁/README.md)
- [CountDownLatch是什么](./JUC/7_CountDownLatch_CyclicBarrier_Semaphore使用/CountDownLatch/README.md)
- [CyclicBarrier是什么](./JUC/7_CountDownLatch_CyclicBarrier_Semaphore使用/CyclicBarrier/README.md)
- [Semaphore是什么](./JUC/7_CountDownLatch_CyclicBarrier_Semaphore使用/Semaphore/README.md)
- [Java中的阻塞队列](./JUC/8_阻塞队列/README.md)
- [Synchronized和Lock的区别与好处](./JUC/9_Synchronized和Lock的区别与好处/README.md)
- [Java线程池详解](./JUC/10_线程池/README.md)
- [死锁编码及快速定位](./JUC/11_死锁编码及快速定位/README.md)


- [Github学习](./JUC/14_Github学习/README.md)
- [乐观锁和悲观锁](./JUC/15_乐观锁和悲观锁/README.md)
- [sleep()_wait()_await()和yield()](./JUC/16_谈谈sleep()_wait()_await()和yield()/README.md)
- [源码](./JUC/Code)

## Docker

- [DockerCompose入门学习](./Docker/DockerCompose入门学习/README.md)
- [CentOS安装Docker](./Docker/CentOS安装Docker/README.md)
- [Docker操作系统之Alpine](./Docker/Docker操作系统之Alpine/README.md)
- [Docker容器相关命令](./Docker/Docker容器相关命令/README.md)
- [Docker图形化工具Portainer介绍与安装](./Docker/Docker图形化工具Portainer介绍与安装/README.md)
- [对象存储MinIO入门简介](./Docker/对象存储MinIO入门简介/README.md)
- [如何将镜像推送到阿里云容器镜像服务](./Docker/如何将镜像推送到阿里云容器镜像服务/README)
- [使用DockerCompose制作蘑菇博客YAML镜像文件](./Docker/使用DockerCompose制作蘑菇博客YAML镜像文件/README.md)
- [使用GithubAction构建蘑菇博客镜像提交DockerHub](./Docker/使用GithubAction构建蘑菇博客镜像提交DockerHub/README.md)
- [docker容器大小查看及清理docker磁盘空间](./Docker/docker容器大小查看及清理docker磁盘空间.md)


## K8S

> 来源Bilibili尚硅谷教程：[k8s教程由浅入深-尚硅谷](https://www.bilibili.com/video/BV1GT4y1A756)


- [Kubernetes简介](./K8S/1_Kubernetes简介/README.md)
- [搭建K8S集群前置知识](./K8S/2_搭建K8S集群前置知识/README.md)
- [使用kubeadm方式搭建K8S集群](./K8S/3_使用kubeadm方式搭建K8S集群/README.md)
- [使用二进制方式搭建K8S集群](./K8S/4_使用二进制方式搭建K8S集群/README.md)
- [Kubeadm和二进制方式对比](./K8S/5_Kubeadm和二进制方式对比/README.md)
- [Kubernetes集群管理工具kubectl](./K8S/6_Kubernetes集群管理工具kubectl/README.md)
- [Kubernetes集群YAML文件详解](./K8S/7_Kubernetes集群YAML文件详解/README.md)
- [Kubernetes核心技术Pod](./K8S/8_Kubernetes核心技术Pod/README.md)
- [Kubernetes核心技术Controller](./K8S/9_Kubernetes核心技术Controller/README.md)
- [Kubernetes核心技术Service](./K8S/10_Kubernetes核心技术Service/README.md)
- [Kubernetes控制器Controller详解](./K8S/11_Kubernetes控制器Controller详解/README.md)
- [Kubernetes配置管理](./K8S/12_Kubernetes配置管理/README.md)
- [Kubernetes集群安全机制](./K8S/13_Kubernetes集群安全机制/README.md)
- [Kubernetes核心技术Ingress](./K8S/14_Kubernetes核心技术Ingress/README.md)
- [Kubernetes核心技术Helm](./K8S/15_Kubernetes核心技术Helm/README.md)
- [Kubernetes持久化存储](./K8S/16_Kubernetes持久化存储/README.md)
- [Kubernetes集群资源监控](./K8S/17_Kubernetes集群资源监控/README.md)
- [Kubernetes搭建高可用集群](./K8S/18_Kubernetes搭建高可用集群/README.md)
- [Kubernetes容器交付介绍](./K8S/19_Kubernetes容器交付介绍/README.md)

## 中间件

>来源Bilibili中华石杉老师学习视频：[Java工程师面试突击](https://www.bilibili.com/video/BV1UJ411X7M1)

- [消息队列的面试连环炮](./校招面试/面试扫盲学习/1_消息队列的面试连环炮/README.md)
- [分布式搜索引擎的面试连环炮](./校招面试/面试扫盲学习/2_分布式搜索引擎的面试连环炮/README.md)
- [分布式缓存](./校招面试/面试扫盲学习/3_分布式缓存/README.md)
- [Redis的面试连环炮](./校招面试/面试扫盲学习/4_Redis的面试连环炮/README.md)
- [Redis的面试连环炮2](./校招面试/面试扫盲学习/5_Redis的面试连环炮2/README.md)
- [分布式系统的面试连环炮](./校招面试/面试扫盲学习/6_分布式系统的面试连环炮/README.md)
- [分布式系统幂等性与顺序性及分布式锁](./校招面试/面试扫盲学习/7_分布式系统幂等性与顺序性及分布式锁/README.md)
- [分布式Session解决方案](./校招面试/面试扫盲学习/8_分布式Session解决方案/README.md)
- [Spring中的事务](./校招面试/面试扫盲学习/9_Spring中的事务/README.md)
- [设计一个高并发系统](./校招面试/面试扫盲学习/10_设计一个高并发系统/README.md)
- [数据库分库分表的面试连环炮](./校招面试/面试扫盲学习/11_数据库分库分表的面试连环炮/README.md)
- [MySQL读写复制及主从同步时延](./校招面试/面试扫盲学习/12_MySQL读写复制及主从同步时延/README.md)
- [常见的消息队列有哪些？](http://www.moguit.cn/#/info?blogUid=3a309d5c258c58e7b03a99cda13f650c)
- [5个方案告诉你：高并发环境下，先操作数据库还是先操作缓存？](http://www.moguit.cn/#/info?blogUid=b73aba84b0890c3c282a18c4fb0aab3d)

## SpringCloud

> 来源Bilibili尚硅谷周阳老师学习视频：[尚硅谷2020最新版SpringCloud(H版&alibaba)框架](https://www.bilibili.com/video/BV18E411x7eT)

- [SpringCloud是什么](./SpringCloud/SpringCloud2020/1_SpringCloud是什么/README.md)   
- [搭建Eureka集群](./SpringCloud/SpringCloud2020/3_搭建Eureka集群/README.md)
- [Eureka停更后的替换](./SpringCloud/SpringCloud2020/4_Eureka停更后的替换/README.md)
- [Ribbon负载均衡](./SpringCloud/SpringCloud2020/5_Ribbon负载均衡/README.md) 
- [OpenFeign实现服务调用](./SpringCloud/SpringCloud2020/6_OpenFeign实现服务调用/README.md) 
- [Hystrix中的服务降级和熔断](./SpringCloud/SpringCloud2020/7_Hystrix中的服务降级和熔断/README.md) 
- [服务网关Gateway](./SpringCloud/SpringCloud2020/8_服务网关Gateway/README.md)
- [分布式配置中心SpringCloudConfig](./SpringCloud/SpringCloud2020/9_分布式配置中心SpringCloudConfig/README.md)
- [消息总线Bus](./SpringCloud/SpringCloud2020/10_消息总线Bus/README.md)
- [消息驱动SpringCloudStream](./SpringCloud/SpringCloud2020/11_消息驱动SpringCloudStream/README.md)
- [SpringCloudSleuth分布式请求链路跟踪](./SpringCloud/SpringCloud2020/12_SpringCloudSleuth分布式请求链路跟踪/README.md)
- [使用Nacos实现服务注册发现以及服务配置等功能](./SpringCloud/SpringCloud2020/13_Nacos是什么/README.md)
- [SpringCloudAlibabaSentinel实现熔断和限流](./SpringCloud/SpringCloud2020/14_SpringCloudAlibabaSentinel实现熔断和限流/README.md)
- [SpringCloudAlibabaSeata处理分布式事务](./SpringCloud/SpringCloud2020/15_SpringCloudAlibabaSeata处理分布式事务/README.md)
- [使用Zipkin搭建蘑菇博客链路追踪](./SpringCloud/使用Zipkin搭建蘑菇博客链路追踪/README.md)
- [源码](./SpringCloud/SpringCloud2020/cloud2020)

## SpringSecurity

> 来源Bilibili黑马程序员视频教程：[手把手教你精通新版SpringSecurity](https://www.bilibili.com/video/BV1EE411u7YV)

- [初识SpringSecurity](./SpringSecurity/1_初识SpringSecurity/README.md)
- [SpringSecurity在MVC项目中的使用](./SpringSecurity/2_SpringSecurity在MVC项目中的使用/README.md)
- [SpringSecurity在单机环境下的使用](./SpringSecurity/3_SpringSecurity在单机环境下的使用/README.md)
- [SpringSecurity在分布式环境下的使用](./SpringSecurity/4_SpringSecurity在分布式环境下的使用/README.md)
- [OAuth2.0介绍](./SpringSecurity/5_OAuth2.0介绍/README.md)

## ElasticStack

> 来源Bilibili黑马程序员的视频：[Elastic Stack（ELK）从入门到实践](https://www.bilibili.com/video/BV1iJ411c7Az)

- [ElasticSearch介绍与安装](./ElasticStack/1_ElasticSearch介绍与安装/README.md)
- [Beats入门简介](./ElasticStack/2_Beats入门简介/README.md)
- [Kibana安装与介绍](./ElasticStack/3_Kibana安装与介绍/README.md)
- [Logstash入门简介](./ElasticStack/4_Logstash入门简介/README.md)
- [ElasticStack综合案例](./ElasticStack/5_ElasticStack综合案例/README.md)
- [使用ELK搭建博客日志收集](./ElasticStack/6_使用ELK搭建博客日志收集/README.md)



## SpringBoot

- [Eureka管理页面配置接口返回git信息](./SpringBoot/Eureka管理页面配置接口返回git信息/README.md)
- [Java如何通过IP地址获取地区](./SpringBoot/Java如何通过IP地址获取地区/README.md)
- [SpringSecurity造成无法使用iframe的内嵌页面的解决方法](./SpringBoot/SpringSecurity造成无法使用iframe的内嵌页面的解决方法/README.md)
- [SpringBoot解决时区问题](./SpringBoot/SpringBoot解决时区问题/README.md)
- [SpringBoot项目中使用字符串占位符](./SpringBoot/SpringBoot项目中使用字符串占位符/README.md)
- [SpringBoot中使用注解的方式创建队列和交换机](./SpringBoot/SpringBoot中使用注解的方式创建队列和交换机/README.md)
- [解决升级SpringBoot2.X后无法向eureka注册服务的问题](./SpringBoot/解决升级SpringBoot2.X后无法向eureka注册服务的问题/README.md)
- [使用DevTool实现SpringBoot项目热部署](./SpringBoot/使用DevTool实现SpringBoot项目热部署/README.md)
- [使用自定义日志接口收集用户访问日志](./SpringBoot/使用自定义日志接口收集用户访问日志/README.md)
- [Bean的生命周期](./SpringBoot/Bean的生命周期/README.md)
- [Hibernate Validator常用注解](./SpringBoot/HibernateValidator常用注解/README.md)

## Vue

- [Axios中拦截器的使用](./Vue/Axios中拦截器的使用/README.md)
- [ElementUI中Upload如何批量上传](./Vue/ElementUI中Upload如何批量上传/README.md)
- [el-select因为绑定的值为整数而无法默认选择](./Vue/el-select因为绑定的值为整数而无法默认选择/README.md)
- [Vue动态计算Table表格的高度](./Vue/Vue动态计算Table表格的高度/README.md)
- [Vue对Element中的e-tag添加@click事件无效](./Vue/Vue对Element中的e-tag添加@click事件无效/README.md)
- [Vue使用Echarts制作一个文章贡献度表](./Vue/Vue使用Echarts制作一个文章贡献度表/README.md)
- [Vue中input框自动聚焦](./Vue/Vue中input框自动聚焦/README.md)
- [Vue使用vue-count-to插件对数字显示美化](./Vue/Vue使用vue-count-to插件对数字显示美化/README.md)
- [Vue项目如何关闭Eslint校验](./Vue/Vue项目如何关闭Eslint校验/README.md)
- [Vue项目使用阿里巴巴矢量图标库](./Vue/Vue项目使用阿里巴巴矢量图标库/README.md)
- [Vue项目引入CDN加速](./Vue/Vue项目引入CDN加速/README.md)
- [Vue制作一个评论模块](./Vue/Vue制作一个评论模块/README.md)
- [Vue中Html和Markdown互相转换](./Vue/Vue中Html和Markdown互相转换/README.md)
- [Vue中对数组变化监听](./Vue/Vue中对数组变化监听/README.md)
- [Vue中使用Vue-cropper进行图片裁剪](./Vue/Vue中使用Vue-cropper进行图片裁剪/README.md)
- [Vuex学习指南-实现一个计数器](./Vue/VueX/Vuex学习指南-实现一个计数器/README.md)
- [Vue中防止XSS脚本攻击](./Vue/Vue中防止XSS脚本攻击/README.md)
- [Vue如何使用G2绘制图片](./Ant/G2/Vue如何使用G2绘制图片/README.md)
- [使用Vuex进行两个页面逻辑交互](./Vue/使用Vuex进行两个页面逻辑交互/README.md)
- [ELEMENTUI修改类库的全局配置的默认属性(npm以及CDN引入)](./Vue/ELEMENTUI修改类库的全局配置的默认属性(npm以及CDN引入)/README.md)

## 杂记
- [idea自动提交检查](./杂记/idea自动提交检查/README.md)
- [CKEditor前端样式和编辑器的样式不一致的问题](./杂记/CKEditor前端样式和编辑器的样式不一致的问题/README.md)
- [Ckeidtor中上传图片添加token信息](./杂记/ckeidtor中上传图片添加token信息/README.md)
- [CLion搭建C语言开发环境](./杂记/CLion搭建C语言开发环境/README.md)
- [Elasticsearch介绍与安装](./杂记/Elasticsearch介绍与安装/README.md)
- [Github项目配置Actions](./杂记/Github项目配置Actions/README.md)
- [SpringBoot+Vue如何集成第三方登录登录JustAuth](./杂记/SpringBoot+Vue如何集成第三方登录登录JustAuth/README.md)
- [SpringBoot项目启动增加自定义Banner](./杂记/SpringBoot项目启动增加自定义Banner/README.md)
- [VSCode服务版搭建教程,让平板化为生产力工具](./杂记/VSCode服务版搭建教程/README.md)
- [Windows平台编写bat脚本让后台启动多个程序](./杂记/Windows平台编写bat脚本让后台启动多个程序/README.md)
- [解决git默认不区分大小写的问题](./杂记/解决git默认不区分大小写的问题/README.md)
- [Knife4j无法显示展开响应model](./杂记/Knife4j无法显示展开响应model/README.md)
- [申请免费域名以及SSL证书的方法以及总结](./杂记/申请免费域名以及SSL证书的方法以及总结/README.md)
- [使用GitAction完成Springboot构建Docker镜像部署并推送到阿里云镜像](./杂记/使用GitAction完成Springboot构建Docker镜像部署并推送到阿里云镜像.md)
- [maven多仓库配置](./杂记/maven多仓库配置.md)


- [如何给七牛云中的文件配置防盗链](./杂记/如何给七牛云中的文件配置防盗链/README.md)
- [如何使用docsify给博客编写开发文档](杂记/如何使用docsify给博客编写开发文档/README.md)
- [如何制作github小徽章](./杂记/如何制作github小徽章/README.md)
- [使用开源项目申请JetBrains全家桶](./杂记/使用开源项目申请JetBrains全家桶/README.md)
- [什么是CICD](./杂记/什么是CICD/README.md)
- [将PDF转换为Kindle能识别的MOBI格式](./杂记/将PDF转换为Kindle能识别的MOBI格式/README.md)
- [OCR文字识别软件](./杂记/OCR文字识别软件/README.md)
- [如何向开源社区正确提问](./杂记/如何向开源社区正确提问/README.md)

## Linux

- [Linux下查看文件和文件夹占用空间大小](./Linux/Linux下查看文件和文件夹占用空间大小/README.md)
- [Linux下通过nginx配置https](./Linux/Linux下通过nginx配置https/README.md)
- [CentOS下如何安装Nginx](./Linux/CentOS下如何安装Nginx/README.md)
- [记一次因代码出错不断输出日志占满Docker容器硬盘的排查经历](./Linux/记一次因代码出错不断输出日志占满Docker容器硬盘的排查经历/README.md)
- [CentOS下安装Nacos](./Linux/CentOS下安装Nacos/README.md)
- [CentOS下安装Sentinel](./Linux/CentOS下安装Sentinel/README.md)
- [VMWare中CentOS如何配置固定IP](./Linux/VMWare中CentOS如何配置固定IP/README.md)
- [CentOS中将文本中的ip替换成服务器外网ip](./Linux/CentOS中将文本中的ip替换成服务器外网ip/README.md)
- [Asciinema-一种基于文本的终端录制方法](./Linux/Asciinema-一种基于文本的终端录制方法/README.md)
- [Linux相关命令](./JUC/13_Linux相关命令/README.md)

## Redis

- [Redis中的数据结构](./Redis/Redis中的数据结构/README.md)
- [Redis中的跳跃表](./Redis/Redis中的跳跃表/README.md)
- [Redis缓存穿透-布隆过滤器](./Redis/Redis缓存穿透-布隆过滤器/README.md)
- [大Aprilz话谈IO模型](./Redis/大Aprilz话谈IO模型/README.md)
- [IO多路复用底层原理](./Redis/IO多路复用底层原理/README.md)
- [Redis实现分布式锁](./Redis/Redis实现分布式锁/README.md)
- [Redis实现分布式锁](./Redis/Redis配置解析.md)

## JavaScript

- [Js设置二级域名和顶级域名下共享Cookie](./JavaScript/Js设置二级域名和顶级域名下共享Cookie/README.md)
- [如何通过Js将时间转换为刚刚_几分钟前_几小时前](./JavaScript/如何通过Js将时间转换为刚刚_几分钟前_几小时前/README.md)

## 数据库

- [MyBatis常见面试题](./数据库/MyBatis常见面试题/README.md)
- [MyBatis的缓存机制](./数据库/MyBatis的缓存机制/README.md)
- [MySQL基础](./数据库/MySQL基础/README.md)
- [MySQL优化](./数据库/MySQL优化/README.md)
- [MySQL索引](./数据库/MySQL索引/README.md)
- [mysql定时备份并上传Gitee私有仓库](./数据库/mysql定时备份并上传Gitee私有仓库.md)
- [Mysql大表查询慢怎么优化](./数据库/Mysql大表查询慢怎么优化.md)
- [单表查询和多表连接查询哪个效率更快？](./数据库/单表查询和多表连接查询哪个效率更快.md)

## 操作系统

- [进程和线程通信](./操作系统/1_进程和线程通信/README.md)

## 计算机网络

- [三次握手和四次挥手](./计算机网络/1_三次握手和四次挥手/README.md)
- [https和http](./计算机网络/2_https和http/README.md)
- [TCP中的拥塞控制和流量控制](./计算机网络/3_TCP中的拥塞控制和流量控制/README.md)
- [物理层](./计算机网络/4_物理层/README.md)
- [数据链路层](./计算机网络/5_数据链路层/README.md)
- [http中的状态码](./计算机网络/http中的状态码/README.md)

## 青龙

- [windows安装docker版青龙面板](./ql/windows安装docker版青龙面板/README.md)

## 小米运动

- [小米运动修改支付宝微信步数(支持定时)](./mi/小米运动修改支付宝微信步数(支持定时)/README.md)


## 面经

- [京东面经](./校招面试/面经汇总/1_京东面经/README.md)
- [字节跳动面试总结](./校招面试/面经汇总/2_字节跳动面试总结/README.md)
- [京东零售提前批Java一面](./校招面试/面经汇总/3_京东零售提前批Java一面/README.md)
- [京东零售提前批Java二面](./校招面试/面经汇总/4_京东零售提前批Java二面/README.md)
- [滴滴出行提前批Java123面](./校招面试/面经汇总/5_滴滴出行提前批Java123面/README.md)


