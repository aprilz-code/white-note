## 前言

本人使用软路由部署了一些东西，内透外网访问，结果虚拟机有时候抽风出现死机之类的情况！！！ 
为了防止服务卡死之类情况出现，故用脚本cron定时检测虚拟机状态，如果虚拟机不活跃则进行重启


## 正文
### 1. 第一步在home下创建`keepAlive.sh`脚本
```shell

#!/bin/bash

function print() {
    echo "$(date +"%Y/%m/%d %H:%M:%S")" "$1"
}

function main() {
    if ping -c 1 "$3" >/dev/null; then
        print "$2在线"
    else
        print "发现$2又卡死了，重启"

        # 判断是虚拟机还是lxc容器
        if qm status "$1" >/dev/null 2>&1; then
            rm -f "/var/lock/qemu-server/lock-${1}.conf"
            qm stop "$1" >/dev/null 2>&1
            sleep 1s
            qm start "$1" >/dev/null 2>&1
        else
            rm -f "/var/lock/lxc/pve-config-${1}.lock"
            pct stop "$1" >/dev/null 2>&1
            pct start "$1" >/dev/null 2>&1
        fi

        print "重启$2成功"
    fi
}

main "$1" "$2" "$3"

```
示例：
```shell
bash keepalive.sh {pve虚拟机ID} {虚拟机名称 随便写只做记录用} {虚拟机使用的IP}
```
关闭虚拟机100 ，比如我这是centos  
```shell
 bash keepalive.sh 100 centos7.6 192.168.1.20
```
发现可以重启centos虚拟机

### 第二步 添加crontab
```shell
crontab -e
```

并添加以下内容
```shell
  */10 * * * *  bash /home/keepalive.sh  100 centos7.6 192.168.1.20 >> /home/logs/keepalive/centos7.6.log  2>&1 &
  0 1 1 * *   echo > /home/logs/keepalive/centos7.6.log
```
每10分钟检测一次centos活跃性，可根据自己的需求进行选择cron表达式,
下面这个定时任务每月1号1点清空log日志
> tips： [在线cron表达式查询](https://tool.lu/crontab/)

