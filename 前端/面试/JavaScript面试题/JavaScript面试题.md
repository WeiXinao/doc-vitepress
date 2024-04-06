# JavaScript面试题

1. JS 由哪三部分组成？

   ```
   ECMAScript：JS 的核心内容，描述了语言的基础语，比如 var，for，数据类型（数组、字符串）
   文档对象模型（DOM）：DOM 把整个HTML页面规划为元素构成的文档
   浏览器对象模型（BOM）：可以对浏览器窗口进行访问和操作（在浏览器上弹出一些窗口，关闭窗口，移动窗口，提供浏览器信息，页面的信息，屏幕的信息）
   ```

   

2. JS 有哪些内置对象？

   ```
   String Boolean Number Array Object Function Math Date RegExp ...
   Math
   	abs() sqrt() max() min()
   Date
   	new Date() getYear()
   Array
   	见题3
   String
   	concat() length slice() split()
   ```

   

3. 操作数组的方法有哪些？

   ```
   push() pop() sort() splice() unshift() shift() reverse() concat() join()
   map() filter() ervery() some() ruduce() isArray() findIndex()
   哪些方法会改变原数组？
   	push() pop() unshift() shift() sort() reverse() splice()
   ```

   

4. JS对数据类的检测方法有哪些？

   ```
   typeof() 对基本数据类型没问题，遇到引用数据类型就不管用
   instance() 只能判断引用数据类型，不能判断基本数据类型
   constructor() 几乎可以判断基本数据类型和引用数据类型；如果声明了一个构造函数，并把它的原型指向了 Array 的时候， constructor 就判断不出来了Object.prototype.toString.call()
   ```

   示例：

   ```javascript
   // typeof() 对基本数据类型没问题，遇到引用数据类型就不管用
   console.log(typeof 666); // number
   console.log(typeof [1, 2, 3]); // Object
   // instance() 只能判断引用数据类型，不能判断基本数据类型
   console.log([] instanceof Array) // true
   console.log('abc' instanceof String) // false
   // constructor() 几乎可以判断基本数据类型和引用数据类型；如果声明了一个构造函数，并把它的原型指向了 Array 的时候， constructor 就判断不出来了  
   console.log(('abc').constructor === String); // true
   // Object.prototype.toString.call()
   var opt = Object.prototype.toString;
   console.log(opt.call(2)); // [object Number]
   console.log(opt.call(true)); // [object Boolean]
   console.log(opt.call('aaa')); // [object String]
   console.log(opt.call([])); // [object Array]
   console.log(opt.call({})); // [object Object]
   console.log(String); // [Function: String]
   ```

   

5. 说一下闭包，闭包有什么特点？

   ```
    什么是闭包？
    函数嵌套函数，内部函数被外部函数返回并保存下来时，就会产生闭包
   ```

   示例

   ```js
   function fn(a) { 
       return function () {
           console.log(a);
       }
   }
   
   var fo = fn('abcd');
   fo();
   ```

   ```
   特点：可以重复利用变量，并且这个变量不会污染全局的一种机制；一直保存在内存中，不会被垃圾回收机制回收
   缺点：闭包较多是时候，会消耗内存，导致页面的性能下降，在IE浏览器中才会导致内存泄露
   怎么解决？
   	手动删除，把不需要的变量赋值为空
   使用场景：防抖，节流，函数嵌套函数避免全局污染的时候
   ```

   

6. 前端的内存泄露怎么怎么理解？

   ```
   JS 里已经分配内存地址的对象，但是由于长时间没有释放或没法清除，造成长期占用内存的现象，会让内存资源大幅浪费，最终导致运行速度慢，甚至崩溃的情况。（主要出现在 IE 浏览器中）
   垃圾回收机制
   因素：一些未声明，直接赋值的变量：一些未清空的的定时器；一些未清空的定时器；过度的闭包 
   ```

   

7. 事件委托是什么？

   ```
   又叫事件代理，原理就是利用了事件冒泡的机制来实现，也就是说把子元素的事件，绑定到了父元素的身上
   如果子元素阻止了事件冒泡，那么委托也就不成立了
   阻止事件冒泡：event.stopPropagation()
   		   addEventlistener('click', 函数名, true/false) 默认是 false(事件冒泡)，true（事		   件捕获）
              好处：提高性能，减少事件绑定，也就减少了内存的占用。
   ```

   

8. 基本数据类型和引用数据类型的区别？

   ``` N
   基本数据类型：String Number Boolean undefined null
   	基本数据类型保存在栈内存当中，保存的就是一个具体的值
   引用数据类型（复杂数据类型）：Object Function Array
   	引用数据类型保存在堆内存中， 声明一个引用类型的变量，它保存的是引用类型数据的地址
   	假如声明了两个引用类型，同时指向了一个地址的时候，修改其中一个，那么另外一个也会改变
   ```

   

9. 说一下原型链。

   ```
   原型就是一个普通对象，它是为构造函数的实例共享属性和方法；所有实例中引用的原型都是同一个对象
   使用 prototype 可以把方法挂在原型上，内存只保存一份，其他的实例可以去共享它 
   实例是怎么访问到原型上的方法的？
   	__proto__ 可以理解为一个指针，实例对象中的属性，指向构造函数的原型（prototype）
   原型链到底是什么？
   	示例对象在调用属性和方法的时候，会依次从实例本身，到构造函数原型，再到原型的原型上去查找，查看是否有我们需要的属性或方法
   ```

   ![原型链](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202303151044913.png)

   示例1

   ```javascript
   function Person() { 
       this.say = function () {
           console.log('唱歌');
       }
   }
   
   var p1 = new Person();
   var p2 = new Person();
   p1.say();
   p2.say();
   
   Person.prototype.look = function () {
       console.log('西游记');
   }
   p1.look();
   p2.look();
   ```

   示例2：

   ```javascript
   function Person() {
   }
   
   var p1 = new Person();
   var p2 = new Person();
   
   Person.prototype.look = function () {
       console.log('西游记');
   }
   p1.look();
   p2.look();
   
   console.log(p1.__proto__ === Person.prototype); // true 
   ```

   

10. new操作符具体做了什么？

    ```
    1. 创建一个空对象
    2. 把空对象和构造函数通过原型链进行链接
    3. 把构造函数的 this 绑定到新的空对象身上
    4. 根据构建函数返回的类型判断，如果是值类型，则返回对象，如果是引用类型，就返回这个引用类型
    ```

    