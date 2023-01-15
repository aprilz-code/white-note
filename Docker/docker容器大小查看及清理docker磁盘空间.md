今天打开服务器下载文件时，发现服务器内存不足，并开始清理服务器内存，排查及清理方法如下：

1. 查看服务器内存大小：
```shell
df  -h
```
![image-1673781709233](https://file.losey.top/blog/image-1673781709233.png)


通过 df -h 可以发现有两个主要的磁盘目录内的使用率已经 100 %，且 /var/lib/docker 为 docker 容器安装的默认磁盘目录，所以需要清理docker 的容器空间

2. 查看docker 磁盘使用情况
```shell
du -hs /var/lib/docker/
```　                     　
![image-1673781816339](https://file.losey.top/blog/image-1673781816339.png)
 

docker system df  命令，类似于Linux上的df命令，用于查看Docker的磁盘使用情况:
```shell
docker system df
  ```                         
![image-1673781826213](https://file.losey.top/blog/image-1673781826213.png)


查看单个image、container大小：
```shell
   docker system df -v 
```

![image-1673781834815](https://file.losey.top/blog/image-1673781834815.png)


3. docker system prune命令可以用于清理磁盘，删除关闭的容器、无用的数据卷和网络，以及dangling镜像(即无tag的镜像)。
```shell
docker system prune
```

![image-1673781842837](https://file.losey.top/blog/image-1673781842837.png)

4. **docker system prune -a** 命令清理得更加彻底，可以将没有容器使用Docker镜像都删掉
   注意，这两个命令会把你暂时关闭的容器，以及暂时没有用到的Docker镜像都删掉了…所以使用之前一定要想清楚.。
