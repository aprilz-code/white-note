## 前言

由于使用jsoup爬取一个网页内容时，发现他是个uniapp的网页， uniapp为虚拟dom节点，故无法爬取内容。然后了解到Selenium这个东西。

## 正文
使用起来，需要准备三个东西
1. 本地环境安装谷歌浏览器
2. 找到对应的谷歌驱动
3.  项目引用对应版本的selenium-java包


## 开始
### Windows
![image-1734414523594](https://file.losey.top/blog/image-1734414523594.png)

1. 我本地开发环境为Windows，发现本地谷歌浏览器版本为131.0.6778.110版本。

新驱动版本网址 ：https://googlechromelabs.github.io/chrome-for-testing/#stable
![image-1734414818837](https://file.losey.top/blog/image-1734414818837.png)

可见最新版的对应系统下载链接，可以选择浏览器更新至对应版本或者将版本号位置改成对应本地版本的链接。
例如我本地则：
https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.110/win32/chromedriver-win32.zip

2.  SpringBoot项目中引用jar
```
        <selenium.version>3.141.59</selenium.version>
        
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>${selenium.version}</version>
        </dependency>
```
由于我初次选择4.0.0版本，发现问题,然后把版本降为3.141.59就好了
spring-boot-dependencies模块中去搜索selenium发现默认的版本的为3.141.59
原因：使用的selenium-java版本太高了，之前是用的4.0以上，改成引用次数最多的版本3.141就好了。

参考：
https://blog.csdn.net/fx_nightwish/article/details/122257575
https://blog.csdn.net/osliveandroide/article/details/134529702

本地调试无误后，放到Centos服务器上测试。

### Centos
这谷歌的老版本chrome-rpm还真不好找，下面给出具体的网页
http://dist.control.lth.se/public/CentOS-7/x86_64/google.x86_64/
![image-1734415299092](https://file.losey.top/blog/image-1734415299092.png)
既然第一个版本显示的是103，那么我就先点这个试试
```shell
wget http://dist.control.lth.se/public/CentOS-7/x86_64/google.x86_64/google-chrome-beta-103.0.5060.24-1.x86_64.rpm
 sudo yum install ./google-chrome-beta-103.0.5060.24-1.x86_64.rpm 

```
![image-1734415332378](https://file.losey.top/blog/image-1734415332378.png)
测试一下版本：
```shell
google-chrome --version 

Google Chrome 103.0.5060.24 beta

```

没有问题

让gpt写了一个代码使得chrome不能自动更新，也不晓得能不能成功，先加上去看看

```shell
sudo yum-config-manager --save --setopt=google-chrome-stable.exclude=google-chrome-stable 

```

安装chrome-driver
chrome装好了，下面安装对应的driver就方便多了，找到对应的版本即可

https://chromedriver.storage.googleapis.com/index.html


![image-1734415379982](https://file.losey.top/blog/image-1734415379982.png)

```shell
 wget https://developer.chrome.com/docs/chromedriver/downloads\?hl\=zh-cn\#chromedriver_1030506024
 unzip chromedriver_linux64.zip  
 sudo mv chromedriver /usr/bin/chromedriver
 sudo chmod +x  /usr/bin/chromedriver 

```
测试一下版本

```shell
chromedriver --version 

ChromeDriver 103.0.5060.24 (e47b049c438cd0a74dc95a011fceb27db18cb080-refs/branch-heads/5060@{#232})

```


参考：https://blog.csdn.net/weixin_44237337/article/details/140172846

出现部分其他问题
Java selenium错误——DevToolsActivePort file doesn't exist
```
//设置为 headless 模式 （必须）
chromeOptions.addArguments("--headless");
chromeOptions.addArguments("--disable-gpu");//谷歌文档提到需要加上这个属性来规避bug
chromeOptions.addArguments("--no-sandbox");// “–no - sandbox”参数是让Chrome在root权限下跑
chromeOptions.addArguments("--disable-dev-shm-usage");
chromeOptions.addArguments("lang=zh_CN.UTF-8");
chromeOptions.addArguments("window-size=1920x1080"); //指定浏览器分辨率
```
参考： https://www.cnblogs.com/zuiyue_jing/p/16035958.html
https://www.cnblogs.com/galaxy-gao/p/5713635.html

然后调试成功





最后放上 Java解析代码如下
```java
        //System.setProperty("webdriver.chrome.driver","F:\\test\\chromedriver-win32\\chromedriver.exe");
        //System.setProperty("webdriver.chrome.driver","/usr/bin/chromedriver");
        // /usr/bin/chromedriver
        // 创建 WebDriver 实例
        ChromeOptions options = new ChromeOptions();
        //设置为 headless 模式 （必须）
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");//谷歌文档提到需要加上这个属性来规避bug
        options.addArguments("--no-sandbox");// “–no - sandbox”参数是让Chrome在root权限下跑
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("lang=zh_CN.UTF-8");
        options.addArguments("window-size=1920x1080"); //指定浏览器分辨率
        WebDriver driver = new ChromeDriver(options);

        // 打开目标 URL
        driver.get("https://xxxx.com");

        // 等待页面完全加载
        try {
            Thread.sleep(3000); // 等待 3 秒钟
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 获取页面源代码
        String pageSource = driver.getPageSource();
        // 关闭浏览器
        driver.quit();
        // 使用 Jsoup 解析 HTML
        Document document = Jsoup.parse(pageSource);
```


部分驱动地址
通过网盘分享的文件：131.0.6778.110-chromedriver-win32.zip
链接: https://pan.baidu.com/s/1w8HbSpoYVy0bQOcFVmNfaQ?pwd=snck 提取码: snck

通过网盘分享的文件：103.0.5060.24-chromedriver_linux64.zip
链接: https://pan.baidu.com/s/18k3ygvu5nL541Qzr34cQYQ?pwd=nnys 提取码: nnys

通过网盘分享的文件：google-chrome-beta-103.0.5060.24-1.x86_64.rpm
链接: https://pan.baidu.com/s/1FKS0Mqjq8rIGa7OHlfTaZQ?pwd=hyed 提取码: hyed






