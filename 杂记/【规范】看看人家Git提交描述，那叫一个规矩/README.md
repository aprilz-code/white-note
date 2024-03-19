## 前言

### 🍊缘由

#### 没想到玩了多年git，竟然还有提交描述规范

![image-1710819363283](https://file.losey.top/blog/image-1710819363283.png)

🏀事情起因：  
在工作迭代过程中，偶然发现同组小帅哥Git提交描述总是和自己的不大一样，秉承好奇至上的我特意去研究了下。竟然发现提交了这么多年的Git描述竟然不符合规范，遂总结一下大厂和一些开源项目的的Git提交规范，跟大家分享一下。

### 🍋实例展示

#### 规范Git提交记录

![image-1710819387180](https://file.losey.top/blog/image-1710819387180.png)
![image-1710819404189](https://file.losey.top/blog/image-1710819404189.png)

#### 本狗不规范Git提交记录

![image-1710819411998](https://file.losey.top/blog/image-1710819411998.png)
![image-1710819417476](https://file.losey.top/blog/image-1710819417476.png)

🔔 分析  
在团队开发中，一般都会使用Git 版本控制工具来管理代码，每个组员提交代码时都会写 commit message。如果没有一个统一标准规范，每个人都有自己的风格，项目小成员少还好，如果团队成员多，项目复杂，十分不利于阅读管理和维护。

通过上方图中提交记录对比，明显感觉上方Git提交记录较为规范美观。虽然本狗写的提交记录也比较清晰，但是随着项目推进及人员的混杂，规范标准必须执行！

因此为了后期一劳永逸，需要制定统一标准，提交记录清晰明了，让团队一看就能知道此次提交的目的，减少管理时间成本。

### 🎯主要目标

#### 实现3大重点

##### 1. IDEA Git描述规范插件

##### 2. Git提交描述格式规范

##### 3. 实例Git提交描述解析

## 正文

### 🥦目标分析

#### 1.IDEA Git描述规范插件？

##### 【git commit message helper】介绍

> 一个可帮助您标准化提交内容的插件

![image-1710819428719](https://file.losey.top/blog/image-1710819428719.png)

##### 【git commit message helper】 插件安装步骤

*  点击【File】=>【Settings】


![image-1710819440534](https://file.losey.top/blog/image-1710819440534.png)
*  【Plugins】=>【Marketplace】搜索 git commit message helper，点击【Install】


![image-1710819453451](https://file.losey.top/blog/image-1710819453451.png)
*  安装后点击【Installed】查看是否成功



##### 【git commit message helper】 使用

*  代码提交时，点击如下图标

![image-1710819481586](https://file.losey.top/blog/image-1710819481586.png)

*  补充提交记录


![image-1710819489083](https://file.losey.top/blog/image-1710819489083.png)


    有问题先别着急，耐心往下看，慢慢分析每个属性！！！

#### 2. Git提交描述格式规范解析

Git提交描述规则可以映射到插件下图部分，Header， Body，Footer


![image-1710819500796](https://file.losey.top/blog/image-1710819500796.png)
一个规范的Git提交描述格式如下




```java
# Header头
<type>(<scope>): <subject>

# Body体
<body>

# Footer体
<footer>
```

##### 1.Header头

Header头只有一行,包括3个字段: type(必需), scope(可选), subject(必需)

<table> 
 <thead> 
  <tr> 
   <th width="194">属性</th> 
   <th width="289">描述</th> 
  </tr> 
 </thead> 
 <tbody> 
  <tr> 
   <td width="174">type(必填)</td> 
   <td width="269">commit提交类型</td> 
  </tr> 
  <tr> 
   <td width="174">scope(选填)</td> 
   <td width="269">commint提交影响范围</td> 
  </tr> 
  <tr> 
   <td width="174">subject(必填)</td> 
   <td width="269">commint提交简短描述</td> 
  </tr> 
 </tbody> 
</table>

*  type 提交类型

type说明提交类型：只允许使用下面属性

<table> 
 <thead> 
  <tr> 
   <th width="97">属性</th> 
   <th width="359">描述</th> 
  </tr> 
 </thead> 
 <tbody> 
  <tr> 
   <td width="97">feat</td> 
   <td width="359">新功能</td> 
  </tr> 
  <tr> 
   <td width="97">fix</td> 
   <td width="359">修改bug</td> 
  </tr> 
  <tr> 
   <td width="97">docs</td> 
   <td width="339">文档修改</td> 
  </tr> 
  <tr> 
   <td width="97">style</td> 
   <td width="339">格式修改</td> 
  </tr> 
  <tr> 
   <td width="124">refactor</td> 
   <td width="339">重构</td> 
  </tr> 
  <tr> 
   <td width="97">perf</td> 
   <td width="339">性能提升</td> 
  </tr> 
  <tr> 
   <td width="97">test</td> 
   <td width="339">测试</td> 
  </tr> 
  <tr> 
   <td width="97">build</td> 
   <td width="339">构建系统</td> 
  </tr> 
  <tr> 
   <td width="97">ci</td> 
   <td width="339">对CI配置文件修改</td> 
  </tr> 
  <tr> 
   <td width="97">chore</td> 
   <td width="339">修改构建流程、或者增加依赖库、工具</td> 
  </tr> 
  <tr> 
   <td width="97">revert</td> 
   <td width="339">回滚版本</td> 
  </tr> 
 </tbody> 
</table>

*  scope 作用范围

scope说明提交影响范围：一般是修改的什么模块或者是什么功能，如【xx模块】/【xx功能】

*  subject 提交主题

subject 说明提交简短描述：一般是5-10各自简单描述做的任务，如【xx模块加入消息队列】

##### 2.Body体

body说明提交详细描述：对于功能详细的描述，解释为什么加入这段代码，为什么调整优化等，如因分布式锁问题，导致死锁问题，优化调整xxxx

##### 3.Footer脚

.Footer脚包括2个字段: Breaking Changes、Closed Issues

<table> 
 <thead> 
  <tr> 
   <th width="140">属性</th> 
   <th width="220">描述</th> 
  </tr> 
 </thead> 
 <tbody> 
  <tr> 
   <td width="263">Breaking Changes</td> 
   <td width="200">中断性不兼容变动(不常用)</td> 
  </tr> 
  <tr> 
   <td width="140">Closed Issues</td> 
   <td width="220">关闭Issues问题</td> 
  </tr> 
 </tbody> 
</table>

*  Breaking Changes

当前版本与之前版本不兼容，如迭代升级对之前版本不能做到兼容，就需要在Breaking Changes后面描述变动理由和迁移方法之类，此属性不常用

*  Closed Issues  
   当前 commit提交针对某个issue问题或者是禅道bug编号等，如Closes \# 234

##### 4.完成填充示例

![image-1710819524401](https://file.losey.top/blog/image-1710819524401.png)

#### 3. 实例Git提交解析

举几个常用git提交描述案例

##### 短信模块新功能提交

![image-1710819534330](https://file.losey.top/blog/image-1710819534330.png)
![image-1710819540858](https://file.losey.top/blog/image-1710819540858.png)

##### 用户模块禅道bug1026修复提交

![image-1710819548177](https://file.losey.top/blog/image-1710819548177.png)
![image-1710819553387](https://file.losey.top/blog/image-1710819553387.png)

##### 迭代SQL脚本提交

![image-1710819559548](https://file.losey.top/blog/image-1710819559548.png)
![image-1710819566481](https://file.losey.top/blog/image-1710819566481.png)

## 总结

本文通过IDEA中Git描述规范插件【git commit message helper】为契机，介绍Git提交描述的规范流程步骤，最后以实际例子作为体验对象，融汇插件及规范流程，实操Git Commit提交描述。希望大家能体会到流程的好处，团队规范统一的益处。



搬运地址： https://mp.weixin.qq.com/s/EbNWRpSYMdWFv5aUQ2ockw
