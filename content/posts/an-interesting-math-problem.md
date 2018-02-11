---
title: 记一次有趣的推导
tags:
  - 数学
  - 文化课
categories:
  - 文化课
date: 2017-11-25 08:06:07
---

滚回文化课之后发现了一道很有意思的题

<!--more-->

# 题意

原题大概是这样的

>$$
>f(n)=n^2\\\\
>g(n)=\sum\_{i=1}[f(i)<n]\\\\\\\\
>k(n)=\sum_{i=1}[g(i)<n]
>$$
>
>试求$k(n)$的表达式

这是培优dalao的题

据说老师的方法是打表

~~充满了NOIP的气息~~

于是我决定xjb推一下

# 题解

想一想，我们应该先求$g(n)$，再求$k(n)$

## 求$g(n)$

### 当$n$是完全平方数时

这时答案显然是$g(n)=\sqrt n - 1$

### 当$n$不是完全平方数时

我们可以先开方，然后向下取整即可

即$g(n)=\lfloor\sqrt{n}\rfloor$

也就是。。

$$
g(n)=
\begin{cases}
\sqrt n - 1 &when\ n \ is\ a\ square\ number\\\\\\\\
\lfloor\sqrt{n}\rfloor&otherwise
\end{cases}
$$

由于取整函数有一些奇妙的性质，我们可以尝试xjb构造一下，把$g(n)$的表达式化简一下

我构造出来是这样的：$g(n)=\lfloor\sqrt{n-1}\rfloor$

显然是上面的式子等价

## 求$k(n)$

由于我们求过了$g(n)$，那么有

$$
k(n)=\sum_{i=1}\left[\lfloor\sqrt{i-1}\rfloor<n\right]
$$

首先我们可以一眼看出来$k(n)$具有单调性

然后我们考虑，如果可以求出$g(i)=n$的解集$\mathbb A$，那么只需要找出$\mathbb A$中的最小元素，将其减去1即可

至于为什么是这样呢？

可以手画一下$k(n)$的图象脑补

显然，$n^2+1\in \mathbb A$，且$\forall \ i \in \mathbb A,\  \exists\ i \geq n^2+1$

然后就有辣

$k(n)=n^2$

