---
title: 记一次有趣的单步
tags:
  - 常数优化
  - 汇编
categories: []
date: 2017-12-09 21:04:46
---

最近突然对汇编来了兴趣

<!--more-->

于是自己写了一些小东西，用`gcc qwq.c -S -O0 -o qwq.s`编译一下

看了看，大致了解了一些东西

解决了一些问题，比如：

# x *= 10 和 x = (x << 1) + (x << 3) 哪个更快？

测试环境：gcc 6.2.0 on Windows 10 

代码：

``` c
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int c = getchar();
    c = (c << 1) + (c << 3);
    getchar();
    c = c * 10;
    putchar(c);
}
```

在O0的状态下

``` assembly
main:
	pushq	%rbp
	.seh_pushreg	%rbp
	movq	%rsp, %rbp
	.seh_setframe	%rbp, 0
	subq	$48, %rsp
	.seh_stackalloc	48
	.seh_endprologue
	call	__main
	movl	$1, -4(%rbp)
	call	getchar
	movl	-4(%rbp), %eax
	leal	(%rax,%rax), %edx
	movl	-4(%rbp), %eax
	sall	$3, %eax
	addl	%edx, %eax
	movl	%eax, -4(%rbp)
	call	getchar
	movl	-4(%rbp), %edx
	movl	%edx, %eax
	sall	$2, %eax
	addl	%edx, %eax
	addl	%eax, %eax
	movl	%eax, -4(%rbp)
	movl	$0, %eax
	addq	$48, %rsp
	popq	%rbp
	ret
	.seh_endproc
	.ident	"GCC: (Rev2, Built by MSYS2 project) 6.2.0"
	.def	getchar;	.scl	2;	.type	32;	.endef
```

在O2的状态下

``` assembly
main:
	pushq	%rbx
	.seh_pushreg	%rbx
	subq	$32, %rsp
	.seh_stackalloc	32
	.seh_endprologue
	call	__main
	call	getchar
	leal	0(,%rax,8), %edx
	leal	(%rdx,%rax,2), %ebx
	call	getchar
	leal	(%rbx,%rbx,4), %ecx
	addl	%ecx, %ecx
	call	putchar
	xorl	%eax, %eax
	addq	$32, %rsp
	popq	%rbx
	ret
	.seh_endproc
	.ident	"GCC: (Rev2, Built by MSYS2 project) 6.2.0"
	.def	getchar;	.scl	2;	.type	32;	.endef
	.def	putchar;	.scl	2;	.type	32;	.endef
```

可以看到，机智的gcc把`x *= 10`变成了

``` c
x + (x << 2)
x += x
```

总的指令条数还是一样的

所以说还是一样快的

# “破解”自己的小程序

我写了这样的东西

``` c
#include <stdio.h>
#include <string.h>
int main()
{
    int c;
    c = getchar();
    while (1)
    {
        if (c - '0' == 9)
            return puts("SUCCESS"), 0;
        puts("WRONG");
        c = getchar();
    }

}
```

如果只拿到编译后的二进制文件，怎么做到**无论输入什么都输出SUCCESS**呢？

**开门，放x64dbg!**

![捕获.PNG](https://i.loli.net/2017/12/10/5a2c94713511e.png)

经过一番孜孜不倦的单步之后我们来到了这里

经过一番理智分析后，我们可以得出

如果那个`jne`执行了的话（`Jump if not equal`）

会输出错误信息

而第二个`jmp`（`4015F2`）相当于是在执行循环

于是。。

我们可以修改一波字符串的地址，使得错误时也输出`SUCCESS`

但是这是不够的，因为只有输入是9的时候才会跳出循环

于是我们可以干掉`getchar`和第二个`jmp`

全部填充成`nop`

![捕获.PNG](https://i.loli.net/2017/12/10/5a2c95eedc6be.png)

经过一顿操作之后长这样

于是就变成了无论输入什么都输出`SUCCESS`

至于为什么不用C++呢？

自己试一下g++生成的汇编是什么样就知道了

（还是C好