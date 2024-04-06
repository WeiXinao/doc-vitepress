# Day 01

## JavaScript 是什么？


![javascript#inlineR|500](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img20230206130455.png)
1. Javascript（是什么？） 
	- 是一种运行在客户端（浏览器）的编程语言，实现人机交互效果。 
2. 作用（做什么？） 
	- 网页特效（监听用户的一些行为让网页做出相应的反馈）
	- 表单验证（针对表单数据的合法性进行判断）
	- 数据交互（获取后台数据，渲染到前端）
	- 服务端编程（node.js） 
3. JavaScript的组成（有什么）？
	1. ECMAScript:
		 规定了js基础语法核心知识。
		 - 比如：变量、分支语句、循环语句、对象等等
	2. Web APIs:
		- DOM 操作文档，比如对页面元素进行移动、大小、添加删除等操作
		- BOM 操作浏览器，比如页面弹窗，检测窗口宽度、存储数据到浏览器等等

**权威网站：MDN**

**JavaScript权威网站**：[MDN Web Docs (mozilla.org)](https://developer.mozilla.org/zh-CN/)

 ![javascript](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img20230208162849.png) 

## 体验JavaScript

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .pink {
            background-color: pink;
        }
    </style>
</head>
<body>
    <button class="pink">按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <script>
        let bts = document.querySelectorAll('button');
        for (let i = 0; i < bts.length; i++) {
            bts[i].addEventListener('click', function () { 
                document.querySelector('.pink').className = '';  
                this.className = 'pink';
             })
        }
    </script>
</body>
</html>
```

![](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img2023-02-06-14-21-17.gif)


### 总结

1. JavaScript 是什么？
```plain
JavaScript是一种运行在客户端（浏览器）的编程语言
```

2. JavaScript 组成是什么？
```plain
ECMAScript（基础语法）、web APIs（DOM、BOM）
```

## JavaScript书写位置

JavaScript 程序不能独立运行，它需要被嵌入 HTML 中，然后浏览器才能执行 JavaScript 代码。通过 `script` 标签将 JavaScript 代码引入到 HTML 中，有两种方式：

#### 内部方式

通过 `script` 标签包裹 JavaScript 代码

```javascript
 <!DOCTYPE html>  
 <html lang="en">  
 <head>  
   <meta charset="UTF-8">  
   <title>JavaScript 基础 - 引入方式</title>  
 </head>  
 <body>  
   <!-- 内联形式：通过 script 标签包裹 JavaScript 代码 -->  
   <script>  
     alert('嗨，欢迎来传智播学习前端技术！')  
   </script>  
 </body>  
 </html>
```

#### 外部形式

一般将 JavaScript 代码写在独立的以 .js 结尾的文件中，然后通过 `script` 标签的 `src` 属性引入
```javascript
 // demo.js  
 document.write('嗨，欢迎来传智播学习前端技术！')
```

```javascript
<!DOCTYPE html>  
 <html lang="en">  
 <head>  
   <meta charset="UTF-8">  
   <title>JavaScript 基础 - 引入方式</title>  
 </head>  
 <body>  
   <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->  
   <script src="demo.js"></script>  
 </body>  
 </html>
```

如果 script 标签使用 src 属性引入了某 .js 文件，那么 标签的代码会被忽略！！！如下代码所示：

```javascript
 <!DOCTYPE html>  
 <html lang="en">  
 <head>  
   <meta charset="UTF-8">  
   <title>JavaScript 基础 - 引入方式</title>  
 </head>  
 <body>  
   <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->  
   <script src="demo.js">  
     // 此处的代码会被忽略掉！！！！  
     alert(666);    
   </script>  
 </body>  
 </html>

```



> [!note]
>
> 1. script 标签中间无需写代码，否则会被忽略！
> 2. 外部 JavaScript 会使代码更加有序，更易于复用，且没有了脚本的混合，HTML 也会更加易读，因此这是个好的习惯。
> 3. 书写的位置尽量写到文档末尾 `</body>`  前面

#### 内联JavaScript

代码写在标签内部

注意： 此处作为了解即可，但是后面vue框架会用这种模式

```html
<body>
  <button onclick="alert('逗你玩~~')">点击我月薪过万</button>
</body>
```

## JavaScript 注释和结束符

通过注释可以屏蔽代码被执行或者添加备注信息，JavaScript 支持两种形式注释语法：

### 单行注释

使用 `//`  注释单行代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 注释</title>
</head>
<body>
  
  <script>
    // 这种是单行注释的语法
    // 一次只能注释一行
    // 可以重复注释
    document.write('嗨，欢迎来传智播学习前端技术！');
  </script>
</body>
</html>
```

### 多行注释

使用 `/* */` 注释多行代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 注释</title>
</head>
<body>
  
  <script>
    /* 这种的是多行注释的语法 */
    /*
    	更常见的多行注释是这种写法
    	在些可以任意换行
    	多少行都可以
      */
    document.write('嗨，欢迎来传智播学习前端技术！')
  </script>
</body>
</html>
```

**注：编辑器中单行注释的快捷键为 `ctrl + /`**

### 结束符

在 JavaScript 中 `;` 代表一段代码的结束，多数情况下可以省略 `;` 使用回车（enter）替代。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 结束符</title>
</head>
<body>
  
  <script> 
    alert(1);
    alert(2);
    alert(1)
    alert(2)
  </script>
</body>
</html>
```

实际开发中有许多人主张书写 JavaScript 代码时省略结束符 `;`

对于 JavaScript 语句后应不应该加分号，看看尤雨溪怎么说：[(48 封私信 / 80 条消息) JavaScript 语句后应该加分号么？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/20298345)

## 输入和输出语法

输出和输入也可理解为人和计算机的交互，用户通过键盘、鼠标等向计算机输入信息，计算机处理后再展示结果给用户，这便是一次输入和输出的过程。

举例说明：如按键盘上的方向键，向上/下键可以滚动页面，按向上/下键这个动作叫作输入，页面发生了滚动了这便叫输出。

### 输出

JavaScript 可以接收用户的输入，然后再将输入的结果输出：

`alert()`、`document.wirte()`

以数字为例，向 `alert()` 或 `document.write()`输入任意数字，他都会以弹窗形式展示（输出）给用户。

语法1：

```javascript
document.write('要输出的内容');
```

**作用**：向body内输出内容


> [!note]
>
> 如果输出的内容写的是标签，也会被解析成网页元素

语法2：

```javascript
alert('要输出的内容');
```

**作用**：页面弹出警告对话框

语法3：

```javascript
console.log('控制台打印')
```

**作用**：控制台输出语法，程序员调试使用

###  输入

向 `prompt()` 输入任意内容会以弹窗形式出现在浏览器中，一般提示用户输入一些内容。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 输入输出</title>
</head>
<body>
  
  <script> 
    // 1. 输入的任意数字，都会以弹窗形式展示
    document.write('要输出的内容')
    alert('要输出的内容');

    // 2. 以弹窗形式提示用户输入姓名，注意这里的文字使用英文的引号
    prompt('请输入您的姓名:')
  </script>
</body>
</html>
```

**作用**：显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字

**展示：**

![](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/prompt.gif)

JavaScript 代码执行顺序：

-  按HTML文档流顺序执行JavaScript代码
- alert() 和 prompt() 它们会跳过页面渲染先被执行

## 字面量

在计算机科学中，字面量（literal）是在计算机中描述 事/物
比如：
-  我们工资是： 1000 此时 1000 就是 数字字面量
-  '黑马程序员' 字符串字面量
-  还有接下来我们学的 `[] 数组字面量`  `{} 对象字面量` 等等

### 总结

1. JavaScript是什么？
	JavaScript是一门编程语言，可以实现很多的网页交互效果。

2. JavaScript 书写位置?
	-  内部 JavaScript
	-  内部 JavaScript – 写到 `</body>` 标签上方
	-  外部 JavaScript - 但是 `<script>` 标签不要写内容，否则会被忽略

3. JavaScript 的注释？ 
	- 单行注释 `//`
	- 多行注释 `/* */`

4. JavaScript 的结束符？
	-  分号； 可以加也可以不加，可以按照团队约定

5. JavaScript 输入输出语句？
	-  输入：`prompt()`
	- 输出： `alert()` `document.write()` `console.log()`

## 变量

>理解变量是计算机存储数据的“容器”，掌握变量的声明方式 

变量是计算机中用来存储数据的“容器”，它可以让计算机变得有记忆，通俗的理解变量就是使用【某个符号】来代表【某个具体的数值】（数据）
- 白话：变量就是一个装东西的盒子
- 通俗：变量是计算机中用来存储数据的“容器”，它可以让计算机变得有记忆。

>[!note]
>变量不是数据本身，它们仅仅是一个用于存储数值的容器。可以理解为是一个个用来装东西的纸箱子。

```html
<script>
  // x 符号代表了 5 这个数值
  x = 5
  // y 符号代表了 6 这个数值
  y = 6
    
  //举例： 在 JavaScript 中使用变量可以将某个数据（数值）记录下来！

  // 将用户输入的内容保存在 num 这个变量（容器）中
  num = prompt('请输入一数字!')

  // 通过 num 变量（容器）将用户输入的内容输出出来
  alert(num)
  document.write(num)
</script>
```

### 声明

要想使用变量，首先需要创建变量（也称为声明变量或者定义变量）

语法：
```javascript
let 变量名
```

声明(定义)变量有两部分构成：声明关键字、变量名（标识）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和赋值</title>
</head>
<body>
  
  <script> 
    // let 变量名
    // 声明(定义)变量有两部分构成：声明关键字、变量名（标识）
    // let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语
    // age 即变量的名称，也叫标识符
    let age
  </script>
</body>
</html>
```



> [!tip]
>
> - 我们声明了一个age变量
> - age 即变量的名称，也叫标识符



关键字是 JavaScript 中内置的一些英文词汇（单词或缩写），它们代表某些特定的含义，如 `let` 的含义是声明变量的，看到 `let`  后就可想到这行代码的意思是在声明变量，如 `let age;` 

`let` 和 `var` 都是 JavaScript 中的声明变量的关键字，推荐使用 `let` 声明变量！！！

### 变量拓展-let和var的区别

在较旧的JavaScript，使用关键字 var 来声明变量 ，而不是 let。

var 现在开发中一般不再使用它，只是我们可能再老版程序中看到它。

let 为了解决 var 的一些问题。

var 声明:
-  可以先使用 在声明 (不合理)
-  var 声明过的变量可以重复声明(不合理)
-  比如变量提升、全局变量、没有块级作用域等等

结论：

var 就是个bug，别迷恋它了，以后声明变量我们统一使用 let

### 赋值

声明（定义）变量相当于创造了一个空的“容器”，通过赋值向这个容器中添加数据。

![](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img20230206213416.png)

>[!note]
>是通过变量名来获得变量里面的数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和赋值</title>
</head>
<body>
  
  <script> 
    // 声明(定义)变量有两部分构成：声明关键字、变量名（标识）
    // let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语
    // age 即变量的名称，也叫标识符
    let age
    // 赋值，将 18 这个数据存入了 age 这个“容器”中
    age = 18
    // 这样 age 的值就成了 18
    document.write(age)
    
    // 也可以声明和赋值同时进行
    let str = 'hello world!'
    alert(str);
  </script>
</body>
</html>
```

简单点，也可以声明变量的时候直接完成赋值操作,这种操作也称为 变量初始化。

```javascript
<script>
// 声明了一个 age 变量，同时里面存放了 18 这个数据
let age = 18;
</script>
```

### 变量的基本使用

**变量更新**：变量赋值后，还可以通过简单地给它一个不同的值来更新它。

```javascript
// 声明了一个age变量，同时里面存放了 18 这个数据
let age = 18;
// 变量里面的数据发生变化更改为 19
age = 19;
// 页面输出的结果为 19
document.write(age);
```

```javascript
// 声明了一个age变量，同时里面存放了 18 这个数据
let age = 18;
// 这里不允许多次声明同名变量
let age = 19;
// 输出会报错
document.write(age);
```


> [!note]
>
> let 不允许多次声明一个变量。

**声明多个变量**：变量赋值后，还可以通过简单地给它一个不同的值来更新它。

**语法**：多个变量中间用逗号隔开。

```javascript
// 不提倡， 可读性不好
let age = 18, username = 'xiaoxin';
```

**说明**：看上去代码长度更短，但并不推荐这样。为了更好的可读性，请一行只声明一个变量。

```javascript
// 多行变量声明有点长，但更容易阅读
let username = '迪丽热巴';
let age = 19;
```

### 变量的本质

内存：计算机中存储数据的地方，相当于一个空间

变量本质：是程序在内存中申请的一块用来存放数据的小空间

![](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img20230206230008.png)


### 关键字

JavaScript 使用专门的关键字 `let` 和 `var` 来声明（定义）变量，在使用时需要注意一些细节：

以下是使用 `let` 时的注意事项：

1. 允许声明和赋值同时进行
2. 不允许重复声明
3. 允许同时声明多个变量并赋值
4. JavaScript 中内置的一些关键字不能被当做变量名

以下是使用 `var` 时的注意事项：

2. 允许声明和赋值同时进行
2. 允许重复声明
3. 允许同时声明多个变量并赋值

大部分情况使用 `let` 和 `var` 区别不大，但是 `let` 相较 `var` 更严谨，因此推荐使用 `let`，后期会更进一步介绍二者间的区别。

### 变量名命名规则

关于变量的名称（标识符）有一系列的规则需要遵守：

1. 只能是字母、数字、下划线、$，且不能能数字开头
2. 字母区分大小写，如 Age 和 age 是不同的变量
3. JavaScript 内部已占用于单词（关键字或保留字）不允许使用
4. 尽量保证变量具有一定的语义，见字知义

注：所谓关键字是指 JavaScript 内部使用的词语，如 `let` 和`var`，保留字是指 JavaScript 内部目前没有使用的词语，但是将来可能会使用词语。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 变量名命名规则</title>
</head>
<body>
  
  <script> 
    let age = 18 // 正确
    let age1 = 18 // 正确
    let _age = 18 // 正确

    // let 1age = 18; // 错误，不可以数字开头
    let $age = 18 // 正确
    let Age = 24 // 正确，它与小写的 age 是不同的变量
    // let let = 18; // 错误，let 是关键字
    let int = 123 // 不推荐，int 是保留字
  </script>
</body>
</html>
```

## 数组

数组 (Array) —— 一种将 一组数据存储在单个变量名下 的优雅方式。

### 数组的基本使用

1. **声明语法**

```javascript
let 数组名 = [数据1, 数据2, ..., 数据n]
```

例

```javascript
let names = ['小明', '小刚', '小红', '小丽', '小米'];
```

- 数组是按顺序保存，所以每个数据都有自己的编号
- 计算机中的编号从0开始，所以小明的编号为0，小刚编号为1，以此类推
- 在数组中，数据的编号也叫**索引或下标**
- 数组可以存储任意类型的数据

---

2. **取值语法**

```javascript
数组名[下标]
```

例

```javascript
<script>
    // let arr = [10, 20, 30];
    // 1. 声明数组（有序）
    let arr = ["刘德华", "张学友", "郭富城", "黎明", "周润发"];
    // 2. 使用数组 数组名[索引号]，从 0 开始
    // console.log(arr);
    console.log(arr[0]); // 刘德华
    // 3. 数组长度 = 最大索引号 + 1
    console.log(arr.length);
</script>
```

-  通过下标取数据
-  取出来是什么类型的，就根据这种类型特点来访问

---

3. **一些术语**

- **元素**：数组中保存的每个数据都叫数组元素
- **下标**：数组中数据的编号
- **长度**：数组中数据的个数，通过数组的length属性获得

---

4. **总结**

	1. 使用数组有什么好处？
		-  数组可以保存多个数据
	2. 数组字面量用什么表示？
		- [] 中括号
	3. 请说出下面数组中 ‘小米’ 的下标是多少？ 如何取得这个数据？
		- 下标是 4
		- 获取的写法是 names[4]

```javascript
let names = ['小明', '小刚', '小红', '小丽', '小米']
```

## 常量

概念：使用 const 声明的变量称为“常量”。

使用场景：当某个变量永远不会改变的时候，就可以使用 const 来声明，而不是let。

命名规范：和变量一致

常量使用：

~~~javascript
const PI = 3.14
~~~

>注意： 常量不允许重新赋值,声明的时候必须赋值（初始化）

>小技巧：不需要重新赋值的数据使用const

总结： 

- let — 现在实际开发变量声明方式。
- var — 以前的声明变量的方式，会有很多问题。
- const — 类似于 let ，但是变量的值无法被修改。

## 数据类型

![](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/JS%20%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.png)

> 计算机世界中的万事成物都是数据。

计算机程序可以处理大量的数据，为什么要给数据分类？
- 1. 更加充分和高效的利用内存
- 2. 也更加方便程序员的使用数据 

JS 数据类型整体分为两大类：
- 基本数据类型
- 引用数据类型

计算机程序可以处理大量的数据，为了方便数据的管理，将数据分成了不同的类型：

注：通过 typeof 关键字检测数据类型

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    // 检测 1 是什么类型数据，结果为 number
    document.write(typeof 1)
  </script>
</body>
</html>
```

### 数值类型

即我们数学中学习到的数字，可以是整数、小数、正数、负数`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    let score = 100 // 正整数
    let price = 12.345 // 小数
    let temperature = -40 // 负数

    document.write(typeof score) // 结果为 number
    document.write(typeof price) // 结果为 number
    document.write(typeof temperature) // 结果为 number
  </script>
</body>
</html>
```

JavaScript 中的数值类型与数学中的数字是一样的，分为正数、负数、小数等。

JavaScript 中的正数、负数、小数等 统一称为 数字类型。

>[!note]
>JS 是弱数据类型，变量到底属于那种类型，只有赋值之后，我们才能确认
>Java是强数据类型 例如 int a = 3 必须是整数

数字可以有很多操作，比如，乘法 * 、除法 / 、加法 + 、减法 - 等等，所以经常和算术运算符一起。

数学运算符也叫算术运算符，主要包括加、减、乘、除、取余（求模）。
- +：求和
- -：求差
- \*：求积
- /：求商
- %：取模（取余数）
- 开发中经常作为某个数字是否被整除

同时使用多个运算符编写程序时，会按着某种顺序先后执行，我们称为优先级。

JavaScript中 优先级越高越先被执行，优先级相同时以书从左向右执行。
- 乘、除、取余优先级相同
- 加、减优先级相同
- 乘、除、取余优先级大于加、减
- 使用 () 可以提升优先级
- 总结： 先乘除后加减，有括号先算括号里面的~~~

**总结**：

1. 算术运算符有那几个常见的？
	 + - * / %
2. 算术运算符优先级怎么记忆？
	- 先乘除取余，后加减，有小括号先算小括号里面的
3. 取余运算符开发中的使用场景是？
	- 来判断某个数字是否能被整除

NaN 代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果

```javascript
cosole.log('xiaxin' - 2) // NaN
```

NaN 是粘性的。任何对 NaN 的操作都会返回 NaN

```javascript
cosole.log(NaN + 2) // NaN
```

### 字符串类型

通过单引号（ `''`） 、双引号（ `""` ）或反引号包裹的数据都叫字符串，单引号和双引号没有本质上的区别，推荐使用单引号。

注意事项：

1. 无论单引号或是双引号必须成对使用
2. 单引号/双引号可以互相嵌套，但是不以自已嵌套自已
3. 必要时可以使用转义符 `\`，输出单引号或双引号

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    let user_name = '小明' // 使用单引号
    let gender = "男" // 使用双引号
    let str = '123' // 看上去是数字，但是用引号包裹了就成了字符串了
    let str1 = '' // 这种情况叫空字符串
		
    documeent.write(typeof user_name) // 结果为 string
    documeent.write(typeof gender) // 结果为 string
    documeent.write(typeof str) // 结果为 string
  </script>
</body>
</html>
```

**字符串拼接**

场景： + 运算符 可以实现字符串的拼接。
口诀：数字相加，字符相连

```javascript
console.log('野原' + '新之助');
```

**模板字符串**

- 使用场景
	- 拼接字符串和变量
	- 在没有它之前，要拼接变量比较麻烦

```javascript
let age = 25;
document.write('我今年' + age + '岁了'); 
```

- 语法
	- `(反引号)`
	- 在英文输入模式下按键盘的tab键上方那个键（1左边那个键）
	- 内容拼接变量时，用 `${ }` 包住变量

```javascript
let username = prompt('请输入您的姓名：');
let age = prompt('请输入您的年龄：');
document.write(`我叫${username}, 我今年${age}岁了`);
```

**总结**

1. JavaScript中什么样数据我们知道是字符串类型？
	- 只要用 单引号、双引号、反引号包含起来的就是字符串类型
1. 字符串拼接比较麻烦，我们可以使用什么来解决这个问题？
	- 模板字符串， 可以让我们拼接字符串更简便
1. 模板字符串使用注意事项：
	- 用什么符号包含数据？
		- 反引号
	- 用什么来使用变量？
		- ${变量名}

```javascript
document.write(`我叫${username}, 我今年${age}岁了`);
```

### 布尔类型

表示肯定或否定时在计算机中对应的是布尔类型数据，它有两个固定的值 `true` 和 `false`，表示肯定的数据用 `true`，表示否定的数据用 `false`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    //  pink老师帅不帅？回答 是 或 否
    let isCool = true // 是的，摔死了！
    isCool = false // 不，套马杆的汉子！

    document.write(typeof isCool) // 结果为 boolean
  </script>
</body>
</html>
```

### undefined

未定义是比较特殊的类型，只有一个值 undefined，只声明变量，不赋值的情况下，变量的默认值为 undefined，一般很少【直接】为某个变量赋值为 undefined。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    // 只声明了变量，并末赋值
    let tmp;
    document.write(typeof tmp) // 结果为 undefined
  </script>
</body>
</html>
```

**注：JavaScript 中变量的值决定了变量的数据类型。**



> [!attention]
>
> 工作中的使用场景
> 我们开发中经常声明一个变量，等待传送过来的数据。
> 如果我们不知道这个数据是否传递过来，此时我们可以通过检测这个变量是不是undefined，就判断用户是否有数据传递过来



### null（空类型）

JavaScript 中的 null 仅仅是一个代表“无”、“空”或“值未知”的特殊值。 

```javascript
// 3. null 空的 （空引用）
let obj = null;
console.log(obj);
```

**null 和 undefined 区别：**
- undefined 表示没有赋值
- null 表示赋值了，但是内容为空

**null 开发中的使用场景：**
官方解释：把 null 作为尚未创建的对象
大白话： 将来有个变量里面存放的是一个对象，但是对象还没创建好，可以先给个null

**总结：**

1. 布尔数据类型有几个值？
	-  true 和 false
2. 什么时候出现未定义数据类型？以后开发场景是？
	-  定义变量未给值就是 undefined
	- 如果检测变量是undefined就说明没有值传递过来
3. null 是什么类型？ 开发场景是？
	- 空类型
	- 如果一个变量里面确定存放的是对象，如果还没准备好对象，可以放个null

## 类型转换

> 理解弱类型语言的特征，掌握显式类型转换的方法

在 JavaScript 中数据被分成了不同的类型，如数值、字符串、布尔值、undefined，在实际编程的过程中，不同数据类型之间存在着转换的关系。

>[!question] 为什么需要类型转换？
>JavaScript是弱数据类型： JavaScript也不知道变量到底属于那种数据类型，只有赋值了才清楚。
>坑： 使用表单、prompt 获取过来的数据默认是字符串类型的，此时就不能直接简单的进行加法运算。

```javascript
console.log('10000' + '2000'); // 输出结果 10002000
```

此时需要转换变量的数据类型。
通俗来说，就是把一种数据类型的变量转换成我们需要的数据类型。

### 隐式转换

某些运算符被执行时，系统内部自动将数据类型进行转换，这种转换称为隐式转换。

规则：
- + 号两边只要有一个是字符串，都会把另外一个转成字符串
- 除了+以外的算术运算符 比如 - * / 等都会把数据转成数字类型
缺点：
- 转换类型不明确，靠经验才能总结
小技巧：
- +号作为正号解析可以转换成数字型
- 任何数据和字符串相加结果都是字符串

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 隐式转换</title>
</head>
<body>
  <script> 
    let num = 13 // 数值
    let num2 = '2' // 字符串

    // 结果为 132
    // 原因是将数值 num 转换成了字符串，相当于 '13'
    // 然后 + 将两个字符串拼接到了一起
    console.log(num + num2)

    // 结果为 11
    // 原因是将字符串 num2 转换成了数值，相当于 2
    // 然后数值 13 减去 数值 2
    console.log(num - num2)

    let a = prompt('请输入一个数字')
    let b = prompt('请再输入一个数字')

    alert(a + b);
  </script>
</body>
</html>
```

注：数据类型的隐式转换是 JavaScript 的特征，后续学习中还会遇到，目前先需要理解什么是隐式转换。

补充介绍模板字符串的拼接的使用

### 显式转换

编写程序时过度依靠系统内部的隐式转换是不严禁的，因为隐式转换规律并不清晰，大多是靠经验总结的规律。为了避免因隐式转换带来的问题，通常根逻辑需要对数据进行显示转换。

**概念**：
自己写代码告诉系统该转成什么类型

#### Number

通过 `Number` 显示转换成数值类型，当转换失败时结果为 `NaN`（Not a Number）即不是一个数字。

Number(数据)
- 转成数字类型
- 如果字符串内容里有非数字，转换失败时结果为 NaN（Not a Number）即不是一个数字
- NaN也是number类型的数据，代表非数字
parseInt(数据)
- 只保留整数
parseFloat(数据)
- 可以保留小数

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 隐式转换</title>
</head>
<body>
  <script>
    let t = '12'
    let f = 8

    // 显式将字符串 12 转换成数值 12
    t = Number(t)

    // 检测转换后的类型
    // console.log(typeof t);
    console.log(t + f) // 结果为 20

    // 并不是所有的值都可以被转成数值类型
    let str = 'hello'
    // 将 hello 转成数值是不现实的，当无法转换成
    // 数值时，得到的结果为 NaN （Not a Number）
    console.log(Number(str))
  </script>
</body>
</html>
```

#### String

编写程序时过度依靠系统内部的隐式转换是不严禁的，因为隐式转换规律并不清晰，大多是靠经验总结的规律。
为了避免因隐式转换带来的问题，通常根逻辑需要对数据进行显示转换。
**概念**：
自己写代码告诉系统该转成什么类型
**转换为字符型**:
- String(数据)
- 变量.toString(进制)


# Day 02

> 理解什么是流程控制，知道条件控制的种类并掌握其对应的语法规则，具备利用循环编写简易ATM取款机程序能力

- 运算符
- 语句
- 综合案例


## 运算符

### 算术运算符

数字是用来计算的，比如：乘法 * 、除法 / 、加法 + 、减法 - 等等，所以经常和算术运算符一起。

算术运算符：也叫数学运算符，主要包括加、减、乘、除、取余（求模）等

| 运算符 | 作用                                                 |
| ------ | ---------------------------------------------------- |
| +      | 求和                                                 |
| -      | 求差                                                 |
| *      |求积|
| /      | 求商                                                 |
| **%**  | 取模（取余数），开发中经常用于作为某个数字是否被整除 |

> 注意：在计算失败时，显示的结果是 NaN （not a number）

```javascript
// 算术运算符
console.log(1 + 2 * 3 / 2) //  4 
let num = 10
console.log(num + 10)  // 20
console.log(num + num)  // 20

// 1. 取模(取余数)  使用场景：  用来判断某个数是否能够被整除
console.log(4 % 2) //  0  
console.log(6 % 3) //  0
console.log(5 % 3) //  2
console.log(3 % 5) //  3

// 2. 注意事项 : 如果我们计算失败，则返回的结果是 NaN (not a number)
console.log('pink老师' - 2)
console.log('pink老师' * 2)
console.log('pink老师' + 2)   // pink老师2
```

### 赋值运算符

赋值运算符：对变量进行赋值的运算符

 =     将等号右边的值赋予给左边, 要求左边必须是一个容器

| 运算符 | 作用     |
| ------ | -------- |
| +=     | 加法赋值 |
| -+     |求差|
| \*=     | 乘法赋值 |
|  \/=     | 除法赋值 |
| %=     | 取余赋值 |

```javascript
<script>
let num = 1
// num = num + 1
// 采取赋值运算符
// num += 1
num += 3
console.log(num)
</script>
```

### 自增/自减运算符

| 符号 | 作用 | 说明                       |
| ---- | ---- | -------------------------- |
| ++   | 自增 | 变量自身的值加1，例如: x++ |
| --   | 自减 | 变量自身的值减1，例如: x-- |

1. ++在前和++在后在单独使用时二者并没有差别，而且一般开发中我们都是独立使用
2. ++在后（后缀式）我们会使用更多

> 注意：
>
> 1. 只有变量能够使用自增和自减运算符
> 2. ++、-- 可以在变量前面也可以在变量后面，比如: x++  或者  ++x 

```javascript
<script>
    // let num = 10
    // num = num + 1
    // num += 1
    // // 1. 前置自增
    // let i = 1
    // ++i
    // console.log(i)

    // let i = 1
    // console.log(++i + 1)
    // 2. 后置自增
    // let i = 1
    // i++
    // console.log(i)
    // let i = 1
    // console.log(i++ + 1)

    // 了解 
    let i = 1
    console.log(i++ + ++i + i)
  </script>
```

### 比较运算符

使用场景：比较两个数据大小、是否相等，根据比较结果返回一个布尔值（true / false）

| 运算符 | 作用                                   |
| ------ | -------------------------------------- |
| >      | 左边是否大于右边                       |
| <      | 左边是否小于右边                       |
| >=     | 左边是否大于或等于右边                 |
| <=     | 左边是否小于或等于右边                 |
| ===    | 左右两边是否`类型`和`值`都相等（重点） |
| ==     | 左右两边`值`是否相等                   |
| !=     | 左右值不相等                           |
| !==    | 左右两边是否不全等                     |

```javascript
<script>
  console.log(3 > 5)
  console.log(3 >= 3)
  console.log(2 == 2)
  // 比较运算符有隐式转换 把'2' 转换为 2  双等号 只判断值
  console.log(2 == '2')  // true
  // console.log(undefined === null)
  // === 全等 判断 值 和 数据类型都一样才行
  // 以后判断是否相等 请用 ===  
  console.log(2 === '2')
  console.log(NaN === NaN) // NaN 不等于任何人，包括他自己
  console.log(2 !== '2')  // true  
  console.log(2 != '2') // false 
  console.log('-------------------------')
  console.log('a' < 'b') // true
  console.log('aa' < 'ab') // true
  console.log('aa' < 'aac') // true
  console.log('-------------------------')
</script>
```

### 逻辑运算符

使用场景：可以把多个布尔值放到一起运算，最终返回一个布尔值

| 符号 | 名称   | 日常读法 | 特点                       | 口诀           |
| ---- | ------ | -------- | -------------------------- | -------------- |
| &&   | 逻辑与 | 并且     | 符号两边有一个假的结果为假 | 一假则假       |
| \|\| | 逻辑或 | 或者     | 符号两边有一个真的结果为真 | 一真则真       |
| !    | 逻辑非 | 取反     | true变false  false变true   | 真变假，假变真 |

| A     | B     | A && B | A \|\| B | !A    |
| ----- | ----- | ------ | -------- | ----- |
| false | false | false  | false    | true  |
| false | true  | false  | true     | true  |
| true  | false | false  | true     | false |
| true  | true  | true   | true     | false |

```javascript
<script>
    // 逻辑与 一假则假
    console.log(true && true)
    console.log(false && true)
    console.log(3 < 5 && 3 > 2)
    console.log(3 < 5 && 3 < 2)
    console.log('-----------------')
    // 逻辑或 一真则真
    console.log(true || true)
    console.log(false || true)
    console.log(false || false)
    console.log('-----------------')
    // 逻辑非  取反
    console.log(!true)
    console.log(!false)

    console.log('-----------------')

    let num = 6
    console.log(num > 5 && num < 10)
    console.log('-----------------')
  </script>
```

### 运算符优先级

> 逻辑运算符优先级： ！> && >  ||  

## 语句

### 表达式和语句

![](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img20230208202543.png)

### 分支语句

分支语句可以根据条件判定真假，来选择性的执行想要的代码

分支语句包含：

1. if分支语句（重点）
2. 三元运算符
3. switch语句

#### if 分支语句

语法：

~~~javascript
if(条件表达式) {
  // 满足条件要执行的语句
}
~~~

小括号内的条件结果是布尔值，为 true 时，进入大括号里执行代码；为false，则不执行大括号里面代码

小括号内的结果若不是布尔类型时，会发生类型转换为布尔值，类似Boolean()

如果大括号只有一个语句，大括号可以省略，但是，俺们不提倡这么做~

~~~javascript
<script>
    // 单分支语句
    // if (false) {
    //   console.log('执行语句')
    // }
    // if (3 > 5) {
    //   console.log('执行语句')
    // }
    // if (2 === '2') {
    //   console.log('执行语句')
    // }
    //  1. 除了0 所有的数字都为真
    //   if (0) {
    //     console.log('执行语句')
    //   }
    // 2.除了 '' 所有的字符串都为真 true
    // if ('pink老师') {
    //   console.log('执行语句')
    // }
    // if ('') {
    //   console.log('执行语句')
    // }
    // // if ('') console.log('执行语句')

    // 1. 用户输入
    let score = +prompt('请输入成绩')
    // 2. 进行判断输出
    if (score >= 700) {
      alert('恭喜考入黑马程序员')
    }
    console.log('-----------------')

  </script>
~~~

#### if双分支语句

如果有两个条件的时候，可以使用 if else 双分支语句

~~~javascript
if (条件表达式){
  // 满足条件要执行的语句
} else {
  // 不满足条件要执行的语句
}
~~~

例如：

~~~javascript
 <script>
    // 1. 用户输入
    let uname = prompt('请输入用户名:')
    let pwd = prompt('请输入密码:')
    // 2. 判断输出
    if (uname === 'pink' && pwd === '123456') {
      alert('恭喜登录成功')
    } else {
      alert('用户名或者密码错误')
    }
  </script>
~~~

#### if 多分支语句

使用场景： 适合于有多个条件的时候

~~~javascript
 <script>
    // 1. 用户输入
    let score = +prompt('请输入成绩：')
    // 2. 判断输出
    if (score >= 90) {
      alert('成绩优秀，宝贝，你是我的骄傲')
    } else if (score >= 70) {
      alert('成绩良好，宝贝，你要加油哦~~')
    } else if (score >= 60) {
      alert('成绩及格，宝贝，你很危险~')
    } else {
      alert('成绩不及格，宝贝，我不想和你说话，我只想用鞭子和你说话~')
    }
  </script>
~~~

#### 三元运算符（三元表达式）

**使用场景**： 一些简单的双分支，可以使用  三元运算符（三元表达式），写起来比 if  else双分支 更简单

**符号**：? 与 : 配合使用

语法：

~~~javascript
条件 ? 表达式1 ： 表达式2
~~~

例如：

~~~javascript
// 三元运算符（三元表达式）
// 1. 语法格式
// 条件 ? 表达式1 : 表达式2 

// 2. 执行过程 
// 2.1 如果条件为真，则执行表达式1
// 2.2 如果条件为假，则执行表达式2

// 3. 验证
// 5 > 3 ? '真的' : '假的'
console.log(5 < 3 ? '真的' : '假的')

// let age = 18 
// age = age + 1
//  age++

// 1. 用户输入 
let num = prompt('请您输入一个数字:')
// 2. 判断输出- 小于10才补0
// num = num < 10 ? 0 + num : num
num = num >= 10 ? num : 0 + num
alert(num)
~~~

#### switch语句（了解）

使用场景： 适合于有多个条件的时候，也属于分支语句，大部分情况下和 if多分支语句 功能相同

注意：

1. switch case语句一般用于等值判断, if适合于区间判断
2. switchcase一般需要配合break关键字使用 没有break会造成case穿透
3. if 多分支语句开发要比switch更重要，使用也更多

例如：

~~~javascript
// switch分支语句
// 1. 语法
// switch (表达式) {
//   case 值1:
//     代码1
//     break

//   case 值2:
//     代码2
//     break
//   ...
//   default:
//     代码n
// }

<script>
  switch (2) {
    case 1:
    console.log('您选择的是1')
    break  // 退出switch
    case 2:
    console.log('您选择的是2')
    break  // 退出switch
    case 3:
    console.log('您选择的是3')
    break  // 退出switch
    default:
    console.log('没有符合条件的')
  }
</script>
~~~

#### 断点调试

**作用：学习时可以帮助更好的理解代码运行，工作时可以更快找到bug**

浏览器打开调试界面

1. 按F12打开开发者工具
2. 点到源代码一栏 （ sources ）
3. 选择代码文件

**断点：**在某句代码上加的标记就叫断点，当程序执行到这句有标记的代码时会暂停下来



### 循环语句

使用场景：重复执行 指定的一段代码，比如我们想要输出10次 '我学的很棒'

学习路径：

1.while循环

2.for 循环（重点）

#### while循环

while :  在…. 期间， 所以 while循环 就是在满足条件期间，重复执行某些代码。

**语法：**

~~~javascript
while (条件表达式) {
   // 循环体    
}
~~~

例如：

~~~javascript
// while循环: 重复执行代码

// 1. 需求: 利用循环重复打印3次 '月薪过万不是梦，毕业时候见英雄'
let i = 1
while (i <= 3) {
  document.write('月薪过万不是梦，毕业时候见英雄~<br>')
  i++   // 这里千万不要忘了变量自增否则造成死循环
}
~~~

循环三要素：

1.初始值 （经常用变量）

2.终止条件

3.变量的变化量

例如：

~~~javascript
<script>
  // // 1. 变量的起始值
  // let i = 1
  // // 2. 终止条件
  // while (i <= 3) {
  //   document.write('我要循环三次 <br>')
  //   // 3. 变量的变化量
  //   i++
  // }
  // 1. 变量的起始值
  let end = +prompt('请输入次数:')
let i = 1
// 2. 终止条件
while (i <= end) {
  document.write('我要循环三次 <br>')
  // 3. 变量的变化量
  i++
}

</script>
~~~

#### 中止循环

`break`   中止整个循环，一般用于结果已经得到, 后续的循环不需要的时候可以使用（提高效率）  

`continue`  中止本次循环，一般用于排除或者跳过某一个选项的时候

~~~javascript
<script>
    // let i = 1
    // while (i <= 5) {
    //   console.log(i)
    //   if (i === 3) {
    //     break  // 退出循环
    //   }
    //   i++

    // }


    let i = 1
    while (i <= 5) {
      if (i === 3) {
        i++
        continue
      }
      console.log(i)
      i++

    }
  </script>
~~~

#### 无限循环

1.while(true) 来构造“无限”循环，需要使用break退出循环。（常用）

2.for(;;) 也可以来构造“无限”循环，同样需要使用break退出循环。

~~~javascript
// 无限循环  
// 需求： 页面会一直弹窗询问你爱我吗？
// (1). 如果用户输入的是 '爱'，则退出弹窗
// (2). 否则一直弹窗询问

// 1. while(true) 无限循环
// while (true) {
//   let love = prompt('你爱我吗?')
//   if (love === '爱') {
//     break
//   }
// }

// 2. for(;;) 无限循环
for (; ;) {
  let love = prompt('你爱我吗?')
  if (love === '爱') {
    break
  }
}
~~~

## 综合案例-ATM存取款机

![](https://raw.githubusercontent.com/WeiXinao/imageBed/main/img20230208202714.png)

分析：

①：提示输入框写到循环里面（无限循环）

②：用户输入4则退出循环 break

③：提前准备一个金额预先存储一个数额 money

④：根据输入不同的值，做不同的操作

​     (1)  取钱则是减法操作， 存钱则是加法操作，查看余额则是直接显示金额

​     (2) 可以使用 if else if 多分支 来执行不同的操作

完整代码：

~~~javascript
<script>
  // 1. 开始循环 输入框写到 循环里面
  // 3. 准备一个总的金额
  let money = 100
while (true) {
  let re = +prompt(`
请您选择操作：
1.存钱
2.取钱
3.查看余额
4.退出
`)
  // 2. 如果用户输入的 4 则退出循环， break  写到if 里面，没有写到switch里面， 因为4需要break退出循环
  if (re === 4) {
    break
  }
  // 4. 根据输入做操作
  switch (re) {
    case 1:
      // 存钱
      let cun = +prompt('请输入存款金额')
      money = money + cun
      break
      case 2:
      // 取钱
      let qu = +prompt('请输入取款金额')
      money = money - qu
      break
      case 3:
      // 查看余额
      alert(`您的银行卡余额是${money}`)
      break
  }
}
</script>
~~~

![](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202302220054548.png)







