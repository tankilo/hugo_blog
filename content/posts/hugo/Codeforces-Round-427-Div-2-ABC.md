---
title: 'Codeforces Round #427 (Div. 2)ABC'
tags:
  - Codeforces
  - OI
  - 数据结构
  - 模拟
categories:
  - OI
date: '2017-08-01T04:45:01+08:00'
---

> 比赛地址：[Codeforces](http://codeforces.com/contest/835)

# A

## 思路

模拟一下，很简单

<!--more-->

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int s, v1, v2, t1, t2;
int main()
{
    cin >> s >> v1 >> v2 >> t1 >> t2;
    ll sum1 = 2 * t1, sum2 = 2 * t2;
    sum1 += v1 * s, sum2 += v2 * s;
    if (sum1 < sum2)
        puts("First");
    if (sum1 > sum2)
        puts("Second");
    if (sum1 == sum2)
        puts("Friendship");
}
```

# B

## 题意

B题刚开始对我造成了题意杀。。读了好长时间的题，大概意思是，有一个数，它的各位之和大于等于$k$，现在把这个数改成了$n$，求至少改几位可以使它的各位之和大于等于$k$

## 思路

大模拟，显然，改$0$比改$8$更优，所以先排个序。按从小到大的顺序来

## 代码

代码写的很鬼畜qwq

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int k;
ll sum, ans;
ll f[12];
int main()
{
    scanf("%d", &k);
    char c;
    getchar();
    while (1)
    {
        c = getchar();
        if (!isdigit(c))
            break;
        sum += c - '0';
        f[c - '0']++;
    }
    ll delt = k - sum;
    while (delt > 0)
    {
        for (int j = 0, i = f[0]; j < 10;)
        {
            if (delt <= 0)
                break;
            if (i == 0)
            {
                ++j, i = f[j];
                continue;
            }
            delt -= (9 - j);
            ++ans;
            --i;
        }
    }
    cout << ans << endl;
}
```

# C

## 题意

二维坐标系里有$n$个点，每个点有一个叫亮度的属性，记为$s$，时间$t$时的亮度比时间$t-1$时要多$1$。同时钦定一个最大亮度$c$，如果某个点的亮度**严格大于**$c$，那么它的亮度变为$0$。现在有$q$个询问，询问第$t$个时刻，一个矩形内的亮度和。

## 思路

考虑数据范围。

$1\leq n,t,q\leq10^5$，看上去可以满足$O(n\log n)$的做法。

$0\leq s\leq c\leq10$，注意到$s$的范围很小，几乎是一个常数。

可以对所有初始亮度相同的点放在二维前缀和中，令$sum(i,x,y)$表示在$(x,y)$与坐标轴围成的矩形中，初始亮度为$i$的点有多少个（二维前缀和的定义加一个版本信息），然后对于每一个亮度，我们都预处理一下。

计算答案时，若根据二维前缀和知道初始亮度为$i$的点有$k$个，则，他们对答案的贡献是$k\times (it\mod (c+1))$。

注意此题的坑点，题目中的坐标系只有$10^4$个整点，却有$10^5$颗星星，势必会出现重合的情况，WA了一次。

## 代码

```
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e5 + 10;
const int maxx = 100 + 10;
int sum[13][maxx][maxx];
int n, q, c;
int sumv(int v, int x1, int y1, int x2, int y2)
{
    return sum[v][x2][y2] - sum[v][x1 - 1][y2] - sum[v][x2][y1 - 1] + sum[v][x1 - 1][y1 - 1];
}
int main()
{
    cin >> n >> q >> c;
    for (int i = 1; i <= n; ++i)
    {
        int x, y, s;
        cin >> x >> y >> s;
        sum[s][x][y]++;
    }
    for (int l = 0; l <= c; ++l)
        for (int i = 1; i <= 107; ++i)
            for (int j = 1; j <= 107; ++j)
                sum[l][i][j] += sum[l][i - 1][j] + sum[l][i][j - 1] - sum[l][i - 1][j - 1];
    for (int i = 1; i <= q; ++i)
    {
        int t, x1, y1, x2, y2, ans = 0;
        cin >> t >> x1 >> y1 >> x2 >> y2;
        for (int j = 0; j <= c; ++j)
        {
            int s = (t + j) % (c + 1);
            ans += sumv(j, x1, y1, x2, y2) * s;
        }
        cout << ans << endl;
    }
}
```

rating达到历史最高。。
