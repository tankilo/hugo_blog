---
title: 函数式记忆化搜索
tags:
  - Haskell
  - 函数式编程
  - DP
categories:
  - Haskell
date: '2018-07-09T21:03:56+08:00'
---
你们这些不函数式的语言就没有这些烦恼……

<!--more-->

## 斐波那契数列

这个数列有一万种求法，我们先看最脑残的一种

``` haskell
fib :: Int -> Integer
fib 0 = 1
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)
```

显然它是非常慢的，为了速度，我们可以考虑记忆化一下

先回想一下之前写DP的时候是怎么记忆化的

```cpp
if (vis[i])
  return mem[i];
else
  return vis[i] = 1, mem[i] = clac(i);
```

大概是这样，但是当我们试着用这个思路搞Haskell的记忆化时出了问题

这个~~破~~语言里变量根本不可变，那还怎么更新` vis `和` mem `啊？

### 利用惰性求值

~~有时候太勤快反而不好~~

我们可以这样考虑，先用“画一张饼”，表示我们“有”一个序列，且这个序列由斐波那契函数生成。

这样，` fib `函数就可以变成在这个序列中查表

``` haskell
fib' :: Int -> Integer
fib' n = fibVec !! n
  where fibVec = gen (n + 1) fib
        gen len f = map f $ take len [0..]
        fib 0 = 1
        fib 1 = 1
        fib k = (fibVec !! (k - 1)) + (fibVec !! (k - 2))
```

### 不动点算子

#### 不动点

没啥好说的，就是使$f(x)=x$的$x$

#### 不动点算子

一个函数，定义在` Data.Function `里

``` haskell
fix :: (a -> a) -> a
fix f = let x = f x in x
```

#### 所以这和记忆化搜索有什么关系呢？

~~先咕起来， Haskell Wiki 还没有参透~~

## 参考链接

- [Memoization - Haskell Wiki](https://wiki.haskell.org/Memoization)
- [递归函数（七）：不动点算子 - 知乎](https://zhuanlan.zhihu.com/p/34526779)
- [Memoized Fibonacci - CodeWars](https://www.codewars.com/kata/memoized-fibonacci)