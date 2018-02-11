---
title: 蛤实验胡策20171013题解
tags:
  - OI
  - DP
  - 图论
  - 贪心
  - 数学
  - 计算几何
  - 并查集
categories:
  - OI
date: '2017-10-15T16:33:44+08:00'
---

> 吾辈是蒟蒻，标程嘛，还没有

出题人mk。

<!--more-->

# OBC

## 题意

二维平面上有若干点，现在可以用$k$条长度为$l$的同方向的，与$x,y$轴平行的线段去覆盖这些点，求最大覆盖数

## 题解

### 10分

$k=0$的情况，直接输出0

### 50分

二维前缀和预处理，然后$O(n^2)$枚举一下所有起点

### 100分

#### $k=1$

将所有点以$x$为第一关键字，$y$为第二关键字sort一下，然后将sort后的序列分成若干段，使得每一段内的点的$x$值相等，然后用一个~~单调~~队列把每一段都扫一遍，具体就是先push一个点到队尾，再比对一下队头与队尾的$y$值之差是否大于$l$ ，如果是，那就pop，否则什么都不干。

在这个过程中，不断更新最大值。

操作完之后swap一下$x,y$，再操作一遍

#### $k=2$

考虑$k=2$有两种情况，一种是两条线段在同一“段”内选，另一种是两条线段在不同“段”内选，我们先考虑后一种情况。

这种很简单，只需要在扫的同时维护最大值和次大值即可

考虑两条线段在同一段内的情况，不妨设这一段是$[l,r]$

我们用$f(i)$表示一段内$[l,i]$的最大的答案，$g(i)$表示$[i,r]$内的最大答案

显然这两个函数都是可以用队列扫一遍预处理出来的

然后我们枚举一下分隔点，

$$
ans=\max_{i=l}^{r-1}\{f(i) + g(i+1)\}
$$

就是这样。。。原理也很显然

然后对于这两种情况取个max就是答案啦

# 自动AC机

## 题解

先化简一下题目的公式

$$
\left(\sum\_{k=i}^js[k]\right)^2+\left(\sum\_{k=1}^{i-1}s[k]+\sum\_{k=1}^js[k]\right)^2-3\left(\sum\_{k=1}^{i-1}s[k]\right)^2-\left(\sum\_{k=1}^js[k]\right)^2
$$

这是原公式

我们注意到$\sum\_{k=i}^js[k]=-\sum\_{k=1}^{i-1}s[k]+\sum\_{k=1}^js[k]$，于是进行一波变换，最后得到这样的式子

$$
\left(\sum\_{k=i}^js[k]\right)^2+\left(\sum\_{k=1}^{i-1}s[k]+\sum\_{k=1}^js[k]\right)^2-3\left(\sum\_{k=1}^{i-1}s[k]\right)^2-\left(\sum\_{k=1}^js[k]\right)^2=\\
\left(\sum\_{k=1}^js[k]\right)^2-\left(\sum\_{k=1}^{i-1}s[k]\right)^2
$$

嗯。。前缀和。。

我们令$s(i)=\sum_{k=1}^i$，那么如果我们令$f(i,j)$为区间$[i,j]$的贡献，有$f(i,j)=s(j)^2-s(i-1)^2$。

我们可以预处理出来前缀和以及前缀和的平方，以及每个数的不大于它的最大素数，然后就可以写一个暴力dp。

令$dp(i)$为前$i$道题的最大贡献，那么$dp(i)$显然可以从$[i-k+1,i-1]$更新过来，然后取一个最大值就可以了。

取最大值的操作可以优化，如果用线段树/堆，可以拿75分，如果用单调队列，可以拿100分。

然后考虑一种更骚的写法，分成若干段之后的贡献值会互相抵消，最终的贡献值是$s(n)^2$, 只需要考虑bug值的影响，这样就更加容易了。

# ZF爱打call

首先对每个点的毒瘤值离线，然后记录一下是属于哪一个询问的，然后在从小到大用并查集维护一波，统计一下贡献，然后就没了。

~~还没写只能xjb口胡~~

# std

## OBC

``` cpp
#include <bit/stdc++.h>
using namespace std;
const int maxn = 1e5 + 10;
struct point
{
    int x, y;
    point() { x = y = 0; }
    point(int x, int y) : x(x), y(y){};
    void rev() { swap(x, y); }
    bool operator<(const point &a) const
    {
        return x == a.x ? y < a.y : x < a.x;
    }
};
typedef pair<int, int> pii;
vector<point> s;
int n, k, l;
int f[maxn], g[maxn];
int dp(const vector<point> &mv)
{
    vector<point> q = mv;
    vector<pii> same;
    sort(q.begin(), q.end());
    if (q.size() == 1)
        same.push_back(pii(0, 0));
    else
    {
        int i, lst;
        for (i = 1, lst = 0; i < q.size(); ++i)
        {
            if (q[i].x != q[i - 1].x)
            {
                same.push_back(pii(lst, i - 1)); // [lst, i - 1]
                lst = i;
            }
        }
        if (lst != i)
            same.push_back(pii(lst, i - 1));
    }
    int ans1 = 0, ans2 = 0;
    if (k == 1)
    {
        for (int i = 0; i < same.size(); ++i)
        {
            deque<point> que;
            int rl = same[i].first, rr = same[i].second;
            for (int j = rl; j <= rr; ++j)
            {
                que.push_back(q[j]);
                if (!que.empty() && q[j].y - que.begin()->y > l)
                    que.pop_front();
                ans1 = max(ans1, (int)que.size());
            }
        }
    }
    if (k == 2)
    {
        int mx = 0, se = 0;
        for (int i = 0; i < same.size(); ++i)
        {
            deque<point> que;
            int rl = same[i].first, rr = same[i].second, an = 0;
            for (int j = rl; j <= rr; ++j)
            {
                que.push_back(q[j]);
                if (!que.empty() && q[j].y - que.begin()->y > l)
                    que.pop_front();
                an = max(an, (int)que.size());
            }
            if (an > mx)
                se = mx, mx = an;
            else if (an > se)
                se = an;
        }
        ans1 = mx + se;
        memset(f, 0, sizeof(f));
        memset(g, 0, sizeof(g));
        for (int i = 0; i < same.size(); ++i)
        {

            deque<point> que;
            int rl = same[i].first, rr = same[i].second;
            for (int j = rl; j <= rr; ++j)
            {
                que.push_back(q[j]);
                if (!que.empty() && q[j].y - que.begin()->y > l)
                    que.pop_front();
                f[j] = max(max(f[j], f[j - 1]), (int)que.size());
            }
            que.clear();
            for (int j = rr; j >= rl; --j)
            {
                que.push_back(q[j]);
                if (!que.empty() && que.begin()->y - q[j].y > l)
                    que.pop_front();
                g[j] = max(max(g[j], g[j + 1]), (int)que.size());
            }
            for (int j = rl; j < rr; ++j)
                ans2 = max(ans2, f[i] + g[i + 1]);
        }
    }
    return max(ans1, ans2);
}
int main()
{
    cin >> n >> k >> l;
    if (k == 0)
        return 0 * puts("0");
    for (int i = 1; i <= n; ++i)
    {
        int x, y;
        cin >> x >> y;
        s.push_back(point(x, y));
    }
    int xod, yod;
    xod = dp(s);
    for (int i = 0; i < s.size(); ++i)
        s[i].rev();
    yod = dp(s);
    cout << max(xod, yod) << endl;
}
```
