#!/bin/sh
echo start backup mysql
docker exec -i mysql /var/lib/mysql-files/mysqlbackup.sh

echo "start push gitee" 

# 切换到外部bak路径进行git提交
cd /home/mysql8.0/mysql-files 

# 将全部信息添加到暂存区
git add -A .

# 提交
git commit -m "commit"

# push到远程层库
git push -u origin master