### <center>ELEMENTUI修改类库的全局配置的默认属性(npm以及CDN引入)
***
## 前言

在操作后台管理系统时,一个误点击dialog外,然后dialog就自动关闭了!!!! 填写的数据都得重新再来一次实在是很不人性化,故有了这一篇文章.


任务是修改ELEMENTUI的弹窗的默认遮罩为不关闭。

## 一、NPM引入
使用命令`npm install  element-ui -S` 就可以安装好element-ui，然后在项目中通过以下方式引入：

就可以使用Element访问到Dialog对象，然后设置默认属性。


在main.js中
```javascript
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//全局修改默认配置
Element.Dialog.props.closeOnClickModal.default=false;
// console.info(Element.Dialog);
Vue.use(Element)
```
## 二、CDN引入
（1）CDN引入步骤,如下所示 在 index.html的head中添加
```javascript
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

然后在webpack.base.conf中需要排除element-ui

```javascript
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    externals: {
        "CKEDITOR": "window.CKEDITOR",
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'turndown': 'turndown',
        'showdown': 'showdown',
    },
    
        ... //省略
}
```

（2）修改全局配置
```javascript
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script >
//全局修改默认配置
ELEMENT.Dialog.props.closeOnClickModal.default=false;
// console.info(ELEMENT.Dialog);
</script>

```

即可,再去试试的时候,点击dialog外已经不会自动关闭dialog了


