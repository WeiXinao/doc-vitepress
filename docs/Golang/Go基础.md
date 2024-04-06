# Go 基础

## goland 环境安装

### Windows 平台

#### 配置环境变量

复制框中路径

![image-20230302171501067](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302171501067.png)

右击**此电脑**，选择**属性**

![image-20230302173306927](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302173306927.png)

下滑，选择**系统信息**

![image-20230302173715058](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302173715058.png)

相关链接一栏，选择**高级系统设置**

![image-20230302173844039](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302173844039.png)

选择**环境变量**

![image-20230302174207645](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302174207645.png)

在系统变量一栏中，选择 **Path**

![image-20230302174333761](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302174333761.png)

将**复制的路径**粘贴到**环境变量**中

![image-20230302174545689](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302174545689.png)

在 **terminal** 中 输入 `go version`，如果出现**版本号**，则安装成功

![image-20230302174719779](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302174719779.png)

#### 配置 go 环境

打开 powershell，输入如下命令：

```go
$env:GO111MODULE = "on"
$env:GOPROXY = "http://goproxy.cn"
```

输入 `go env`， 查看是否修改成功

![image-20230302180026496](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302180026496.png)

GOROOT：代表 go 的安装路径

GOPATH：代表 go 的项目安装路径，之前必须通过 GOPATH 创建项目，现在有了模块化管理，基本上也不用了，了解即可。

> [!attention]
> 
>  使用 go mod 管理库，需要科学上网

#### 安装配置 git

```
https://git-scm.com/download
```

安装过程一路 next

配置环境变量，命令行输入 git 测试

![image-20230302181233424](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302181233424.png)

出现**选项提示**，表示安装成功

#### GOROOT 和 GOPATH

GOROOT 就是 go 安装的根目录，GOPATH 就是 go 项目所在的路径，高版本 go 项目已经不再依赖 gopath 来管理项目，使用 go mod 来管理项目。

> 参考资料：
> 
> - [(111条消息) 【Go报错】go go.mod file not found in current directory or any parent directory 错误解决_go: go.mod file not found in current directory or _普通网友的博客-CSDN博客](https://blog.csdn.net/m0_67401417/article/details/126080567)

### Linux 平台

:point_right: [Linux -> CentOS 安装 go 环境 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1847079)

## 开发工具简介

golang 的开发工具有很多，例如：

1. vim 
2. sublime
3. atom
4. LitelDE
5. eclipse
6. **goland**
7. **vscode**

### 使用 goland 开发 go 应用

goland 是一款付费、功能强大的 goland 集成开发环境，是 Jetbrain 公司的产品。下载地址：`https://www.jetbrains.com/go/`，goland 非常智能，几乎不用配置，安装即用。

### 使用 vscode 开发 go 应用

下载安装 vscode `https://code.visualstudio.com/`

```
go mod init helloGo
```

helloGo：表示 module 名字，随自己喜欢

## 查看可用命令

直接在终端中输入 `go help` 即可显示所有的 go 命令以及相应命令功能简介，主要有下面这些：

- build：编译包和依赖
  
  ![image-20230302190530516](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302190530516.png)

- clean：移除对象文件

- doc：显示包或者符号的文档

- env：打印 go 的环境信息
  
  ![image-20230302221638146](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302221638146.png)

- bug：启动错误报告

- fix：运行 go tool fix

- fmt：运行 go fmt 进行格式化
  
  ![](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302222226886.png)
  
  ![](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/image-20230302222536495.png)

- generate：从 processing source 生成 go 文件

- get：下载并安装包和依赖

- install：编译并安装包和依赖

- list：列出包

- run：编译并运行 go 程序

- test：运行测试

- tool：运行 go 提供的工具

- version：显示 go 的版本

- vet：运行go tool vet 

## 变量

### 变量声明

#### 声明单个变量

方式1：指定变量类型，声名后若不赋值，使用默认值

```go
// int 的默认值是 0
var i int
fmt.Println("i = ", i)
```

方式2：根据值自行判断变量类型（类型推导）

```go
var num = 10.11
fmt.Println("num = ", num)
```

方式3：省略 var, 注意 := 左侧的变量不应该是已经声名过的，否则会导致编译错误

```go
// 下面的方式等价 var name; name = "tom"
// := 的 :不能省略，否则错误
name := "tom"
fmt.Println("name = ", name)
```

#### 一次声明多个变量

方式1：

```go
var n1, n2, n3 int
fmt.Println("n1 = ", n1, "n2 = ", n2, "n3 = ", n3)
```

方式2：类型推导

```go
var n1, name, n3 = 100, "tom", 888
fmt.Printf("n1 = ", n1, "name =", name, "n3 = ", n3)
```

方式3：类型推导简写

```go
n1, name, n3 := 100, "tom", 888
fmt.Println("n1 = ", n1, "name = ", name, "n3 = ", n3)
```

#### 声明全局变量

在函数外声明的变量就是全局变量

```go
//定义全局变量
var n1 = 100
var n2 = 200
var name = "jack"

//上面的声明方式也可以改成一次性声明
var (
    n3    = 300
    n4    = 900
    name2 = "merry"
)
```

### 注意事项

1. 该区域的数据值可以在同一类型范围内不断变化

```go
// 该区域的数据值可以在同一类型范围内不断变化
var i int = 10
i = 30
i = 50
fmt.Println("i = ", i)
i = 1.2 // 错误， int, 原因是不能改变类型
```

2. 变量在同一个作用域内不能重名

```go
// 该区域的数据值可以在同一类型范围内不断变化
var i int = 10
i = 30
i = 50
fmt.Println("i = ", i)

// var i int =59
i := 99
```

## 数据类型

![数据类型](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202308221448391.png)

### 整数类型

基本介绍

&nbsp; 简单来说，就是用于存放数值的，比如 0，1，2，3，4，5 等等。

案例演示

![image](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202308221455012.png)

![image](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202308221456148.png)

整数各个类型

| **类型** | **有无符号** | **占用存储空间** | **范围**                           | **备注** |
|:------:|:--------:|:----------:|:--------------------------------:|:------:|
| int8   | 有        | 1字节        | -128~127                         |        |
| int16  | 有        | 2字节        | -2<sup>15</sup>~2<sup>15</sup>-1 |        |
| int32  | 有        | 4字节        | -2<sup>31</sup>~2<sup>31</sup>-1 |        |
| int64  | 有        | 8字节        | -2<sup>63</sup>~2<sup>63</sup>-1 |        |

int的无符号类型   

| **类型** | **有无符号** | **占用存储空间** | **范围** |
| :--- | :--- | :--- | :--- |
| uint64 | 无 | 8字节 | -2<sup>31</sup>~2<sup>31</sup>-1 -2<sup>63</sup>~2<sup>63</sup>-1 |
| uint8 | 无 | 1字节 | 0~255 |
| uint16 | 无 | 2字节 | 0~2<sup>16</sup>-1 |
| uint32 | 无 | 4字节 | 0-2<sup>32</sup>-1 |

<img src="https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202309131300843.png" title="" alt="image.png" data-align="center">

int 的其他类型说明   

| **类型** | **有无符号** | **占用存储空间**          | **表数范围**                                                          | **备注**                 |
|:------ |:-------- |:------------------- |:----------------------------------------------------------------- |:---------------------- |
| int    | 有        | 32位系统4个字节 64位系统8个字节 | -2<sup>31</sup>~2<sup>31</sup>-1 -2<sup>63</sup>~2<sup>63</sup>-1 |                        |
| uint   | 无        |32位系统4个字节 64位系统8个字节| 0~2<sup>32</sup>-1 0~2<sup>64</sup>-1                             |                        |
| rune   | 有        |与int32一样| -2<sup>31</sup>~2<sup>31</sup>-1                                  | 等价int32,表示一个Unincode编码 |
| byte   | 无        | 与uint8等价            | 0-2<sup>32</sup>-1                                                | 要存储字符时，选用byte          |

<img src="https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202309131337873.png" title="" alt="image.png" data-align="center">

整形使用的细节   

1. Golang各整形分：有符号和无符号，`int uint` 的大小和系统有关。   

2. Golang整形默认声明为 int 型   

3. 如何在程序中查看某个变量的字节大小和数据类型（使用较多）   

   ```go
   // 如何在程序查看某个变量的占用字节大小和数据类型（使用较多）
   var n2 int64 = 10
   // unsafe.Sizeof(n1) 是 unsafe 包的一个函数，可以用于返回 n1 变量占用的字节数
   fmt.Printf("n2 的类型 %T, n2 占用的字节数是 %d\n", n2, unsafe.Sizeof(n2))
   ```

4. **Golang 程序中整型变量在使用时，遵循保小不保大的原则，即：在保证程序正常运行下，尽量使用占用空间小的数据类型。（如年龄使用 byte）**

   ```go
   // Golang程序中整形变量在使用时，遵循保小不保大的原则，
   // 即：在保证程序正确运行下，尽量使用占用空间小的数据类型
   var age byte = 90
   fmt.Println("age = ", age)
   ```

5. bit：是计算机中的最小存储单位。byte：是计算机中的基本存储单元，1byte = 8bit。   

