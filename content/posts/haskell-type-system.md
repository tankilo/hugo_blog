---
title: 学一学Haskell（二）类型系统
tags:
  - Haskell
  - 函数式编程
categories:
  - Haskell
date: '2018-04-07T07:47:55+08:00'
---
学了Haskell后，我变强了，也变秃了

<!--more-->

学习，需要讲究类比与转化。

比如：我们试着把Haskell的类型系统映射到C++上

# 类型

## 值构造子

使用`data`关键字来声明一个新类型，比如

``` haskell
data ScienceSubject = Math | Physics | Chemistry | Biology
```

这有点像C++里的。。类比不出来。。

这样定义以后，`Math`之类的就变成了可以直接使用的字面值，比如：

``` haskell
qwq :: ScienceSubject -> String
qwq Math = "Very important subject"
qwq _ = "Something less important"
```

（班主任的口头禅）

当然，这样有点无聊。

事实上，我们的新类型里的值还可以有自己的值

``` haskell
data ScienceSubject = Math String Int | Physics String Int
-- It means your Math mark in exam {{ String }} is {{ Int }}
```

这样，我们就可以这样使用

``` haskell
giveAdvice :: ScienceSubject -> String
giveAdvice (Math _ 150) = "You are a god, aren't you?"
giveAdvice _ = "Practice makes prefect!"
```

值得一提的是这个函数的类型签名：为什么不是`Math -> String`呢？

因为`Math`并非是一个类型，正如`True`,`-1`不是类型一样，尽管他们长得很像C++里的对象：有独特的名字和“构造函数”。

## 类型构造子

如果与C++进行类比的话，我们会发现，Haskell的函数是自带“泛型”的，比如：

``` haskell
max :: (Ord a) => a -> a -> a
max x y
	| x <= y = y
	| otherwise = x
```

显然，任何可以比较大小的类都可以使用我们的max函数。

这对应着C++的函数模板，那么，大家喜闻乐见的类模板是怎么样的呢？

比如。。我们考虑一些行为像容器的东西。。

就二叉查找树好了（不平衡的那种）

``` haskell
data Tree T = EmptyNode | Node T (Tree T) (Tree T)
```

这是容易理解的，因为一颗树上的点要么是空的，要么有子树

而声明中的`T`也不难理解：一颗可以放不同类型的树：有点像类模板

我们来搞个函数玩玩

``` haskell
TreeInsert :: (Ord T) => T -> Tree T -> Tree T
TreeInsert a EmptyNode = Tree a EmptyNode EmptyNode
TreeInsert a (Tree val l r) 
	| a == val = Tree a l r
	| a < val = Tree val (TreeInsert a l) r
	| a > val = Tree val l (TreeInsert a r)
```

## “重载”

既然我们有了自己的类型，如何给它重载运算符使得让它支持一些操作呢？

在Haskell中，类型系统和C++有点区别，各个类型都有自己的Typeclass，所谓Typeclass，就是这个类型支持的操作。

比如，`Int`类型属于`Eq, Ord, Show, Read, Bounded, Enum`等Typeclass

顾名思义：`Eq`中的Type可以比较相等，`Ord`则可以比大小，如果一个类型提供了`Ord`的instance，那么我们就可以认为它“重载”了小于运算符。

大部分情况下，这个过程可以被自动完成：

``` haskell
data ScienceSubject = Math String Int | Physics String Int deriving (Eq) 
```

这样一来，Haskell会帮我们合成一个用于判断相等性的函数。

但是。。这样感觉好奇怪啊。。没有一种“控制”的感觉

我们也可以手工完成这个操作：实现某个Typeclass的instance。

我们先看一看`Eq`是怎么写的

``` haskell
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x == y = not (x /= y)
    x /= y = not (x == y)
```

怎么一脸递归定义的样子？

我们先放一放，实现我们的接口：

``` haskell
instance Eq ScienceSubject where
	(Math a b) == (Math a b) = True
	(Physics a b) == (Physics a b) = True
	_ == _ = False
```

思路非常清晰！但是，我们仅仅处理了等号，却没有处理不等号，如何判断两个对象不相等呢？

这时候我们就可以理解`Eq`的奇怪写法了：`/=`不就是`not ==`嘛！

## 函子（Functor Typeclass）

注意：Functor**不是**C++中的可调用对象，而是指一类可以被map over的类型。说白了，就是行为像容器的东西。

比如List，比如我们的Tree

我们试着理解一下它的定义：

``` haskell
class Functor f where
	fmap :: (a -> b) -> f a -> f b
```

函数fmap的类型签名是这样的：接受一个将a类型映射成b类型的函数，再接受一个a类型的Functor，返回b类型的Functor。

我们试着让我们的二叉搜索树成为Functor的instance

``` haskell
instance Functor Tree where
	fmap f (Tree val l r) = Tree (f val) (fmap f l) (fmap f r)
	fmap f EmptyNode = EmptyNode
```

