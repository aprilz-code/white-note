### <center>windows安装docker版青龙面板
***


## 1.下载dochuker

Docker Desktop 官方下载地址： [windows docker](https://docs.docker.com/desktop/install/windows-install/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/a6c972ec0ccd488a91c3e8de2aa0a6d3.png)
## 2 管理员运行PowerShell，执行下面的命令(Hyper-V 和容器特性)

![在这里插入图片描述](https://img-blog.csdnimg.cn/9b4497808a1d4035a7c0b6e747e6a6a0.png)
```shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

## 3.运行第一步下载好的exe

双击下载的 Docker for Windows Installer 安装文件，一路 Next，点击 Finish 完成安装。

**注意安装完成后，会自动重启电脑，提前保存文件**


![在这里插入图片描述](https://img-blog.csdnimg.cn/2124debca03f46abaddfa84acace0076.png)
安装完成后，Docker 会自动启动。通知栏上会出现个小鲸鱼的图标，这表示 Docker 正在运行。

桌边也会出现三个图标，如下图所示：

我们可以在命令行执行 docker version 来查看版本号，docker run hello-world 来载入测试镜像测试。

如果没启动，你可以在 Windows 搜索 Docker 来启动：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e985ea8fde64991aa6ae8da0277201a.png)

安装之后，可以打开 PowerShell 并运行以下命令检测是否运行成功：

```
docker run hello-world
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/b8628aac75a74bf2a1e5a1cafc87c9cf.png)


发生异常才参考:
https://www.runoob.com/docker/windows-docker-install.html


## 4. 在D:盘创建文件夹

win+r 键 ,输入(**以下命令按顺序一条输入,每次输入之后按回车**)
```
D:
md   ql
cd ql
md  config
md   db
md  log
md   raw
md  repo
md   scripts
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ddd4d22860cc4dab8a783f8c21565e1a.png)


之后继续复制进去执行:
```
docker run -dit -v D:/ql/config:/ql/config -v D:/ql/log:/ql/log -v D:/ql/db:/ql/db -v D:/ql/repo:/ql/repo -v D:/ql/raw:/ql/raw -v D:/ql/scripts:/ql/scripts -p 5700:5700 --name ql  -e TZ=Asia/Shanghai --restart unless-stopped whyour/qinglong:latest

```

## 5、访问面板

浏览器打开: 127.0.0.1:5700

成功,然后一步一步操作,第二步通知可跳过



## 6 青龙NODEJS依赖

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d9f2678acee45029a9700c39c010804.png)

```
node-telegram-bot-api	
prettytable	
require	
ql	
json5	
moment	
typescript	
date-fns	
ts-md5	
qs	
form-data	
fs	
tslib	
ws@7.4.3	
png-js	
common	
node-jsencrypt	
dotenv	
axios	
crypto-js	
js-base64	
tough-cookie	
@types/node	
global-agent	
jsdom -g	
jsdom	
axios	
jieba
```

py依赖
```
requests	
jieba	
canvas	
httpx	
ping3	
PyExecJS
```

linux

```
bizCode	
aiohttp	
lxml	
gcc	
magic	
python-devel	
bizMsg
```



完成即可





