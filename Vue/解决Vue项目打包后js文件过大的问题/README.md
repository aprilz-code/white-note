### <center>解决Vue项目打包后js文件过大的问题

***

## 前言

这阵子因为白嫖了一台阿里云的服务器，配置是 2核4G1M，但是因为带宽太低了，每次在首屏加载的时候，时间过于缓慢，通过Chrome的F12性能调试，发现主要原因是因为加载的 **js**
过大而引起的。因为之前已经提到了将我们一些组件改成CDN方式引入，例如 Vue、ElementUi、ECharts等。但是还是存在一些打包后的内部 js
文件，他们的大小也过于庞大，因此本文将主要讲解如何解决Vue项目打包后js文件过大的问题。

## 引入插件

我们可以通过引入 **compression-webpack-plugin** 插件，然后开启 **gzip** 来解决本问题

首先安装插件依赖

```bash
npm install --save-dev compression-webpack-plugin
```

然后修改  **vue.config.js** 文件

```
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  plugins: [
  // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
  new CompressionPlugin({
    cache: false,                   // 不启用文件缓存
    test: /\.(js|css|html)?$/i,     // 压缩文件格式
    filename: '[path].gz[query]',   // 压缩后的文件名
    algorithm: 'gzip',              // 使用gzip压缩
    minRatio: 0.8                   // 压缩率小于1才会压缩
  })
 ],
 
```

然后在修改 **build/webpack.prod.conf.js** 文件，修改如下内容

```javascript
// 判断配置文件是否开启了gzip加速
if (config.build.productionGzip) {
    // 引入压缩文件的组件，该插件会对生成的文件进行压缩，生成一个.gz文件
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]', // 目标文件名
            algorithm: 'gzip',  // 使用gzip压缩
            test: new RegExp( // 满足正则表达式的文件会被压缩
                '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240, // 资源大于10240=10KB时会被压缩
            minRatio: 0.8,
            deleteOriginalAssets: false // 是否删除原资源 // 不能删除源文件，不然报错"Uncaught SyntaxError: Unexpected token <"
        })
    )
}
```

## 打包

修改完成后，我们打包项目

```bash
npm run build
```

打包完成后，我们查看 dist目录，能够发现很多 **js** 文件已经被压缩了

![image-20210102112105715](https://cdn.losey.top/blog/image-20210102112105715.png)

我们看到这里，说明已经成功将js压缩了

## 修改Nginx配置

因为我们 **Vue** 项目打包后，部署的是静态文件，因此我们还需要在 **nginx** 处开启 **gzip**， 找到 **nginx.conf**

```bash
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip on; # 开启Gzip
    gzip_static on; # 开启静态文件压缩
    gzip_min_length  1k; # 不压缩临界值，大于1K的才压缩
    gzip_buffers     4 16k; # 以16k为单位,按照原始数据大小以16k为单位的4倍申请内存
    gzip_http_version 1.1; # 识别http协议的版本,早起浏览器可能不支持gzip自解压,用户会看到乱码
    gzip_comp_level 2; # 等级1-9 最小的压缩最快 但是消耗cpu
    gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml application/xml+rss; # 进行压缩的文件类型
    gzip_vary on; # 启用应答头"Vary: Accept-Encoding"
    gzip_proxied   expired no-cache no-store private auth;
    gzip_disable   "msie6"; # (IE5.5和IE6 SP1使用msie6参数来禁止gzip压缩 )指定哪些不需要gzip压缩的浏览器(将和User-Agents进行匹配),依赖于PCRE库

    include /etc/nginx/conf.d/*.conf;
}
```

上述方案配置后由于Nginx的动态压缩是对每个请求先压缩再输出，这样造成虚拟机浪费了很多CPU。解决这个问题可以利用nginx的http_gzip_static_module模块，主要作用是对于需要压缩的文件，直接读取已经压缩好的文件(
文件名为加.gz)，而不是动态压缩（消耗性能）。所以采用这个方案需要确保目录文件名有生成.gz（最新版本的配置打包默认都会生成.gz文件）

首先需要安装nginx的http_gzip_static_module模块

# 安装模块（如果存在其他模块,用空格分开 --with-xxx --with-xxx,防止覆盖）

```shell
./configure --with-http_gzip_static_module

# 编译
make & make install
```

查询安装配置信息是否包含http_gzip_static_module

```shell
./nginx -V

nginx version: nginx/1.8.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --with-http_ssl_module --with-http_gzip_static_module
```

配置nginx.conf的gzip_static属性

```shell
    server {
    listen       80;
    server_name localhost;
    # 开启解压缩静态文件
    gzip_static on;
    location / {
    root   /home/projects/dist;
    try_files $uri $uri/ /index.html;
    index index.html;
}

```

开启gzip_static后，对于任何文件都会先查找是否有对应的gz文件。

重启nginx，使其生效
```shell
./nginx -s reload
```
 测试解压缩静态文件是否成功

# 查询 nginx worker 进程的PID

```shell
ps ax | grep nginx
```

# 使用strace追踪是否请求.gz

```shell
strace -p 23558 2>&1 | grep gz
```

# 如果请求.gz的文件表示开启成功

```shell
open("/xxxx/static/css/chunk-171ca186.f59a1d86.css.gz", O_RDONLY|O_NONBLOCK) = 46 open("
/xxxx/static/js/chunk-01ef53b6.a7928e48.js.gz", O_RDONLY|O_NONBLOCK) = 46

```
设置完成后，我们重启 **nginx**

## 测试

下面我们开始进行测试，首先开未压缩前的，我们可以看到打包后的 **js** 大小为 **410KB** 和 **229KB**

![image-20210102112805832](https://cdn.losey.top/blog/image-20210102112805832.png)

然后在看压缩后的效果，我们发现文件的大小已经被大幅度的压缩，同时响应时间也得到了提升

![image-20210102113120340](https://cdn.losey.top/blog/image-20210102113120340.png)

到这里为止，我们的响应时间过于缓慢的问题也得到了解决
