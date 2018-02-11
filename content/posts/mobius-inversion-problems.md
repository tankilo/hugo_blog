---
title: 莫反水题
tags:
  - OI
  - 数论
  - 莫比乌斯反演
categories:
  - OI
date: '2017-10-30T11:48:31+08:00'
---

终于可以把暑假集训的坑填上了

<!--more-->

# 求$\sum\_{i=a}^b\sum\_{j=c}^b[\gcd(i,j)=k]$

首先用二维前缀和的思想，拆成四个询问

即

$$
\sum\_{i=1}^n\sum\_{j=1}^m[\gcd(i,j)=k]
$$

然后我们考虑化简一下这个式子

$$
\sum\_{i=1}^n\sum\_{j=1}^m[\gcd(i,j)=k]\\\\
=\sum\_{i=1}^{\lfloor\frac n k\rfloor}\sum\_{j=1}^{\lfloor\frac m k\rfloor}[\gcd(i,j)=1]\\
$$

然后我们注意到后面的那个东西是$1*\mu$，所以我们可以代换一下

$$
\sum\_{i=1}^{\lfloor\frac n k\rfloor}\sum\_{j=1}^{\lfloor\frac m k\rfloor}\sum\_{l|\gcd(i,j)}\mu(l)\\
$$

然后我们考虑变换一下求和指标，枚举所有的$l$，计算它们的贡献

$$
\sum\_{l=1}^{\min\{\lfloor\frac n k\rfloor,\lfloor\frac m k\rfloor\}}\mu(l)\lfloor\frac n {lk}\rfloor\lfloor\frac m {lk}\rfloor
$$

然后注意到后面的除法是可以分块计算的，对$\mu$求一个前缀和

就可以$O(\sqrt n)$处理每个询问了

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxn = 5e4 + 10;
int mu[maxn], pre_mu[maxn];
bitset<maxn> vis;
vector<int> pri;
void pre_cal()
{
    mu[1] = 1;
    for (int i = 2; i <= 5e4; ++i)
    {
        if (!vis[i])
            pri.push_back(i), mu[i] = -1, vis[i] = 1;
        for (int j = 0; j < pri.size(); ++j)
        {
            int k = i * pri[j];
            if (k > 5e4) break;
            vis[k] = 1;
            if (i % pri[j] == 0)
            {
                mu[k] = 0;
                break;
            }
            mu[k] = -mu[i];
        }
    }
    for (int i = 1; i <= 5e4; ++i)
        pre_mu[i] += mu[i] + pre_mu[i - 1];
}
ll cal(int n, int m, int k)
{
    ll ans = 0;
    n /= k, m /= k;
    if (n > m) swap(n, m);
    for (int i = 1, lst = 0; i <= n; i = lst + 1)
    {
        lst = min(n / (n / i), m / (m / i));
        ans += (ll)(n / i) * (m / i) * (pre_mu[lst] - pre_mu[i - 1]);
    }
    return ans;
}
int main()
{
    pre_cal();
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i)
    {
        int a, b, c, d, k;
        scanf("%d%d%d%d%d", &a, &b, &c, &d, &k);
        printf("%lld\n", cal(b, d, k) - cal(a - 1, d, k) - cal(b, c - 1, k) + cal(a - 1, c - 1, k));
    }
}
```

# 求$\sum\_{i=1}^n\sum\_{j=1}^m\gcd(i,j)$

也就是暑假集训时候的题

$$
\sum\_{i=1}^n\sum\_{j=1}^m\gcd(i,j)\\\\
=\sum\_{k=1}^{\min\{n\ m\}}k\sum\_{i=1}^{\lfloor\frac n k\rfloor}\sum\_{j=1}^{\lfloor\frac m k\rfloor}[\gcd(i,j)=1]\\\\
=\sum\_{k=1}^{\min\{n\ m\}}k\sum\_{i=1}^{\lfloor\frac n k\rfloor}\sum\_{j=1}^{\lfloor\frac m k\rfloor}\sum\_{e|\gcd(i,j)}\mu(e)\\\\
=\sum\_{k=1}^{\min\{n\ m\}}k\sum\_{e=1}^n\mu(e)\lfloor\frac n {ke}\rfloor\lfloor\frac m {ke}\rfloor
$$

然后我们令$K=ke$

$$
\sum\_{K=1}^{\min\{n\ m\}}\sum\_{e|K}e\mu(\frac K e)\lfloor\frac n K\rfloor\lfloor\frac m K\rfloor
$$

然后注意到中间是$id*\mu$的形式

因为$id*\mu=\varphi$

所以就变成了
$$
\sum\_{K=1}^{\min\{n\ m\}}\varphi(K)\lfloor\frac n K\rfloor\lfloor\frac m K\rfloor
$$
然后就跟上面的套路一样了

## 代码

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int maxn = 1e7 + 10;
const int mod = 998244353;
typedef long long ll;
int phi[maxn];
ll pre_phi[maxn];
bitset<maxn> vis;
vector<int> pri;
ll mmod(ll a)
{
    a %= mod;
    a += mod;
    return a % mod;
}
void pre_cal(int n)
{
    phi[1] = 1;
    for (int i = 2; i <= n; ++i)
    {
        if (!vis[i])
            pri.push_back(i), vis[i] = 1, phi[i] = i - 1;
        for (int j = 0; j < pri.size(); ++j)
        {
            ll k = pri[j] * i;
            if (k > n) break;
            vis[k] = 1;
            if (i % pri[j] == 0)
            {
                phi[k] = phi[i] * pri[j];
                break;
            }
            phi[k] = phi[i] * (pri[j] - 1);
        }
    }
    for (int i = 1; i <= n; ++i)
        pre_phi[i] += (pre_phi[i - 1] + phi[i]) % mod, pre_phi[i] %= mod;
}
int main()
{
    int n, m;
    cin >> n >> m;
    pre_cal(max(n, m) + 4);
    ll ans = 0;
    if (n > m) swap(n, m);
    for (int i = 1, lst = 0; i <= n; i = lst + 1)
    {
        lst = min(n / (n / i), m / (m / i));
        ans += 1ll * (n / i) * (m / i) * (pre_phi[lst] - pre_phi[i - 1]);
        mmod(ans);
    }
    cout << ans % mod << endl;
}
```

# 一些常用的数论函数

$\epsilon(n)=[n=1]$

$1(n)=1$

$id(n)=n$

然后是一些变换

$id=1*\varphi$

$\epsilon=1*\mu$

我们来试着证明一下$id*\mu=\varphi$

其实也没什么证明的。。直接带进去。。
$$
\text{left}=1\*\varphi\*\mu=\epsilon\*\varphi=\varphi=\text{right}
$$
