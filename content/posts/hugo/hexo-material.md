---
title: 简评hexo主题hexo-material
tags:
  - Hexo
  - Material Design
categories:
  - Hexo
date: '2017-10-08T12:34:37+08:00'
---

先说结论，这款主题，作为`material design`的主题是相当差劲的

<!--more-->

#　设计

说到MD，不得不提到它的爸爸：Google。

Google在MD的文档中写到：

> Create a visual language that synthesizes classic principles of good design with the innovation and possibility of technology and science.
>
> Develop a single underlying system that allows for a unified experience across platforms and device sizes. Mobile precepts are fundamental, but touch, voice, mouse, and keyboard are all ﬁrst-class input methods.

以此作为MD的目标，并提出了`Bold, graphic, intentional`等原则

我们来看一下Google+的设计

![DeepinScreenshot_google-chrome_20171008155700.png](https://i.loli.net/2017/10/08/59d9dcf4553c4.png)

嗯，相当清真。完美地符合了`Bold, graphic, intentional`的目标

同是也满足了

> An emphasis on user actions makes core functionality immediately apparent and provides waypoints for the user.

的要求，俗称傻子都会操作。

---

再看一下hexo-material的设计

![DeepinScreenshot_google-chrome_20171008155726.png](https://i.loli.net/2017/10/08/59d9dcf44f177.png)

乍一看好像没有毛病，但是。。左右那么大的地方，空起来真的好吗。。。以及右上角尬到窒息的搜索按钮，谁按谁知道。。。

以及过于多和尬的Card，比如最上面的两个完全没有必要存在的Card，既不能凸显内容，也不能指引操作。

# 动效

Google的Guidelines里指出：

> Motion is meaningful and appropriate, serving to focus attention and maintain continuity. Feedback is subtle yet clear. Transitions are efﬁcient yet coherent.

说白了，就是动效要有意义，要符合基本法

然而根据我的观察，hexo-material却有很多很迷的操作

- 搜索按钮
- 汉堡菜单的弹出动画（速度变化不正确）
- 汉堡菜单里的菜单项缺失波纹动画

# 控件使用

Material Design不是Card Design。

然而在hexo-material的很多地方，Card被滥用，甚至错用。

举例如下

![DeepinScreenshot_google-chrome_20171008155927.png](https://i.loli.net/2017/10/08/59d9dcf432983.png)

首先不说用一整页放友链的愚蠢之处，如此密集的Card是什么操作？其次，Card套Card又是什么操作？

以及这样

![DeepinScreenshot_select-area_20171008162359.png](https://i.loli.net/2017/10/08/59d9e0af085bb.png)

突然变色的Card

我窒息了

![DeepinScreenshot_select-area_20171008162851.png](https://i.loli.net/2017/10/08/59d9e1cd94975.png)

不得不带图片的Card

恕我直言，这短粗的造型真是看着难受

---

移动端：

![DeepinScreenshot_select-area_20171008155800.png](https://i.loli.net/2017/10/08/59d9dcf3af1fa.png)

以及迷之与文章重合的汉堡菜单的触发按钮和奇妙的小尺寸浮动按钮。Card之间过大的间隙

![DeepinScreenshot_select-area_20171008155821.png](https://i.loli.net/2017/10/08/59d9dcf390748.png)

此处应学习一下Google爸爸的操作

当然，我的Blog的并没有像Google+一样清真，也存在各种问题，不过，`hexo-material`**真是太尬了**，令人难以忍受。

今天去围观它的文档的时候，看到了正在开发的清真版本，希望早日release，造福大众。
