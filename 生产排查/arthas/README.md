### <center>arthas

***

## 1.官方文档地址
<https://arthas.aliyun.com/doc/>


## 工具部分主要命令使用

Alibaba Arthas
> 命令:  thread -n 3 # 支持一键展示当前最忙的前3个线程并打印堆栈


### 代码性能优化命令trace
推荐安装如下插件 `Arthas Idea`,配合idea实现本地代码调试

![image-1711351253964](https://file.losey.top/blog/image-1711351253964.png)

![image-1711351236789](https://file.losey.top/blog/image-1711351236789.png)


```shell
trace com.aprilz.service.impl.TestServiceImpl page   -n 5 --skipJDKMethod false 
```
上述代码解析: 类名   方法名 -n即命令执行次数，--skipJDKMethod false不跳过JDK自带的方法，默认会跳过

如果要调试lambda，匿名表达式等等咋办呢。安装该插件`jclasslib Bytecode Viewer`
然后，确保自己的代码已经编译完成的前提下，打开需要查看的Java代码文件
再点击菜单栏的`view => show bytecode with Jclasslib`即可打开字节码窗口，接着你会得到如下图所示的文件：

![image-1711351411587](https://file.losey.top/blog/image-1711351411587.png)

  ```shell
 
  trace com.aprilz.service.impl.TestServiceImpl  lambda$page$3  -n 5 --skipJDKMethod false 	
  ```
此时可以监控到方法内执行耗时

![image-1711351557820](https://file.losey.top/blog/image-1711351557820.png)

参考 https://blog.csdn.net/qq_32681589/article/details/135218274



// TODO