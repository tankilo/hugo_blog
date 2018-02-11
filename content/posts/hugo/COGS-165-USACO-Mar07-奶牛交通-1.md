---
title: '[COGS 165] [USACO Mar07] 奶牛交通'
tags:
  - OI
  - COGS
  - DP
  - 图论
categories:
  - OI
date: '2017-06-21T18:09:20+08:00'
---

# 题目描述

> 题目地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=165)

这题真是蛇，调一晚上。。码力太弱了qwq

# 思路

本来以为这跟HAOI2016的食物链一样，但是在WA了一次后注意到食物链计算的是经过某点的路径条数，而本题是经过某边的路径条数。

## DP 方程

为了求出经过某一条边的的路径条数，可以这样：

设$f(u,v)$是经过边$u,v$的路径条数，$dp(u)$为从源点到$u$的路径条数，$rdp(v)$为从$v$到终点的路径条数，则有
$f(u,v)=dp(u)\times rdp(v)$
最后的答案就是$\max\{f(u,v)\} u,v\in G$
<!--more-->
为了实现这个操作，我们先正常建图，求出$rdp(u)$，再反向建图，求出$dp(v)$，最后对于每一条边都合并一下答案即可。

# 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 5100;
struct edge
{
    int f, t, d;
    edge(int ff, int tt, int dd)
    {
        f = ff, t = tt, d = dd;
    }
};
vector<edge> edges;
vector<int> g[maxn];
vector<int> rg[maxn];
int od[maxn], ind[maxn];
void addedge(int f, int t)
{
    edges.push_back(edge(f, t, 1));
    g[f].push_back(edges.size() - 1);
    ++od[f];
    ++ind[t];
    edges.push_back(edge(t, f, 1));
    rg[t].push_back(edges.size() - 1);
}
int n, m;
int dp[maxn], rdp[maxn];
int mem[maxn];
void dfs1(int f, int cur)
{
    if (mem[cur])
        return;
    mem[cur] = 1;
    if (cur == n)
    {
        rdp[cur] = 1;
        return;
    }
    for (int i = 0; i < g[cur].size(); ++i)
    {
        int t = edges[g[cur][i]].t;
        if (t == f)
            continue;
        dfs1(cur, t);
        rdp[cur] += rdp[t];
    }
}
void dfs2(int f, int cur)
{
    if (mem[cur])
        return;
    mem[cur] = 1;
    if (ind[cur] == 0)
    {
        dp[cur] = 1;
        return;
    }
    for (int i = 0; i < rg[cur].size(); ++i)
    {
        int t = edges[rg[cur][i]].t;
        if (t == f)
            continue;
        dfs2(cur, t);
        dp[cur] += dp[t];
    }
}

int main()
{
    freopen("cowtraffic.in", "r", stdin);
    freopen("cowtraffic.out", "w", stdout);
    cin >> n >> m;
    for (int i = 1; i <= m; ++i)
    {
        int f, t;
        cin >> f >> t;
        addedge(f, t);
    }
    for (int i = 1; i <= n; ++i)
        if (ind[i] == 0)
            dfs1(0, i);
    memset(mem, 0, sizeof(mem));
    dfs2(0, n);
    int ans = 0;
    for (int i = 1; i <= n; ++i)
    {
        for (int j = 0; j < g[i].size(); ++j)
        {
            edge d = edges[g[i][j]];
            ans = max(ans, dp[d.f] * rdp[d.t]);
        }
    }
    cout << ans << endl;
}
```

这题写的真是恶心，先是dp和rdp写反，然后还忘记记忆化。。。不管怎么说，这是一道大好题啊qwq
