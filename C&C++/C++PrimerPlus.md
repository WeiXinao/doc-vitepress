# C++ Primer Plus

## 撰写表达式

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    const int line_size = 8;
    int cnt = 1;
    string a_string = "-";

    while (cnt < 20) {
        cout << a_string << (cnt % line_size ? ' ': '\n');
        cnt++;
    }

    return 0;
}
```

### 运算符优先级

==位置在上者优先级高于位置在下者的优先级==

- 逻辑运算符 NOT

- 算术运算符 （*、/、%）
- 算术运算符（+、-）
- 关系运算符（<，>，<=，>=）
- 关系运算符（==，!=）
- 逻辑运算符 AND
- 逻辑运算符 OR
- 赋值（assignment）运算符

## C++简介

C++融合了三种不同的编程方式：C语言代表过程性语言，C++在C语言基础上代表的面向对象语言、C++模板支持的泛型编程。

Ritchie希望有一种语言能将低级语言的效率，硬件访问能力和高级语言的通用性、可移植性融合在一起。于是他在旧语言的基础上开发了C语言。

C语言强调的是算法，而C++强调的是数据。

### 类



![类](https://xiaoxin-typora-images.oss-cn-hangzhou.aliyuncs.com/img/%E7%B1%BB.png)

### 泛型编程

泛型编程（generic programming）是C++支持的另一种编程方式。它与OOP的目标相同，即使重用代码和和抽象通用的技术更简单。不过OOP强调的是编程的数据方面，而泛型编程强调的是独立于特定数据类型。

### 编程步骤

![image-20220603220837626](https://xiaoxin-typora-images.oss-cn-hangzhou.aliyuncs.com/img/image-20220603220837626.png)

## 编写第一个C++程序

```cpp
int main(void) {

    return 0;

}
```

通常, main()被启动代码调用，而启动代码是由编译器添加到程序中的，是程序和操作系统（UNIX, Windows7或其他操作系统）之间的桥梁。事实上，该函数头描述的是main()和操作系统之间的接口。

![](assets/mian调用流程.png)

`return 0;`返回给启动代码，再返回给操作系统。
- return 0：表示程序正常执行。
- return 非0：表示程序执行异常。

两种比较标准的main函数头写法:
- `int main()`
- `int main(void); // very explicit style`

在运行C++程序时，通常从main()函数开始执行。因此，如果没有main()，程序将不完整，编译器将指出未定义main()函数。

一些例外情况：
例如，在Windows编程中，可以编写一个动态链接库（DLL）模块，这是其他Windows程序可以使用的代码。由于DDL模块不是独立的程序，因此不需要main()。

用于专用环境的程序——如机器人中的控制器芯片——可能不需要main()。

有些编程环境提供一个框架程序，该程序调用一些非标准函数，如_tmain()。这种情况下，有一个隐藏的main()， 它调用_tmain()。但常规的独立程序需要main()。

```cpp
#include <iostream>

int main(void) {

    using namespace std;

    return 0;

}
```

该编译指令导致预处理器将iostream文件内容添加到程序中。这是一种典型的预处理操作：在源代码被编译之前，替换或添加文本。
iostream中的io指的是输入（进入程序的信息）和输出（从程序中发送出去的信息）。C++的输入/输入方案涉及iostream文件的内容随源代码文件的内容一起被发送给编译器。实际上，iostream文件内容将取代程序中的代码行`#include<iostream>`。原始文件没有被修改，而是将源代码文件和iostream组合成一个复合文件，编译的下一阶段将使用该文件。

> 注意：使用cin和cout进行输入和输出的程序必须包含文件iostream.

![](https://xiaoxin-typora-images.oss-cn-hangzhou.aliyuncs.com/img/Pasted%20image%2020220612153815.png)

![](assets/Pasted%20image%2020220612153906.png)

### 命名空间

![](https://xiaoxin-typora-images.oss-cn-hangzhou.aliyuncs.com/img/Pasted%20image%2020220612154450.png)

![](https://xiaoxin-typora-images.oss-cn-hangzhou.aliyuncs.com/img/Pasted%20image%2020220612154856.png)