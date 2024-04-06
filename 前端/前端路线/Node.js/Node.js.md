# Node.js

## Node.js 简介

Node.js是一个构建在V8引擎之上的JavaScript运行环境。它使得JS可以运行在浏览器以外的地方。相对于大部分的服务端语言来说，Node.js有很大的不同，它采用了单线程，且通过异步的方式来处理并发的问题。

- 运行在服务器端的JS
- 用来编写服务器
- 特点：
  - 单线程、异步、非阻塞
  - 统一 API

### Node.js 和 JavaScript 区别

JavaScript 组成

- ECMAScript（European Computer Manufacturer Association）
- DOM（node 没有）
- BOM（node 没有）

DOM、BOM 中有用的 API node.js 进行了保留，如 `setTimeout()、console.log`

## 安装

### 直接安装

可以通过多种不同的方式在计算机中安装Node.js，其中最简单的方式便是直接在官网下载安装，官网地址：https://nodejs.org/en/，在官网点击对应的版本即可自动下载Node.js。

下载后，双击安装包根据提示一步一步安装即可，安装时建议不要修改安装路径，直接安装到默认位置。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/09/20220927082054994.png)

安装出现这个界面时，勾选上面的选项，主要是安装一些必要的工具（像python）如果不勾选将会有一些的模块将无法使用（也可以安装完node后再单独安装这些）。最后一步一步按照提示点击安装，等待进度条读完即可。

安装完毕打开命令行窗口，输入`node -v`，出现node版本号，即表示安装成功。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/09/20220927082624151.png)

### 使用安装工具Nvm

除了直接安装外，也可以通过安装工具来安装，使用安装工具安装后更方便我们在不同的node版本之间进行切换，使用起来更加灵活。

这里我们以window下的nvm为例来演示，首先打开https://github.com/coreybutler/nvm-windows/releases，下载最新版的nvm-setup.exe。根据提示下一步下一步即可，同样推荐安装到默认路径。在命令行中输入`nvm version`后，出现版本即表示安装成功。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/09/20220927085852254.png)

需要注意的是，此处仅仅是安装了nvm，并没有安装node，接下来我们还需要通过命令行的形式安装node。输入`nvm install latest`下载并安装最新版的node，输入`nvm install lts`安装稳定版的node，也可以输入版本号，安装指定版本node。下载需要花费一定的时间，请耐心等待。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/09/20220927090337962.png)

输入`nvm use latest`切换到最新版node，输入`nvm use lts`切换到稳定版node，也可以输入版本号来切换到指定版本。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/09/20220927093949514.png)

### NVM配置镜像服务器

nvm毕竟还是国外的软件，由于一些特殊原因在国内访问时会有无法下载node的情况出现，这时我们只需要将nvm的服务器修改为国内的镜像服务器即可解决该问题。比如，可以通过如下代码将nvm的node镜像服务器修改为国内的阿里云：

```bash
nvm node_mirror https://npmmirror.com/mirrors/node/
```

### NVM 常用命令

```bash
nvm list                                 显示已安装的 node 版本
nvm install 版本						    安装指定版本的 node
nvm use 版本								指定要使用的 node 版本
```

## 异步编程

### 进程和线程

- 进程（厂房）
  - 程序的运行环境

- 线程（工人）
  - 线程是实际进行运算的东西

### 同步和异步

#### 同步

- 通常代码都是自上而下一行一行执行的
- 前面的代码不执行，后面的代码也不会执行
- 同步的代码执行会出现阻塞的情况

比如现实生活中

1. 点菜
2. 厨师做菜
3. 吃

#### 解决同步问题

- Java Python

  - 通过多线程来解决
- node.js
- 通过异步方式来解决

#### 异步 

- 一段代码的执行不会影响其他的程序

- 异步的问题

  - 异步的代码无法通过 return 来设置返回值

    ```js
    function sum(a, b) { 
      const begin = Date.now();
      
      setTimeout(() => {
        return a + b;
      }, 10000);  
    }
    
    console.log("1111111");
    
    const result = sum(123, 456);
    console.log('result', result);
    
    console.log('2222222');
    
    console.log('哈哈');
    console.log('嘻嘻');
    console.log('呵呵');
    ```

    ```
    1111111
    result undefined
    2222222
    哈哈
    嘻嘻
    呵呵
    ```

- 特点：

  1. 不会阻塞其他代码的执行

  2. 需要通过回调函数来返回结果 

     ```js
     function sum(a, b, callback) { 
       setTimeout(() => {
         callback(a + b);
       }, 10000);  
     }
     
     console.log("1111111");
     
     sum(123, 456, (result) => {
       console.log('result', result);
     });
     
     console.log('2222222');
     
     console.log('哈哈');
     console.log('嘻嘻');
     console.log('呵呵');
     ```

     ```
     1111111
     2222222
     哈哈
     嘻嘻
     呵呵
     result 579
     ```

- 基于回调函数的异步带来的问题

  1. 代码的可读性差

  2. 可调试性差

     ```js
     function sum(a, b, callback) { 
       setTimeout(() => {
         callback(a + b);
       }, 1000);  
     }
     
     console.log("1111111");
     
     // 回调地狱（死亡金字塔）
     sum(123, 456, (result) => {
       sum(result, 777, (result) => { 
         sum(result, 888, result => {
           sum(result, 999, result => {
             sum(result, 10, result => {
               console.log('result',result);
             })
           })
         })
       });
     });
     
     console.log('2222222');
     
     console.log('哈哈');
     console.log('嘻嘻');
     console.log('呵呵');
     ```

     #### 解决回调函数的问题

     - 需要一个东西，可以代替回调函数来给我们返回结果
     - Promise 横空出世
       - Promise 是一个可以用来存储数据的对象，Promise 存储数据的方式比较特殊，这种特殊方式使得 Promise 可以用来存储异步调用的数据。

## Promise

异步调用要通过回调函数来返回数据，当我们进行一些复杂的调用时，会出现「回调地狱」

问题：

异步必须通过回调函数来返回结果，回调函数一多就很痛苦

Promise

- Promise 可以帮助我们解决异步中的回调函数的问题
- Promise 就是一个用来存储数据的容器
  - 它拥有着一套特殊的存储数据的方式
  - 这个方式使得它里面可以存储异步调用的结果

### 创建Promise

Promise存储值的方式非常的特别，我们先来看看它的构造函数：

```js
const promise = new Promise(executor)
```

创建Promise时需要一个executor（执行器）为参数，执行器是一个回调函数，进一步调用它大概长这个样子：

```js
const promise = new Promise((resolve, reject) => {})
```

回调函数在执行时会收到两个参数，两个参数都是函数。第一个函数通常命名为resolve，第二个函数通常会命名为reject。向Promise中存储值的关键就在于这两个函数，可以将想要存储到Promise中的值作为函数的参数传递，像是这样：

```js
const promise = new Promise((resolve, reject) => {
    resolve("哈哈")
})
```

这样我们就将”哈哈”这个字符串存储到了Promise中，那么问题又来了，为什么需要两个函数存储值呢？很简单，resolve用来存储运行正确时的数据，reject用来存储运行出错时的错误信息。我们在使用Promise时需要根据不同的情况，调用不同的函数来存储不同的数据。

Promise为什么整了如此复杂的一种方式来存储数据呢？如果仅仅是存储其他的数据，这么做确实有点脱了放。但是Promise是专门为了异步调用而生的，所以Promise中存储的主要是异步调用的数据，也就是那些本来需要通过回调函数来传递的数据。在Promise中，可以直接调用异步代码，在异步代码执行完毕后直接调用resolve或reject来将执行结果存储到Promise中，这就解决了异步代码无法设置返回值的问题。换句话说，异步代码的执行结果可以直接存储到Promise中，像是这样：



```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("哈哈")
    }, 10000)
})
```

上例中通过setTimeout实现了一个异步调用，定时器会在10秒后执行，并调用resolve将”哈哈”存储到Promise中。现在你应该能够理解为什么Promise有这么一个奇怪的存储值的方式了吧？

### 获取Promise中的数据

Promise存储数据的方式奇特，读取方式同样特殊。我们需要通过Promise的实例方法来读取存储到Promise中的数据。现在我们有这样一个Promise，Promise中通过resolve存储了一个数据”哈哈”：



```js
const promise = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve("哈哈")
    }, 10000)
})
```

#### Then

then是Promise的实例方法，通过该方法可以获取到Promise中存储的数据。它需要一个回调函数作为参数，Promise中存储的数据会作为回调函数的实参返回给我们：



```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("哈哈")
    }, 10000)
})

promise.then((data) => {
    console.log(data) // "哈哈"
})
```

注意：这种方式只适合读取通过resolve存储的数据，如果存储数据时出现了错误，或者是通过reject存储的数据，这种方式是读取不到的：



```js
const promise = new Promise((resolve, reject) => {
    throw new Error("出错了！")
    setTimeout(() => {
        resolve("哈哈")
    }, 10000)
})

promise.then((data) => {
    console.log(data)
})
```



```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("哈哈")
    }, 10000)
})

promise.then((data) => {
    console.log(data)
})
```

上边的两块代码都是读取不到数据的，而且运行时会在控制台报出错误信息。这是因为，then的第一个参数只负责读取Promise中代码正常执行的结果，也就是只有Promise中数据正常时才会被调用。当Promise中的代码出错，或通过reject来添加数据时，我们还需要为其指定第二个参数来处理错误。

then的第二个参数同样是一个回调函数，两个回调的函数的结构相同，不同点在于第一个回调函数会在没有异常时被调用。而第二个函数会在出现错误（或通过reject存储数据）时调用。



```js
const promise = new Promise((resolve, reject) => {
    throw new Error("主动抛出错误")
    setTimeout(() => {
        resolve("哈哈")
    }, 10000)
})

promise.then((data) => {
    console.log(data)
}, (err) => {
    console.log("出错了", err)
})
```



```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("哈哈")
    }, 10000)
})

promise.then((data) => {
    console.log(data)
}, (err) => {
    console.log("出错了", err)
})
```

上边两个案例中，then的第二个回调函数会执行。执行时异常信息或时reject中返回的数据会作为参数传递。现实开发中，第二个回调函数通常会用来编写异常处理的代码。

#### 原理

在Promise中维护着两个隐藏的值PromiseResult和PromiseState，PromiseResult是Promise中真正存储值的地方，在Promise中无论是通过resolve、reject还是报错时的异常信息都会存储到PromiseResult中。PromiseState用来表示Promise中值的状态，Promise一共有三种状态：pending、fulfilled、rejected。pending是Promise的初始化状态，此时Promise中没有任何值。fulfilled是Promise的完成状态，此时表示值已经正常存储到了Promise中（通过resolve）。rejected表示拒绝，此时表示值是通过reject存储的或是执行时出现了错误。

当我们调用Promise的then方法时，相当于为Promise设置了一个回调函数，换句话说，then中的回调函数不会立即执行，而是在Promise的PromiseState发生变化时才会执行。如果PromiseState从pending变成了fulfilled则then的第一个回调函数执行，且PromiseResult的值作为参数传递给回调函数。如果PromiseState从pending变成了rejected则then的第二个回调函数执行，且PromiseResult的值作为参数传递给回调函数。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221010132511667-1024x574.png)

then执行后每次总会返回一个新的Promise，并将then中回调函数的返回值存储到这个Promise中，如果没有指定返回值则新Promise中不会存储任何值。



```js
const promise = new Promise((resolve, reject)=>{
    resolve("第一步执行结果")
})

const promise2 = promise.then(result => {
    console.log("收到结果：", result)
    return "第二步执行结果" // 会作为新的结果存储到新Promise中
})

const promise3 = promise2.then(result => {
    console.log("收到结果：", result)
    return "第三步执行结果" // 会作为新的结果存储到新Promise中
})
```

在简化一些可以这样写：



```js
const promise = new Promise((resolve, reject)=>{
    resolve("第一步执行结果")
})

promise.then(result => {
    console.log("收到结果：", result)
    return "第二步执行结果" // 会作为新的结果存储到新Promise中
}).then(result => {
    console.log("收到结果：", result)
    return "第三步执行结果" // 会作为新的结果存储到新Promise中
})
```

第一个then用来读取上边我们创建的Promise中存储的结果，第二个then用来读取第一个then所返回的结果，依此类推我们就可以根据需要一直then下去，如此便解决了“回调地狱”的问题。

有了Promise后，在异步函数中我们便不再需要通过回调函数来返回结果，取而代之的是返回一个Promise，并将异步执行的结果存储到Promise中，像是这样：



```js
function sum(a, b){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(a + b)
        }, 10000)
    })
}
```

由于sum的返回值是一个Promise，所以我们不在需要通过回调函数来读取结果：



```js
sum(123, 456).then(result => {
    console.log("结果为：", result) // 结果为： 579
})
```

如果需要连续多次调用，也不会在有“回调地狱的问题”：



```js
sum(123, 456)
    .then(result => sum(result, 777))
    .then(result => sum(result, 888))
    .then(result => console.log(result))
```

#### Catch

除了then以外，Promise中还有一个catch方法，catch和then使用方式类似，但是catch中只需要一个回调函数作为参数。catch中回调函数的作用等同于then中的第二个回调函数，会在执行出错时被调用。既然有了then的第二个参数，为什么还需要一个catch呢？两个回调函数都写到then中，会导致代码不够清晰，但是多了一个catch后立刻就变的不一样了，开发时通常会在then中编写正常运行时的代码，catch中编写出现异常后要执行的代码：



```js
const promise = new Promise((resolve, reject) => {
    reject("出错了")
})


// 出现异常，then中只传了一个回调函数，无法读取数据
// promise.then((data) => {
//     console.log(data)
// }) 

// 出现异常，可以通过catch来读取数据
promise.catch(err => {
    console.log(err)
})
```

当Promise中代码执行出错时（或者reject执行时），如果我们调用的是catch来处理数据，则Promise会将错误信息传递给catch的回调函数，我们便可以在catch中处理异常，同时catch回调函数的返回值会作为下一步Promise中的数据向下传递。如果我们调用了then来处理数据，同时没有传递第二个参数，这时then是不会执行的，而是将错误信息直接添加到下一步返回的Promise中，由后续的方法处理。在后续调用中如果有catch或then的第二个参数，则正常处理。如果没有，则报错。

简言之，处理Promise时，如果没有对Promise中的异常进行处理（无论是then的二参数，还是catch），则异常信息总是会封装到下一步的Promise中进行传递，直到找到异常处理的代码位置，如果一直没有处理，则报错。

这种设计方式使得我们可以在任意的位置对Promise的异常进行处理，例如有如下代码：



```js
function sum(a, b) {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.7) {
            throw new Error("出错了")
        }
        resolve(a + b)
    })
}

sum(123, 456)
    .then(result => sum(result, 777))
    .then(result => sum(result, 888))
    .then(result => console.log(result))
```

上例代码中，sum函数有一定的几率会出现异常，但是我们并不确定何时会出现异常，这时有了catch就变的非常的方便，因为在出现异常后所有的then在异常处理前都不会执行，所以我们可以将catch写在调用链的最后，这样无论哪一步出现异常，我们都可以在最后统一处理。像是这样：



```js
sum(123, 456)
    .then(result => sum(result, 777))
    .then(result => sum(result, 888))
    .then(result => console.log(result))
    .catch(err => console.log("哎呀出错了，随便返回一个吧", 8888))
```

当然如果我们想在中间处理异常也是没有问题的，只是需要注意在链式调用中间处理异常时，由于后续还有then要执行，所以一定不要忘了考虑是否需要在catch中返回一个结果供后续的Promise使用：



```js
sum(123, 456)
    .then(result => sum(result, 777))
    .catch(err => {
        // 也可以在调用链的中间处理异常
        console.log("出错了，我选择忽略这个错误，重新计算")
        return sum(123, 456)
    })
    .then(result => sum(result, 888))
    .then(result => console.log(result))
    .catch(err => console.log("哎呀出错了，随便返回一个吧", 8888))
```

还有一点要强调一下，在Promise正常执行的情况下如果遇到catch，catch是不会执行的，此时Promise中的结果会自动传递给下一个Promise供后续使用。

#### Finally

finally也是Promise的实例方法之一，和then、catch不同，无论何种情况finally中的回调函数总会执行，通常我们在finally中定义一些无论Promise正确执行与否都需要处理的工作。注意，finally的回调函数不会接收任何参数，同时finally的返回值也不会成为下一步的Promise中的结果。简单说，finally只是编写一些必须要执行的代码，不会对Promise产生任何实质的影响。

## 静态方法

Promise的静态方法直接通过Promise类去调用，这些方法可以帮助我们完成一些更加复杂的异步操作。

### Promise.All

当我们有多个Promise需要执行，且需要多个Promise都执行完毕，在将他们的结果进行统一处理时，我们便可以使用Promise.all来帮助我们完成这项工作。

```js
Promise.all(iterable)
```

all需要一个数组（可迭代对象）作为参数，数组中可以存放多个Promise。调用后，all方法会返回一个新Promise，这个Promise会在数组中所有的Promise都执行后完成，并返回所有Promise的结果。比如：



```js
function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 5000);
    })
}

Promise.all([sum(1, 1), sum(2, 2), sum(3, 3)])
    .then((result) => {
        console.log(result)
    })
```

上例中，调用三次sum，且将其添加到数组中传递给all。调用后all会返回一个新的Promise，当三次计算都完成后，新的Promise也会变为完成状态，并将三次执行的结果封装到数组中返回。

### Promise.AllSettled

all仅有当全部Promise都完成时才会返回有效数据，而allSettled用法和all一致，但是它里边无论Promise是否完成都会返回数据，只是他会根据不同的状态返回不同的数据。

成功：{status:”fulfilled”, value:result}

失败：{status:”rejected”, reason:error}

```js
Promise.allSettled([
  sum(123, 456),
  sum(5, 6),
  Promise.reject('哈哈'),
  sum(33, 44)
]).then(r => console.log(r));  
/* 
[
  { status: 'fulfilled', value: 579 },
  { status: 'fulfilled', value: 11 },
  { status: 'rejected', reason: '哈哈' },
  { status: 'fulfilled', value: 77 }
]
 */
```

### Promise.Race

race会返回首先执行完的Promise，而忽略其他未执行完的Promise

```js
Promise.race([
  Promise.reject(1111),
  sum(123, 456),
  sum(5, 6),
  sum(33, 44)
]).then(r => {
  console.log(r);
}).catch(r => {
  console.log('错误');
}); 

/*
	错误
*/
```



### Promise.Any

any会race类似，但是它只会返回第一个成功的Promise，如果所有的Promise都失败才会返回一个错误信息。

```js
Promise.any([
  Promise.reject(1111),
  Promise.reject(2222),
  Promise.reject(3333),
]).then(r => {
  console.log(r);
}).catch(r => {
  console.log('错误', r);
});

/*
错误 [AggregateError: All promises were rejected] {
	[errors]: [ 1111, 2222, 3333 ]
}
*/
```

### Promise.Resolve

Promise.resolve用来创建一个新的Promise实例，且直接通过resolve存入一个数据。

### Promise.Reject

Promise.reject用来创建一个新的Promise实例，且直接通过reject存入一个数据。

## 宏任务和微任务

现在有这样一段代码，你能说出它在控制台中的输出结果吗？



```js
console.log(1)

Promise.resolve().then(() => {
    console.log(2)
})

console.log(3)
```

要真正的理解这一段代码，我们必须要先搞懂Promise中的实例方法then到底是在做什么？之前在学习Promise时，我们就已经说过了，then相当于为Promise设置了一个回调函数，当Promise中的数据处理完毕时，便会调用then所设置的回调函数来继续后续任务。

上例中，我们通过Promise.resolve()创建了一个理解完成的Promise，那么按道理讲then中的回调函数应该立刻执行啊？因为Promise已经完成了啊？所以打印的顺序不应该是“1 2 3”吗？如果能想到这些那么证明之前讲解的Promise你已经理解的差不多了，但是还不够准确！

then中的回调函数会在Promise完成后被调用，但是注意并不是立刻就调用，而是采用一种和定时器类似的处理方式，讲函数放入到一个任务队列中，而队列中的代码会在调用栈中的代码执行完毕后才会执行。也就是说then中的代码总是在当前调用栈中的代码执行完后才执行。所以上边代码的输出结果应该为：“1 3 2”

那么问题又来了，如果是这样的代码呢？



```js
setTimeout(()=>{
    console.log(1)
})

Promise.resolve().then(() => {
    console.log(2)
})
```

错误的分析：setTimeout是定时器，它会在一段时间后将函数放入到任务队列中，而我们没有指定时间，也就意味着函数会立刻放入到任务队列中。then同样也是将函数放入到任务队列中，并且这个Promise是一个立即完成的Promise所以函数也是立刻进入任务队列。那么按照执行顺序来讲，定时器在前，then在后，所以定时器中的函数应该先进入队列，队列又是先进先出的，所以应该先1后2。

上边的分析看似合理，实际上是不对的。因为setTimeout和then虽然都将函数放入到队列中，但是却不是同一个队列。为了更合理的处理异步任务，ES标准规定了一个内部的队列“PromiseJobs”，这个队列是专门用来放置由Promise产生的回调函数的（then、catch、finally），这个队列我们通常被称为“微任务队列（microtask queue）”。相对的，setTimeout这些方法是将函数放入到了“宏任务队列（macrotask queue）”。

简单来说，任务队列有两个，宏任务队列和微任务队列。代码执行时，宏任务进入到宏任务队列，微任务进入到微任务队列。那么哪些任务时微任务，哪些任务是宏任务呢？其实大部分的任务都属于宏任务。而微任务通常在代码运行时产生，通常是由Promise所创建的，Promise的then、catch、finally中的回调函数会作为微任务进入到微任务队列中。

JS代码执行时，每一个宏任务执行完毕后，JS引擎会立即执行微任务队列中的所有任务，然后才是执行宏任务队列中的任务。换句话中then中的回调函数（微任务）会先于定时器中的回调函数（宏任务）执行。所以上例中代码的执行结果应该为：“2 1”。

如果上边的内容你理解了，可以尝试分析一下这段代码：



```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
```

```
1
7
3
5
2
6
4
```



### 事件循环

JS 是单线程的，它运行时基于事件循环机制（event loop）

- 调用栈

  - 栈
    - 栈是一种数据结构，后进先出
  - 调用栈中，放的是我们要执行的代码

- 任务队列

  - 队列

    - 队列是一种数据结构，先进先出

  - 任务队列放的是将要执行的代码

    - 当栈中的代码执行完毕后，队列中的代码按照顺序依次进入栈中去执行
    - 在 JS 中 任务队列有两种
      - 宏任务队列（大部分代码都去宏任务队列中去排队）
      - 微任务队列（Promise 的回调函数（then、catch、finally））—— VIP
    - 整个流程  
      1. 执行调用栈中的代码，图中 ①
      2. 调用栈中的代码执行完后，执行微任务队列中的所有任务，图中 ②
      3. 微任务队列中的任务执行完后，执行宏任务队列中的所有任务，图中 ③

    <iframe frameborder="0" style="width:100%;height:634px;" src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.drawio#R7Vtbc6M2GP01mkke4pGQEOLRJPa2nW0nM9vL7lMHg2zTxcjFOIn311cyks1FzjoJ2HFnnwwfkhDnux8wwLeLpw95uJz%2FKmKeAgfGTwDfAcdBngvlj5JstAQTXEpmeRKXMrgXfEq%2BcT3QSNdJzFdaVooKIdIiWdaFkcgyHhU1WZjn4rE%2BbCrSuCZYhjNe24YSfIrClLeG%2FZXExbyUMsfby3%2FiyWxu7oyoX15ZhGawXng1D2PxWBHhEcC3uRBFebR4uuWpQq%2BOy%2FjA1d3Gcp4Vx0z4%2FEv6h%2Ff3zw%2Br9Yff7r%2BM3SfX%2B%2FPGKVd5CNO1fmC92WJjEHicJwX%2FtAwjdf4o1QxwMC8WqTxD8nCapOmtSEW%2BHY2nU06jSMpXRS6%2B8sqV2PMnEMor%2BpY8L%2FjTwWdBO4SkbXGx4EW%2BkUP0hBuHalS1Xd24xq4e91pCxC1l84qGMDXWoS1jtlt9D5480Pi9AEtswZKmhcJIyMdSNmrAoP%2BuldolFDiKKJWwVER0tv0dMRBAwDAYecAnYMjAiIKhlDCzrNxlubKe0dScxLeoKytMk1kmjyOJM5dbCZQWEmntQ31hkcSxmh7kfJV8CyfbpZTSliLJii1ibgDcO7XWuhCr0l9RS9%2BZyHjDOLSoE%2B0jMnAb%2BsduS%2F8uaavfoT1pn3TtSXHI2dTqSTRifDLtCEv%2FCEcivtdGEvl9OZL7KkeCkES%2Bb3MkFzAKmKsOhnfAv2z%2FUTuu2AKEGFPajS0g7B3jVsQ5oVvRV9nCdMqgPahKQ%2FDB0FPRdYgAu91G1yFgBIwICAIw3MZbFWbRsWby0gQ5dQ4kSDqhbkeqvHFIQ5OORZMIWRIk6cutvR%2Bq7EiVJvKeTZXG3SvQ8VjWzfpU5MVczEQWpqO9NIjW%2BQOPNZS5WGfx9kxFx%2F2Ej0Is9ZB%2FeFFsdEeggmVdF%2BUG1F2fx1VuUqzziD%2FzNMyOf87TsEge6uvboNRT71WIr%2BgNmUBp9EaNC5pFijCf8ULP26tkmOfhpjJM545n7sRY%2FU6ENXqB1gwXvXUGRbhhR%2BW%2B91a1w%2FINhua3g8bIAdIBhqatqpvgx3AiW9DekvZBf9b9p54MKu3k3h6fcaWD3g8HLnUa2tVm9Vr7NEPEdLriBWjGgg60xn5E%2Bm4iPSbszJHe4n9vbGtczmJig5I5k85K2VZb47htJK1tjddXJWsYrVoooyCgqqNXJi5j2hiMfNWg%2BONt1yIPpNGPQXC7HSPblxFgY230QdnZDJVLHJzlt7R1GU2N75Nnw%2B3xlsBws6fZ8QJVpzJE5UmaGhPQz1g%2BSfTyzWd1MoBwJ%2FiiFhz4cn9acPekb1Gebapn9zxPJB7KZO72vF4nFRnSUaYskJ5D8o2l29s8%2Bgj2VC6TLFdKfy8LkxzJQOnZwqRPPRx2FSYpbfiGYwmTFtcwsu4xtbGol4Wp994gPYKafN%2BQmoD9biDFyJLLy7akja3OuNZc2Mq9luRYQf9gZrZprZ4jurBsBJudCEaDNq2ELWWVg%2FtSxfmpiF0uhQOi8KvmUtf3zpxLDenw3VzqnzOX4sOkf5w8mDZO9qu%2FS5zEuri6upajtwNpuFDmrvs8CLyg0gRWJlvW203OJqtlOV028iuR8kEqZlfoujLt%2B4t5cjPy6SG8ti5tX%2BaiArFsj5rVNMKWatrEx9r7ItyX7RA7FXShbGQZPbunI3ed7Y5cYKS%2ByAE6sitWCLdfAFSdzbm%2BGJ6GsCZP49O2E5yUpyGWiuSNWLKI27GcMJe4XdUUTaIGH%2Fv%2BuTeixtD2teLOBcFI0S%2FHcC%2BXSLmMxxB29XUOQo0yEeN2ve4xS5HYm0rPXyR2mCFKD%2BnhhRXCA0KY47mMOpAy1mi7MGwU8T0nDNIjFzCBHHNqi26QM8hYT%2FwKdizR7ZSdK%2BmRDDgRpt57g9TWunQFKYrjKbRBiqCHfd4Pv3J%2BSC3fimh%2BBbWw%2FR%2FzKxjDliJOyq6Q9gukS06c%2FXzpQRAb7JKmr9qMRtp0B5WrbmP9jj4CIV6zkEZ%2Bdb0jJkDasJcePuggh78NqNAi97lYJCs%2BkNWvSB%2B4ImKOZWEGxZxnJ2GHnJeyQ9Xxq2WY1fzKfPUwCaOvs63T3OivJIYK0ywpkjAtF2h%2BH3GYaSrvUt9TTwTUaZK%2F6zSNlvVIP8nT%2Ff8zSg%2FY%2F80Fj%2F4D"></iframe>

    <p align="center">事件循环</p>

​	Promise的执行原理

- Promise 在执行，then 就相当于给了 Promise了回调函数，

  当 Promise 的状态从 pending 变为 fulfilled 时，

  then 回调函数就会被放入到任务队列中

> [!note]
>
> 怎么区分微任务和宏任务？
>
> 在 `Promise` 的 `then、catch、finally` 中执行的都是<mark style="background-color: #f7c3e1">微任务</mark>，其他都是<mark style="background-color: #f7c3e1">宏任务</mark>

### queueMicrotask

一个 JS 方法，用来向微任务队列中添加一个任务 

```js
setTimeout(() => {
 console.log(2); 
});

queueMicrotask(() => {
  console.log(1);
});

console.log(3);
```

```
3
1
2
```

执行顺序：调用栈中的代码 ==> 微任务 ==> 宏任务

```js
setTimeout(() => {
  console.log(1); 
});

queueMicrotask(() => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(3);
});
```

```
2
3
1
```

```js
Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(1);
  });
});

queueMicrotask(() => {
  console.log(2);
});
```

```
2
1
```

微任务先于宏任务执行，多个宏任务，先调用，先执行

```js
Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log(1);
  })
});

queueMicrotask(() => {
  console.log(2);
});
```

![下载](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202305052355246.png)

## 手写 Promise

参考：[为什么 JavaScript 的私有属性使用 # 符号 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/47166400)

```js
/* 
  定义类的思路
    1. 先把功能都分析清楚了，再动手
    2. 写一点想一点，走一步看一步
*/

class MyPromise {
  #PENDING = 'pending';
  #FULFILLED = 'fulfilled';
  #REJECTED = 'rejected';
  // 创建一个变量用来存储 Promise 的结果
  #result;
  // 创建一个变量来记录 Promise 的状态
  #state = this.#PENDING; // pending  fulfilled rejected

  // 创建一个变量来存储回调函数
  // 由于回调函数可能有多个，所以我们使用数组来存储回调函数
  #callbacks = [];

  constructor(executor) {
    // 接收一个 执行器 作为参数
    executor(this.#resolve.bind(this), this.#reject.bind(this)); // 调用回调函数
  }

  // 私有的 resolve() 用来存储成功的数据
  #resolve(value) {
    // 禁止值被重复修改
    // 如果 state 不等于 pad，说明值已经被修改 函数 直接返回
    if (this.#state !== this.#PENDING) return;

    this.#result = value; 
    this.#state = this.#FULFILLED;  // 数据填充成功
    
    // 当 resolve 执行时，说明数据已经进来了，需要调用 then 的回调函数
    queueMicrotask(() => {
      // 调用 callbacks 中的所有函数
      this.#callbacks.length && this.#callbacks.forEach(el => el());
    });
  }

  /* #resolve = () => {
    console.log(this);
  }  */ 

  // 私有的 reject() 用来存储拒绝的数据
  #reject(reason) {}

  // 添加一个用来读取数据的 then 方法
  then(onFulfilled, onRejected) {
    /*
      谁将成为 then 返回的新 Promise 中的数据？？？
        then 中回调函数的方法返回值会成为新的 Promise 中的数据
    */
    return new MyPromise((resolve, reject) => {
      if (this.#state === this.#PENDING) {
        // 进入判断说明数据还没有进入 Promise，将 callback 的值设置为 回调函数
        this.#callbacks.push(() => {
          resolve(onFulfilled(this.#result));        
        }); 
      }
  
      if (this.#state === this.#FULFILLED) {
          /* 
          目前来讲，then 只能读取已经存储进 Promise 的数据，
            而不能读取异步存储的数据 
          */
        
        // onFulfilled(this.#result);
  
        /*
          then 的回调函数，应该放入到微任务队列中执行，而不是直接调用
        */
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result));
        });
      }
    })
  }

}

const mp = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('孙悟空');
  }, 1000);
});

const result = mp.then((result) => {
  console.log("读取数据1", result);
  return '猪八戒';
}).then(r => {
  console.log("读取数据2", r);
  return "沙和尚";
}).then(r => {
  console.log("读取数据3", r);
});

console.log(result);
```

## async 和 await

通过 async 可以快速的创建异步函数

- 异步函数的返回值会自动封装到一个 Promise 中返回

传统的将数据存储到 Promise 中的方式：

```js
function fn() {
  return Promise.resolve(10);
} 

fn().then(r => {
  console.log(r); // 10
}); 
```

async 方式：

```js
async function fn2() {
  return 10;
}

fn2().then(r => {
  console.log(r); // 10
});
```

上述两种方式是等价的

在 async 声名的异步函数中可以使用 await 关键字来调用异步函数

Promise 解决了异步调用中回调函数的问题

- 虽然通过链式调用解决了回调地狱，但是链式调用太多以后还是不好看

  ```js
  function sum(a, b) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(a + b);  
      }, 2000);
    });
  }
  
  async function fn3() {
    sum(123, 456)
      .then(r => sum(r, 8))
      .then(r => sum(r, 9))
      .then(r => console.log(r));
  }
  ```

- 我多想以同步方式去调用异步代码

- 当我们通过 await 去调用 异步函数时，它会暂停代码的运行，直到异步代码执行有结果时,才会将结果返回

  ```js
  async function fn3() {
  	let result = await sum(123, 456);
  	console.log(result); // 579
  }
  fn3();
  ```

  > [!attention]
  >
  > await 只能用于 `async` 声明的异步函数中，或 es 模块化的顶级作用域中
  >
  > await 阻塞的只是异步函数内部的代码，不会影响内部的代码

- 通过 await 调用异步代码，需要通过 try-catch 来处理异常

- 如果 async 声名的函数中没有写 await，那么它里面的代码就会依次执行

  ```js
  async function fn4(param) { 
    console.log(1); 
    console.log(2); 
    console.log(3);  
  }
  
  fn4();
  
  console.log(4);
  
  /*
  	1
  	2
  	3
  	4
  */
  ```

   等价于

  ```js
  function fn5() {
    return new Promise((resolve) => {
      console.log(1);
      console.log(2);
      console.log(3);
      resolve();
    });
  }
  
  fn5()
  
  console.log(4);
  
  /*
  	1
  	2
  	3
  	4
  */
  ```

- 当我们使用 await 调用函数后，当前函数后面的所有代码，会在我们当前函数执行完毕后，被放入到微任务队列中

  ```js
  async function fn4() { 
    console.log(1); 
    /*
      await后面的所有代码，都会被放入到微任务队列中
    */
    await console.log(2); 
    console.log(3);  
  }
  
  fn4()
  
  console.log(4);
  
  /*
  	1
  	2
  	4
  	3
  */
  ```

  等价于

  ```js
  function fn5() {
    return new Promise((resolve) => {
      console.log(1);
      // 加了 await
      console.log(2);
      resolve();
    }).then(r => {
      console.log(3);
    });
  }
  
  console.log(4);
  ```

  ```js
  async function fn4() { 
    console.log(1); 
    /*
     当我们使用 await 调用函数后，当前函数后面的所有代码
      会在我们当前函数执行完毕后，被放入到微任务队列中
    */
    await console.log(2); 
    await console.log(3);
    console.log(4);  
  }
  ```

  等价于

  ```js
  function fn5() {
    return new Promise((resolve) => {
      console.log(1);
      // 加了 await
      console.log(2);
      resolve();
    }).then(r => {
      console.log(3);
    }).then(r => {
      console.log(4);
    });
  }
  ```

在 script 标签中定义一个模块

```html
<script type="module">
    await console.log(123)
  </script>
```

js文件定义一个模块

1. 创建一个后缀为 `.mjs` 的文件

![image-20230506205835426](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202305062058555.png)

2. 直接使用 await，不需要使用 async 修饰的函数包裹

   ```js
   await console.log(123);
   ```

## Node.js 文档

:point_right: https://nodejs.dev/en/

## 模块化

随着学习的深入，代码数量的增多我们所编写的程序复杂度越来越高。此时如果我们依然将所有的代码编写到同一个文件中，代码将变得非常难以维护。模块化是解决这种问题的关键。

首先我们先来解决第一个问题 —— 什么是模块？模块简单理解其实就是一个代码片段，本来写在一起的JS代码，我们按照不同的功能将它拆分为一个一个小的代码片段，这个代码片段就是一个模块。简单来说，就是化整为零。

接着我们来一起看看模块化会给我们带来哪些好处，模块化后不再是所有代码写在一起，而是按功能做了不同的区分，当我们维护代码时可以比较快捷的找到那些要修改的代码。再者，模块化后，代码被拆分后更容易被复用，同样一个模块可以在不同的项目中使用，大大的降低了我们的开发成本。之前我们学习的jQuery便可以理解为是一种模块。

但是jQuery这种模块化的方式存在有许多的不足。jQuery是通过script标签引入的形式来完成模块化的，引入后实际效果是向全局作用域中添加了一个变量$（或jQuery）这样很容易出现模块间互相覆盖的情况。并且当我们使用了较多的模块时，有一些模块是相互依赖的，必须先引入某个组件再引入某个组件，模块才能够正常工作。比如jQuery和jQueryUI，就必须先引入jQuery，如果引入顺序出错将导致jQueryUI无法使用。这还仅仅是两个组件，而实际开发中的依赖关系往往更加复杂，像是a依赖b，b依赖c，c依赖d这种关系，必须按照d、c、b、a的顺序进行引入，有一个顺序错误就会导致其他的一起失效。所以通过script标签实现的模块化是非常的不靠谱的。

### CommonJS

一直到2015年，JavaScript中一直都没有一个内置的模块化系统。但是随着JavaScript项目越来越复杂，模块化的需求早已迫在眉睫。于是大神门开始着手自定义一个模块化系统，CommonJS便是其中的佼佼者。同时它也是Node.js中默认使用的模块化标准。

模块就是一个js文件，在模块内部任何变量或其他对象都是私有的，不会暴露给外部模块。在CommonJS模块化规范中，在模块内部定义了一个module对象，module对象内部存储了当前模块的基本信息，同时module对象中有一个属性名为exports，exports用来指定需要向外部暴露的内容。只需要将需要暴露的内容设置为exports或exports的属性，其他模块即可通过require来获取这些暴露的内容。



```js
const a = 10
const b = 20
const obj = { name: "孙悟空" }

module.exports = a

// const a = require("./m.js")
```



```js
const a = 10
const b = 20
const obj = { name: "孙悟空" }

module.exports.a = a
module.exports.b = b

// const {a, b} = require("./m.js")
```



```js
const a = 10
const b = 20
const obj = { name: "孙悟空" }

module.exports = {
    a,
    b,
    obj
}

// const {a, b, obj} = require("./m.js")
```

默认情况下，Node.js会将以下内容视为CommonJS模块：

1. 使用.cjs为扩展名的文件
2. 当前的package.json的type属性为commonjs时，扩展名为.js的文件
3. 当前的package.json不包含type属性时，扩展名为.js的文件
4. 文件的扩展名是mjs、cjs、json、node、js以外的值时（type不是module时）

require()是同步加载模块的方法，所以无法用来加载ES6的模块。当我们需要在CommonJS中加载ES模块时，需要通过import()方法来加载。



```js
import("./m2.mjs").then(m2 => {
    console.log(m2)
})
```

#### 文件作为模块

当我们加载一个自定义的文件模块时，模块的路径必须以`/、./`或`../`开头。如果不以这些开头，node会认为你要加载的是核心模块或`node_modules`中的模块。

当我们要加载的模块是一个文件模块时，CommonJS规范会先去寻找该文件，比如：`require("./m1")`时，会首先寻找名为m1的文件。如果这个文件没有找到，它会自动为文件添加扩展名然后再查询。扩展名的顺序为：js、json和node。还是上边的例子，如果没有找到m1，则会按照顺序搜索m1.js、m1.json、m1.node哪个先找到则返回哪个，如果都没有找到则报错。

#### 文件夹作为模块

当我们使用一个文件夹作为模块时，文件夹中必须有一个模块的主文件。如果文件夹中含有`package.json`文件且文件中设置`main`属性，则`main`属性指定的文件会成为主文件，导入模块时就是导入该文件。如果没有`package.json`，则node会按照`index.js`、`index.node`的顺序寻找主文件。

#### Node_modules

如果我们加载的模块没有以`/、./`或`../`开头，且要加载的模块不是核心模块，node会自动去node_modules目录下去加载模块。node会先去当前目录下的node_modules下去寻找模块，找到则使用，没找到则继续去上一层目录中寻找，以此类推，知道找到根目录下的node_modules为止。

比如，当前项目的目录为：`'C:\Users\lilichao\Desktop\Node-Course\myProject\node_modules'`，则模块查找顺序依次为：

‘C:\Users\lilichao\Desktop\Node-Course\node_modules’,
‘C:\Users\lilichao\Desktop\node_modules’,
‘C:\Users\lilichao\node_modules’,
‘C:\Users\node_modules’,
‘C:\node_modules’

#### 模块的包装

每一个CommonJS模块在执行时，外层都会被套上一个函数：



```js
(function(exports, require, module, __filename, __dirname) {
// 模块代码会被放到这里
});
```

所以我们之所以能在CommonJS模块中使用`exports`、`require`并不是因为它们是全局变量。它们实际上以参数的形式传递进模块的。

exports，用来设置模块向外部暴露的内容

require，用来引入模块的方法

module，当前模块的引用

__filename，模块的路径

__dirname，模块所在目录的路径

### ES模块化

2015年随着ES6标准的发布，ES的内置模块化系统也应运而生，并且在Node.js中同样也支持ES标准的模块化。说来说去使用模块化无非需要注意两件事导出和引入：

#### 导出

```js
// 导出变量（命名导出）
export let name1, name2, …, nameN; 
export let name1 = …, name2 = …, …, nameN; 

// 导出函数（命名导出）
export function functionName(){...}

// 导出类（命名导出）
export class ClassName {...}

// 导出一组
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

// 解构赋值后导出
export const { name1, name2: bar } = o;

// 默认导出
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// 聚合模块
export * from …; // 将其他模块中的全部内容导出（除了default）
export * as name1 from …; // ECMAScript® 2O20 将其他模块中的全部内容以指定别名导出
export { name1, name2, …, nameN } from …; // 将其他模块中的指定内容导出
export { import1 as name1, import2 as name2, …, nameN } from …; // 将其他模块中的指定内容重命名导出
export { default, … } from …; 
```

#### 引入

```js
// 引入默认导出
import defaultExport from "module-name";

// 将所有模块导入到指定命名空间中
import * as name from "module-name";

// 引入模块中的指定内容
import { export1 } from "module-name";
import { export1 , export2 } from "module-name";

// 以指定别名引入模块中的指定内容
import { export1 as alias1 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";

// 引入默认和其他内容
import defaultExport, { export1 [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";

// 引入模块
import "module-name";
```

需要注意的是，Node.js默认并不支持ES模块化，如果需要使用可以采用两种方式。方式一，直接将所有的js文件修改为mjs扩展名。方式二，修改package.json中type属性为module。

#### 特点

1. ES模块基于文件路径解析
2. 支持加载内置模块
3. 相对/绝对路径均可
4. 没有默认扩展名
5. 文件夹模块没有主文件
6. 支持node_modules加载包

### 核心模块

核心模块是node中的内置模块，这些模块有的可以直接在node中使用，有的直接引入即可使用。核心模块有很多，不能一一介绍，这里只是简单介绍几个模块，以帮助同学理解node。

#### Process

process模块用来表示和控制当前的node进程。

- process.exit([code]) 结束进程
- process.nextTick(callback[, …args]) 向tick任务队列中添加任务

#### Path

path模块可以帮助我们获取文件（夹）的路径。

- path.resolve([…paths]) 生成绝对路径

#### Fs

fs模块可以帮助我们读取磁盘中的文件。

- fs.readFile() 读取文件
- fs.appendFile() 创建新文件，或将数据添加到已有文件中
- fs.mkdir() 创建目录
- fs.rmdir() 删除目录
- fs.rm() 删除文件
- fs.rename() 重命名
- fs.copyFile() 复制文件

## 包管理器

随着项目复杂度的提升，在开发中不可能所有的代码都要手动一行一行的编写，于是我们就需要一些将一些现成写好的代码引入到我们的项目中来帮助我们完成开发，就像是我们之前使用jQuery。jQuery这种外部代码在项目中，我们将其称之为包。

越是复杂的项目，其中需要引入的包也就越多。随着包数量的增多，包管理的问题也被抬上了桌面。如何下载包？如何删除包？如何更新包？等等一些列的问题在等待我们处理。包管理器便是帮助我们解决这个问题的工具。

### NPM

node中的包管理局叫做npm（node package manage），npm是世界上最大的包管理库。作为开发人员，我们可以将自己开发的包上传到npm中共别人使用，也可以直接从npm中下载别人开发好的包，在自家项目中使用。

npm由以下三个部分组成：

1. npm网站 （通过npm网站可以查找包，也可以管理自己开发提交到npm中的包。https://www.npmjs.com/）
2. npm CLI（Command Line Interface 即 命令行）（通过npm的命令行，可以在计算机中操作npm中的各种包（下载和上传等））
3. 仓库（仓库用来存储包以及包相关的各种信息）

对于初学者来讲，大多数情况下都是下载并使用npm中的各种包，而少有向npm中上传的操作。所以本节课的重点我们也会放到通过npm下载引用包的各种操作上，而不是上传管理等操作。

npm在按照node时已经一起安装，所以只有你的node正常安装了，npm自然就可以直接使用了。可以在命令行中输入`npm -v`来查看npm是否安装成功。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221019130654791.png)

#### package.json

包是一组编写好的代码，可以直接引入到项目中使用。具体来说，包其实就是一个文件夹，文件夹中会包含一个或多个js文件，这些js文件就是包中存放的各种代码。除了必要的代码外，包中还有一个东西是必须的，它叫做包的描述文件 —— package.json

package.json顾名思义，它就是一个用来描述包的json文件。它里边需要一个json格式的数据（json对象），在json文件中通过各个属性来描述包的基本信息，像包名、版本、依赖等包相关的一切信息。它大概长成这个样子：



```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "author": "Your Name <email@example.com>"
}
```

package.json中包含有哪些字段呢？我们来研究一下：

name（必备）

- 包的名称，可以包含小写字母、_和-

version（必备）

- 包的版本，需要遵从x.x.x的格式
- 规则：
  - 版本从1.0.0开始
  - 修复错误，兼容旧版（补丁）1.0.1、1.0.2
  - 添加功能，兼容旧版（小更新）1.1.0
  - 更新功能，影响兼容（大更新）2.0.0

author

- 包的作者，格式：Your Name \<email@example.com\>

description

- 包的描述

repository

- 仓库地址（git）

scripts

- 自动脚本

  - 可以自定义一些命令

  - 定义以后可以直接通过 npm 来执行这些命令

  - start 和 test 可以直接通过 npm start、npm test 执行

  - 其他命令需要通过 npm run xxx 执行



除了上述的字段外，package.json中还有一些其他字段由于暂时还未涉及，所以我们遇到的时在详细说明。

通常情况下，我们的自己创建的每一个node项目，都可以被认为是一个包。都应该为其创建package.json描述文件。同时，npm可以帮助我们快速的创建package.json文件。只需要进入项目并输入`npm init`即可进入npm的交互界面，只需根据提示输入相应信息即可。输入后根据提示输入相应信息即可：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221019130950497.png)也可以直接通过`npm init -y`直接通过默认选项来创建package.json：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221019131049727.png)总之，项目中需要一个package.json来对项目进行描述，无论你是通过何种方式（手动或命令行)在你的项目下创建一个即可。

#### 命令

```
npm init 初始化项目，创建 package.json 文件（需要回答问题）
npm init -y 初始化项目，创建 package.json 文件（所有值都采用默认值）
npm install 包名 将指定包下载到当前项目中
```

#### 安装包

npm的最常用的功能就是包的安装，包安装就是将npm仓库中的包下载到本地中使用。安装的命令为`npm install <包名>`，比如，我们想在项目中安装lodash这个包，可以在项目目录下执行以下的命令：

```
npm install lodash
```

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221019131916984.png)

调用后，npm会自动联网下载包，根据网络状况不同需要等待的时间也会有所不同。安装完毕后简单看一下打印的信息，added 1 package 表示安装了一个包，audited 2 packages表示检查了两个包的安全漏洞，found 0 vulnerabilities表示发现了0个漏洞，简单说，安装成功了，这个包已经可以正常使用了。可以编写一个js文件测试一下：

```js
const _ = require("lodash")

let obj = {name:"孙悟空"}
let obj2 = {name:"孙悟空"}

let result = _.isEqual(obj, obj2)

console.log(result)
```

接下来，我们来看看`npm install lodash`这个命令到底做了什么：

首先我们看到的，调用后它会自动连接npm服务器，将最新的loadsh包下载到项目的node_modules目录下，如果目录不存在下载包时会自动创建。

第二，它会修改package.json文件，在dependencies字段中将刚刚下载的包设置为依赖项



```json
"dependencies": {
    "lodash": "^4.17.21"
 }
```

package.json中的dependencies表示当前包的依赖包，也就意味着我们的包必须有这些包才能够正常的运行。设置依赖项后，当我们在项目中执行`npm install`后，依赖项中的包会自动下载到当前项目中。设置依赖项时`"lodash": "^4.17.21"`前边的loadsh表示包的名字，后边是包的版本。`"^4.17.21"`表示匹配最新的4.x.x的版本，也就是如果后期lodash包更新到了4.18.1，我们的包也会一起更新，但是如果更新到了5.0.0，我们的包是不会随之更新的。如果是`"~4.17.21"`，~表示匹配最小依赖，也就是4.17.x。如果是`"*"`则表示匹配最新版本，即x.x.x（不建议使用）。当然也可以不加任何前缀，这样只会匹配到当前版本。

也可以在安装时直接指定，要安装的包的版本，像是这样：



```bash
npm install lodash@3.2.0
```



```bash
npm install lodash@"> 3.2.0"
```

如果不希望，包出现在package.json的依赖中，可以添加–no-save指令禁止：



```bash
npm install lodash --no-save 
```

或者，也可以通过-D或–save-dev，将其添加到开发依赖



```bash
npm install lodash -D
```

第三，安装包后项目中会自动生成package.lock.json文件，这个文件主要是用来记录当前项目的下包的结构和版本的，提升重新下载包的速度，以及确保包的版本正确。

#### 全局安装

全局安装指，直接将包安装到计算机本地，通常全局安装的都是一些命令行工具，全局安装后工具使用起来也会更加便利。全局安装只需要在执行install指令时添加-g指令即可。比如，现在我们尝试全局安装laughs组件：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221021013806168-1024x190.png)

上例中安装的是一个命令行工具，安装成功后只需要在命令行中输入ha即可在命令行中显示一个英文的笑话，当然这是一个纯粹为了演示而安装的组件。

所有的组件可以通过`npm uninstall xxx`来完成卸载。

#### 配置镜像

npm的服务器位于国外，有时访问速度会比较慢，可以通过配置国内镜像来解决该问题，配置代码：



```bash
npm install -g cnpm --registry=https://registry.npmmirror.com
```

上边的指令会为计算机安装一个名为cnpm的新指令，该指令的功能和npm相同，不同点在于它会通过国内的镜像服务器下载包。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221021015859728.png)

安装完成后，便可以通过cnpm命令来安装包。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/10/20221021020310960-1024x112.png)

使用cnpm后，计算机中便同时存储在cnpm和npm两个命令，可以根据需要选择使用。但是由于cnpm的运行方式和npm不太一样，所以就我个人来讲，更愿意直接修改npm的地址为镜像地址。显示这样，即可直接修改npm的仓库地址：



```bash
npm set registry https://registry.npmmirror.com
```

修改后，直接使用npm时访问的就是国内的npm镜像服务器，如果想恢复到原版的配置，可以执行以下命令：



```bash
npm config delete registry
```

### Yarn（Yet Another Resource Navigator）

早期的npm存在有诸多问题，不是非常的好用。yarn的出现就是为了帮助我们解决npm中的各种问题，如何解决呢？方案很简单使用yarn替换掉npm。当然现在的npm相较于之前的已经得到了很大的优化，所以你完全可以选择不使用yarn。

在新版本的node中，corepack中已经包含了yarn，可以通过启用corepack的方式使yarn启用。首先执行以下命令启用corepack：



```bash
corepack enable
```

查看yarn版本



```bash
yarn -v
```

切换yarn版本，最新版：



```bash
corepack prepare yarn@stable --activate
```

切换为1.x.x的版本：



```bash
corepack prepare yarn@1 --activate
```

#### 命令

yarn init （初始化，创建package.json）

yarn add xxx（添加依赖）

yarn add xxx -D（添加开发依赖）

yarn remove xxx（移除包）

yarn（自动安装依赖）

yarn run（执行自定义脚本）

yarn <指令>（执行自定义脚本）

yarn global add（全局安装）

yarn global remove（全局移除）

yarn global bin（全局安装目录）

#### Yarn镜像配置

配置：



```bash
yarn config set registry https://registry.npmmirror.com
```

恢复：



```bash
yarn config delete registry
```

### Pnpm

pnpm又是一款node中的包管理器，我真的不想在介绍了。但是想想还是说一下吧，毕竟也不难。作为初学者的你，npm、yarn和pnpm选一个学一学就可以了。

#### 安装



```bash
npm install -g pnpm
```

#### 命令

pnpm init（初始化项目，添加package.json）

pnpm add xxx（添加依赖）

pnpm add -D xxx（添加开发依赖）

pnpm add -g xxx（添加全局包）

pnpm install（安装依赖）

pnpm remove xxx（移除包）

#### Pnpm镜像配置

配置：



```bash
pnpm config set registry https://registry.npmmirror.com
```

恢复：



```bash
pnpm config delete registry
```

## HTTP

:point_right: [点它](../../面试/计算机网络/HTTP.md)
