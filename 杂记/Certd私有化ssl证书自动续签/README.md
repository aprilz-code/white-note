## 文档地址

使用文档 ： https://certd.docmirror.cn/
Github地址：https://github.com/certd/certd

已测试自动部署腾讯云服务器，以及七牛云CDN没问题

![image-1734166494293](https://file.losey.top/blog/image-1734166494293.png)

如下为使用的docker-compose.yaml


```yaml

version: '3.3' # 兼容旧版docker-compose
services:
  certd:
    # 镜像                                                  #  ↓↓↓↓↓ ---- 镜像版本号，建议改成固定版本号
    image: registry.cn-shenzhen.aliyuncs.com/handsfree/certd:1.28.4
    container_name: certd # 容器名
    restart: unless-stopped # 自动重启
    volumes:
      #   ↓↓↓↓↓ -------------------------------------------------------- 数据库以及证书存储路径,默认存在宿主机的/data/certd/目录下，【您需要定时备份此目录，以保障数据容灾】
      - /data/certd:/app/data
    ports: # 端口映射
      #  ↓↓↓↓ ---------------------------------------------------------- 如果端口有冲突，可以修改第一个7001为其他不冲突的端口号
      - "7001:7001"
      #  ↓↓↓↓ ---------------------------------------------------------- https端口，可以根据实际情况，是否暴露该端口
      - "7002:7002"
    #↓↓↓↓ -------------------------------------------------------------- 如果出现getaddrinfo ENOTFOUND错误，可以尝试设置dns
    dns:
#      - 223.5.5.5      # 阿里云公共dns
#      - 223.6.6.6
#       # ↓↓↓↓ --------------------------------------------------------- 如果你服务器在腾讯云，可以用这个替换上面阿里云的公共dns
      - 119.29.29.29  # 腾讯云公共dns
      - 182.254.116.116
#       # ↓↓↓↓ --------------------------------------------------------- 如果你服务器部署在国外，可以用这个替换上面阿里云的公共dns
#      - 8.8.8.8       # 谷歌公共dns
#      - 8.8.4.4
#    extra_hosts:
#        # ↓↓↓↓ -------------------------------------------------------- 这里可以配置自定义hosts，外网域名可以指向本地局域网ip地址
#      - "localdomain.comm:192.168.1.3"

    environment:
#     设置环境变量即可自定义certd配置
#     配置项见： packages/ui/certd-server/src/config/config.default.ts
#     配置规则： certd_ + 配置项, 点号用_代替
#                                    #↓↓↓↓ ----------------------------- 如果忘记管理员密码，可以设置为true，重启之后，管理员密码将改成123456，然后请及时修改回false
      - certd_system_resetAdminPasswd=false
#                                    #↓↓↓↓ ----------------------------- 使用postgresql数据库，需要提前创建数据库
#      - certd_flyway_scriptDir=./db/migration-pg                        # 升级脚本目录
#      - certd_typeorm_dataSource_default_type=postgres                  # 数据库类型
#      - certd_typeorm_dataSource_default_host=localhost                 # 数据库地址
#      - certd_typeorm_dataSource_default_port=5433                      # 数据库端口
#      - certd_typeorm_dataSource_default_username=postgres              # 用户名
#      - certd_typeorm_dataSource_default_password=yourpasswd            # 密码
#      - certd_typeorm_dataSource_default_database=certd                 # 数据库名

#                                    #↓↓↓↓ ----------------------------- 使用mysql数据库，需要提前创建数据库 charset=utf8mb4, collation=utf8mb4_bin
      - certd_flyway_scriptDir=./db/migration-mysql                     # 升级脚本目录
      - certd_typeorm_dataSource_default_type=mysql                     # 数据库类型， 或者 mariadb
      - certd_typeorm_dataSource_default_host=172.18.0.1                 # 数据库地址
      - certd_typeorm_dataSource_default_port=3306                      # 数据库端口
      - certd_typeorm_dataSource_default_username=root                  # 用户名
      - certd_typeorm_dataSource_default_password=yourpasswd            # 密码
      - certd_typeorm_dataSource_default_database=certd                 # 数据库名


    networks:
      - ap
networks:
  ap:
    external: true




#    #↓↓↓↓ ------------------------------------------------------------- 启用ipv6网络
#    networks:
#      - ip6net
#networks:
#  ip6net:
#    enable_ipv6: true
#    ipam:
#      config:
#        - subnet: 2001:db8::/64

```