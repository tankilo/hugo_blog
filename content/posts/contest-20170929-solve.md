---
title: 蛤实验胡策20170929题解
tags:
  - OI
  - DP
  - 图论
  - 数据结构
  - 贪心
  - 数论
categories:
  - OI
date: '2017-09-30T04:55:21+08:00'
---

呐。。第一次出题。。。
感谢mk，wcg，kZime，zf验题
感谢zf提供T3
本文链接：https://margatroid.xyz/2017-09-29-contest-20170929-solve/

<!--more-->

# 题解

## kZime与动态滑稽树

### 题意

一棵带点权的树，可以移动一些节点，移动一个点的消耗是这个点的权值，现在要移动一些节点，使得整棵树变成一条**以根节点为一端**的链，求最小消耗。

$10\%$的数据，直接看一下哪一条链权值更小，把权值小的嫁接到权值大的上面。

$30\%$的数据，数据范围贼小，怎么写都能过，留给写爆搜的同学

### 满分做法

注意到移动**一棵子树**显然是没有移动**一条链/一个点**优的。

我们只需要找出一条以根为一端的，权值最大的链，然后把其他的节点都移上去就好了。

简单的树归+简单的贪心



---



## ZF与数论

### 题意

原题题意已经很明确了。。

$$
求\sum_{i=l}^r\varphi(i)\ \text{mod 998244353}
$$

### 30分

白送的，根据题目中的公式，分解质因数之后大力算一波就好了

### 60分

线性筛模板题。

### 满分做法

注意到$l,r$的值域很大，无法使用线性筛，但是$l-r$却只有$10^6$ 。

我们考虑30分算法的思路：分解质因数。

我们先用线性筛筛出$10^6(=\sqrt{10^{12}})$以内的素数（此处用埃氏筛也是可以的），用这些数去分解$[l,r]$内的数，注意$[l,r]$内的数至多有一个大于$10^6$的因数。

那。。这好像跟暴力区别不大的样子。。。

欸，再考虑一下暴力的思路：对于$[l,r]$内的**每一个数**，将其分解质因数，统计欧拉函数值

我们考虑这样一种思路：对于**每个质数**，枚举它在$[l,r]$内的**倍数**。即我们枚举$k$，使得$k\cdot prime[i]\in[l,r]$，不妨设这个数是$h$，那么$prime[i]$一定是$h$的一个质因数，根据欧拉函数的公式，$prime[i]$对答案是有一定**贡献**的。
$$
\varphi(n) =n·\prod(1-\dfrac{1}{p_i} )，其中p_i表示n的一个质因数
$$
再放一遍这个公式

我们对于区间$[l,r]$内的每一个数，维护一个$phi$值。在枚举质数和它的倍数的时候，不断更新$phi$值。

下面是一下小细节

- 精度问题：不要傻乎乎地直接套公式，要把里面通分一下，边乘边除
- 开long long


---



## MK与蛇

### 题意

一句话题意：求树上两条链的交，若用$[x,y],[a,b]$表示两条链，即求$[x,y]\cap [a,b]$

我们把一条链看成是点的集合，用$[x,y]$表示以$x,y$为起止点的一条链

在以下的内容中，我们默认$\text{deep}[\text{LCA}(x,y)]<\text{deep}[\text{LCA}(a,b)]$

### 30分

对于每一个询问，用dfs暴力给树上节点染色，染完之后再统计有哪些节点同时有两种颜色，总复杂度是$O(n^2)$

除了这种方法，还有一种30分的姿势，就是你打出了正解，但是求LCA用的是暴力爬树法

### 另外的30分

这30分比较独特，我们只需要判断两条链有没有交点即可（良心的子任务）

我们考虑，如果这两条链有交点，那么其中LCA深度较深的链（即$[a,b]$）的LCA一定在LCA深度较浅的链（即$[x,y]$）上。

更加形式化一点呢，就是：

$$
[a,b]\cap[x,y]\not=\varnothing\Leftrightarrow\text{LCA}(a,b)\in[x,y]
$$

这个是显然成立的，$\text{LCA}(a,b)$是$[a,b]$上最高的一个点。首先，由于这是一棵树，$\text{LCA}(a,b)$不会在$[x,y]$之上，而如果$\text{LCA}(a,b)$在$[x,y]$之下的话，那么$[a,b]$与$[x,y]$就没有交点了。

接下来再考虑一个东西，如何判断一个点在一条链上呢？

先放出结论：

$$
i\in[a,b]\Leftrightarrow\text{LCA}(a,i)或\text{LCA}(b,i)=i
$$

这个。。也是显然的吧。。

### 90分算法

~~这90分是用来卡企图用树剖+线段树水过此题的同学的。~~

~~先对这棵树进行一波树剖，然后维护一棵线段树，线段树维护**区间值是否相等**。~~

~~然后就是类似暴力的套路，大力染色然后统计同色的区间，不同的是线段树的区间操作复杂度是$O(\log n)$而不是$O(n)$。~~

~~这样以来，整个算法的复杂度是$O(n\log^2n)$~~

经过撕烤后发现树剖线段树**不可做**（或者是我太菜了不知道怎么做，如果可做务必告诉我qwq）

于是第10个点变成卡常用的了。。。

有以下几种90分姿势：

- 爆栈的
- 用`iostream`导致`TLE`的
- 用倍增LCA被卡常的
- 树剖LCA写丑的

由于为了增加数据强度，造数据的时候我们造了一棵链状的树，因此树剖求解会比较有优势，在实际的运行过程中，复杂度比期望的单次$O(\log n)$要小很多

### 满分做法

首先用30分的做法判断是否有解。

这个问题可以转化为这样一个问题：求树上一个点$i$到一条链$[c,d]$的距离最短的点。

那。。转化后好像还是不可做的样子。。。

我们分类讨论：

#### 当$i$的深度大于$\text{LCA}(c,d)$时

这时，待求的点是$\text{MaxDeep}(\text{LCA}(i,c),\text{LCA}(i,d))$，这。。是显然的吧。。

#### 当$i\in[c,d]$时

这时这个点就是$i$，不过，也可以套上面的公式

#### 当$i$的深度小于$\text{LCA}(c,d)$时

这时，这个点应该是$\text{LCA}(c,d)$，这也是显然的

所以总结一下，待求的点是$\text{MaxDeep}(\text{LCA}(i,c),\text{LCA}(i,d),\text{LCA}(c,d))$。

这样，我们就求出了蛇的重合部分的其中一个端点

我们再对另一端重新操作一遍，就能求出另一个端点

然后输出一波，就得到了答案。

### $O(n)$做法

其实就是求LCA的时候用离线的`tarjan`LCA就好了，这样是怎么都卡不掉的。

~~Tarjan：我优势很大~~

# std

## T1

``` cpp
//=================================
//Created by Margatroid on 20171009
//=================================
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e6 + 10;
vector<int> g[maxn];
int dp[maxn], w[maxn], n, sum;
char buf[(int)1e8 + 12], *fs = buf;

inline int gn() { 
   static int k, f;
   k = 0, f = 1;
   for (; !isdigit(*fs); fs++) if (*fs == '-') f = -1;
   for (; isdigit(*fs); fs++) k = k * 10 + *fs - '0';
   return k * f;
}
void addedge(int f, int t) { g[f].push_back(t), g[t].push_back(f); }
void dfs(int no, int fa)
{
    int mx = 0;
    for (int i = 0; i < g[no].size(); ++i)
    {
        int t = g[no][i];
        if (t == fa) continue;
        dfs(t, no);
        mx = max(mx, dp[t]);
    }
    dp[no] += mx;
}
int main()
{
    fread(buf, 1, (int)1e8, stdin);
    n = gn();
    for (int i = 1; i < n; ++i)
    {
        int f, t;
        f = gn(), t = gn(), w[t] = gn();
        sum += w[t];
        dp[t] = w[t];
        addedge(f, t);
    }
    dfs(1, 1);
    cout << sum - dp[1] << endl;
}

```

## T2

``` cpp
//=================================
//Created by Margatroid on 20171009
//=================================
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e6 + 10;
const ll mod = 998244353;
bitset<maxn> vis;
vector<int> pri;
ll l, r;
ll phi[maxn], num[maxn];
int main()
{
    cin >> l >> r;
    for (int i = 2; i < 1e6 + 10; ++i)
    {
        if (!vis[i])
            pri.push_back(i), vis[i] = 1;
        for (int j = 0; j < pri.size(); ++j)
        {
            ll k = i * pri[j];
            if (k > 1e6 + 10) break;
            vis[k] = 1;
            if (i % pri[j] == 0) break;
        }
    }    
    ll phi_sum = 0;
    for (ll i = 0; i <= r - l; ++i) num[i] = phi[i] = l + i;
    for (ll i = 0; i < pri.size(); ++i)
    {
        ll j = pri[i];
        if (j > r) break;
        j = ceil(1.0 * l / j) * j;
        for (ll k = j; k <= r; k += pri[i])
        {
            phi[k - l] /= pri[i], phi[k - l] *= (pri[i] - 1);
            while(num[k - l] % pri[i] == 0) num[k - l] /= pri[i];   
        }
    }
    for (ll i = 0; i <= r - l; ++i)
        if (num[i] != 1)
            phi[i] /= num[i], phi[i] *= (num[i] - 1);
    for (ll i = 0; i <= r - l; ++i) phi_sum += phi[i];
    cout << phi_sum % mod << endl;
}
```

## T3

``` cpp
//=================================
//Created by Margatroid on 20171009
//=================================
#include<bits/stdc++.h>
using namespace std;
const int maxn = 4e5 + 10;
vector<int> g[maxn];
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
void addedge(int f, int t) { g[f].push_back(t), g[t].push_back(f); }
int n, m, s;
struct node
{
    int siz, top, son, dep, fa;
    node() { siz = top = dep = fa = 0;}
};
node nd[maxn];
void dfs1(int f, int no)
{
    nd[no].fa = f;
    nd[no].dep = nd[f].dep + 1;
    int mx = 0;
    for (int i = 0; i < g[no].size(); ++i)
    {
        if (g[no][i] == f) continue;
        dfs1(no, g[no][i]);
        nd[no].siz += nd[g[no][i]].siz;
        if (nd[g[no][i]].siz > mx)
            mx = nd[g[no][i]].siz, nd[no].son = g[no][i];
    }
    ++nd[no].siz;
}
void dfs2(int no, int f, int to)
{
    if (no == 0) return;
    nd[no].top = to;
    dfs2(nd[no].son, no, to);
    for (int i= 0; i < g[no].size(); ++i)
    {
        if (g[no][i] == nd[no].son || g[no][i] == f) continue;
        dfs2(g[no][i], no, g[no][i]);
    }
}
int lca(int u, int v)
{
    if (nd[u].dep < nd[v].dep)
        swap(u, v);
    while(nd[u].top != nd[v].top)
    {
        if (nd[nd[u].top].dep < nd[nd[v].top].dep) swap(u, v);
        u = nd[nd[u].top].fa;
    }
    return (nd[u].dep < nd[v].dep) ? u : v;
}
inline int max_deep(int a, int b) { return (nd[a].dep > nd[b].dep ? a : b); }
inline int max_deep(int a, int b, int c) { return max_deep(max_deep(a, b), c); }
int main()
{

    // MAKE SURE NOTHING BEFORE THESE CODE
    int size = 256 << 20; // 256MB
    char *p = (char*)malloc(size) + size;
    __asm__("movl %0, %%esp\n" :: "r"(p));
    // Your Code Here
    n = gn(), m = gn();
    for (int i = 1; i < n; ++i)
    {
        int f = gn(), t = gn();
        addedge(f, t);
    }
    dfs1(1, 1);
    dfs2(1, 1, 1);
    for (int i = 1; i <= m; ++i)
    {
        int x = gn(), y = gn(), a = gn(), b = gn();
        int lc1 = lca(x, y), lc2 = lca(a, b); // lc2 > lc1
        if (nd[lc1].dep > nd[lc2].dep)
            swap(x, a), swap(y, b), swap(lc1, lc2);
        if (lca(lc2, x) != lc2 && lca(lc2, y) != lc2)
        {
            puts("-1 -1");
            continue;
        }
        int ans1 = max_deep(lca(a, x), lca(a, y), lc1), ans2 = max_deep(lca(b, x), lca(b, y), lc1);
        printf("%d %d\n", min(ans1, ans2), max(ans1, ans2));
    }
}
```
