---
title: '[COGS 2722][CodeforcesEduR22C] The tag game'
tags:
  - COGS
  - Codeforces
  - 贪心
  - OI
categories:
  - OI
date: '2017-07-02T08:55:37+08:00'
---

# 题目描述

> 原题地址： [COGS](http://cogs.pro/cogs/problem/problem.php?pid=2722) [Codeforces](http://codeforces.com/contest/813/problem/C)

# 思路

Bob的移动策略有三种：

## 向根节点方向走
<!--more-->
![T1](http://i1.buimg.com/598509/719446184f17cab2.png)

如图，经过迂回之后可以到达更深的节点

## 向叶子方向走

![T2](http://i1.buimg.com/598509/66053508dfdd0219.png)

如图，可以苟且延长一些寿命

## 不动

当到达叶子节点时只能坐以待毙了

# 解决方案

预处理出来每个点的深度，和以每个点为根的子树的最大深度。

然后开始模拟，如果Bob能比Alice先到达某节点，就用这个节点更新答案，显然$ans=2deepth(u)$。

# 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = ((int)1e5 << 1) + 10;
vector<int> g[maxn];
int f[maxn], d[maxn], md[maxn];
int n, x, ans;
void dfs(int cur, int fr, int de)
{
    d[cur]= md[cur] = de, f[cur] = fr;
    for (int i = 0; i < g[cur].size(); ++i)
    {
        if (fr == g[cur][i]) continue;
        dfs(g[cur][i], cur, de + 1);
        md[cur] = max(md[cur], md[g[cur][i]]);
    }
}
int main()
{
    freopen("taggame.in","r",stdin);
	freopen("taggame.out","w",stdout);
    cin >> n >> x;
    for (int i = 1; i < n; ++i)
    {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }
    dfs(1, 0, 0);
    ans = (md[x] << 1);
    for (int i = 0, j = x; ; ++i, j = f[j])
    {
        if (i < d[j]) ans = max(ans, (md[j] << 1));
        else break;
    }
    cout << ans << endl;
}

```

# 来源

[官方题解](http://codeforces.com/blog/entry/52410)
