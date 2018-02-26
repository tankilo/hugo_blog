---
title: 学一学Haskell（一）
tags:
  - Haskell
  - 函数式编程
categories:
  - Haskell
date: '2018-02-26T09:03:56+08:00'
---

打不倒的空气人，学不会的Haskell

<!--more-->

rqy给我安利了Haskell qwq

（虽然之前看过简单的语法

这个语言。。怎么说呢。。非常皮

hs作为一个函数式语言，有一些奇妙的特性

比如。。我们来考虑这个问题：

> 现在有一个list lst，如何求它的和呢？

这不傻逼题吗，`for i in ls..` ，欸等等，hs里的循环应该怎么写啊

抱歉，循环，不存在的

# 不可变

没有接触过编程的同学在学习《高中数学-必修三》（算法）时会遇到一个问题：

> `i = i + 1`是什么意思呢？

显然，`i != i + 1` ，但是在大多数语言里，`i`作为一个变量，是可变的

但是在hs里，**变**量是**不可变**的，函数也不能有副作用

若以同样的参数调用同一个函数两次，得到的结果一定是相同。这被称作“引用透明“

某种意义上讲，这更像数学上的函数

听上去好像很傻

不过，这也有好处，这可以帮助编译器了解你的代码，顺便优化它。

举个例子

``` cpp
void qwq(int *a, int *b)
{
    *a += *b;
    *a += *b;
}
```

这是一段cpp代码，很显然，如果让我去写编译器，我肯定会把这个函数优化成这样

``` cpp
void qwq(int *a, int *b)
{
    *a += 2 * (*b);
}
```

但是考虑一个问题，如果a和b指向同一个int，这样优化就不正确了，虽然你十分清楚你不会传两个一样的指针进去，但是萌萌的编译姬并不知道。作为一个严谨的编译器，`g++`是不敢优化这样的代码的，这样一来，某种意义上造成了代码的低效。

# 惰性求值

## 从有限到无限

由于hs的惰性求值的特性，hs可以处理无限长度的list，比如：

``` haskell
[0, 1..]
```

是自然数集

如果取前五个自然数

``` haskell
take 5 [0, 1..]
```

从某种意义上讲，hs的list更像是数学中的集合，因为它还支持一些奇妙的语法

## List Comprehension

在数学中，我们使用$\{2x|x\in[1,10]\}$来表示前10个偶数

在Haskell中，我们可以使用`[x*2 | x <- [1..10]]`来表示前10个偶数

（`<-`表示$\in$）

就这么刺激

当然，竖线后可以有多个条件，比如`[x*2 | x <- [1..10], x /= 5]`就是刨除第五个偶数后的前十个整数

# 模式匹配

我们来试着实现一下`sum`函数（以数学的形式

`sum`函数作用于一个list，并返回这个list的全部元素和

$$
\text{sum }lst=
\begin{cases}
0&\text{length }lst=0 \\\\\\
\text{head }lst+\text{sum}\text{ tail } lst&\text{length }lst>0
\end{cases}
$$

head lst表示lst的首元素，而tail lst表示lst的首元素之外的部分

那么我们先用cpp实现一下这个函数

``` cpp
int sum(deque<int> lst)
{
    if (lst.size() == 0)
        return 0;
    else
    {
        lst.pop_front();
        return *lst.begin() + sum(lst);
    }
}
```

啊，写的比较丑

如果用hs的话，事情会变得简单一些

``` haskell
sum [] = 0
sum (front:others) = front + sum others
```

嗯，写完了

这里用到了hs的一个奇妙的特性，模式匹配

模式匹配从上到下进行，如果list是空的，那么会匹配到`sum [] = 0`。否则则是`sum (front:others) = front + sum others` ，避免了一大坨`if .. else`

我们再来试着写一下快排

快排流程是这样的：

1. 随便找一个数
2. 把比它大的数扔到它的右边，比它小的扔到它的左边
3. 对两边调用快排

值得一提的是边界，对空list调用快排什么都不会做

``` hs
sort [] = []
sort (front:others) = (sort [i | i <- others, i < front]) ++ [front] ++ sort([i | i <- others, i >= front])
```

啊，完美

`++`运算符用来连接两个list

# 静态类型

Haskell是一门静态类型的语言，但与C++不同的是，编译器可以自动推导类型，这有点像把C++里的所有类型标识符换成`auto`

这意味着类型错误会在编译时被发现

# 不全调用

假如你有个有三个参数的函数，那么你用两个参数取调用它时，你会得到一个新函数，这个新函数只接受一个参数

比如我现在有一个函数：

``` haskell
myCompare a b
	| a > b = "Greater"
	| a < b = "Less"
	| a == b = "Equal"
```

如果我现在想写一个函数，它可以将一个数和233比较，显然，我们可以复用`myCompare`

``` haskell
myCompareHaha a = myCompare 233 a
```

但是这样写实际上是有一些多余的，我们完全可以这样

``` haskell
myCompareHaha = myCompare 233
```

WTF?!

再研究一下本节的第一句话，`myCompare`是一个具有两个参数的函数，这里我用一个参数，也就是第一个参数去调用它，那么它`myCompare`会返回一个新函数，它只接受一个参数（因为它的第一个参数以及被填好了）