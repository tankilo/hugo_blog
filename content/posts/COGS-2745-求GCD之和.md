---
title: '[COGS 2745] 求GCD之和'
tags:
  - OI
  - COGS
  - 数学
categories:
  - OI
date: 2017-07-27 02:11:58
---

# 题目描述

> 原题地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=2745)

题目是在济南集训时候的比赛题

题意：求$\sum^n\_ {i = 1}\sum\_{j=1}^m\gcd(i,j)\mod998244353$ 

<!--more-->

# 解法

## 算法一

暴力计算，复杂度$O(n^2\log n)$，期望得分40。

代码没必要上了吧。。

## 算法二

大常数AC

1. 枚举从$n$到$1$的所有数，考虑到以$i$为约数的数的对数为$\lfloor\frac{n}{i}\rfloor\times\lfloor\frac{m}{i}\rfloor$对。
2. 又可知若以$i$为最大公约数的数的对数为$m$，则$i$对答案的贡献是$i\times m$。

因此我们需要进一步细化1中的数的对数。

我们可以从$2i$开始，减去所有以$i$的倍数为约数的数对的数目，这样就求得以$i$为最大公约数的数对的个数，结合2的方法，计算贡献，累加。

代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
const int p = 998244353;
long long q[10000010];
int n,m;
int main()
{
	freopen("hoip.in","r",stdin);
	freopen("hoip.out","w",stdout);
	int i,j;
	long long s = 0;
	scanf("%d%d",&n,&m);
	if(n > m) swap(n,m);
	for(i = n;i >= 1;i--)
	{
		q[i] = 1ll * (n / i) * (m / i);
		for(j = i + i;j <= n;j += i) q[i] -= q[j];
		s += q[i] * i;
	}
	printf("%d",s % p);
	return 0;
}
```

复杂度。。算不出来。。不过显然是大于$O(n)$的qwq

以上是青岛二中神犇zyb的解法

无限%zyb dalao，一试二试都是rk1 %%%。

## 算法三

用莫比乌斯函数容斥，加上狄利克雷卷积优化，复杂度$O(n)$

根本没有听懂，以后再填qwq

坑填上啦！

[链接](https://margatroid.xyz/2017-10-30-mobius-inversion-problems/)