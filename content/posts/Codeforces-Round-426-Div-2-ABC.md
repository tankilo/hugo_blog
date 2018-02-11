---
title: 'Codeforces Round #426 (Div. 2)ABC'
tags:
  - OI
  - 数学
  - Codeforces
  - 模拟
  - 差分
categories:
  - OI
date: 2017-07-30 20:57:49
---

>  比赛地址：[Codeforces](http://codeforces.com/contest/834)

# A

A题没什么好说的，大力膜你一下就好

<!--more-->

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
map<char, int> mp;
int main()
{
    mp.insert(pair<char, int>('<', 0));
    mp.insert(pair<char, int>('^', 1));
    mp.insert(pair<char, int>('>', 2));
    mp.insert(pair<char, int>('v', 3));
    char s, e;
    int n;
    cin >> s >> e >> n;
    int cwe = (mp[s] + n) % 4;
    int ccwe = (mp[s] - n) % 4;
    while (ccwe < 0) ccwe += 4;
    if (cwe == ccwe)
    {
        puts("undefined");
        return 0;
    }
    if (cwe == mp[e])
    { 
        puts("cw");
        return 0;
    }
    if (ccwe == mp[e])
    { 
        puts("ccw");
        return 0;
    }
}

```

# B

B的题意大概是这样，用$n\leq 26$条线段覆盖一段区间，求被覆盖次数最多的点的覆盖次数是否大于$k$。

然后就可以差分了，记录一下所有线段的始末，然后差分一下，求前缀和，再取最大值，$O(n)$可以解决

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e6 + 10;
const int inf = (1 << 30);
int n, k;
int fst[30], lst[30];
int s[maxn];
int main()
{
    cin >> n >> k;
    for (int i = 0; i < 30; ++i) fst[i] = inf;
    for (int i = 1; i <= n; ++i)
    {
        char s; int idx;
        cin >> s;
        idx = s - 'A';
        fst[idx] = min(fst[idx], i);
        lst[idx] = max(lst[idx], i);
    }
    for (int i = 0; i < 26; ++i)
    {
        s[fst[i]]++;
        s[lst[i] + 1]--;
    }
    for (int i = 1; i <= n; ++i)
        s[i] += s[i- 1];
    int mx = *max_element(s + 1, s + 1 + n);
    if (mx > k) cout << "YES\n";
    else cout << "NO\n";
}
```

# C

C的题意大概是这样，两个人在玩♂游♂戏，有若干轮，初始分数为$1$，如果一个人赢了，就给他的分数乘上$k^2$，给输者的分数乘上$k$，现在已知若干次比赛的结果，问所给分数是否合法。

数据范围要求$O(n\log n)$的算法而不是$O(n\sqrt n)$的算法

## 思路

C题很有意思，本来想分解质因数，结果复杂度不对，后来以为是gcd之类的东西，结果都跑偏了。

设两者的分数为$a,b$，若$k=^3\sqrt{ab}$为整数，显然满足题意。更进一步，当且仅当$k$为整数，且$a\equiv b\equiv0(\mod k)$所给分数符合题意。

所以这样写一下代码就行了，开方的复杂度为$O(\log n)$，总复杂度为$O(n\log n)$

感谢mk对此题的讲解

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
inline char getc() { 
    static char buf[1 << 18], *fs, *ft;
    return (fs == ft && (ft = (fs = buf) + fread(buf, 1, 1 << 18, stdin)), fs == ft) ? EOF : *fs++;
}
inline int gn() { 
    register ll k = 0, f = 1;
    register char c = getc();
    for(; !isdigit(c); c = getc()) if(c == '-') f = -1;
    for(; isdigit(c); c = getc()) k = k * 10 + c - '0';
    return k * f;
}
int main()
{
    int n;
    n = gn();
    while (n--)
    {
        ll a, b, k;
        a = gn(), b = gn();
        k = cbrt((long double)a * b);
        if (a % k == 0 && b % k == 0 && k * k * k == a * b) puts("YES");
        else puts("NO");
    }
}
```

 还有一点，此题卡常，用cin会T掉

感谢这次cf让我回到青名，虽然C题fst了，但是由于AB题手速比较快，rating还是涨了，终于不用当pupil了qwq