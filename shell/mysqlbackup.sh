#!/bin/bash

dt_now=`date +%Y%m%d`

cd /var/lib/mysql-files/bak

mkdir $dt_now

find  /var/lib/mysql-files/bak/  -mtime +21 -exec rm -rf {} \;（删除超过21天的备份）

echo "start backup mysql"    #（这里我们随便找一个数据库为例）
mysqldump --defaults-extra-file=/etc/my.cnf mi > /var/lib/mysql-files/bak/$dt_now/mi.sql
mysqldump --defaults-extra-file=/etc/my.cnf halo > /var/lib/mysql-files/bak/$dt_now/halo.sql
mysqldump --defaults-extra-file=/etc/my.cnf tinymall > /var/lib/mysql-files/bak/$dt_now/tinymall.sql