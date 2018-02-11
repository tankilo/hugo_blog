---
title: 莫比乌斯反演
tags:
  - OI
  - 数论
  - 雅礼集训
  - 莫比乌斯反演
categories:
  - OI
date: '2017-10-25T18:22:01+08:00'
---

# 定理内容

我们知道

$$
F(n)=\sum\_{d|n}f(d)
$$

<!--more-->

然而。。如果我们要直接求$f(n)$在大多数情况下会很困难，我们考虑用$F(n)$求一下

我们有定理

$$
f(n)=\sum\_{d|n}F(d)\mu(\frac{n}{d})
$$

~~黑人问号.jpg~~

# 证明

## 狄利克雷卷积

为了证明一下上面的定理，我们引入一些骚东西：狄利克雷卷积

狄利克雷卷积定义在数论函数上

### 运算法则

狄利克雷卷积可以将两个数论函数卷到一起

比如我们有一个$f(x)$，一个$g(x)$

然后把他们卷到一起之后就得到了一个新函数$(f*g)(x)$

那。。这个新函数的表达式是什么呢？

我们定义

$$
(f*g)(n)=\sum\_{d|n}f(d)g(\frac{n}{d})
$$

我们观察一下，这个操作是有交换律和结合律的

### 单位元

同时还存在单位元$\epsilon(n)$使得$\epsilon*f=f$

这个单位元长这样：$\epsilon(n)=[n=1]$

上面的$[n=1]$是一个函数，它的意义是这样的

$$
[n=1]=
\begin{cases}
1&n=1\\\\
0&n\not=1
\end{cases}
$$

现在我们来看一下为什么$\epsilon(n)$是单位元

$$
(\epsilon\*f)(n)=\sum\_{d|n}\epsilon(d)f(\frac{n}{d})=\\\\
\sum\_{d|n}f(\frac{n}{d})[d=1]
$$

我们注意一下这个式子

当且仅当$d=1$时$f(\frac{n}{d})$对答案有贡献，即$\epsilon*f=f$

### 其它的奇妙的函数

#### 1函数

~~名字是我瞎口胡的~~

$1(n)=1$

一个很无聊的函数

比如我们把一个函数$f(n)$卷上一个$1(n)$

$$
(1\*f)(n)=\sum\_{d|n}f(d)
$$

#### $\mu$函数

$\mu$是莫比乌斯函数，它的定义是这样的：

$$
\mu=
\begin{cases}
1&n=1\\\\
(-1)^k&n=p_1p_2\cdots p_k\\\\
0&otherwise
\end{cases}
$$

翻译成另一种说法呢？是这样

>For any positive [integer](https://en.wikipedia.org/wiki/Integer) *n*, define *μ*(*n*) as the sum of the [primitive nth roots of unity](https://en.wikipedia.org/wiki/Primitive_nth_root_of_unity). It has values in {[−1](https://en.wikipedia.org/wiki/-1_(number)), [0](https://en.wikipedia.org/wiki/0_(number)), [1](https://en.wikipedia.org/wiki/1_(number))} depending on the [factorization](https://en.wikipedia.org/wiki/Integer_factorization) of *n* into [prime factors](https://en.wikipedia.org/wiki/Prime_factor):
>
>- $\mu (n)=1$  if *n* is a [square-free](https://en.wikipedia.org/wiki/Square-free_integer) positive integer with an [even](https://en.wikipedia.org/wiki/Even_and_odd_numbers) number of prime factors.
>- $\mu (n)=-1$ if *n* is a square-free positive integer with an odd number of prime factors.
>- $\mu (n)=0$ if *n* has a squared prime factor.
>
>From [Wikipedia](https://en.wikipedia.org/wiki/Möbius_function)

它有一个性质：

$$
\sum\_{d|n}\mu(d)=[n=1]
$$

我们观察一下，也就是说，$\mu \* 1=\epsilon$

## 证明

终于科普完狄利克雷卷积辣

我们再看一下莫反的两个式子：

$$
F(n)=\sum\_{d|n}f(d)
$$

$$
f(n)=\sum\_{d|n}F(d)\mu(\frac{n}{d})
$$

我们可以看出

$$
F=1\*f
$$

$$
f=\mu\*F
$$

我们把下面的式子带进上面

$$
F=1\*\mu\*F
$$

接下来我们只需要证明$1\*\mu=\epsilon$就好啦

这个在前面已经说过辣

所以我们就证明了莫比乌斯反演定理

# 参考资料

- ruanxz-狄利克雷卷积 [网页链接](https://ruanx.pw/post/狄利克雷卷积.html)

---

今天就不写游记了qwq

上午的毒瘤比赛题太难受了

大概。。有分就是中位数

qwq
