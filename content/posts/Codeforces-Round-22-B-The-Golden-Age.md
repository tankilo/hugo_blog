---
layout: educational
title: 'Codeforces Round 22 B. The Golden Age'
date: 2017-06-06 19:46:34
tags:
- OI
- 数学
- Codeforces
categories: "OI"
---

## 题目描述

> 问题：[题目地址](http://codeforces.com/contest/813/problem/B) ，[中文版](http://218.28.19.228/cogs/problem/problem.php?pid=2700)

## 思路

注意到$a,b\leq 60$，所以预处理出所有$x^a,y^b$存起来，然后两两求和，去重， 然后处理一下得到答案。

## 坑点

1. 开unsigned long long

2. ```cpp
   while (num <= 1e18)
       num = num * x
   ```
   这样写是不符合基本法的，会溢出掉的

   <!--more-->

   ```cpp
   while (num <= 1e18 / x)
       num = num * x
   ```

   这样才是坠吼的

## 代码

在CF上WA到怀疑人生。。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long ll;
ll x, y, l, r;
vector<ll> a, b, ans;
void getpow()
{
    ll num = 1;
    a.push_back(1);b.push_back(1);
    while (num <= 1e18 / x)
    {
        num *= x;
        a.push_back(num);
    }
    num = 1;
    while (num <= 1e18 / y)
    {

        num *= y;
        b.push_back(num);
    }
}
int main()
{
    freopen("TheGoldenAge.in","r",stdin);
    freopen("TheGoldenAge.out","w",stdout);
    cin >> x >> y >> l >> r;
    getpow();
    for (int i = 0; i < a.size(); i++)
    {
        for (int j = 0; j < b.size(); j++)
        {
            ll u = a[i], v = b[j];
            if (u + v <= r && u + v >= l)
                ans.push_back(u + v);
        }
    }
    sort(ans.begin(), ans.end());
    vector<ll>::iterator ed = unique(ans.begin(), ans.end());
    ll s = ed - ans.begin();
    ans.resize(ed - ans.begin());
    if (ans.size() == r - l + 1)
    {
        cout << 0 << endl;
        return 0;
    }
    ll res = 0;
    for (int i = 1; i < ans.size(); ++i)
        res = max(res, ans[i] - ans[i - 1] - 1);
    if (ans.size() == 0)
        res = max(res, r - l + 1);
    else
        res = max(max(ans[0] - l, r - ans[ans.size() - 1]), res);
    cout << res << endl;
}
```

P.S.突然发现网页右边的恋恋点着好爽啊。。Material Design太妙啦