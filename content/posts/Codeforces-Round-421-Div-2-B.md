---
title: 'Codeforces Round #421 (Div. 2) B'
tags:
  - 数学
  - Codeforces
  - 计算几何
  - OI
categories:
  - OI
date: 2017-06-27 12:18:57
---

# 题目描述

> 原题地址：[Codeforces](http://codeforces.com/contest/820/problem/B)

# 思路

固定两个相邻的点，其中一个是顶点，然后枚举另一个点的位置，求角。

![示意图](http://i4.piimg.com/598509/3c2308d257b8c78c.png)

观察到所成角每次增加$\frac{\pi}{n}$，然后就递推一波。。
<!--more-->
# 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
double n, a;
const int maxn = 1e5 + 10;
int main()
{
    cin >> n >> a;
    double del = 360, sum = 180 / n, ans = 0;
    double t = 180 / n;
    for (int i = 2; i <= n - 1; ++i, sum += t)
    {
        if (del > abs(a - sum))
        {
            del = abs(a - sum);
            ans = i;
        }
    }
    cout << 1 << ' ' << n << ' ' << ans << endl;
}

```

今天的CF真的是WA成狗了。。AB各WA三次。。