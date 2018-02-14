---
title: 在WSL上安装ArchLinux
tags:
  - linux
  - archlinux
  - wsl
categories:
  - linux
date: '2018-02-14T20:32:31+08:00'
---
![ArchLinuxScreenshot](https://i.loli.net/2018/02/14/5a842c063f4e0.png)
如图所示，我又滚到arch了

<!--more-->

不过这次是在`Windows Subsystem for Linux`上

之前听说过WSL可以安装别的发行版，不过一直没有去尝试

这次就试了一下，主要参考了Arch Wiki

也没有什么特别的坑，唯一和Wiki上不同的就是不需要安装`fakeroot-tcp`和`glibc-wsl`

然后就是正常的arch安装套路，类比`chroot`之后的状态，可以见我之前的blog

有几个比较特别的地方需要注意:

### cmd的字体

cmd的奇妙特性会自动修改字体，解决方案是使用雅黑+consolas的混合体（在GitHub上可以下载到，查询Yahei即可）

### npm

由于Windows把Windows主系统里的path也加到Linux的path里了，所以执行npm会出问题，解决方案是我自己xjb发现的：

``` bash
$ sudo /usr/bin/npm i cnpm
```
然后用`cnpm`随便安装点什么，npm就正常了

~~玄学.jpg~~

啊。。arch真香。。
