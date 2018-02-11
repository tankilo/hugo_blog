---
title: '[COGS 2682] 膜拜'
tags:
  - OI
  - 图论
  - 强连通分量
  - COGS
categories:
  - OI
date: 2017-09-27 09:16:36
---

# 题目描述

原题地址：[COGSCH](http://margatroid.oschina.io/cogsch/data/COGS-2682.html)

<!--more-->

# 思路

先考虑一种比较暴力的写法

注意到一个强连通分量里的所有点都是可以取到的，所以先缩一波点

然后大力枚举反向哪一条边，每次跑一遍欧拉回路，总复杂度是$O(nm)$

这个复杂度是过不了的，我们考虑一下怎么优化

这个就比较玄学

对缩完点的图建一个反图，然后分别跑一遍以1为原点的最长路

然后枚举所有边，当把它反向之后，计算一波贡献

很神奇的思路

# 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e5 + 10;
const int inf = 1e9 + 2333;
bitset<maxn> instk;
int stk[maxn], top, dfn[maxn], low[maxn];
int cnt, belong[maxn], w[maxn], sw[maxn];
vector<int> g[maxn], sg[maxn], rg[maxn];
int n, m, clk;
void addedge(vector<int> * gg, int f, int t) { gg[f].push_back(t); }
void dfs(int no)
{
    instk[no] = 1;
    stk[++top] = no;
    dfn[no] = low[no] = ++clk;
    for (int i = 0; i < g[no].size(); ++i)
        if (!dfn[g[no][i]])
            dfs(g[no][i]), low[no] = min(low[no], low[g[no][i]]);
        else if (instk[g[no][i]])
            low[no] = min(low[no], low[g[no][i]]);
    if (low[no] == dfn[no])
        for (++cnt; stk[top + 1] != no; instk[stk[top]] = 0, belong[stk[top]] = cnt, --top)
            sw[cnt] += w[stk[top]];
}
bitset<maxn> inq;
void spfa(vector<int> *mg, int dis[])
{
    inq.reset();
    queue<int> q;
    for (int i = 1; i <= cnt; ++i) dis[i] = -inf;
    // =========================================
    int st = belong[1];
    inq[st] = 1, q.push(st);
    dis[st] = sw[st];
    while(!q.empty())
    {
        int k = q.front();
        inq[k] = 0, q.pop();
        for (int i = 0; i < mg[k].size(); ++i)
        {
            if (dis[mg[k][i]] < sw[mg[k][i]] + dis[k])
            {
                dis[mg[k][i]] = sw[mg[k][i]] + dis[k];
                if (!inq[mg[k][i]])
                    q.push(mg[k][i]), inq[mg[k][i]] = 1;
            }
        }
    }
}
int dis[maxn], rdis[maxn];
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) w[i] = 1;
    for (int i = 1; i <= m; ++i)
    {
        int f, t;
        cin >> f >> t;
        addedge(g, f, t);
    }
    for (int i = 1; i <= n; ++i)
        if (!dfn[i])
            dfs(i);
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j < g[i].size(); ++j)
            if (belong[i] != belong[g[i][j]])
                addedge(sg, belong[i], belong[g[i][j]]), addedge(rg, belong[g[i][j]], belong[i]);
    spfa(sg, dis), spfa(rg, rdis);

    int ans = sw[belong[1]];
    for (int i = 1; i <= cnt; ++i)
        for (int j = 0; j < sg[i].size(); ++j)
            ans = max(ans, dis[sg[i][j]] + rdis[i]);
    if (ans != sw[belong[1]])
        cout << ans - sw[belong[1]] << endl;
    else
        cout << ans << endl;
}
```

