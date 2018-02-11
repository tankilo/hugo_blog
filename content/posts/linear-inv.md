---
title: 线性求逆元
tags:
  - 数学
  - 数论
  - OI
categories:
  - OI
date: 2017-10-04 23:01:58
---

# 作用

在$O(n)$时间内求出$1-n$在$\text{mod}\ p$意义下的所有逆元

<!--more-->

# 原理

可以递推求出，比如我们现在要求$i$在$\text{mod}\ p$意义下的逆元

我们知道

$$
p = ki+r\ (r < i)
$$

然后我们对这个式子进行一发操作

$$
ki + r \equiv 0\ \text{mod}\ p
$$

突然想起来我们是要求逆元，即$i^{-1}$，那我们就瞎搞一下，搞出来个$\frac{1}{i}$就好了

$$
\because ki+r=0\\\\
\therefore ki=-r \\\\
对上面的式子两边取倒数得
\therefore -\frac{1}{ki}=\frac{1}{r}\\\\
\therefore i^{-1}=-\frac{k}{r}
$$

$i^{-1}$就是我们想要的东西啦

然后再考虑一下怎么算$k,r$。

显然$k=\lfloor\frac{p}{i}\rfloor$，$r=p\ \text{mod}\ i$。又因为$r<i$ ，你又是大力递推的，所以$inv[r]$一定已经计算过了，所以直接用就好了。

# 代码

``` cpp
int inv[(int)3e6 + 10], n, p;
void get_inv()
{
    inv[1] = 1;
    for (int i = 2; i <= n; ++i)
        inv[i] = (1ll * inv[p % i] * (p - p / i) % p) % p;
}
```



