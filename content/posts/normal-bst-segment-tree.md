---
title: 普通线段树
tags:
  - 线段树
  - OI
  - 洛谷
  - BZOJ
  - 平衡树
categories:
  - OI
date: 2017-10-13 20:52:44
---

# 题意

很经典的平衡树题，哪里都有，大意是查前驱后继排名，插入删除，k小

<!--more-->

# 题解

怎么。。权值线段树一脸可搞的样子。。

那就娱乐一下吧。。

先离散化一下所有值（**除了k小**）

这题离散化比较坑。。我脑补了一种常数极大的方法。

## 离散化

离散化其实就是为了维护离散化前的值与离散化后的值的关系，我们开两个map维护，一个正向一个反向。

当然也可以hash，也就是`unordered_map` 。

然后大力建权值线段树，插入就+1，删除就-1，前驱后继啥的都是平衡树的一套理论，瞎yy一下也是很好写的。

然后有一些坑点，比如说一个数可以出现多次。

这样我们查rank的时候就不能直接求前缀和了，得先求前缀和，再减去要查的数的出现次数，再加上1

别的就没啥了，很迷的是我的代码在不同的平台上跑出了不同的结果：

|                  OJ/环境                   |     结果     |
| :--------------------------------------: | :--------: |
| Clion on Windows 10 x64 with MinGW 5.1 C++11 |     AC     |
|      g++ 6.1.0 on Deepin x64 C++11       |     AC     |
|  OALJ on bash on Windows with g++ 6.1.0  | TLE MLE RE |
|    OALJ on Deepin x64 with g++ 6.1.0     |  TLE MLE   |
|                   COGS                   |     RE     |
|               Luogu C++11                |     AC     |
|                Luogu C++                 |     AC     |
|                 BZOJ C++                 |     RE     |

大概就是这样。。。很迷。。我也不知道怎么回事。。

``` cpp
//
// Created by Margatroid on 2017/10/13.
//

#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e5 + 10;
struct query
{
    int opt, num;
    query() { opt = num = 0; }
    query(int opt, int num) : opt(opt), num(num) { };
};
struct discretize
{
    int id, num;
    bool operator<(const discretize &a) const { return num < a.num; }
    bool operator==(const discretize &a) const { return num == a.num; }
};
#define m ((l + r) >> 1)
struct node
{
    int val;
    node *lc, *rc;
    node() { lc = rc = 0, val = 0; }
    void mt(int l, int r)
    {
        if (l >= r) return;
        val = lc->val + rc->val;
    }
};
node *build(int l, int r)
{
    node *x = new node();
    if (l == r) return x;
    x->lc = build(l, m);
    x->rc = build(m + 1, r);
    return x;
}
query q[maxn];
discretize data[maxn];
void insert(node *no, int l, int r, int p, int val)
{
    if (l == r && r == p) return no->val += val, void();
    if (p <= m) insert(no->lc, l, m, p, val);
    if (m < p) insert(no->rc, m + 1, r, p, val);
    no->mt(l, r);
}
int query_sum(node *no, int l, int r, int ql, int qr)
{
    if (ql <= l && r <= qr) return no->val;
    int ans = 0;
    if (ql <= m) ans += query_sum(no->lc, l, m, ql, qr);
    if (m < qr) ans += query_sum(no->rc, m + 1, r, ql, qr);
    return ans;
}
int kth_min(node *no, int l, int r, int k)
{
    if (l == r) return l;
    if (no->lc->val >= k)
        return kth_min(no->lc, l, m, k);
    else
        return kth_min(no->rc, m + 1, r, k - no->lc->val);
}
node *root;
int n, max_num;
int rnk(int num) { return query_sum(root, 1, max_num, 1, num) - query_sum(root, 1, max_num, num, num) + 1; }
int pre(int num) { return kth_min(root, 1, max_num, rnk(num) - 1); }
int suc(int num)
{
    int sum = query_sum(root, 1, max_num, 1, num);
    return kth_min(root, 1, max_num, sum + 1);
}
map<int, int> num2od, od2num;
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    cin >> n;
    for (int i = 1; i <= n; ++i)
        cin >> q[i].opt >> data[i].num, data[i].id = i, q[i].num = data[i].num;
    sort(data + 1, data + 1 + n);
    discretize *endd = unique(data + 1, data + 1 + n);
    int ed = endd - data;
    for (int i = 1; i < ed; ++i)
        num2od[data[i].num] = i, od2num[i] = data[i].num, max_num = max(max_num, data[i].num);
    root = build(1, max_num);
    for (int i = 1; i <= n; ++i)
    {
        if (q[i].opt == 1)
            insert(root, 1, max_num, num2od[q[i].num], 1);
        if (q[i].opt == 2)
            insert(root, 1, max_num, num2od[q[i].num], -1);
        if (q[i].opt == 3)
            cout << rnk(num2od[q[i].num]) << endl;
        if (q[i].opt == 4)
            cout << od2num[kth_min(root, 1, max_num, q[i].num)] << endl;
        if (q[i].opt == 5)
            cout << od2num[pre(num2od[q[i].num])] << endl;
        if (q[i].opt == 6)
            cout << od2num[suc(num2od[q[i].num])] << endl;
    }
    return 0;
}
```

