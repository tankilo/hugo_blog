---
title: 'Richat开发笔记'
tags:
  - Vue
  - 前端
categories:
  - 前端
date: '2018-06-26T12:59:06+08:00'
---

我好像还有个Blog来着……

![捕获.PNG](https://i.loli.net/2018/06/26/5b31c565d16b4.png)

<!--more-->

写前端项目就是一顿大调库。。

### 坑

写这个蛇皮玩意可踩了不少坑。。。

首先是`Vue-cli`，这个玩意的模板日新月异，3.x不兼容2.x

然后是蛇皮`KaTeX`，导出的函数名异常奇怪，更蛇的是根本没有文档

后端上，node竟然不支持es6的`import`，只能写require

### 设计思路

页面加载之后，会向后端请求历史消息，得到一个json串，大概是这样：

``` json
data = {
    username: this.username,
    content: this.inputMessage,
    email: this.email,
    timestamp: (new Date()).valueOf(),
    group: this.groupName,
}
```

然后用这些串渲染消息，流程是先Markdown，然后KaTeX

