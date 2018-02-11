---
title: '[COGS 213][BYVoid S1]灵魂分流药剂'
tags:
  - OI
  - COGS
  - DP
categories:
  - OI
date: 2017-06-17 09:51:42
---

## 题目描述

> 原题地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=213)
>
> 一句话题意：二维的分组背包

## DP方程

### 状态定义

令$f(i,j,k)$为在前$i$个箱子中取药，使得生命值为$j$，精神值为$k$ 。

令第$i$瓶药造成的生命值伤害是$pain(i)$，精神伤害是$san(i)$，痛苦值为$suff(i)$。
<!--more-->
### DP方程

$$
\begin{array}\\
f(i,j,k)=\max\{f(i-1,j,k),f(i-1,j-kill[m],k-san[m])\}&&m\in box(i)
\end{array}
$$

### 解释

就是普通的0-1背包多了一维。但是代码比较鬼畜。。

## 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 110;
int f[maxn][maxn][maxn];
int pain[maxn], san[maxn], suff[maxn];
vector<int> box[11];
int n, m, a, b;
int main()
{
    freopen("soultap.in", "r", stdin);
    freopen("soultap.out", "w", stdout);
    cin >> n >> m >> a >> b;
    int t;
    for (int i = 1; i <= n; ++i)
    {
        cin >> pain[i] >> san[i] >> t >> suff[i];
        box[t].push_back(i);
    }
    int ans = -(1 << 30);
    for (int i = 1; i <= m; ++i)
    {
        for (int j = 0; j <= a; ++j)
            for (int k = 0; k <= b; ++k)
                f[i][j][k] = f[i - 1][j][k];
        for (int l = 0; l < box[i].size(); ++l)
        {
            int cnt = box[i][l];
            for (int j = pain[cnt]; j <= a; ++j)
                for (int k = san[cnt]; k <= b; ++k)
                    f[i][j][k] = max(f[i][j][k], f[i - 1][j - pain[cnt]][k - san[cnt]] + suff[cnt]), ans = max(ans, f[i][j][k]);
        }
    }

    cout << ans << endl;
}
```

我的基础太水了，要多补补了qwq。