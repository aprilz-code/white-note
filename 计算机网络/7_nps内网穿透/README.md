# 数据链路层


```shell
docker run -d --name nps --net=host  --restart=always -v /home/nps/conf:/conf ffdfgdfg/nps
```

> nps.conf

```
appname = nps
#Boot mode(dev|pro)
runmode = pro

#HTTP(S) proxy port, no startup if empty
http_proxy_ip=0.0.0.0
http_proxy_port=10440
https_proxy_port=10443
# 配合nginx使用,故关闭
https_just_proxy=false
#default https certificate setting
https_default_cert_file=conf/server.pem
https_default_key_file=conf/server.key

##bridge
bridge_type=tcp
bridge_port=8024
bridge_ip=0.0.0.0

# Public password, which clients can use to connect to the server
# After the connection, the server will be able to open relevant ports and parse related domain names according to its own configuration file.
public_vkey=peiqi666

#Traffic data persistence interval(minute)
#Ignorance means no persistence
#flow_store_interval=1

# log level LevelEmergency->0  LevelAlert->1 LevelCritical->2 LevelError->3 LevelWarning->4 LevelNotice->5 LevelInformational->6 LevelDebug->7
log_level=3
#log_path=nps.log

#Whether to restrict IP access, true or false or ignore
#ip_limit=true

#p2p
#p2p_ip=127.0.0.1
#p2p_port=6000

#web
web_host=a.o.com
web_username=admin
web_password=peiqi666
web_port = 8080
web_ip=0.0.0.0
web_base_url=
web_open_ssl=false
web_cert_file=conf/server.pem
web_key_file=conf/server.key
# if web under proxy use sub path. like http://host/nps need this.
#web_base_url=/nps

#Web API unauthenticated IP address(the len of auth_crypt_key must be 16)
#Remove comments if needed
#auth_key=test
auth_crypt_key =1234567812345678

#allow_ports=9001-9009,10001,11000-12000

#Web management multi-user login
allow_user_login=false
allow_user_register=false
allow_user_change_username=false


#extension
allow_flow_limit=false
allow_rate_limit=false
allow_tunnel_num_limit=false
allow_local_proxy=false
allow_connection_num_limit=false
allow_multi_ip=false
system_info_display=false

#cache
http_cache=false
http_cache_length=100

#get origin ip
http_add_origin_header=false

#pprof debug options
#pprof_ip=0.0.0.0
#pprof_port=9999

#client disconnect timeout
disconnect_timeout=60

```


客户端选无配置文件模式,都走服务端web配置

```shell
docker run -d --name npc --net=host ffdfgdfg/npc -server=serverip:port -vkey=key -type=tcp

```

