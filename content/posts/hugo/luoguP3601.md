---
title: '[luogu P3601] 签到题'
tags:
  - OI
  - 洛谷
  - 数学
categories:
  - OI
date: '2017-09-15T13:00:48+08:00'
---

# 题目描述

> 原题地址：[luogu](https://www.luogu.org/problem/show?pid=3601)

一句话题意：求$\sum_{i = l}^ri-\varphi(i)$。其中，$l,r\leq 10^{12}$

假的假的，世界都是假的

<!--more-->

# 题解

## 30分

瞎搞，1000的数据，怎么都可以过，比如暴力分解质因数然后求欧拉函数啥的。

## 60分

线性筛求一波，可以搞出来。

## 满分

### 思路

由于公式：

$$
\varphi(n)=n·\prod(1-\dfrac{1}{p_i} )，其中p_i表示n的一个质因数
$$

可以考虑分解质因数然后求。

可以先筛出$[1,\sqrt{n}]$的质数，然后枚举所有筛出来的质数，用这些质数去分解$[l,r]$内的质因数，注意如果一个数至多有一个大于$\sqrt{n}$的因子。

然而我sb地对于每个数都分解一遍，和暴力一样了qwq（还忘记了取模）

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int maxn = 1e6 + 10;
const ll mod = 666623333;
bitset<maxn> vis;
vector<int> pri;
ll l, r;
ll phi[maxn], num[maxn];
int main()
{
    cin >> l >> r;
    // ===========线性筛==========
    for (int i = 2; i < 1e6 + 10; ++i)
    {
        if (!vis[i])
            pri.push_back(i), vis[i] = 1;
        for (int j = 0; j < pri.size(); ++j)
        {
            ll k = i * pri[j];
            if (k > 1e6 + 10) break;
            vis[k] = 1;
            if (i % pri[j] == 0) break;
        }
    }    
    // ==========================
    ll phi_sum = 0, sum = 0;
    for (ll i = 0; i <= r - l; ++i) num[i] = phi[i] = l + i, sum += phi[i];
    for (ll i = 0; i < pri.size(); ++i)
    {
        ll j = pri[i];
        if (j > r) break;
        if (l % j == 0) j *= (l / j);
        else j *= ((l / j) + 1);
        for (ll k = j; k <= r; k += pri[i])
        {
            phi[k - l] /= pri[i], phi[k - l] *= (pri[i] - 1);
            while(num[k - l] % pri[i] == 0) num[k - l] /= pri[i];   
        }
    }
    for (ll i = 0; i <= r - l; ++i)
        if (num[i] != 1)
            phi[i] /= num[i], phi[i] *= (num[i] - 1);
    for (ll i = 0; i <= r - l; ++i) phi_sum += phi[i];
    cout << (sum - phi_sum) % mod << endl;
}
```
