## 1.服务器设置密钥 为了能让备份好的数据脚本，能够上传到 Gitee 私有仓库中 首先，就需要创建秘钥，用于配置服务器的无密提交，通过下面命令创建秘钥

```shell
ssh-keygen -t rsa -C "liushaohui777@163.com"
```



按几次回车，完成秘钥的生成

然后到ssh目录，查看刚刚生成的秘钥

```shell
cd ~/.ssh

ll

```

![image-20220305232011770](https://file.losey.top/blog/202301191545334.png)



然后我们把 **id_rsa.pub** 文件的内容拷贝，打开 Gitee 网站

`https://gitee.com/profile/sshkeys` 并添加



<img src="https://file.losey.top/blog/202301191552810.png" alt="image-20230119155224668" style="zoom: 67%;" />





添加完成后，保存即可，然后回到服务器中，使用下面的命令，测试自己刚刚添加是否成功



```shell
ssh -T git@gitee.com
```

并输入yes

![image-20230119155342523](https://file.losey.top/blog/202301191553721.png)



然后就会提示成功完成校验，并输出自己的 **Gitee** 昵称

同时，细心的同学可能还注意到了后面的一句话

`but GITEE.COM does not provide shell access.`

这是啥意思呢？为了解答大家的疑惑，陌溪特意去搜索了一下

大致意思是：Gitee不提供shell（ssh）访问/接入权限。ssh -T 选项的意思为，不分配伪终端。

当你在使用ssh协议连接到自己或者其他服务器时，本地终端会显示命令提示符，你可以在上面操作输入命令Is等。

结合上面几点，这句话的意思即为你无法使用 **ssh** 协议直接登录 **Gitee**，在 **Gitee** 服务器上建立一个伪终端，并进行操作。所以，这句提示并不是一个错误，而是Gitee 输出的一句提示语。同样你可以在本地使用 **ssh** 协议进行 **git** 相关操作，并提交到 **Gitee**，没有任何影响。



## 2.创建自己的私库

![image-20230119155542919](https://file.losey.top/blog/202301191555055.png)

配置完成后，选择 **SSH** 的方式

<img src="https://file.losey.top/blog/202301191556953.png" alt="image-20230119155634843" style="zoom:67%;" />



输入命令

```shell
git config --global user.name "Aprilz"
git config --global user.email "liushaohui777@163.com"
```

注意下面两个文件待会有用

mysqlbackup.sh

```shell
#!/bin/bash

dt_now=`date +%Y%m%d`

cd /var/lib/mysql-files/bak

mkdir $dt_now

find  /var/lib/mysql-files/bak/  -mtime +21 -exec rm -rf {} \;（删除超过21天的备份）

echo "start backup mysql"    #（这里我们随便找一个数据库为例）
mysqldump -uroot -ppeiqi666 mi > /var/lib/mysql-files/bak/$dt_now/mi.sql
```

pushGitee.sh

```shell
#!/bin/sh
echo start backup mysql
docker exec -i mysql /var/lib/mysql-files/mysqlbackup.sh

echo "start push gitee"  

# 将全部信息添加到暂存区
git add *

# 提交
git commit -m "commit"

# push到远程层库
git push -u origin master
```



先放出我的docker-compose-mysql.yml

```
version: '3.1'
services:
  mysql:
    image: mysql:8.0.30
    restart: always
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: peiqi666
    command:
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
    ports:
      - 3306:3306
    volumes:
      - ./mysql8.0/my.cnf:/etc/mysql/conf.d/my.cnf
      - ./mysql8.0/data:/var/lib/mysql
      - ./mysql8.0/mysql-files:/var/lib/mysql-files
      - ./mysql8.0/init/:/docker-entrypoint-initdb.d/
    networks:
      - ap
networks:
  ap:
    external: true
```

采用mysql8.0.30,有一个目录mysql-files专门用来处理数据库的备份和导入，所以我们将mysql备份的文件均放入此目录种

新建这两个文件，填入上方内容，使用vim,vi或者touch等

```shell
# 配置执行权限
chmod +x mysqlbackup.sh
chmod +x pushGitee.sh
```



![image-20230119233526336](https://file.losey.top/blog/202301192335593.png)



```shell
cd /home/mysql8.0/mysql-files
mkdir bak
# 初始化仓库
git init 
# 将仓库与远程仓库进行关联 注意需要ssh的
git remote add origin git@gitee.com:white_white_123456/mysql-bak.git
```

然后执行

```shell
./pushGitee.sh
```

![image-20230120002514945](https://file.losey.top/blog/202301200025153.png)

![image-20230120002435443](https://file.losey.top/blog/202301200024550.png)



## 3. 设置定时任务

最后一步，只需要开启每天定时同步任务即可，这里就需要用到 **crontabs**

**crond** 是 **linux** 下用来周期性的执行某种任务或等待处理某些事件的一个守护进程，与windows下的计划任务类似，当安装完成操作系统后，默认会安装此服务工具，并且会自动启动 **crond** 进程，**crond** 进程每分钟会定期检查是否有要执行的任务，如果有要执行的任务，则自动执行该任务。

用户定期要执行的工作，比如用户数据备份、定时邮件提醒等。用户可以使用 **crontab** 工具来定制自己的计划任务。所有用户定义的 **crontab** 文件都被保存在 **/var/spool/cron** 目录中。其文件名与用户名一致。

下面是**crontab**  的常用命令

```shell
# centos 检查是否安装了crontab，如图所示，云服务器默认是由安装crontab的
type crontab
```

![image-20230120003003173](https://file.losey.top/blog/202301200030273.png)

假如没有安装的话也没有关系，自己敲命令安装即可

```shell
# 安装
yum install crontabs

# crond启动命令
systemctl start crond

# 关闭
systemctl stop crond

#查看状态
systemctl status crond

#开启自启
systemctl enable crond
```



![image-20230120003207368](https://file.losey.top/blog/202301200032566.png)



那么介绍就到这里了，下面我们需要开始创建定时任务了！

首先使用 **crontab -e** 命令 ，会打开一个创建定时任务的 **vi** 窗口，在上面输入需要执行脚本的命令

```shell
10 2 * * *   ./home/mysql8.0/mysql-files/pushGitee.sh > /root/bak.log  2>&1 &
```

第一行是云服务器，默认云监控启动的任务，暂不管他

![image-20230120003805294](https://file.losey.top/blog/202301200038424.png)

```shell
 #查看所有的定时任务
 crontab -l

```



好了，等待晚上2点10分是否有推送Gitee吧！



## 拓展以及可能出现的问题： 

1、/bin/sh是/bin/bash的软连接，在一般的[linux](https://so.csdn.net/so/search?q=linux&spm=1001.2101.3001.7020)系统当中，使用sh调用执行脚本相当于打开了bash的POSIX标准模式，也就是说 /bin/sh 相当于 /bin/bash --posix
2、/bin/sh执行过程中，若出现命令执行失败，则会停止执行；/bin/bash执行过程中，若命令执行失败，仍然会继续执行
test.sh

```shell
#!/bin/sh
source pcy.sh #pcy.sh并不存在
echo hello


```





![image-20230120000854846](https://file.losey.top/blog/202301200008023.png)

改成

```shell
#!/bin/bash
source pcy.sh #pcy.sh并不存在
echo hello


```



![image-20230120000941596](https://file.losey.top/blog/202301200009732.png)





如果使用finalshell，默认编辑器使用notepad++的话，主要看左下角格式要改成unix(LF),否则会如下错误



![image-20230120002059688](https://file.losey.top/blog/202301200020825.png)

![image-20230120002238319](https://file.losey.top/blog/202301200022426.png)
