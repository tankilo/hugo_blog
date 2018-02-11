---
title: '[SCOI 2005] 骑士精神'
tags:
  - 搜索
  - 迭代加深搜索
  - OI
  - BZOJ
  - 洛谷
categories:
  - OI
date: '2017-10-12T20:01:06+08:00'
---

# 题意

> 题目地址：[BZOJCH](https://ruanx.pw/bzojch/p/1085.html)  [luogu](https://daniu.luogu.org/problem/show?pid=2324)

要将棋盘上的马归位，求最小步数

<!--more-->

# 题解

那就。。搜呗

首先注意到大力BFS会爆，大力DFS也会爆

然后再注意到题目中的条件限制：**最多不超过15步**

这已经很明显了，来写**IDA***吧

那。。什么是IDA*呢？

迭代加深搜索。

好像。。很迷。。。

其实就是从小到大枚举走几步可以到终点，然后开始xjb搜，如果超过限制就return，直到搜到终点。

那么对于这个题，我们就枚举一下跳几步可以到达终点，从小到大来，每次dfs一下。

那么。。为什么要这样搞呢？

我们想要求最少的移动次数，如果单纯dfs是无法做到的，只能迭代加深。

这还没有完，只是IDA*的一部分，还有一顿操作在等着你。

## 估价函数

什么是估价函数呢？

对于当前的一个状态，给它一个评估。

那。。这有什么用呢？

我们到达每一个状态时，判断一下它已经跳的步数，再加上它的估价函数值，如果大于了限制，就大力return。

听上去好像很棒的样子，不过估价函数是不能xjb选的。

估价函数需要满足以下要求：可以估小，不可以估大

这是很显然的。

对于这个题目，我们可以以“不在自己位置上的马的个数”为估价函数，正确性可以自己脑补（跳一次最多复位一个马）。

当然如果要更优，可以以：“不在自己位置上的马跳回自己位置的步数和”为估价函数，据说更快。

注意到一次跳一个棋子，两个状态的估价函数是可以互相递推的，只需要看跳了之后的变化，如果大力每次计算，会T成70分

然后记得要维护一下，如果某一个地方已经搜到解了，就不必再搜下去了。

# 代码

``` cpp
//
// Created by Margatroid on 2017/10/12.
//

#include <bits/stdc++.h>
using namespace std;
typedef array<array<int, 5>, 5> board;
const board final_status = {1, 1, 1, 1, 1, -1, 1, 1, 1, 1, -1, -1, 0, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1};
const int dx[] = {-2, -1, 1, 2, 2, 1, -1, -2},
        dy[] = {1, 2, 2, 1, -1, -2, -2, -1};
inline int val(const board &status)
{
    int ans = 0;
    for (int i = 0; i < 5; ++i)
        for (int j = 0; j < 5; ++j)
            if (status[i][j] != final_status[i][j])
                ++ans;
    return ans;
}
int sum = 0;
bool dfs(const board &now, int cost_limit, int step, int now_val)
{
    if (now == final_status) return sum = step, true;
    if (step + now_val > cost_limit + 1) return false;
    board d = now;
    int x, y;
    for (int i = 0; i < 5; ++i)
        for (int j = 0; j < 5; ++j)
            if (d[i][j] == 0)
            {
                x = i, y = j;
                goto label;
            }
label:
    bool status = 0;
    for (int i = 0; i < 8; ++i)
    {
        if (x + dx[i] >= 5 || x + dx[i] < 0 || y + dy[i] >= 5 || y + dy[i] < 0) continue;
        int nx = dx[i] + x, ny = dy[i] + y, new_val = now_val;
        swap(d[x][y], d[nx][ny]);
        if (d[x][y] == final_status[x][y] && d[nx][ny] != final_status[x][y]) --new_val;
        else if (d[x][y] != final_status[x][y], d[nx][ny] == final_status[x][y]) ++new_val;
        if (d[nx][ny] == final_status[nx][ny] && d[x][y] != final_status[nx][ny]) --new_val;
        else if (d[nx][ny] != final_status[nx][ny] && d[x][y] == final_status[nx][ny])++new_val;
        status |= dfs(d, cost_limit, step + 1, new_val);
        swap(d[x][y], d[nx][ny]);
        if (status) return status;
    }
    return status;
}
int ida_star(const board &start_status)
{
    int ans = 1, st;
    sum = 0;
    for (; !(st = dfs(start_status, ans, 0, val(start_status))) && ans <= 15; ++ans);
    if (st == 1 && ans <= 15)
        return sum;
    else
        return -1;
}
int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        board now;
        for (int i = 0; i < 5; ++i)
        {
            string s;
            cin >> s;
            for (int j = 0; j < 5; ++j)
            {
                char t = s[j];
                if (t == '0')
                    now[i][j] = -1;
                else if (t == '1')
                    now[i][j] = 1;
                else if (t == '*')
                    now[i][j] = 0;
            }
        }
        if (now == final_status)
        {
            cout << 0 << '\n';
            continue;
        }
        cout << ida_star(now) << '\n';
    }
}
```

我是菜，真的，这玩意写了一下午+一晚上。。。菜的扣jue qwq
