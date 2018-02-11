---
title: 树剖LCA与卡常技巧
tags:
  - 图论
  - 树链剖分
  - 数据结构
  - 常数优化
  - 洛谷
categories:
  - OI
date: '2017-09-28T17:18:40+08:00'
---

# 题意

luogu上的LCA模板题

可是这个题却没有模板题的自觉，作为一道模板题卡常卡的厉害

以前写倍增的时候就被恶心过一次，这次写树剖时又被恶心一次qwq

<!--more-->

# 题解

将树拆成重链和轻边，然后每次跳较深的一个点，把它跳到重链的顶端，直到两个点在同一条重链上。

代码也很好写，然而。。。

**此题卡常！**

此处骂一句毒瘤出题人

~~然后翻出自己的《CS:APP》~~

观察一下树剖的代码，里面充斥着`fa[no]`,`top[no]`,`dep[top[no]]`之类的操作。

然而，这几个数组都是`5e5`的大小，用这种操作访问的话，`cache miss`非常严重

解决方法也很简单

把他们都塞到结构体里就好辣，这样以来，它们在内存中是连续的，就好啦

效果的话。。之前是`TLE`改了之后T掉的几个点变成了`700ms`，效果还是比较显著的

~~luogu评测机慢出shit这种事情我会乱说？~~

# 代码

## AC代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 500010;
inline char getc() 
{ 
    static char buf[1 << 18], *fs, *ft;
    return (fs == ft && (ft = (fs = buf) + fread(buf, 1, 1 << 18, stdin)), fs == ft) ? EOF : *fs++;
}
inline int gn() 
{ 
    register int k = 0, f = 1;
    register char c = getc();
    for(; !isdigit(c); c = getc()) if(c == '-') f = -1;
    for(; isdigit(c); c = getc()) k = k * 10 + c - '0';
    return k * f;
}
struct node
{
    int siz, top, son, dep, fa;
    node() { siz = top = dep = fa = 0;}
};
node nd[maxn];
vector<int> g[maxn];
void addedge(int f, int t) { g[f].push_back(t), g[t].push_back(f); }
void dfs1(int f, int no)
{
    nd[no].fa = f;
    nd[no].dep = nd[f].dep + 1;
    int mx = 0;
    for (int i = 0; i < g[no].size(); ++i)
    {
        if (g[no][i] == f) continue;
        dfs1(no, g[no][i]);
        nd[no].siz += nd[g[no][i]].siz;
        if (nd[g[no][i]].siz > mx)
            mx = nd[g[no][i]].siz, nd[no].son = g[no][i];
    }
    ++nd[no].siz;
}
void dfs2(int no, int f, int to)
{
    if (no == 0) return;
    nd[no].top = to;
    dfs2(nd[no].son, no, to);
    for (int i= 0; i < g[no].size(); ++i)
    {
        if (g[no][i] == nd[no].son || g[no][i] == f) continue;
        dfs2(g[no][i], no, g[no][i]);
    }
}
int lca(int u, int v)
{
    if (nd[u].dep < nd[v].dep)
        swap(u, v);
    while(nd[u].top != nd[v].top)
    {
        if (nd[nd[u].top].dep < nd[nd[v].top].dep) swap(u, v);
        u = nd[nd[u].top].fa;
    }
    return (nd[u].dep < nd[v].dep) ? u : v;
}
int n, m, s;
int main()
{
    freopen("qwq.in", "r", stdin);
    n = gn(), m = gn(), s = gn();
    for (int i = 1; i <= n - 1; ++i)
    {
        int f = gn(), t = gn();
        addedge(f, t);
    }
    dfs1(s, s);
    dfs2(s, 1, s);
    for (int i = 1; i <= m; ++i)
    {
        int u = gn(), v = gn();
        printf("%d\n", lca(u, v));
    }
}
```

## T掉3个点的旧代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 500010;
inline char getc() 
{ 
    static char buf[1 << 18], *fs, *ft;
    return (fs == ft && (ft = (fs = buf) + fread(buf, 1, 1 << 18, stdin)), fs == ft) ? EOF : *fs++;
}
inline int gn() 
{ 
    register int k = 0, f = 1;
    register char c = getc();
    for(; !isdigit(c); c = getc()) if(c == '-') f = -1;
    for(; isdigit(c); c = getc()) k = k * 10 + c - '0';
    return k * f;
}
int siz[maxn], top[maxn], son[maxn], fa[maxn], dep[maxn];
vector<int> g[maxn];
void addedge(int f, int t) { g[f].push_back(t), g[t].push_back(f); }
void dfs1(int f, int no)
{
    fa[no] = f;
    dep[no] = dep[f] + 1;
    int mx = 0;
    for (int i = 0; i < g[no].size(); ++i)
    {
        if (g[no][i] == f) continue;
        dfs1(no, g[no][i]);
        siz[no] += siz[g[no][i]];
        if (siz[g[no][i]] > mx)
            mx = siz[g[no][i]], son[no] = g[no][i];
    }
    ++siz[no];
}
void dfs2(int no, int f, int to)
{
    if (no == 0) return;
    top[no] = to;
    dfs2(son[no], no, to);
    for (int i= 0; i < g[no].size(); ++i)
    {
        if (g[no][i] == son[no] || g[no][i] == f) continue;
        dfs2(g[no][i], no, g[no][i]);
    }
}
int lca(int u, int v)
{
    if (dep[u] < dep[v])
        swap(u, v);
    while(top[u] != top[v])
    {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        u = fa[top[u]];
    }
    return (dep[u] < dep[v]) ? u : v;
}
int n, m, s;
int main()
{
    n = gn(), m = gn(), s = gn();
    for (int i = 1; i <= n - 1; ++i)
    {
        int f = gn(), t = gn();
        addedge(f, t);
    }
    dfs1(s, s);
    dfs2(s, 1, s);
    for (int i = 1; i <= m; ++i)
    {
        int u = gn(), v = gn();
        cout << lca(u, v) << '\n';
    }
}
```
