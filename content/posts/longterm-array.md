---
title: '[Luogu 3919] [毒瘤] 可持久化数组'
tags:
  - OI
  - 数据结构
  - 洛谷
categories:
  - OI
date: 2017-08-17 23:17:33
---

# 题目描述

> 原题地址：[Luogu](https://www.luogu.org/problem/show?pid=3919#sub)

一句话题意：维护一个~~毒瘤~~可持久化的数组，有单点查询，单点修改的操作

<!--more-->

# 思路

## ~~二分~~

可以考虑在数组上每个点的位置开一个vector，存放一个pair，类似$(time,val)$的操作，然后查询是对vector进行二分，找到小于等于待查询版本的最大版本

划掉的原因是此题的奇妙特性，由于下一个版本不一定继承于上一个版本，换句话说，继承于哪个版本是输入数据钦定的。这样一来，继承关系是非线性的，不具有单调性，二分不可做。

感谢[@Flere825](http://my.csdn.net/Flere825) dalao的讲解

## 可持久化线段树

~~转化与化归的思想~~（误入数学）

注意到写可持久化线段树是我们会的。可以把线段树的最下面一层当成数组，其它的节点浪费掉（反正也没有多少），然后进行操作的时候就用可持久化线段树的思想往上“挂”链。

### 代码

代码如下

``` cpp
//
// Created by Margatroid on 2017/8/15.
//
//↑这是Clion自动给我加的qwq↑
#include <bits/stdc++.h>
using namespace std;
#ifdef ONLINE_JUDGE
//fast read start
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
#else
inline int gn()
{
    int k;
    cin >> k;
    return k;
}
inline char getc()
{
    return getchar();
}
#endif
struct node
{
    node *lc, *rc;
    int maxv;
    node()
    {
        maxv = 0;
        lc = rc = 0;
    }
};

node *modify(node *o, int l, int r, int p, int v)
{
    if (!o)
        return 0;
    node *d = new node();
    *d = *o;
    if (l == r)
        d->maxv = v;
    else
    {
        int m = (l + r) >> 1;
        if (p <= m)
            d->lc = modify(o->lc, l, m, p, v);
        else
            d->rc = modify(o->rc, m + 1, r, p, v);
    }
    return d;
}
int query(node *o, int l, int r, int ql, int qr)
{
    if (o == 0)
        return 0;
    if (ql <= l && r <= qr)
        return o->maxv;
    int m = (l + r) >> 1, ans = 0;
    if (ql <= m)
        ans = query(o->lc, l, m, ql, qr);
    if (m < qr)
        ans = query(o->rc, m + 1, r, ql, qr);
    return ans;
}
int data[1000001];
node *roots[1000001];
node *build(int l, int r)
{
    node *d = new node();
    if (l == r)
        d->maxv = data[l];
    else
    {
        int m = (l + r) >> 1;
        d->lc = build(l, m);
        d->rc = build(m + 1, r);
    }
    return d;
}
int n, q;
int main()
{
    n = gn(), q = gn();
    for (int i = 1; i <= n; ++i)
        data[i] = gn();
    roots[0] = build(1, n);
    int cver = 0;
    for (int i = 1; i <= q; ++i)
    {
        int ver = gn(), op = gn(), x = gn();
        ++cver;
        if (op & 1)
        {
            roots[cver] = modify(roots[ver], 1, n, x, gn());
            continue;
        }
        else
            puts(to_string(query(roots[ver], 1, n, x, x)).c_str());
        roots[cver] = roots[ver];
    }
    return 0;
}
```

这就是此题的精妙之处，上面的代码，是**不能AC**的！会有一个点MLE，然而数组版的线段树却可以AC。

原因在于这个题的内存卡的十分紧（毒瘤），指针在64位的操作系统下的长度是64位，也就是long long的长度，而数组版线段树用的是int，32位长度，占用空间相对较少。

所以就这样奇妙地MLE了

![捕获.PNG](https://i.loli.net/2017/08/18/59966158d38d3.png)

嗯，就是这样，很惨的。

**UPDATE**

管理员在今天（8/18）12时的时候修改了最后一个点的空间限制，指针线段树可以通过了


## 离线

注意到出题人的数据虽然毒瘤，但是并没有做强制在线的操作，可以来进行离线。

先建出一颗树，表示出版本间的继承关系，如图所示（数据是我随手打的）。

由于后面的节点继承于前面的节点所以，所有可以影响到一个查询操作的事件 全部在 这个查询操作之前 被处理。

然后对这颗树进行dfs，在dfs的过程中处理一下各种操作，即可。

![version_tree.png](https://i.loli.net/2017/08/18/59965da8d5a8c.png)

### 代码

``` cpp
//
// Created by Margatroid on 2017/8/18.
//

#include<bits/stdc++.h>
using namespace std;
#ifdef ONLINE_JUDGE
//fast read start
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
#else
inline int gn()
{
    int k;
    cin >> k;
    return k;
}
inline char getc()
{
    return getchar();
}
#endif
struct query { int ver, op, pos, val; };
const int maxn = 1e6 + 10;
vector<int> g[maxn];
query q[maxn];
void addedge(int f, int t) { g[f].push_back(t); }
int ans[maxn], a[maxn];
bitset<maxn> out;
void dfs(int k)
{
    int last, &cur_val = a[q[k].pos];
    if (q[k].op & 1)
        last = cur_val, cur_val = q[k].val;
    else
        ans[k] = cur_val;
    for (int i = 0; i < g[k].size(); ++i)
        dfs(g[k][i]);
    if (q[k].op & 1)
        cur_val = last;
}
int main()
{
    int n = gn(), m = gn();
    for (int i = 1; i <= n; ++i)
        a[i] = gn();
    for (int i = 1; i <= m; ++i)
    {
        q[i].ver = gn(), q[i].op = gn(), q[i].pos = gn();
        if (q[i].op & 1)
            q[i].val = gn();
        else
            out[i] = 1;
        addedge(q[i].ver, i);
    }
    dfs(0);
    for (int i = 1; i <= m; ++i) if (out[i]) printf("%d\n", ans[i]);
}

```

再次感谢[@Flere825](http://my.csdn.net/Flere825) dalao的讲解。