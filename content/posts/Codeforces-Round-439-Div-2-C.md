---
title: 'Codeforces Round #439 (Div. 2) C'
tags:
  - OI
  - Codeforces
  - 图论
  - 组合数学
  - 计数
categories:
  - OI
date: 2017-10-08 20:09:39
---

# 题意

> 原题地址：[Codeforces](http://codeforces.com/contest/869/problem/C)

一句话题意：有三种颜色的点，现在要在这些点之间连边权为1的边，同种颜色的点之间的距离要不少于3，求合法的方案数。

<!--more-->

# 题解

首先注意**距离不少于3**的含义

这意味着，相同颜色的点不能连边，一个点不能连两个颜色相同的点。

然后就可以把所有的边按颜色分成三类，`RB`，`RP`，`BP`

我们来以`RB`研究一下怎么统计方案数，如果我们要在他们直接连$k$条边那么，方案数就是

$$
{A\choose k}{B\choose k}k!
$$

注意到最多可以连$\min\{A,B\}$条边，所以`RB`的方案数就是

$$
\sum_{k=0}^{\min\{A,B\}}{A\choose k}{B\choose k}k!
$$

然后用这种操作统计一发`RP`，`BP`的方案数，最后乘起来就好了

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int maxn = 5e3 + 100;
ll cc[maxn][maxn], fac[maxn];
const int mod = 998244353;
void pre(int k = 5010)
{
    for (int i = 0; i <= k; ++i)
    {
        cc[i][0] = cc[i][i] = 1;
        for (int j = 1; j < i; ++j)
            cc[i][j] = (cc[i - 1][j] % mod + cc[i - 1][j - 1] % mod) % mod;
    }
    fac[0] = 1;
    for (int i = 1; i <= k; ++i)
        fac[i] = (fac[i - 1] % mod) * (i % mod), fac[i] %= mod;
}
template <class T>
T mmod(const T & a) { return a % mod; }
int main()
{
    int a, b, c;
    ll ansab = 0, ansbc = 0, ansac = 0;
    cin >> a >> b >> c;
    pre();
    for (int i = 0; i <= min(a, b); ++i)
        ansab += mmod(mmod(mmod(cc[a][i]) * cc[b][i]) * fac[i]);
    for (int i = 0; i <= min(b, c); ++i)
        ansbc += mmod(mmod(mmod(cc[b][i]) * cc[c][i]) * fac[i]);
    for (int i = 0; i <= min(a, c); ++i)
        ansac += mmod(mmod(mmod(cc[a][i]) * cc[c][i]) * fac[i]);
    cout << mmod(mmod(mmod(ansac) * mmod(ansbc)) * mmod(ansab)) << endl;
}
```

值得一提的是，这道题的取模非常恶心，要步步取模，数据贼强