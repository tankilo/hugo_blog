---
title: '[COGS 2632] [HZOI 2016] 数列操作d'
tags:
  - OI
  - COGS
  - 数据结构
  - 线段树
categories:
  - OI
date: '2017-07-30T11:34:28+08:00'
---

# 题目描述

> 原题地址：[COGS](http://cogs.pro/cogs/problem/problem.php?pid=2632)

# 思路

很显然是线段树
<!--more-->

## 节点定义

对于每个节点，维护当前区间的首项，公差，区间和

## 下放标记

注意左右节点的标记不同：

用有序数对$(first,delta)$来表示首项，公差。

则左儿子的信息为$(first,delta)$，右儿子的信息为$(first+length\times delta,delta)$，若用$[l,r]$表示整个区间，$m=\frac{l+r}{2}$，则$length=m-l+1$。

接着，用标记更新答案，注意应该用父节点的标记更新，类似

``` cpp
root -> lc -> sum += ...
```

完成之后删除父节点的标记

## 查询

查询没什么好说的

标准的线段树

## 修改

这个就很恶心

由于等差数列的存在，将待查询区间划分成两个小区间时要记录当前操作区间的首项

到达可以修改的区间时，修改$delta,first$，更新$sum$

然后递归维护左右子树信息

写了半天感觉我的代码没毛病啊为什么A不了qwq

好吧是我的等差数列求和写错了。。

# 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
#define m ((l + r) >> 1)
typedef long long ll;
const int mod = 1e9 + 7;
struct node
{ 
    ll sum, fst, delt;
    node *lc, *rc;
    node() { sum = fst = delt = 0, lc = rc = 0; }
    void mt(int l, int r, ll fst, ll delt)
    {
        this -> fst += fst;
        this -> delt += delt;
        this -> sum += fst * (r - l + 1);
        this -> sum += (r - l + 1) * 1ll * (r - l) / 2 * delt; 
    }
};
node *build(int l, int r)
{ 
    node *x = new node();
    if (l == r)
        return x;
    x -> lc = build(l, m);
    x -> rc = build(m + 1, r);
    return x;
}
void pushd(node *x, int l, int r)
{ 
    if (l == r) return;
    if (x -> delt == 0 && x -> fst == 0) return;
    x -> lc -> mt(l, m, x -> fst, x -> delt);
    x -> rc -> mt(m + 1, r, x -> fst + (m - l + 1) * x -> delt, x -> delt);
    x -> delt = x -> fst = 0;
}
ll query(node *x, int l, int r, int ql, int qr)
{ 
    if (ql <= l && r <= qr)
        return x -> sum;
    pushd(x, l, r);
    ll ans = 0;
    if (ql <= m) ans += query(x -> lc, l, m, ql, qr);
    if (m < qr) ans += query(x -> rc, m + 1, r, ql, qr);
    return ans;
}
void update(node *x, int l, int r, int ql, int qr, ll val)
{ 
    if (ql <= l && r <= qr)
    { 
        x -> mt(l, r, val * (l - ql), val);
        return;
    }
    pushd(x, l, r);
    if (ql <= m) update(x -> lc, l, m, ql, qr, val);
    if (m < qr) update(x -> rc, m + 1, r, ql, qr, val);
    x -> sum = (x -> lc -> sum + x -> rc -> sum);
    return;
}
int n, q;
int main()
{ 
    freopen("segment.in", "r", stdin);
    freopen("segment.out", "w", stdout);
    ios::sync_with_stdio(0);
    cin >> n >> q;
    node *root = build(1, n);
    for (int i = 1; i <= q; ++i)
    { 
        int op, l, r, v;
        cin >> op >> l >> r;
        if (op)
        { 
            cin >> v;
            update(root, 1, n, l, r, v);
        }
        else cout << query(root, 1, n, l, r) % mod << endl;
    }
}
```

---

# 写在最后

以后不太可能会去COGS上刷题了，也许刷COGS的人早已习惯了写的稀烂的题面，屎一样的格式和水水的数据。换句话说，你做的一切都是没有意义的。反倒是某些人。。。算了，就这样。总之就是我被恶心到了。
