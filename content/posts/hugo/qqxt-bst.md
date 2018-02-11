---
title: '[QQXT] 二叉查找树'
tags:
  - OI
  - 线段树
  - 数据结构
categories:
  - OI
date: '2017-10-09T17:51:06+08:00'
---

# 题意

> 原题地址：[COGS](http://cogs.pro:8080/cogs/problem/problem.php?pid=2840)

原题题意非常明确，不再重复

<!--more-->

# 题解

## 思路

50分白送，对着伪代码敲就好啦

然后考虑一下为啥只能得50分

↑`BST`会退化成一条链↑

注意到插入一个数时，要么把它插入到它的前驱的后面，要么是它的后继的后面。哪个更深插那个

那么`deep[no] = max(deep[pre], deep[suc]) + 1`

然后考虑怎么快速求前驱和后继，可行的方案有很多：

- `pb_ds`
- 如果不会使`pb_ds`就手写平衡树，代码量 *= 2
- 用权值线段树维护

那。。怎么维护呢？

先用权值线段树查询一下要插入的数前面有多少个数，不妨设有`cnt`个

然后把它插入进权值线段树里

然后`pre = kth_min(cnt - 1), pre = kth_min(cnt + 1);`，其中`kth_min`表示整个区间的第`k`小

这个怎么操作呢？跟平衡树/主席树的思路类似，瞎搞一下

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 3e5 + 10;
typedef long long ll;
char buf[(int)1e8 + 12], *fs = buf;
inline int gn() 
{ 
   static int k, f;
   k = 0, f = 1;
   for (; !isdigit(*fs); fs++) if (*fs == '-') f = -1;
   for (; isdigit(*fs); fs++) k = k * 10 + *fs - '0';
   return k * f;
}
struct node
{
    int sum;
    node *lc, *rc;
    node() { lc = rc = 0, sum = 0; }
    void mt(int l, int r)
    {
        if (l >= r) return;
        sum = lc -> sum + rc -> sum;
    }
};
#define m ((l + r) >> 1)
node *build(int l, int r)
{
    node *x = new node();
    if (l == r)
        return x;
    x -> lc = build(l, m);
    x -> rc = build(m + 1, r);
    return x;
}
void insert(node *nd, int l, int r, int p, int v)
{
    if (l == r && p == l)
    {
        nd -> sum = v;
        return;
    }
    if (p <= m) insert(nd -> lc, l, m, p, v);
    if (m < p) insert(nd -> rc, m + 1, r, p, v);
    nd -> mt(l, r);
}
int kth(node *nd, int l, int r, int k)
{
    if (l == r) return l;
    if (nd -> lc -> sum > k)
        return kth(nd -> lc, l, m, k);
    else
        return kth(nd -> rc, m + 1, r, k - nd -> lc -> sum);
}
int query(node *nd, int l, int r, int ql, int qr)
{
    if (ql <= l && r <= qr)
        return nd -> sum;
    int ans = 0;
    if (ql <= m) ans += query(nd -> lc, l, m, ql, qr);
    if (m < qr) ans += query(nd -> rc, m + 1, r, ql, qr);
    return ans;
}
int n, dep[maxn];
int max_dep(int pre, int suc)
{
    if (pre == -1 && suc == -1)
        return -1;
    if (pre == -1)
        return dep[suc];
    if (suc == -1)
        return dep[pre];
    return max(dep[suc], dep[pre]);
}
node *root;
int main()
{
    fread(buf, 1, 1e8, stdin);
    n = gn();
    root = build(1, n);
    ll ans = 0;
    for (int i = 0, t; i < n; ++i)
    {
        t = gn();
        int cnt = query(root, 1, n, 1, t), pre = -1, suc = -1;
        insert(root, 1, n, t, 1);
        if (cnt != 0)
            pre = kth(root, 1, n, cnt - 1);
        if (cnt != i)
            suc = kth(root, 1, n, cnt + 1);
        dep[t] = max_dep(pre, suc) + 1;
        ans += dep[t];
        printf("%lld\n", ans);
    }
}
```
