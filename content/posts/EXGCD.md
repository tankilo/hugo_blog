---
title: EXGCD
tags:
  - OI
  - 数学
  - 数论
categories:
  - OI
date: 2017-08-25 10:04:06
---

# GCD

求GCD一般使用欧几里得的算法，即$\gcd(a,b)=\gcd(b, a\mod b)$

然后就随便写写就好了，这个大家都会qwq

<!--more-->

# EXGCD

~~EX面的~~

以前一直不知道是干啥用的（太浮躁了），导致一直没有学会

## 作用

已知$(a,b)$，求解一组$(x,y)$，使得$xa+yb=gcd(a,b)$

然后我们根据上面的结论，可以把式子代换一下：

$xb+y(a\mod b)=gcd(b,a\mod b)$

就像这样，迟早会出现把$b$给搞成0的情况，这时候$x=1,y=0$显然是一组解

然后再考虑怎么根据这组解推出原始的解

再考虑$mod$运算的实现，$a\mod b=a-b\times\lfloor\frac{a}{b}\rfloor$

然后就可以大力递推啦，详情见代码

``` cpp
typedef long long ll;
ll exgcd(ll a, ll b, ll &x, ll &y)
{
    if (b == 0)
        return x = 1, y = 0, a;
    ll gcd = exgcd(b, a % b, x, y), tmp = x;
    x = y, y = tmp - a / b * y;
    return gcd;
}
```

# EXGCD求逆元

## 费马小定理法

费马老哥有一个定理，可以求出模数为质数时的逆元

就是。。

$inv=a^{mod-2}$

用快速幂实现的话复杂度是$O(\log n)$的

``` cpp
int getinv(int a, int md)
{ 
    int n = md - 2, ans = 1;
    for (; n; n >>= 1)
    { 
        if (n & 1) ans = ans * a % md;
        a = a * a % md;
    }
    return ans;
}
```



## EXGCD法

如果模数不是质数，费马小定理就不能用了（惨qwq

如果我们要求$a$膜$n$的逆元

设$xa+yn=\gcd(a,n)$

### 若$\gcd(a,n)=1$

此时存在逆元，由$xa+yn\equiv ax\equiv1$，此时$x$就是一个最小的逆元

### 若$\gcd(a,n)\not=1$

由上面的推断，可知$ax\equiv \gcd(a,n)\ (\text{mod}\ n)$，由于$\gcd(a,n)\not=1$，所以逆元不存在

```cpp
typedef long long ll;
ll exgcd(ll a, ll b, ll &x, ll &y)
{
    if (b == 0)
        return x = 1, y = 0, a;
    ll gcd = exgcd(b, a % b, x, y), tmp = x;
    x = y, y = tmp - a / b * y;
    return gcd;
}
ll get_inv(ll a, ll m)
{
    ll x, y;
    if (exgcd(a, m, x, y) == 1)
        return (x % m + m) % m;
    else
        return -1;
}
```

# 参考链接

- 维基百科-模逆元：[网页链接](https://zh.wikipedia.org/wiki/%E6%A8%A1%E5%8F%8D%E5%85%83%E7%B4%A0)

