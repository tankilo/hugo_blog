---
title: 论自动化武器对Luogu绘版的影响
tags:
  - 洛谷
  - python
  - 绘版
categories:
  - 娱乐
date: '2018-01-11T05:08:26+08:00'
---

前段时间luogu搞了个绘版活动，本着娱乐的心情写了个小脚本，写一下思路qwq

脚本地址：[Github](https://github.com/Enter-tainer/LuoguPaintAutomaton)

<!--more-->

# Get Started

## 网络请求

### 抓包

我们可以直接在浏览器里按下`F12`，当我们点一个点时，注意到我们向服务器发送了一个`POST`请求，发送的数据是`x='xxx' y='xxx' color='xxx'`

这么来说，如果我们的程序能够定时地向luogu的服务器发请求就可以完成绘画了（先不管颜色与位置）

### 实现

无论是用py还是js都很容易实现，js可以使用`jQuery`的`$.post()`方法，而py用户可以使用`requests`库

## 颜色拟合

我们总不能做一只只会涂黑块的咸鱼吧

好心的luogu在console里打印出了颜色代码（32进制数）与rgb的对应关系

~~（脚本友好型绘版）~~

一种容易想到的方法是将rgb当成空间内某点的坐标，即该点的坐标是$(r,g,b)$

然后可以找出距离最小的一个颜色就好啦

### 颜色空间

但是。。由于rgb三维最近从某些意义上并不能反映最近颜色

所以一种值得推荐的方法是使用HSL颜色空间

## 图片

画图什么的。。总要把图读进去对吧

我们在OI中遇到的“图”大多以字符数组的形式存在

我们脑补一下，理想的图片格式应该是这样的：

> 第一行两个整数$h,l$，分别表示图片的高和宽
>
> 以下每行三个整数，对于第$i$行的三个整数$r,g,b$，表示第$\lfloor\frac i l\rfloor$行第$i \text{ mod }l$个像素的rgb值

不过我们常见的PNG，JPEG等格式并没有这种操作

好在有一种名叫ppm的格式适合我们

### PPM格式

这种格式的描述和我描述的相差无几，除了一点：

- ppm格式文件的除注释外的第三个整数不表示rgb值，而是表示rgb的最大分量

## 账号切换

总不能一个号单线程到老吧

注意到luogu使用两个cookie来标识身份

`UM_ID`与`client_id`

对于py选手，切换是很容易的，详情见`requests`文档

对于js选手。。emmm貌似开多个浏览器可以解决。。。

# Advanced

## 维护

维护有多种实现，我这里介绍我xjb yy的一种

### 任务队列

把所有的像素点当成一个task，加入任务队列中

- 每次从队头取出一个元素
- 检查其是否已经被画过
- 如果是的话就可以把这个元素扔回队尾
- 否则发送请求
- 然后扔到队尾

就可以了

但是。。怎么获取绘版信息呢？

### 获取绘版信息

我们再次打开Chrome的`F12`

观察到有一个叫`PaintBoard`的请求

点开一看，是一个字符方阵，用32进制数来表示颜色

值得注意的是$x,y$坐标是相反的

所以我们可以向这个东西发`GET`请求，比对一下就好啦

注意到这个方阵很大，我们可以缓存一下，画上20-30个点之后再更新

## 并发

至今为止我们都没有用到多线程（实际上也不是很必要）

如果你实在显得无聊的话。。可以试试。。（但是性能瓶颈大概率不在这里）

## 分布式

ranwen dalao的骚操作

client定时从中心服务器获取任务，然后绘制

效果拔群

最后打个广告，欢迎来东方绘版群~~养老~~，群号：`691090556`
