### <center>申请免费域名 + SSL 证书的方法以及总结
***
## 前言

1. 申请域名
   前往 [freenom](https://www.freenom.com) 申请一个你想要的域名，域名后缀一般有 ml、tk、cg 等，因为是免费域名所以只能选这些不常见的后缀。

关于如何在 freenom 上申请域名，网上应该有一大堆教程，如果遇到问题直接搜索引擎。

> freenom getcaptcha error 需要安装谷歌插件 Gooreplacer

![在这里插入图片描述](https://img-blog.csdnimg.cn/ead1f4f3a33f4eea833cb003547a8351.png)

> 身份信息选择与ip对应

生成完整用户信息（有生成数量限制）支持美国、日本、德国、英国等多国身份。

中文站：http://www.haoweichi.com/

英文站：https://www.fakenamegenerator.com/

英文站：https://www.fakeaddressgenerator.com/

台湾/香港/韩国身份信息生成：https://tw.51240.com/

台湾身份证生成：https://people.debian.org/~paulliu/ROCid.html

生成信息卡信息

批量生成，自定义规则

https://names.igopaygo.com/credit-card

可生成信用卡图片支持万事达/VISA/运通卡

http://card-generator.com/q_free-credit-card-generator-with-cvv.htm



申请免费域名 + SSL 证书的方法

最近给服务器加了域名，同时配套了 SSL 证书，没有花一分钱，整个配置过程也非常简单，下面来看看是如何完成的吧。

准备工作
为了达到最终效果，你需要有

一个非大陆服务器（无需备案域名）
非中国的 IP 地址（中国 IP 申请域名可能会失败）
Google 账号（用来登录申请域名的网站）
基本的 Linux 知识
基本的 Nginx 知识


2. 修改 DNS
   登录 [cloudflare](https://www.cloudflare.com/)，点击添加站点，将刚刚申请到的域名填入输入框，然后点击添加，一般会有两种情况：

添加成功 - 万事大吉，后序操作就是修改 nameserver 和配置 DNS
添加失败 - 可能提示域名不存在。解决方法是去 dnspod 把申请的域名添加进解析列表，等一会再重试，成功这进入添加成功步骤。
关于如何修改 DNS 网上同样也有一堆教程，这里就不赘述了。


在 DNS 这一栏中查看 DNS 记录。将你要跳转的域名解析到一个有效的 IP，比如 8.8.8.8 。不要解析到国内的服务器 IP，否则依然会提示你没备案

Page Rules 是 CloudFlare 的一项特色服务，可以根据设定的匹配规则来对请求进行处理，其中就包括重定向，支持通配符匹配。

https://www.dblog.cc/p-294.html

3. 申请 SSL 证书
   https://mailberry.com.cn/2022/07/cloudflare-15-years-ssl/

如果上述步骤都没出问题，运行 nginx -s reload 重启 nginx，属于你的 HTTPS 网站应该就成功搭建了。
