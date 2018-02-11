---
title: Blog迁移
date: '2017-05-29T06:15:01+08:00'
tags:
  - Hexo
categories:
  - Hexo
---
如题，Blog迁移至Github Pages，因为我懒233
测试一下公式：
$$
\begin{cases}
dp\left(1\right)=1 \\\\
dp\left(i\right)=\sum_{j\in\left[max(i-r,1),i-l\right]\&h(j)\in\left[h(i)-t,h(i)+t\right]}dp(j) 
\end{cases}
$$
$$
\begin{cases}
dp(i)=1&outdgree(i)=0\\\\
dp(i)=\max\{dp(j)\}+outdgree(i)&(i,j)\in E
\end{cases}
$$
看起来Katex跑的不错嘛2333

**UPDATE 2017/5/29**

- 添加disqus评论功能，不过如果网络不够通畅，可能会无法评论
