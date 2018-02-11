---
title: 中国单身狗定理
tags:
  - OI
  - 数学
  - 中国剩余定理
categories:
  - OI
date: '2017-09-11T16:19:01+08:00'
---

# 定理

设正整数 $m_1,m_2,⋯,m_n$ 两两互质，则同余方程组

$$
\begin{cases}
x\equiv a_1(\mod m_1)&(1)\\\\
x\equiv a_2(\mod m_2)&(2)\\\\
\cdots\\\\
x\equiv a_n(\mod m\_n)&(n)\\\\
\end{cases}
$$
<!--more-->
有整数解，且在模$M=\prod_{i=1}^n m_i$下解唯一。为：

$$
x=\sum_{i=1}^n a_iM_iM_i^{-1},M_i=M/m_i,M_i^{-1}(\mod m_i)
$$

如果要求所有解，就再加$k$个$M$

说白了就是个求线性同余方程组的解，另外，这个算法有一个很中二的名字：`大衍求一术`

# 证明

首先考察乘积$a_iM_iM_i^{-1}$，在模$m_i$意义下的的值：

$$
a_iM_iM_i^{-1}\equiv a_i\times1\equiv a_i(\mod m_i)
$$

如果模数不为$m_i$时，即为$m_j,j\not=i$由于$m_j$必定是$M_i$的约数，所以有：

$$
\forall j\in\{1,2,\cdots ,n\},j\not=i,
\exists a_iM_iM_i^{-1}\equiv 0(\mod m_j)
$$

所以我们考察上一节的公式，可以把公式拆成两部分：

$$
x=a_iM_iM\_i^{-1}+\sum\_{j\not=i}a_jM_jM_j^{-1}
$$

注意到在模$m_i$意义下时，可以对公式进行变形：

$$
x=a_iM_iM\_i^{-1}+\sum_{j\not=i}a_jM_jM_j^{-1}\equiv a\_i+\sum_{j\not=i}0\equiv a_i(\mod m_i)
$$

这样一来，$x$便是方程$(1)$的一个解，同理可得，$x$也是该方程组的一个解
# 代码

今天又看了一遍，觉得有点不对，少了代码qwq

``` cpp
template <typename T>
void exgcd(T a, T b, T &g, T &x, T &y) // ax + by = gcd(a, b) = g
{
    !b ? (x = 1, y = 0, g = a) : (exgcd(b, a % b, g, y, x), y -= (a / b) * x);
}
template <typename T>
T inv(T a, T m) //a^{-1} (\mod m)
{
    T gcd, x, y;
    exgcd(a, m, gcd, x, y);
    if (gcd == 1)
        return ((x % m) + m) % m;
    else 
        return -1;
}
template <typename T>
T crt(T *m, T *a, T n)
{
    T ans = 0, mi, M = 1;
    for (int i = 1; i <= n; ++i) M *= m[i];
    for (int i = 1; i <= n; ++i)
        mi = M / m[i], ans = (ans + a[i] * inv(mi, m[i]) * mi) % M;
    return ans < 0 ? ans + M : ans % M;
}

```

# 参考链接

- 维基百科-中国剩余定理：[网页链接](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%89%A9%E4%BD%99%E5%AE%9A%E7%90%86)
- xehoth-数论补档计划：[网页链接](https://blog.xehoth.cc/DurationPlan-NumberTheory/#中国剩余定理)
