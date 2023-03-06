# 1. 官方步骤手动安装docker

官方文档 ：[https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/)

![wait](https://file.losey.top/20230119docker.png)

```bash
# 1 卸载旧版本
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 2 安装必要依赖

sudo yum install -y yum-utils

# 3 设置存储库  （国内会报错，所以不按官方文档走） 这里我们采用aliyun库
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 4 安装docker 一路按Y
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 5 检测docker版本
docker version

#  6 设置开机自启
systemctl enable docker

#7 启动docker
systemctl start docker

# 8 跑hello-world
sudo docker run hello-world

# 9  到阿里云容器镜像服务 里 修改为阿里云的镜像仓库加速 ，并设单个容器日志最大存储
# https://cr.console.aliyun.com/cn-hangzhou/instances

sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hh58wswg.mirror.aliyuncs.com"],
  "log-driver":"json-file",
 "log-opts": {"max-size":"100m", "max-file":"1"}
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

```

# 2. 使用脚本快速安装docker

Docker 官方为了简化安装流程，提供了一套安装脚本，Ubuntu 和 Debian 系统可 以使用这套脚本安装：
```
curl -sSL https://get.docker.com/ | sh
```
执行这个命令后，脚本就会自动的将一切准备工作做好，并且把 Docker 安装在系 统中。

不过，由于伟大的墙的原因，在国内使用这个脚本可能会出现某些下载出现错误的 情况。国内的一些云服务商提供了这个脚本的修改版本，使其使用国内的 Docker 软件源镜像安装，这样就避免了墙的干扰。

阿里云的安装脚本
```
curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
```

个人一键安装docker以及docker-compose脚本(centos)

```
bash <(curl -s -S -L https://cdn.losey.top/sh/dockerInit.sh)
 
```


背景：
我在本地服务器的CentOS7.9下安装了Docker，突然发现按TAB键无法自动补全，在网上找到了答案：

解决：
CentOS最小化安装，会出现一些命令无法自动补全的情况，例如在docker start 无法自动补全 start 命令，无法自动补全docker容器名字。出现这种情况的可参考以下操作：
```shell
#安装bash-completion
yum install -y bash-completion
#刷新文件
source /usr/share/bash-completion/completions/docker
source /usr/share/bash-completion/bash_completion

```

