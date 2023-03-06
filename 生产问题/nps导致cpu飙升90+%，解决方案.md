## 前言
最近打开自己的网站，总是特别慢，最后上服务器一看，查明发现docker部署的nps占用极高。


然后开始地毯式搜索发现，有很多人出现同类情况：
https://github.com/ehang-io/nps/issues/1007

## 正文

解决方案如下，定时每小时监听cpu使用率，当高于90%则让nps定时重启
监听cpu使用率脚本：
https://blog.csdn.net/xiezuoyong/article/details/74578895
关于Linux某进程占用CPU过高的处理
https://blog.csdn.net/ssselice/article/details/127054152

添加监控文件
```shell 
vim restart_nps.sh
```
填入以下neirong

```shell
#/bin/bash
#environment variable
source /etc/profile
#cpu
cpu_us=`vmstat | awk '{print $13}' | sed -n '$p'`
cpu_sy=`vmstat | awk '{print $14}' | sed -n '$p'`
cpu_id=`vmstat | awk '{print $15}' | sed -n '$p'`
cpu_sum=$(($cpu_us+$cpu_sy))
nowdate=$(date +"%Y-%m-%d %H:%M:%S")
if(($cpu_sum >= 90))
        then
        docker restart nps
		echo '$nowdate 重启nps,cpu使用率=' + $cpu_sum >> ./cpu.log
fi
```

赋予执行权限
```shell
chmod +x restart_nps.sh
```

添加cron定时任务,每小时检查一次
```shell
crontab -e
```
添加以下命令
```shell
0 */1 * * *   sh /home/cron/restart_nps.sh > /root/cpu_bak.log  2>&1 &
```
