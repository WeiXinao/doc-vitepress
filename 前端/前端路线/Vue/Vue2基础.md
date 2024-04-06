# Vue2 基础

## 第一章 Vue 核心

### 1.1 Vue简介

#### 1.1.1. 官网

1. 英文官网: https://vuejs.org/
2. 中文官网: https://cn.vuejs.org/

#### 1.1.2. 介绍与描述

1. 动态构建用户界面的<font color='red'>**渐进式**</font>JavaScript 框架
2. 作者: 尤雨溪

#### 1.1.3. Vue 的特点

1. 遵循MVVM 模式
2. 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
3. 它本身只关注UI, 也可以引入其它第三方库开发项目

#### 1.1.4. 与其它JS 框架的关联

1. 借鉴 Angular 的模板和数据绑定技术
2. 借鉴 React 的组件化和虚拟DOM 技术

#### 1.1.5. Vue 周边库

1. vue-cli: vue 脚手架

2. vue-resource

3. axios

4. vue-router: 路由

5. vuex: 状态管理

6. element-ui: 基于vue 的 UI 组件库(PC 端)

   ……

### 1.2. 初识Vue

![image-20230320232400378](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303211701600.png)

```html
<!-- 准备好一个容器 -->
    <div id="demo">
        <!-- 插值语法 -->
        <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
    </div>
    <script>
        Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
        // 创建Vue实例
        new Vue({
            el: '#demo', // el 用户指定当前 Vue 实例为哪个容器服务，值通常为 CSS 选择器字符串。
            // el: document.getElementById('root')
            data: { // data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象
                name: 'XiaoXin',
                address: '湖北武汉'
            }
        });
    </script>
```

> [!note]
>
> - 初识Vue
>   1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
>   2. root容器里面的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
>   3. root容器里面的代码称为『Vue模板』；
>   4. Vue实例和容器是一一对应的；
>   5. 真实开发中只要一个Vue实例，并且会配合着组件一起使用；
>   6. {{xxx}} 中的xxx要写js表达式，且xxx可以自动读取到data中的属性；
>   7. 一旦data中的数据发生改变，那么模板中用到该数据的地方也会自动更新； 
>
> - 注意区分：js 表达式 和 js 代码（语句）
>   1. 一个表达式会生成一个值，可以放在任何一个需要值的地方：
>      1. `a`
>      2. `a + b`
>      3. `demo(1)`
>      4. `x === y ? 'a': 'b'`
>   2. js代码（语句）
>      1. `if () {}`

### 1.3 模板语法

#### 1.3.1. 效果
![数据代理](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303181947294.png)

![Vue检测数据改变的原理](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303211700927.png)

  

非单文件组件：
	一个文件中包含有 n 个组件。

单文件组件：
	一个文件中只包含有 1 个组件。	

Vue CLI(Vue commend line interface)

```markdown
package-lock.json		包版本控制文件
README.md				对整个工程进行一个说明
```

> vue.runtime.esm.js	esm 表示 ES module

为什么要用精简版的 Vue？

```
举个例子：
	装修——铺瓷砖
		第一种：
			买瓷砖（Vue 核心）+ 买工人（模板解析器）======> 铺好的瓷砖+工人
            
        第二种：
			买瓷砖（Vue 核心） + 雇工人（模板解析器）======> 铺好的瓷砖
```

Webpack 中的 loader：eslint、jslint、jshint 都能进行语法检查。

