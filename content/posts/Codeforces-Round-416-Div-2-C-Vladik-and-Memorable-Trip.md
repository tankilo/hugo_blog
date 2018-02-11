---
title: 'Codeforces Round #416 (Div. 2) C. Vladik and Memorable Trip'
tags:
  - OI
  - DP
  - Codeforces
categories:
  - OI
date: 2017-06-03 16:39:59
---

## 题目描述

> 问题：[题目地址](http://codeforces.com/contest/811/problem/C) 
>
> Vladik often travels by trains. He remembered some of his trips especially well and I would like to tell you about one of these trips:
>
> Vladik is at initial train station, and now *n* people (including Vladik) want to get on the train. They are already lined up in some order, and for each of them the city code $a_i$ is known (the code of the city in which they are going to).
> <!--more-->
> Train chief selects some number of disjoint segments of the original sequence of people (covering entire sequence by segments is not necessary). People who are in the same segment will be in the same train carriage. The segments are selected in such way that if at least one person travels to the city *x*, then all people who are going to city *x* should be in the same railway carriage. This means that they can’t belong to different segments. Note, that all people who travel to the city *x*, either go to it and in the same railway carriage, or do not go anywhere at all.
>
> Comfort of a train trip with people on segment from position *l* to position *r* is equal to XOR of all distinct codes of cities for people on the segment from position *l* to position *r*. XOR operation also known as exclusive OR.
>
> Total comfort of a train trip is equal to sum of comfort for each segment.
>
> Help Vladik to know maximal possible total comfort.
>
>
>
> ### Input
>
> First line contains single integer *n* (1 ≤ *n* ≤ 5000) — number of people.
>
> Second line contains *n* space-separated integers $a_1, a_2, ..., a_n (0 ≤ a_i ≤ 5000)$, where $a_i$ denotes code of the city to which *i*-th person is going.
>
> ### Output
>
> The output should contain a single integer — maximal possible total comfort.
>
> ### Examples
>
> #### Input
>
> ```
> 6
> 4 4 2 5 2 3
> ```
>
> #### Output
>
> ```
> 14
> ```
>
> #### Input
>
> ```
> 9
> 5 1 3 1 5 2 4 2 5
> ```
>
> #### Output
>
> ```
> 9
> ```
>
> ### Note
>
> In the first test case best partition into segments is: [4, 4]\[2, 5, 2] [3], answer is calculated as follows: 4 + (2 *xor* 5) + 3 = 4 + 7 + 3 = 14
>
> In the second test case best partition into segments is: 5 1 [3] 1 5 [2, 4, 2] 5, answer calculated as follows: 3 + (2 *xor* 4) = 3 + 6 = 9.

一句话题意：

有一个序列 把它划分成若干个不相交区间 每个区间的贡献是这个区间中不同的数的异或值 如果这个区间中的某个数在序列中有相同的数不在这个区间中 那么这个区间不合法 求将这个序列用不相交的合法区间填充（可以不填满）的最大贡献。

## 思路

先预处理出来所有区间是否合法，及其贡献，然后再DP一波。

### DP方程

设$f(i)$是序列中前$i$个数的最大贡献，$cnt(i,j)$为区间$[i,j]$的贡献值，则有：
$$
\begin{array}\\
f(i)=\max\{f(i-1),f(j-1)+cnt(j,i)\}&  [j,i]合法
\end{array}
$$

### 解释

考虑前$i$个数，当第$i$个数不加到区间里时，$f(i)=f(i-1)$，如果把第$i$个数加入区间$[j,i]$ ，那么$f(i)=f(j-1)+cnt(j,i)$

## 实现

预处理所有区间的贡献和后面的DP过程都不难，重点在于如何实现**区间是否合法**。

我们可以预处理出每种颜色的首次出现位置和最后一次出现的位置，设其为$st(i)$和$ed(i)$，则区间$[i,j]$合法，当且仅当$[st(i),ed(j)]\subseteq[i,j]$，这样就可以完成这个操作了。

### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 5001;
const int INF = 1 << 30;
int cnt[maxn][maxn], st[maxn], ed[maxn], f[maxn];
int data[maxn];
bool valid[maxn][maxn], vis[maxn];
int n;
int main()
{
    cin >> n;
    for (int i = 0; i < maxn; ++i)
        st[i] = INF, ed[i] = -INF;
    for (int i = 1; i <= n; ++i)
    {
        cin >> data[i];
        st[data[i]] = min(st[data[i]], i);
        ed[data[i]] = max(ed[data[i]], i);
    }
    for (int i = 1; i <= n; ++i)
    {
        int xsum = 0;
        memset(vis, 0, sizeof(vis));
        for (int j = i; j <= n; ++j)
        {
            if (!vis[data[j]])
                xsum ^= data[j], vis[data[j]] = 1;
            cnt[i][j] = xsum;
        }
    }
    for (int i = 1; i <= n; ++i)
    {
        int stmin = INF, edmax = -INF;
        for (int j = i; j <= n; ++j)
        {
            stmin = min(stmin, st[data[j]]);
            edmax = max(edmax, ed[data[j]]);
            if (i <= stmin && edmax <= j)
                valid[i][j] = true;
        }
    }
    for (int i = 1; i <= n; ++i)
    {
        f[i] = max(f[i], f[i - 1]);
        for (int j = 1; j <= i; ++j)
            if (valid[j][i])
                f[i] = max(f[i], cnt[j][i] + f[j - 1]);
    }
    cout << f[n] << endl;
}
```



发现CF div.2的C题似乎也没有想象中的那么难啊，下次要加油啊。