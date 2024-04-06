# JavaScript 基础补充

## 对象

### JS 中的数据类型

JS 中的数据类型分为两大类：**原始值**和**对象**，或者称为**基本数据类型**和**引用数据类型**，其中，

原始值包括：

1. 数值 Number
2. 大整数 BigInt
3. 字符串 String
4. 布尔值 Boolean
5. 空值 Null
6. 未定义 Undefined
7. 符号 Symbol

对象包括：

1. 对象 Object
2. 函数 Function
3. 数组 Array

### 什么是对象？

对象是 JS 中的一种复合数据类型，它相当于一个容器，在对象中可以存储不同类型的数据。

### 为什么要引入对象？

原始值只能用来表示一些简单的数据，不能表示复杂数据

比如：现在需要在程序中表示一个人的信息

```javascript
let name = "孙悟空";
let age = 18;
let gender = "男";
```

上述表示方式，我们能确定这些信息是一个人的还是多个人的吗？答案是不能的。如果我们想用多条信息来描述一个人，我们该怎么表示呢？由此，就引出了我们的变量。

### 对象的声明

声明一个对象有两种方式，

方式1：

```javascript
let obj = new Object();
```

方式2：

```javascript
let obj = Object();
```

## 对象的属性

对象中可以存储多个类型的数据，对象中存储的数据，我们称为**属性**。

向对象中添加属性：

```
对象.属性名 = 属性值
```

```javascript
obj.name = "孙悟空";
obj.age = 18;
obj.gender = '男';
```

 读取对象中的属性：

```
对象.属性名
```

```javascript
console.log(obj.name);
```

修改属性：

```javascript
obj.name = "Tom sun";
```

删除属性：

```javascript
delete obj.name;
```

如果读取的是一个对象中没有的属性，不会报错而是 undefined

```javascript
delete obj.name;
console.log(obj.name);
```

![image-20230309141003016](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091410102.png)

![image-20230309142754532](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091427602.png)

![image-20230309143019277](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091430334.png)

![image-20230309143655911](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091436962.png)

![image-20230309144127871](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091441916.png)

![image-20230309144733626](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091447680.png)

![image-20230309144907427](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091449480.png)

```javascript
let obj = Object();
console.log(typeof obj);
```



![image-20230309145113664](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091451707.png)

![image-20230309145517978](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303091455023.png)

