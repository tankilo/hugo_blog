---
title: 在vscode里使用clang配置准确的Intelisence
tags:
  - Linux
  - VSCode
  - Clang
  - 配置
categories:
  - 其它
date: '2017-10-19T11:13:07+08:00'
---

VSCode里有一个叫C/C++的插件，但是最近更新了新版之后，CPU占用量暴增，但是效果并不显著，于是。。就弃坑了。。

<!--more-->

# 准备工作

你需要安装：

- VSCode
  - C/C++ Clang Command Adapter
  - Native(~~naive~~)Debug
  - Clang-format（可选）
- Clang
  - 下载链接：[LLVM](http://releases.llvm.org/download.html)
  - 或者直接使用顺手的包管理器安装
- Windows下的用户还要安装MinGW-w64
  - 下载链接：[MinGW-w64](https://sourceforge.net/projects/mingw-w64/files/)
  - 下载之后选择安装版本，这个看心情，不过推荐最新

# 配置VSCode

现在我们假设你已经完成了以上的操作，下面我们来配置VSCode

在用户设置里添加

``` json
"clang.cxxflags": [
        "--target=x86_64-w64-windows-gnu",
        "-std=c++11",
        "-I C:\\Program Files\\mingw-w64\\x86_64-7.1.0-posix-seh-rt_v5-rev2\\mingw64\\lib\\gcc\\x86_64-w64-mingw32\\7.1.0\\include\\c++"
    ],
    "clang.executable": "C:\\Program Files\\LLVM\\bin\\clang.exe"

```

~~当然，具体路径具体分析~~

如果你想要使用远古的`C++98`，可以手动改一下`std=c++98`

然后就好啦，打几句代码试试吧

# 配置Clang-format

Clang-format可以格式化你的代码，使它变得好看

自带的配置可能不满足你的需要，所以你可以在你的工作目录下建一个`.clang-format`文件

比如我的是这样的：

``` yaml
# 从Clang官网是粘下来的
---
# We'll use defaults from the LLVM style, but with 4 columns indentation.
BasedOnStyle: LLVM
IndentWidth: 4
---
Language: Cpp
# Force pointers to the type for C++.
DerivePointerAlignment: false
PointerAlignment: Left
---

```

然后打出组合技`Alt+Shift+F`就可以一键格式化啦

# 使用Clang作为编译器

~~众所周知，`g++`有编译慢的优点~~

在你的`launch.json`里添加

``` json
{
	"version": "0.2.0",
	"configurations": [
		{
		{
			"type": "lldb-mi", // 这是我在linux下使用的
			"request": "launch",
			"name": "LLDB",
			"target": "${file}.exe",
			"cwd": "${workspaceRoot}",
			"preLaunchTask": "g++"
		},
		{
			"name": "GDBDebug", // 在Windows下使用的
			"type": "gdb",
			"request": "launch",
			"target": "${file}.exe",
			"cwd": "${workspaceRoot}",
			"preLaunchTask": "clang++"
		}
	]
}
```

然后往`tasks.json`里添加

``` json
{
    "version": "0.1.0",
    "command": "clang++",
    "args": ["-g","${file}", "--target=x86_64-w64-windows-gnu", "-std=c++11", "-o", "${file}.exe","-Wall"],
    "problemMatcher": {
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
            "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
            "file": 1,
            "line": 2,
            "column": 3,
            "severity": 4,
            "message": 5
        }
    }
}
```

# 在git-bash里使用Clang

Clang在Windows下默认需要依赖msvc，非常蛋疼，我们可以手动改target，在`.bashrc`里添加

``` bash
alias clang++='clang++ --target=x86_64-w64-windows-gnu'
```

嗯。。意义也很明确，就是这样，然后就可以享受clang的彩色输出啦
