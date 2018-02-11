---
title: 模板
tags:
  - OI
  - 图论
  - 数论
  - NOIP
  - 模板
categories:
  - OI
date: 2017-11-07 19:24:18
---

整理了一下板子。。

说不定什么时候可以背诵一下

如果漏掉了什么记得提醒我

有一些比较灵活的东西就没有写出来

<!--more-->

# 图论

## tarjan SCC

``` cpp
// Luogu p3387
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e4 + 10;
vector<int> g[maxn], sccg[maxn];
bitset<maxn> instk;
int dfn[maxn], low[maxn], clk;
int stk[maxn], cnt, top;
int belong[maxn], n, m;
int w[maxn], sccw[maxn], ind[maxn];
void addedge(vector<int>* g, int f, int t) { g[f].push_back(t); }
void dfs(int no)
{
    dfn[no] = low[no] = ++clk;
    instk[no] = 1, stk[++top] = no;
    for (int i = 0; i < g[no].size(); ++i)
        if (!dfn[g[no][i]])
            dfs(g[no][i]), low[no] = min(low[no], low[g[no][i]]);
        else if (instk[g[no][i]]) low[no] = min(low[no], low[g[no][i]]);
    if (dfn[no] == low[no])
        for (++cnt; stk[top + 1] != no; belong[stk[top]] = cnt, sccw[cnt] += w[stk[top]], instk[stk[top]] = 0, --top);
}
bitset<maxn> vis;
int num[maxn];
int dp(int no)
{
    if (vis[no])
        return num[no];
    vis[no] = 1;
    num[no] += sccw[no];
    int mx = 0;
    for (int i = 0; i < sccg[no].size(); ++i)
        mx = max(mx, dp(sccg[no][i]));
    return num[no] += mx;
}
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    cin >> n >> m;
    for (int i = 1 ; i <= n; ++i)
        cin >> w[i];
    for (int i = 1, f, t; i <= m; ++i)
        cin >> f >> t, addedge(g, f, t);
    for (int i = 1; i <= n; ++i)
        if (!dfn[i])
            dfs(i);
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j < g[i].size(); ++j)
            if (belong[i] != belong[g[i][j]])
                addedge(sccg, belong[i], belong[g[i][j]]);
    int ans = 0;
    for (int i = 1; i <= cnt; ++i)
        ans = max(ans, dp(i));
    cout << ans << endl;
}
```

## LCA-倍增ver

``` cpp
// Luogu P3379
#include <bits/stdc++.h>
using namespace std;
const int maxn = 5e5 + 10;
int dep[maxn], anc[maxn][21];
inline char getc() 
{ 
    static char buf[1 << 25], *fs, *ft;
    return (fs == ft && (ft = (fs = buf) + fread(buf, 1, 1 << 18, stdin)), fs == ft) ? EOF : *fs++;
}
inline int gn() 
{ 
    register int k = 0, f = 1;
    register char c = getc();
    for(; !isdigit(c); c = getc()) if(c == '-') f = -1;
    for(; isdigit(c); c = getc()) k = k * 10 + c - '0';
    return k * f;
}
vector<int> g[maxn];
void addedge(int f, int t) { g[f].push_back(t), g[t].push_back(f); }
int n, m, s;
void dfs(int no, int fa)
{
    dep[no] = dep[fa] + 1;
    anc[no][0] = fa;
    for (int i = 1; i <= 20; ++i) anc[no][i] = anc[anc[no][i - 1]][i - 1];
    for (int i = 0; i < g[no].size(); ++i)
    {
        int t = g[no][i];
        if (t == fa) continue;
        dfs(t, no);
    }
}
int lca(int u, int v)
{
    if (dep[u] < dep[v]) swap(u, v);
    for (int d = dep[u] - dep[v], k = 0; d; d >>= 1, ++k) (d & 1) ? u = anc[u][k] : 0;
    for (int i = 20; i >= 0; --i) (anc[u][i] != anc[v][i]) ? u = anc[u][i], v = anc[v][i] : 0;
    return u == v ? u : anc[u][0];
}
string ans;
int main()
{
    ans.reserve(1024 * 1024 * 200);
    n = gn(), m = gn(), s = gn();
    for (int i = 1, f, t; i < n; ++i)
        f = gn(), t = gn(), addedge(f, t);
    dfs(s, s);
    for (int i = 1, u, v; i <= m; ++i)
    {
        u = gn(), v = gn();
        ans += to_string(lca(u, v)) + '\n';
    }
    cout << ans << endl;
}
```

## LCA-树剖-ver

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 500010;
inline char getc() 
{ 
    static char buf[1 << 18], *fs, *ft;
    return (fs == ft && (ft = (fs = buf) + fread(buf, 1, 1 << 18, stdin)), fs == ft) ? EOF : *fs++;
}
inline int gn() 
{ 
    register int k = 0, f = 1;
    register char c = getc();
    for(; !isdigit(c); c = getc()) if(c == '-') f = -1;
    for(; isdigit(c); c = getc()) k = k * 10 + c - '0';
    return k * f;
}
struct node
{
    int siz, top, son, dep, fa;
    node() { siz = top = dep = fa = 0;}
} nd[maxn];
vector<int> g[maxn];
void addedge(int f, int t) { g[f].push_back(t), g[t].push_back(f); }
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
int n, m, s;
int main()
{
    n = gn(), m = gn(), s = gn();
    for (int i = 1; i <= n - 1; ++i)
    {
        int f = gn(), t = gn();
        addedge(f, t);
    }
    dfs1(s, s);
    dfs2(s, 1, s);
    for (int i = 1; i <= m; ++i)
    {
        int u = gn(), v = gn();
        printf("%d\n", lca(u, v));
    }
}
```

## dijkstra

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e4 + 10;
const int inf = 2147483647;
struct edge
{
    int f, t, d;
    edge(int f, int t, int d) : f(f), t(t), d(d) {}
};
struct node
{
    int d, u;
    node(int d, int u) : d(d), u(u) {};
    const bool operator<(const node &x) const { return d > x.d; }
};
struct dijkstra
{
    int n, m;
    vector<edge> edges;
    vector<int> g[maxn];
    bitset<maxn> done;
    int d[maxn], p[maxn];
    void init(int n)
    {
        this->n = n;
        for (int i = 0; i <= n; ++i)
            g[i].clear();
        edges.clear();
    }
    void addedge(int f, int t, int d)
    {
        edges.push_back(edge(f, t, d));
        g[f].push_back(edges.size() - 1);
    }
    void dijk(int s)
    {
        priority_queue<node> q;
        for (int i = 1; i <= n; ++i)
            d[i] = inf;
        d[s] = 0;
        for (int i = 1; i <= n; ++i)
            done[i] = 0;
        q.push(node(0, s));
        while (!q.empty())
        {
            node x = q.top();
            q.pop();
            if (done[x.u]) continue;
            done[x.u] = 1;
            for (int i = 0; i < g[x.u].size(); ++i)
            {
                edge l = edges[g[x.u][i]];
                if (d[l.t] > d[l.f] + l.d)
                {
                    d[l.t] = d[l.f] + l.d;
                    p[l.t] = g[x.u][i];
                    q.push(node(d[l.t], l.t));
                }
            }
        }
    }
};
```

## SPFA

``` cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e4 + 10;
const int inf = 1e9 + 233;
struct spfa
{
    struct edge
    {
        int f, t, d;
        edge (int f, int t, int d) : f(f), t(t), d(d) { };
    };
    vector<edge> edges;
    vector<int> g[maxn];
    void addedge(int f, int t, int d)
    {
        edges.push_back(edge(f, t, d));
        g[f].push_back(edges.size() - 1);
    }
    int dis[maxn];
    bitset<maxn> inq;
    deque<int> q;
    void init()
    {
        edges.clear();
        for (int i = 0; i < maxn; g[i].clear(), ++i);
        fill(dis, dis + maxn, inf);
        inq.reset();
        q.clear();
    }
    void sp(int st)
    {
        dis[st] = 0;
        q.push_back(st);
        inq[st] = 1;
        while (!q.empty())
        {
            int x = q.front();
            q.pop_front();
            inq[x] = 0;
            for (int i = 0; i < g[x].size(); ++i)
            {
                edge e = edges[g[x][i]];
                if (dis[e.t] > dis[x] + e.d)
                {
                    dis[e.t] = dis[x] + e.d;
                    if (!inq[e.t])
                        q.push_back(e.t), inq[e.t] = 1;
                }
            }
        }
    }
};
```

# 数学

## 快速幂

``` cpp
typedef long long ll;
template<typename T>
T fst_pow(T a, T p, T mo)
{
	T s = 1;
	for (; p; p >>= 1)
	{
		if (p & 1)
			s = 1ll * s * a % mo;
		a = 1ll * a * a % mo;
	}
	return s % mo;
}
```

## exgcd

``` cpp
template <typename T>
T exgcd(T a, T b, T &g, T &x, T &y)
{
    !b ? (x = 1, y = 0, g = a) : (exgcd(b, a % b, g, y, x), y -= (a / b) * x);
}
```

### exgcd求逆元

``` cpp
template <typename T>
T exgcd(T a, T b, T &g, T &x, T &y)
{
    !b ? (x = 1, y = 0, g = a) : (exgcd(b, a % b, g, y, x), y -= (a / b) * x);
}
template <typename T>
T get_inv(T a, T m)
{
    T x, y, g;
    g = exgcd(a, m, g, x, y);
    if (g == 1)
        return (x % m + m) % m;
    else
        return -1;
}
```

## 线性筛&积性函数

``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;
const int maxn = 1e8;
bitset<maxn + 10> vis;
int n;
vector<int> pri;
int phi[maxn], mu[maxn];
int main()
{
    scanf("%d", &n);
    phi[1] = mu[1] = 1;
    for (register int i = 2; i < n; ++i)
    {
        if (!vis[i])
            pri.push_back(i), vis[i] = 1, phi[i] = i - 1, mu[i] = -1;
        for (register int j = 0; j < pri.size(); ++j)
        {
            register int k = i * pri[j];
            if (k >= n) break;
            vis[k] = 1;
            if (i % pri[j] == 0)
            {
                phi[k] = pri[j] * phi[i];
                mu[k] = 0;
                break;
            }
            else phi[k] = phi[i] * (pri[j] - 1), mu[k] = -mu[i];
        }
    }
}
```

## 线性递推逆元

``` cpp
int inv[(int)3e6 + 10], n, p;
void get_inv()
{
    inv[1] = 1;
    for (int i = 2; i <= n; ++i)
        inv[i] = (1ll * inv[p % i] * (p - p / i) % p) % p;
}
```

## 组合数（递推的就不写了）

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 1e5 + 10;
const int mod = 998244353;
ll a[maxn], inv[maxn], fac[maxn];
int n, k;
ll mmod(ll p)
{
    p %= mod;
    while(p < 0) p += mod;
    return p % mod;
}
void pre()
{
    fac[0] = inv[0] = fac[1] = inv[1] = 1;
    for (int i = 2; i <= n; ++i)
        inv[i] = mmod(-(mod / i) * inv[mod % i]);
    for (int i = 2; i <= n; ++i)
        inv[i] = mmod(inv[i] * inv[i - 1]), fac[i] = mmod(i * fac[i - 1]);
}
ll c(ll n, ll m)
{
    if (m < 0 || n < 0 || n < m) return 0;
    if (m == 0 || n == 0 || n == m) return 1;
    return mmod(mmod(fac[n]) * mmod(mmod(inv[m]) * mmod(inv[n - m])));
}
```

# 快读

``` cpp
#include <bits/stdc++.h>
using namespace std;
template <class T>
inline T gn()
{
    register int k = 0, f = 1;
    register char c = getchar();
    for (; !isdigit(c); c = getchar()) if (c == '-') f = -1;
    for (; isdigit(c); c = getchar()) k = k * 10 + c - '0';
    return k * f;
}
```

# vimrc

``` vim
set guifont=Consolas:h14
set backspace=indent,eol,start
set nu rnu
set tabstop=4
set softtabstop=4
set expandtab
set shiftwidth=4
set autoindent
set nobackup
set noswapfile
set noundofile
set nowritebackup
syntax on
syntax enable

colorscheme evening

filetype on
filetype indent on

let mapleader=";"

imap <Leader>; <ESC>:w<CR>
map <Leader>; <ESC>:w<CR>

map <Leader>]:w<CR>!gdb %<.exe<CR>
map <Leader>[:w<CR>!g++ % -g -std=c++98 -o - Wall %<.exe<CR>
imap <Leader>]:w<CR>!gdb %<.exe<CR>
imap <Leader>[:w<CR>!g++ % -g -std=c++98 -o - Wall %<.exe<CR>
```