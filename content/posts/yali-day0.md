---
title: 雅礼划水记-Day0
tags:
  - 洛谷
  - 数学
  - 数论
  - 雅礼集训
  - 博弈论
categories:
  - OI
date: 2017-10-21 10:29:15
---

> 今天又是被吊打的一天呢

<!--more-->

# 博弈

上午看了看19号的题，划了一波水，学习了一波博弈论

大概的思路就是。。两个人在玩♂游♂戏，希望通过一顿操作之后使得自己的尽量大，对手的尽量小

这种博弈是没有胜负的

我们不妨设两个人都是傻逼

然后给其中一个人充值智商，被充值智商的人肯定充满了智慧，他就会去套路没有智商的傻逼，于是我们就得到了一种策略

然后我们给第二个人也充值智商，这样他就不会被轻易套路了，他会根据对手的操作来是自己的损失尽量小

这样我们就得到了“双方都按最优策略行动”的方案

# 数论

下午有课，讲了数论和计算几何

雅礼的人很多，足足坐了一个大会议室

# T1

给定$x,n$求

$$
f(x)=\sum\_{i=1}^nx\  \text{mod} \ i
$$

其中$1\leq x,n\leq 10^9$

首先$O(n)$大暴力是不行的

那怎么搞啊。。

我们注意一下模运算的性质：

$$
f(x)=\sum\_{i=1}^nx\  \text{mod} \ i=\\\\
\sum\_{i=1}^n(x-\lfloor\frac{x}{i}\rfloor\times i)=\\\\
nx-\sum\_{i=1}^n\lfloor\frac{x}{i}\rfloor\times i
$$

然后我们注意右半边的一些性质：$\lfloor\frac{x}{i}\rfloor$这个值，存在一段连续的$i$，使得这个值是不变的，如果我们可以预处理出来一共有几段，就可以等差数列求和辣

我们设$j = \lfloor\frac{x}{i}\rfloor$，$k$是满足$\lfloor\frac{x}{k}\rfloor=j$的最大整数，那么我们有$kj\leq x$，所以$k=\lfloor\frac{x}{j}\rfloor$

这样我们就搞出来了一段，用等差数列求和一下就好了

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
ll f(ll n, ll x)
{
    ll ans = n * x;
    ll now = 1, tmp = 0, ed = 0;
    while(now <= x)
    {
        tmp = x / now, ed = x / tmp;
        ans -= tmp * (ed + now) * (ed - now + 1) / 2;
        now = ed + 1;
    }
    return ans;
}
int main()
{
    ll n, x;
    cin >> n >> x;
    cout << f(n, x) << endl;
}

```

# T2

>  原题地址：[Luogu](https://www.luogu.org/problem/show?pid=3708)

我们考虑一下$f(x+1)$与$f(x)$的关系
$$
f(x+1)-f(x)=n-\sum_{i=1}^ni(\lfloor\frac{x+1}{i}\rfloor-\lfloor\frac{x}{i}\rfloor)
$$
考虑一些后面那一大串求和的意义

假如$i$不是x+1的约数，对$f(x+1)$的贡献会比对$f(x)$的贡献多$1$ 

否则对$f(x+1)$的贡献会比对$f(x)$的贡献少$i-1$

所以我们可以认为$f(x+1)-f(x)=n-(x+1的约数和)$

（其实可以自己打个表观察一下

然后用$O(n\log n)$时间预处理一下约数和

## 代码

``` cpp
//luogu P3708
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e6 + 10;
typedef long long ll;
ll func(ll n, ll x)
{
    ll ans = n * x;
    ll now = 1, tmp = 0, ed = 0;
    while(now <= x)
    {
        tmp = x / now, ed = x / tmp;
        ans -= tmp * (ed + now) * (ed - now + 1) / 2;
        now = ed + 1;
    }
    return ans;
}
ll f[maxn], sum[maxn], n;
int main()
{
    cin >> n;
    for (int i = 1; i <= n; ++i)
        for (int j = i; j <= n; j += i)
            sum[j] += i;
    f[1] = func(n, 1);
    for (int i = 2; i <= n; ++i)
        f[i] = f[i - 1] + n - sum[i];
    for (int i = 1; i <= n; ++i)
        cout << f[i] << ' ';
    cout << endl; 
}
```

T3往后什么的。。真的不会啊。。。我太菜了。。。

