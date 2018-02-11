---
title: 线性筛与欧拉函数
tags:
  - OI
  - 数学
categories:
  - OI
date: '2017-08-28T17:38:01+08:00'
---

# 线性筛

## 普通筛法

这个大家都会，它效率低下的原因是一个数被重复筛去了。

<!--more-->

## 线性筛

考虑一种方案，即只让一个数被它的**最大的因数**筛掉

我们需要维护一个素数表，表示当前为止所有的素数，和一个表示已经被筛去的数组

对于一个数$i$，一定可以拆分成$i=p_1^{a_1}p_2^{a_2}\cdots p_n^{a_n}$的形式，其中，$p_1>p_2>\cdots > p_n$

我们筛去$i\times prime[j]$这个数，当且仅当$prime[j]<p_n$，不然的话，$i$就不是$i\times prime[j]$的最大的因子

注意到$prime$表里的素数是严格递增的，若有$i\mod prime[j]=0$，则$prime[j]=p_n$，此时应当终止循环

### 代码qwq

```cpp
const int maxn = 1e8;
bitset<maxn + 10> vis;
int n;
vector<int> pri;
int phi[maxn];
int main()
{
    scanf("%d", &n);
    for (register int i = 2; i < n; ++i)
    {
        if (!vis[i])
            pri.push_back(i), vis[i] = 1, phi[i] = i - 1;
        for (register int j = 0; j < pri.size(); ++j)
        {
            register int k = i * pri[j];
            if (k >= n) break;
            vis[k] = 1;
            if (i % pri[j] == 0)
            {
                phi[k] = pri[j] * phi[i];
                break;
            }
            else phi[k] = phi[i] * (pri[j] - 1);
        }
    }
```

# 欧拉函数

我们都知道欧拉函数是积性函数，如果不知道可以右转bing/Google

$\phi(n)$表示$1$到$n-1$中与$n$互质的数的个数

~~首先甩出一个我也不知道怎么回事的公式~~


$$
\phi(n) =n·\prod(1-\dfrac{1}{p_i} )，其中p_i表示n的一个质因数
$$
## 对上面式子的~~证明~~口胡

根据唯一分解定理$n=p_1^{a_1}p_2^{a_2}\cdots p_n^{a_n}$

考虑到$p_1\cdots$均为质数，和欧拉函数的**积性**，有$\phi(n)=\phi(p_1^{a_1})\phi(p_2^{a_2})\cdots\phi(p_n^{a_n})$

那么问题转化为求一个素数的n次方的欧拉函数

注意到与$p_i^{a_i}$不互质的数的个数为$p_i^{a_i-1}$，那么$\phi(p_i^{a_i})=p_i^{a_i}-p_i^{a_i-1}$

提出一个$p_i^{a_i}$，变成$p_i^{a_i}(1-\frac{1}{p_i})$

然后把所有的乘到一块，发现$p_i^{a_i}$凑成了$n$，就得到了上面的公式qwq

（LR在他的blog里写了证明，见参考链接）

----

注意到对于一个素数，$\phi(p)=p-1$，这是显然的

然后考虑这样的情况，对于素数$p​$和一个数$i​$

- 若$i\mod p=0$

  由上面的公式，$\phi(pi)=phi(i)\times p$，因为$p$本身就是$i$的一个质因数，并不会影响连乘号后面的结果

- 若$i\mod p \not=0$

  $\phi(pi)=phi(i)\times(p-1)$，这也是显然的

然后套到线性筛里，见上面的代码qwq

# 参考链接

LittleRewriter的数论系列博客：[CSDN](http://blog.csdn.net/lirewriter)
