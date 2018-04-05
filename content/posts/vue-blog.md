---
title: 一篇写Blog的Blog
tags:
  - Vue
  - 前端
categories:
  - 前端
date: '2018-04-05T19:43:56+08:00'
---
用Vue给自己xjb糊了个玩具级的[blog](https://margatroid-vue-blog.netlify.com/)

![捕获.PNG](https://i.loli.net/2018/04/05/5ac601a1ba6be.png)

<!--more-->

写一下踩过的坑好了qwq

# 工作原理

在网页加载后会向后端请求一个json，内容大概是这样的

``` json
{
    "data": [{
        "title": "学一学Haskell（一）",
        "time": "2018-02-26T09:03:56+08:00",
        "filename": "learn-hs-1.md"
    }, {
        "title": "迁移到Hugo",
        "time": "2018-02-12T20:34:34+08:00",
        "filename": "migrate-to-hugo.md"
    }]
}
```

然后用这些内容去渲染左侧的抽屉和首页的瀑布流

网页的格式大概是这样：

``` nohighlight
+----------+---------------------------------------------------+
|          |                                                   |
|          |                                                   |
|          |                                                   |
|          |                                                   |
|          |                                                   |
|  Drawer  |                    router-view                    |
|          |                                                   |
|          |                                                   |
|          |                                                   |
|          |                                                   |
|          |                                                   |
+----------+---------------------------------------------------+
```



路由组件一共有两个，一个是`Passage`，用于显示具体文章内容，另一个是`WaterFall`，用于显示首页瀑布流

`Passage`加载后会从它的prop`raw_articles`中得到当前页面的Markdown文件名，标题，以及时间，接着通过ajax请求Markdown文件，在前端用`marked`渲染成html，同时用`moment.js`解析时间。

`WaterFall`加载后会从同一个prop中获取信息，然后遍历一遍，并请求Markdown文件，然后分割字符串，产生预览

# 踩过的坑

`axios`的promise里需要重新绑定`this`

``` js
axios
.get('static/' + filename)
.then(
  function (response) {
    this.loading = false
    this.md = marked(response.data, {
      sanitize: true
    })
  }.bind(this)
)
.catch(function (error) {
  console.log(error)
  this.error = true
}.bind(this))
```

prop并不是在组件挂载时就存在数据

这是错误写法：

``` js
mounted () {
  this.getTitle()
}
```

正确写法：

``` js
watch: {
  raw_article: function () {
    this.getTitle()
  }
}
```

mdui的网格系统也有坑。。

如果把控制列的css类直接扔到card上，会出奇妙的锅

只能先套个div

