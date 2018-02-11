---
title: DP水题集合
tags:
  - OI
  - DP
  - COGS
categories:
  - OI
date: '2017-06-17T05:37:47+08:00'
---


# [COGS 131]\[USACO Mar08] 奶牛渡河

> 题目地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=131)

## DP方程

令$dp(i)$为前$i$头牛渡河的最短时间，$m(i)$为一次带$i$头牛过河所花费的时间，则有方程：
$$
dp(i)=\min_{2\leq 2j\leq i}\{dp(j)+dp(i-j)+m(0),m(i)\}
$$

### 对方程的解释

$2\leq 2j\leq i$等价于$1\leq j\leq i-j$ ，即枚举与前面的牛分成一组过河所需时间，然后取最小值
<!--more-->
## 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
int n;
const int maxn = 3000;
const int INF = 1 << 30;
int dp[maxn], m[maxn];
int main()
{
    freopen("cowriver.in", "r", stdin);
    freopen("cowriver.out", "w", stdout);
    cin >> n >> m[0];
    for (int i = 1; i <= n; ++i)
        cin >> m[i], m[i] += m[i - 1];
    for (int i = 1; i <= n; ++i)
        dp[i] = INF;
    for (int i = 1; i <= n; ++i)
    {
        dp[i] = m[i];
        for (int j = 1; (j << 1) <= i; ++j)
            dp[i] = min(dp[j] + dp[i - j] + m[0], dp[i]);
    }
    cout << dp[n] << endl;
}
```

---

# [COGS 146]\[USACO Jan08] 贝茜的晨练计划

> 题目地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=146)

## DP方程

### 状态设计

注意到疲劳度和时间均对答案（距离）有影响，定义$f(i,j)$为前$i$分钟内疲劳度为$j$时所能行进的最远距离

### 方程

$$
\begin{cases}
f(i,0)=\max\{ f(i-j,j)\}&i-j \geq0&(1)\\\\
f(i,j)=\max\{f(i-1,j-1)+d(i)\}&&(2)
\end{cases}
1\leq j\leq m
$$

### 解释

对于$(1)$式，就是从以前一直休息，休息到当前。对于$(2)$式，可以认为是从上一状态跑来的

## 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
int n, m;
const int maxn = 10010;
const int maxm = 510;
int f[maxn][maxm], d[maxn];
int main()
{
    freopen("cowrun.in", "r", stdin);
    freopen("cowrun.out", "w", stdout);
    cin >> n >> m;
    for (int i = 1; i <= n; ++i)
        cin >> d[i];
    for (int i = 1; i <= n; ++i)
    {
        f[i][0] = f[i - 1][0];
        for (int j = 1; j <= m; ++j)
        {
            if (i - j >= 0)
                f[i][0] = max(f[i][0], f[i - j][j]);
            f[i][j] = max(f[i][j], f[i - 1][j - 1] + d[i]);
        }
    }
    cout << f[n][0] << endl;
}
```
---

# [COGS156]\[USACO Nov07] 挤奶时间

> 题目地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=156)

## DP方程

### 状态设计

令$f(i)$表示在第$i$个时间段内所能挤奶的最大值，用$range(i)$表示第$i$个区间。

### DP方程

首先对所有区间排序，然后进行一波DP：
$$
\begin{array}\\
f(i)=\max\{range(i).value+f(j)\}&range(j).r+r\leq range(i).l
\end{array}
$$
这个应该很显然了吧。。

## 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
struct range
{
    int l, r, v;
    const bool operator<(const range &s) const
    {
        if (l != s.l)
            return l < s.l;
        else
            return r < s.r;
    }
};
int n, m, r;
const int maxm = 1010;
range ra[maxm];
int f[maxm];
int main()
{
    freopen("milkprod.in", "r", stdin);
    freopen("milkprod.out", "w", stdout);
    cin >> n >> m >> r;
    for (int i = 1; i <= m; ++i)
        cin >> ra[i].l >> ra[i].r >> ra[i].v;
    sort(ra + 1, ra + 1 + m);
    for (int i = 1; i <= m; ++i)
        f[i] = ra[i].v;
    for (int i = 2; i <= m; ++i)
        for (int j = 1; j <= i; ++j)
            if (ra[j].r + r <= ra[i].l)
                f[i] = max(f[i], ra[i].v + f[j]);
    cout << *max_element(f + 1, f + 1 + m) << endl;
}
```
