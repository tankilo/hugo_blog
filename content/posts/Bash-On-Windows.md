---
title: Bash On Windows
tags:
  - WSL
  - vim
categories:
  - Linux
date: '2017-06-23T13:51:10+08:00'
---

# 简介
## 什么是Bash On Windows

简单的说，这是微软搞的黑魔法，可以在Win10上附加一个Linux子系统，真正的子系统，各种软件都可以直接跑

## 为什么要用它？

OI系列比赛(WC，NOI)使用的环境是由Ubuntu魔改过来的Linux，提前适应一下环境总是好的。
<!--more-->
# 安装Bash On Windows

## 网络条件优越

在Cortana里搜索“启用或关闭”，打开后找到WSL，勾选上，重启，然后win+R，输入bash，一路y下去。

## 受到GFW的无差别攻击

建议参考[这篇文章](http://www.cnblogs.com/VAllen/archive/2017/04/03/BashOnWindowsDownloadAndInstallError.html)

# 进入bash后的操作

## 更换终端模拟器

你会发现，cmd真的是丑出境界，我推荐[Cmder](http://cmder.net/)，非常漂亮，像这样：

![Cmder](http://cmder.net/img/main.jpg)

但是经过一波摸索之后你会发现漂亮的vim并不好用，因为方向键失效了，在Cmder的Start Task里添加

``` 
%windir%\system32\bash.exe ~ -cur_console:p:n
```

然后就可以了

## 换源

Ubuntu的国外apt源慢的可以，估计又是某方教授的锅，所以建议换成国内源

## 安装zsh

```bash
sudo apt-get install zsh
```

然后坐等

### 安装Oh my zsh

 ```bash
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
 ```

然后坐等

然后就可以参见[这篇文章](https://zhuanlan.zhihu.com/p/19556676?columnSlug=mactalk)

### 安装一系列插件

我推荐`autojump`和`thefuck`，都可以在Github上找到，要先安装Python2/3。然后按教程配置即可

### 默认使用zsh

```bash
cd ~
vim .bashrc
```

然后把这段粘贴进去

```bash
# Launch Zsh
if [ -t 1 ]; then
exec zsh
fi
```

## vim配置

我使用了kZime的vim配置 ，[Github](https://github.com/kZime/my_vimrc)

然后稍微改改就可以用了

嗯。。大概就这些

# 运行图形界面

效果如图
![Markdown](http://i4.piimg.com/598509/703f19ce2a6f78ae.png)
见[这篇文章](https://leibnizhu.gitlab.io/2016/07/16/Bash-on-Windows%E5%BC%80%E5%90%AFUbuntu-unity%E6%A1%8C%E9%9D%A2%E7%9A%84%E6%96%B9%E6%B3%95/)
