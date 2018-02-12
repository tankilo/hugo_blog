---
title: 迁移到Hugo
tags:
  - Hugo
  - Blog
categories:
  - Hugo
date: '2018-02-12T20:34:34+08:00'
---
迁移到了hugo qwq

踩了一万个坑

<!--more-->

### hexo到hugo的转换

由于hugo使用的时间格式与hexo不同，所以要xjb转换一下

使用了[@Kevin Tan](https://keyin.me/)的脚本

链接在这里：[Hugo使用笔记](https://keyin.me/posts/hugo-guidance/)

### 在Windows下的安装

为了实现中文分词，这个主题依赖了`nodejieba`，而`nodejieba`作为一个js库，很丢人地依赖了`cppjieba`，而为了编译`cppjieba`（为啥不二进制分发），又不得不依赖`node-gyp`

而`node-gyp`在Windows上是一种毒瘤的存在，它要依赖python（node依赖py，好像有哪里不对），而且是py2（我的电脑上只有py3）。而且要依赖微软的一套build理论，然而它只支持vs2015自带的那一套

~~`node-gyp`早日爆炸~~

还好我有WSL，果然在Linux下没有那么多事情，直接`npm i`即可

### 使用netlify

这个倒没什么，不过刚开始出现了奇妙的情况。主页显示的是我的旧blog，而about页显示的是新blog，刚开始以为是DNS的锅，后来撕烤了一下感觉不太对，如果是DNS的锅的话不应该是新旧交替啊？

后来恢复了智商，想到了是之前hexo blog里的service worker的锅，service worker慷慨地扛下了前端的所有请求。这么一来就无法访问到新blog了

只能搞一个新的service worker把旧的顶掉。于是我在一番瞎搞之后发现Google的sw-precache真是一种异常良心的存在，它提供了完整的示例代码。然后就给blog加上了service worker，断网也可以访问了。

我已经给作者pr了，但是看起来还没有merge

### 加入gitment

使用GitHub issue作为评论也有其独特的好处，不仅可以减少垃圾评论，而且有邮箱提醒~~（其实是leancloud要求强密码，而我比较懒）~~

然后我就照猫画虎地在模板里瞎改了一下，让gitment跑起来了。

由于URL发生了改变，之前的评论都无法显示了，不过好在它们并没有丢失，而是在这个repo的[issue](https://github.com/Enter-tainer/BlogSource/issues)里