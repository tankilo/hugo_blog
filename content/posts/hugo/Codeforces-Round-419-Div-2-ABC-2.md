---
title: 'Codeforces Round #419 (Div. 2) ABC'
tags:
  - OI
  - 数据结构
  - Codeforces
  - 贪心
  - 模拟
  - 差分
  - 线段树
categories:
  - OI
date: '2017-06-18T05:03:55+08:00'
---

# A题

## 题目描述

> 原题地址：[Codeforces](http://codeforces.com/contest/816/problem/A)

题意：判断回文时间。

## 解决方案

先搞出来一个判断回文的函数，然后枚举分钟。
<!--more-->
## 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
string s;
bool ispar(const string &t)
{
    for (int i = 0, j = t.length() - 1; i <= j; ++i, --j)
    {
        if (t[i] != t[j])
            return 0;
    }
    return 1;
}
struct mtime
{
    int h, m;
    string tostr()
    {
        string t1, t2;
        if (h / 10 == 0)
            t1 += '0';
        t1 += to_string(h);

        if (m / 10 == 0)
            t2 += '0';
        t2 += to_string(m);

        return t1 + ':' + t2;
    }
};

int main()
{
    cin >> s;
    mtime tm;
    tm.h = (s[0] - '0') * 10 + s[1] - '0';
    tm.m = (s[3] - '0') * 10 + s[4] - '0';
    int ans = 0;
    for (; !ispar(tm.tostr()); ++ans)
    {
        ++tm.m;
        if (tm.m >= 60)
            tm.m -= 60, tm.h += 1;
        if (tm.h >= 24)
            tm.h -= 24;
    }
    cout << ans << endl;
}
```

# B题

## 题目描述

> 原题地址：[Codeforces](http://codeforces.com/contest/816/problem/B)

题意，给定一全零序列，对该序列执行若干区间加操作后，执行区间的询问操作，询问区间内有多少数大于常数$k$

## 思路

### 线段树法

本来以为这是个线段树裸题，结果附加信息不好维护。考虑到所有的询问都在修改之后，可以在修改操作结束后将所有lazy标记下放到叶子结点，然后递归维护节点信息

#### 代码

~~不存在的，这个是wb的解法~~
现在存在了，线段树1A真爽啊。。bug-free code
``` cpp
#include <bits/stdc++.h>
using namespace std;
#define m ((l + r) >> 1)
int n, k, q;
struct node
{
    int val;
    bool isleaf;
    node *lc, *rc;
    node() { isleaf = val =  0, lc = rc = 0; }
};
node *root;
node *build(int l, int r)
{
    node *x = new node();
    if (l == r)
    {
        x->isleaf = 1;
        return x;
    }
    x->lc = build(l, m);
    x->rc = build(m + 1, r);
    return x;
}
void update(node *t, int l, int r, int ql, int qr, int v)
{
    if (ql <= l && r <= qr)
    {
        t->val += v;
        return;
    }
    if (ql <= m)
        update(t->lc, l, m, ql, qr, v);
    if (qr > m)
        update(t->rc, m + 1, r, ql, qr, v);
}
void pushall(node *t)
{
    if (t->isleaf)
    {
        if (t->val >= k)
            t->val = 1;
        else
            t->val = 0;
        return;
    }
    t->lc->val += t->val, t->rc->val += t->val;
    t->val = 0;
    pushall(t->lc);
    pushall(t->rc);
    t->val = t->lc->val + t->rc->val;
}
int query(node *t, int l, int r, int ql, int qr)
{
    if (ql <= l && r <= qr)
        return t->val;
    int ans = 0;
    if (ql <= m)
        ans += query(t->lc, l, m, ql, qr);
    if (qr > m)
        ans += query(t->rc, m + 1, r, ql, qr);
    return ans;
}
int main()
{
    cin >> n >> k >> q;
    root = build(1, 200000);
    for (int i = 1; i <= n; ++i)
    {
        int l, r;
        cin >> l >> r;
        update(root, 1, 200000, l, r, 1);
    }
    pushall(root);
    for (int i = 1; i <= q; ++i)
    {
        int l, r;
        cin >> l >> r;
        cout << query(root, 1, 200000, l, r) << endl;
    }
}

```

### 差分序列+前缀和

首先考虑到这是一个全零的序列，用差分会非常方便，先差分一下，搞出来修改操作后的序列，$O(n)$时间

具体操作是对差分序列求前缀和，得到修改后序列

然后考虑到“区间内大于k”这个操作是满足减法性质的，即记$g(l,r)$是区间$[l,r]$大于$k$的数的个数，则有$g(l,r)=g(1,r)-g(1,l-1)$，所以再用$O(n)$的时间求出前缀和。

然后利用减法性质，输出前缀和的差即可

#### 代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 200010;
int  cf[maxn];
int n, k, q;
int main()
{
    scanf("%d%d%d", &n, &k, &q);
    for (int i = 1; i <= n; ++i)
    {
        int l, r;
        scanf("%d%d", &l, &r);
        cf[l]++, cf[r + 1]--;
    }
    for (int i = 2; i <= 200000; ++i)
        cf[i] += cf[i - 1];
    for (int i = 1; i <= 200000; ++i)
        cf[i] = cf[i - 1] + (cf[i] >= k);
    for (int i = 1; i <= q; ++i)
    {
        int l, r;
        scanf("%d%d", &l, &r);
        cout << cf[r] - cf[l - 1] << endl;
    }
}
```

# C题

## 题目描述

> 原题地址：[Codeforces](http://codeforces.com/contest/816/problem/C)

## 思路 

首先考虑到删数的顺序不会影响到**是否合法**，所以可以遍历每一行，每一列，分别求出其最小值，并进行修改，$O(n^2)$时间。

然后判断是否还有位置有数，如果是则不合法。

注意题目要求输出步数尽量小，考虑到这样一组数据

``` 
5
1 1 1 1 1
```

若先删列，需要5步，先删行则是1步，所以要先比较一下行列数，从较小的一个开始删。

## 代码

这是我仿制rk1dalao的代码

``` cpp
#include <bits/stdc++.h>
using namespace std;
int g[110][110];
const int INF = 1 << 30;
int n, m;
typedef pair<int, int> pii;
vector<pii> ans;
void row()
{
    for (int i = 1; i <= n; ++i)
    {
        int minv = INF;
        for (int j = 1; j <= m; ++j)
            minv = min(minv, g[i][j]);
        for (int j = 1; j <= m; ++j)
            g[i][j] -= minv;
        for (int j = 0; j < minv; ++j)
            ans.push_back(pii(1, i));
    }
}
void col()
{
    for (int i = 1; i <= m; ++i)
    {
        int minv = INF;
        for (int j = 1; j <= n; ++j)
            minv = min(minv, g[j][i]);
        for (int j = 1; j <= n; ++j)
            g[j][i] -= minv;
        for (int j = 0; j < minv; ++j)
            ans.push_back(pii(0, i));
    }
}
int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            cin >> g[i][j];
    if (m <= n)
        col(), row();
    else
        row(), col();
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            if (g[i][j])
            {
                cout << -1 << endl;
                return 0;
            }
    cout << ans.size() << endl;
    for (int i = 0; i < ans.size(); ++i)
    {
        cout << (ans[i].first ? "row "
                              : "col ")
             << ans[i].second << endl;
    }
}
```

这次CF又掉分了，B题被SystemJudge搞死了，所以还是要提高自己的姿势水平，提高码力啊qwq
