---
title: 莫反蛇题
tags:
  - OI
  - 数论
  - 雅礼集训
  - 莫比乌斯反演
categories:
  - OI
date: '2017-11-01T12:40:34+08:00'
---

# 题目大意

雅礼考反演考疯了。。

<!--more-->

定义函数 $c(n)$ 表示 n 的质因子的数量
定义函数 $g(n) = −1^{c(n)}$
定义函数 $h(n) = ∑\_{d|n}d$，即 $n$ 所有约数的总和.
定义函数 $f(n) = ∑\_{d|n}g(d) \times h(n/d)$，即 $g$与 $h$ 的卷积.
定义函数 $F(n) = ∑\_{i=1}^n f(i)$，即 $f$ 的前缀和.
对于给定的 $n$ ，求 $F(n)\ \text{mod}\ 998244353$ 的值

$1\leq n\leq 10^{18}$

多组询问，询问数不超过20

# 题解

我们注意到

$$
f=1\*g\*id
$$

由于狄利克雷卷积的结合律我们可以把$1*g$结合到一起

然后我们考虑一下$1*g$的性质

$(1*g)(n)=[n是完全平方数]$

~~（证明以后再补）~~

然后就可以这样

$$
F(n)=\sum\_{i=1}^n\sum\_{d|i}\frac i d[i是完全平方数]\\\\
$$

然后我们变换求和指标，枚举$d^2$，从而消去一个判断

$$
\sum\_{i=1}^n\sum\_{d^2|i}\frac i {d^2}
$$

我们令$\frac i {d^2}=k$，考虑如何计算贡献，对于一个确定的$d$，它的贡献体现在$d^2,2d^2\cdots,kd^2$，即它的所有倍数上，贡献值依次为$1,2,\cdots k$，这部分可以用等差数列求和公式$O(1)$求

我们可以先枚举$d$然后枚举$d^2$的所有倍数，统计贡献

$$
\sum\_{d=1}^\sqrt n\sum\_{i=1}^{\lfloor\frac n {d^2}\rfloor}i
$$

用下面的式子计算，复杂度是$O(\sqrt n)$

过不去

注意到$\lfloor\frac n {d^2}\rfloor$是可以分块求的

然后就可以将复杂度化成$O(^4\sqrt n)$（不知道为啥题解上是三次根号，可能是我太菜分析错了）

## 代码

并没有测试过，~~可能~~（肯定）有锅

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef long double ldb;
const ll mod = 998244353;
const ll inv2 = 499122177;
inline ll mmod(ll x)
{
    x %= mod;
    x += mod;
    return x % mod;
}
inline ll msqrt(ll x)
{
    ll ans = sqrt((ldb)x);
    return ans;
}
ll cal(ll n)
{
    ll x = msqrt(n), ans = 0;
    for (ll i = 1, lst; i <= x; i = lst + 1)
    {
        ll tmp = n / i / i;
        lst = msqrt(n / tmp);
        ans = mmod(ans + mmod(mmod(tmp * (tmp + 1)) * (lst - i + 1)));
    }
    ans = mmod(ans * inv2);
    return ans;
}
int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        ll n;
        cin >> n;
        cout << cal(n) << endl;
    }
}
```

由于我太菜，公式可能会打错，如果你发现了错误，请联系我以修正
