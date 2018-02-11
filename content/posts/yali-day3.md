---
title: 雅礼划水记-Day3
tags:
  - OI
  - 雅礼集训
  - 线段树
  - 数据结构
  - 组合数学
categories:
  - OI
date: 2017-10-24 10:05:16
---

我可能写了农牧业数据结构

<!--more-->

今天暴力打挂的情况好了很多。。（虽然还是打挂了45分

上午的T1非常神，题意大概是这样的

$800\times800$的矩形最值，权值和问题，$500000$询问，**内存256M**

特殊的条件是询问的矩形的长不会超过宽的一倍

然后。。ST和线段树都开不下。。

作为蒟蒻的我也没想到那个特殊的条件怎么理解

于是。。就打了混合暴力

就是权值和大力前缀和，最值什么的暴力

在本地造了随机数据跑了一下，大概1s内出解（虽然复杂度完全不可过

于是真的拿了60分

这个题的正解也非常神

大概是这样的，如图，一个矩形可以拆成不多于两个正方形的并

![TIM截图20171024215920.png](https://i.loli.net/2017/10/24/59ef476d27d04.png)

然后我们可以维护一下正方形的最值

但是注意到如果维护每一个正方形的话空间/时间还是会愉快地爆

就利用一下倍增的思想，用$f(i,j,k)$表示以$(i,j)$为起点的，边长为$2^k$的正方形的信息

然后一个任意的正方形就可以拆成不多于4个的2的k次幂的正方形的并

于是就可以愉快的查询了

然而由于我太菜，调了很长时间

以下是代码：

``` cpp
#include<bits/stdc++.h>
using namespace std;
    template <class T>
inline T max(T a, T b, T c, T d)
{
    return max(a, max(b, max(c, d)));
}
    template <class T>
inline T min(T a, T b, T c, T d)
{
    return min(a, min(b, min(c, d)));
}
inline char getc()
{
    static char buf[1 << 18], *fs, *ft;
    return (fs == ft && (ft = (fs = buf) + fread(buf, 1, 1 << 18, stdin)), fs == ft) ? EOF : *fs++;
}
inline int gn()
{
    register int k = 0, f = 1;
    register char c = getc();
    for (; !isdigit(c); c = getc()) if (c == '-') f = -1;
    for (; isdigit(c); c = getc()) k = k * 10 + c - '0';
    return k * f;
}
typedef pair<int, int> pii;
typedef long long ll;
const int maxn = 800 + 10;
int s[maxn][maxn], d[maxn][maxn];
int mx[maxn][maxn][11], mi[maxn][maxn][11];
int n, m, q;
ll sum(int x1, int y1, int x2, int y2)
{
    return d[x2][y2] - d[x1 - 1][y2] - d[x2][y1 - 1] + d[x1 - 1][y1 - 1];
}
void pre_cal()
{
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            d[i][j] += d[i - 1][j] - d[i - 1][j - 1] + d[i][j - 1];
    for (int k = 1; k <= 10; ++k)
        for (int i = 1; i <= n - (1 << k) + 1; ++i)
            for (int j = 1; j <= m - (1 << k) + 1; ++j)
                mx[i][j][k] = max(mx[i][j][k], 
                        max(mx[i][j][k - 1], 
                            mx[i + (1 << (k - 1))][j][k - 1],
                            mx[i + (1 << (k - 1))][j + (1 << (k - 1))][k - 1],
                            mx[i][j + (1 << (k - 1))][k - 1]));
    for (int k = 1; k <= 10; ++k)
        for (int i = 1; i <= n - (1 << k) + 1; ++i)
            for (int j = 1; j <= m - (1 << k) + 1; ++j)
                mi[i][j][k] = min(mi[i][j][k], 
                        min(mi[i][j][k - 1], 
                            mi[i + (1 << (k - 1))][j][k - 1],
                            mi[i + (1 << (k - 1))][j + (1 << (k - 1))][k - 1],
                            mi[i][j + (1 << (k - 1))][k - 1]));
}
pii squ_min_max(int x1, int y1, int x2, int y2)
{
    int miv = 1e9 + 233, mxv = -1;
    int x = x2 - x1 + 1, y = y2 - y1 + 1;
    int len;
    for (len = 0; (1 << len) <= min(x, y); ++len);
    if (len) --len;
    int rev =  (1 << len);
    miv = min(miv,
            min(mi[x1][y1][len],
                mi[x2 - rev + 1][y1][len],
                mi[x2 - rev + 1][y2 - rev + 1][len],
                mi[x1][y2 - rev + 1][len]));
    mxv = max(mxv,
            max(mx[x1][y1][len],
                mx[x2 - rev + 1][y1][len],
                mx[x2 - rev + 1][y2 - rev + 1][len],
                mx[x1][y2 - rev + 1][len]));
    return pii(miv, mxv); 
}
pii min_max(int x1, int y1, int x2, int y2)
{
    int x = x2 - x1 + 1, y = y2 - y1 + 1;
    int l = min(x, y);
    if (x == y)
        return squ_min_max(x1, y1, x2, y2);
    if (x < y)
    {
        pii a1 = squ_min_max(x1, y1, x2, y1 + l - 1),
            a2 = squ_min_max(x1, y2 - l + 1, x2, y2);
        return pii(min(a1.first, a2.first), max(a1.second, a2.second));
    }
    else
    {
        pii a1 = squ_min_max(x1, y1, x1 + l - 1, y2),
            a2 = squ_min_max(x2 - l + 1, y1, x2, y2);
        return pii(min(a1.first, a2.first), max(a1.second, a2.second));
    }
}
int main()
{
    n = gn(), m = gn();
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            s[i][j] = gn(), mx[i][j][0] = mi[i][j][0] = d[i][j] = s[i][j];
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            for (int k = 1; k <= 10; ++k)
                mi[i][j][k] = 1e9 + 233;
    pre_cal();
    q = gn();
    for (int i = 1; i <= q; ++i)
    {
        char c = getc();
        for (; !isalpha(c); c = getc());
        c = getc();
        getc();
        int x1 = gn(), y1 = gn(), x2 = gn(), y2 = gn();
        ++x1, ++x2, ++y1, ++y2;
        if (c == 'U') // SUM
        {
            printf("%lld\n", sum(x1, y1, x2, y2));
        }
        else if (c == 'A') // MAX
        {
            printf("%d\n", min_max(x1, y1, x2, y2).second);
        }
        else if (c == 'I') // MIN
        {
            printf("%d\n", min_max(x1, y1, x2, y2).first);
        }
    }
}

```

然后T2貌似是个奥妙重重的树计数，然而。 。我并不会qwq

