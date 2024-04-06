# Express

![image-20230509140307931](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202305091403028.png)

Express 是 node 中的服务器软件，通过 express 可以快速的在 node 中搭建一个 web 服务器

## 使用步骤

### 1. 创建并初始化项目

```bash
yarn init -y
```

### 2. 安装 express

```bash
yarn add express
```

### 3. 创建 index.js 并编写代码

## nodemon

可以自动监视代码的修改, 代码修改以后可以自动重启服务器

### 1. 全局安装

```md
npm i nodemon -g
	或
yarn global add nodemon
```

> [!attention]
>
> - 通过 `yarn` 进行全局安装时，默认 yarn 的目录并不在环境变量中
>
> - 需要手动将路径安装到环境变量中

查看 `yarn` 的全局安装目录

```md
yarn global bin
```

启动

```
nodemon // 运行 index.js
nodemon xxx // 运行指定的 js
```

### 2. 在项目中安装

```
npm i nodemon -D
yarn add nodemon -D
```

启动

```md
npx nodemon 
```

## 静态资源

服务器中的代码, 对于外部来说都是不可见的, 所以我们写的 html 页面, 浏览器无法直接访问，如果希望浏览器可以访问, 则需要将页面所在的目录设置为静态资源的目录



## Session

### Cookie 的不足

- cookie 是由服务器创建，浏览器保存
- 每次浏览器访问服务器时都需要将 cookie 发回，这就导致我们不能在 cookie 存储较多的数据
- cookie 是直接存储在客户端，容易被篡改盗用

> [!attention]
>
> 注意
>
> 我们在使用 cookie 一定不会 cookie 存储敏感数据

所以为了解决 cookie 的不足，我们希望这样

- 将用户的数据统一存储在服务器中，每一个用户的数据都有一个对应的 id
- 我们只需通过 cookie 将 id 发送给浏览器
- 浏览器每次访问时将 id 发回，即可读取到服务器中存储的数据
- 这个技术，我们称之为 「Session」



### Session

- Session 是服务器中的一个对象，这个对象用来存储对象的数据

- 每一个 session 对象都有一个唯一的 id，id 会通过 cookie 的形式发送给客户端
- 客户端每次访问时，只需将存储有 id 的 cookie 发回即可获取它在服务器中存储的数据
- 在 express 中，可以通过 express-session 组件，来实现 session 功能



#### 使用步骤

1. 安装

   ```
   yarn add express-session
   ```

2. 引入

   ```js
   const session = require('express-session')
   ```

3. 设置为中间件

   ```js
   app.use(session())
   ```

4. 向 session 中存数据

   ```js
   request.session.属性名 = 属性值
   ```

5. 向 session 中取对象

   ```js
   request.session.属性名
   ```

#### session 方法

- store.destroy(sid, callback)

  > Destroys the session and will unset the `req.session` property. Once complete, the `callback` will be invoked.

  ```js
  req.session.destroy(function(err) {
    // cannot access session here
  })
  ```

- Session.save(callback)

  > Save the session back to the store, replacing the contents on the store with the contents in memory (though a store may do something else--consult the store's documentation for exact behavior).
  >
  > This method is automatically called at the end of the HTTP response if the session data has been altered (though this behavior can be altered with various options in the middleware constructor). Because of this, typically this method does not need to be called.
  >
  > There are some cases where it is useful to call this method, for example, redirects, long-lived requests or in WebSockets.

  ```js
  req.session.save(function(err) {
    // session saved
  })
  ```

  

#### session 原理

![未命名绘图](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202305112014735.png)

客户端向服务器发送请求, 服务器会检查客户端是否有 包含 sessionId 的 cookie

如果有,

- 把对应的 session 对象从服务器中取出, 放入 request 请求中

如果没有,

- 会自动新生成一个 session 对象. 放入 request 请求中, 并生成一个 sessionId, 将 sessionId 通过 response 返回给客户端, 客户端将其存入 cookie 中, 每次访问 服务器, 就将 sessionId 带回

#### 案例

用户登录后, 设置 session 

```js
app.post("/login", (req, res) => {
  
  const { username, password } = req.body

  if (username === 'admin' && password === '123123') {
    // 登录成功后,将用户信息放入 session 
    req.session.loginUser = username
    
    res.redirect('/students/list')
  } else {
    res.send('用户名或密码错误')
  }
})
```

用户访问需要用户权限的页面时, 验证 session 中是否有用户信息

```js
router.use((req, res, next) => {
  if (req.session.loginUser) {
    next()
  } else {
    res.redirect('/')
  }
})
```

#### session 持久化

 *session 是服务器中的一个对象，这个对象用来存储用户的信息*

  *每个 session 都会有一个唯一的 id，session 创建后，*

  *id 会以 cookie 的形式发送给浏览器*

  *浏览器收到以后，每次访问都会将 id 发回，服务器中就可以根据 id 找到对应的 session* 



session 什么时候会失效？

```md
第一种 浏览器的 cookie 没了
第二种 服务器中的 session 对象没了
```

express-session 默认是将 session 存储到内存中的，所以服务器一旦重启 session 会自动重置，所以我们使用 session 通常会对 session 进行一个持久化的操作（写到文件或数据库）



如何将 session 存储到文件中？

1. 需要引入一个中间件 session-file-store

2. 使用步骤：

   1. 安装

      ```
      yarn add session-file-store
      ```

   2. 引入

      ```js
      const session = require('express-session')
      const FileStore = require('session-file-store')(session)
      ```

   3. 设置中间件

      ```js
      app.use(session({
        secret: 'xiaoxin',
        store: new FileStore({
          // path 用来指定 session 本地文件的路径
          path: path.resolve(__dirname, './sessions'),
          // 加密
          secret: '哈哈',
          // session 的有效时间 秒 默认1小时
          ttl: 10,
          // 默认情况下，fileStore 会每间隔一小时，清除一次 session 对象
          // reapInterval 用来指定清除 session 的间隔，单位 秒，默认 1小时
          reapInterval: 10
        }),
        // 设置 cookie 过期时间 
        cookie: {
          maxAge: 1000 * 3600
        } 
      }))
      ```

   


## CSRF 攻击

> CSRF（Cross-Site Request Forgery），也被称为 one-click attack 或者 session riding，即跨站请求伪造攻击。

现在大部分的浏览器都不会在跨域的情况下自动发送 cookie，这个设计就是为了避免 csrf 攻击

#### 如何解决？

1. 使用 referer 头来检查请求的来源

   ```js
   const referer = req.get('referer')
     if (!referer || !referer.startsWith('http://localhost:3000/')) {
       res.status(403)
         .send('你没有这个权限!')
       return
     }
   ```

2. 使用验证码

3. 经量使用 post 请求（结合 token）

#### token（令牌）

- 可以在创建表单时随机生成一个令牌，然后将令牌存储到 session 中，并通过 模板 发送给用户，用户提交表单时，必须将我们的 token 发会，才可以进行后续操作（可以使用 uuid 生成 token）

  *student.js*

  ```js
  // 学生列表的路由
  router.get('/list', (req, res) => {
    // 生成一个 token
    const csrfToken = uuid()
    req.session.csrfToken = csrfToken 
  
    req.session.save(() => {
      // session 默认有效期是一次会话
      res.render('students', { students: STUDENT_ARR, username: req.session.loginUser, csrfToken })
    })
  })
  ```

  *student.ejs*

  ```js
  <input type="text" name="_csrf" value="<%= csrfToken %>">
  ```

  *student.js*

  ```js
  // 添加学生的路由
  router.post('/add', (req, res, next) => {
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
    // 1. 获取用户填写的信息
    const { name, age, gender, address, _csrf } = req.body;
    
    // 将 客户端的 token 和 session 中的 token 进行比较
    if (_csrf === req.session.csrfToken) {
      req.session.csrfToken = null
      const newUser = {
        id,
        name,
        age: +age,
        gender,
        address
      }
      STUDENT_ARR.push(newUser)
  
      req.session.save(() => {
        // 调用 next 交由后续路由继续处理
        next()
      })
    } else {
      res.status(403).send('token 错误')
    }
  })
  ```



# REST 

## MVC 模型

我们之前编写的服务器都是传统的服务器，服务器的结构是基于 MVC模式

- Model —— 数据模型
- View —— 视图，用来呈现
- Controller —— 控制器，负责加载数据并选择视图来呈现数据

传统的服务器都是直接为客户端返回一个页面，但是传统的服务器并不能适用于现在的应用场景

现在的应用场景，一个应用通常都会有多个客户端（client）存在

- web端	
- 移动端（app）
- pc 端 

如果服务器直接返回 html 页面，那么服务器就只能为 web 端提供服务，其他类型的客户端还需要单独开发服务器，这样就提供了开发和维护的成本

如何解决这个问题？

- 传统的服务器需要做两件事情，第一个是加载数据，第二个是要将模型渲染进视图
- 解决方案就是将渲染视图的功能从服务器中剥离出来，
  - 服务器只负责向客户端返回数据，渲染视图的工作由客户端自行完成
- 分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务
  - 同时将视图渲染工作交给客户端以后，简化了服务器代码的编写

## rest

- 参考地址：https://restfulapi.net/

- **RE**presentational **S**tate **T**ransfer

- 表示层状态传输
- Rest 实际上就是一种服务器的设计风格
- 它的主要特点就是，服务器只返回数据

- 服务器和客户端在传输数据时通常会使用 JSON 作为格式数据
- 请求的方法：
  - GET	      加载数据
  - POST        新建或添加数据
  - PUT          添加或修改数据
  - PATCH      修改数据
  - DELETE     删除数据
  - OPTIONS     由浏览器自动发送，检查请求的一些权限  
  - ...

- API(接口) Endpoint(端点)
  - 请求的方法
  - 请求的路径 来约束
  - GET /user
  - POST /user
  - DELETE /user/:id

## postman

- 这是一个软件，通过它可以帮助向服务器发送各种请求，帮助我们测试 API.

![image-20230512173455463](https://raw.githubusercontent.com/WeiXinao/imgBed2/main/img/202305121735596.png)

## 案例1

```js
const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

let STU_ARR = [
  { id: "1", name: '孙悟空', age: 18, gender: '男', address: '花果山' },
  { id: "2", name: '猪八戒', age: 28, gender: '男', address: '高老庄' },
  { id: "3", name: '沙和尚', age: 38, gender: '男', address: '流沙河' }
]

app.use(express.urlencoded({ extended: true }))
// 解析 json 格式的请求体
app.use(express.json())

// 统一的 api
// 定义学生信息相关的路由
app.get('/students', (req, res) => {
  // 获取学生信息
  console.log('收到 students 的 get 请求')
  // 返回学生信息
  res.send({
    status: 'ok',
    data: STU_ARR
  })
})

// 查询某个学生的路由
app.get('/students/:id', (req, res) => {
  const { id } = req.params
  const student = STU_ARR.find(el => el.id === id)

  // 将数据返回
  res.send({
    status: 'ok',
    data: student
  })
})


// 定义一个添加学生的路由
app.post('/students', (req, res) => {
  console.log('收到 students 的 post 请求', req.body)
  // 获取学生的信息
  const { name, age, gender, address } = req.body
  // 创建学生信息
  const student = {
    id: +STU_ARR.at(-1).id + 1 + '',
    name,
    age: +age,
    gender,
    address
  }

  // 将学生信息添加到数组
  STU_ARR.push(student)

  // 添加成功
  res.send({
    status: 'ok',
    data: student
  })
})

// 定义一个删除学生的路由 根据 id 删除学生
app.delete('/students/:id', (req, res) => {
  // 获取学生的 id 
  const { id } = req.params

  // 遍历数组
  for (let i = 0; i < STU_ARR.length; i++) {
    if (STU_ARR[i].id === id) {
      const delStudents = STU_ARR.splice(i, 1)
      // 数据删除成功
      return res.send({
        status: 'ok',
        data: delStudents[0]
      })
    }
  }

  // 如果执行到这里，说明学生不存在
  res.status(410)
    .send({
    status: 'error',
    data: '学生 id 不存在'
  })
})

// 定义一个修改学生的路由
app.put('/students', (req, res) => {
  // 获取数据
  const {id, name, gender, age, address} = req.body
  
  // 根据 id 查询学生
  const student = STU_ARR.find(el => el.id === id)
  if (student) {
    Object.assign(student, { name, gender, age, address })
    res.send({
      status: 'ok',
      data: student
    })
  } else {
    res.status(410).send({
      status: 'error',
      data: '学生 id 不存在'
    })
  }
})

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`)
})
```

## AJAX

在 js 中向服务器发送的请求加载数据的技术叫 AJAX

AJAX

- A —— 异步 J —— JavaScript A —— And X —— xml

- 异步的 js 和 xml

- 它的作用就是通过 js 向服务器发送请求和加载数据

- xml 就是早期 AJAX 使用的数据格式

  ```xml
  <student>
  	<name>孙悟空</name>
  </student>
  ```

- 目前数据格式都使用 json

  ```json
  {
      "name": "孙悟空"
  }
  ```

- 可以选择的方案

  1. XMLHTTPRequest（xhr）
  2. Fetch
  3. Axios

### 使用步骤

1. 创建一个新的 xhr 对象，xhr 表示请求信息

   ```js
   const xhr = new XMLHttpRequest()
   ```

2. 设置响应体的类型，设置后会自动对数据进行类型转换

   ```js
   xhr.responseType = 'json'
   ```

3. 设置请求的信息

   ```js
   xhr.open("GET", "http://localhost:3000/students")
   ```

4. 为 xhr 对象绑定一个 load 事件

   ```js
   xhr.onload = () => {
   	// xhr.status 表示响应状态码
       if (xhr.status === 200) {
         // xhr.response 表示响应信息
         console.log(xhr.response)
       }
   }
   ```

5. 发送请求

   ```js
   xhr.send()
   ```

## fetch

- fetch
  - fetch 是 xhr 的升级版，采用的是 Promise API
  - 作用和 AJAX 是一样的，但是使用起来更加友好
  - fetch 原生 js 就支持的一种 ajax 请求的方式

### 使用步骤

1. 发送 get 请求

   ```js
   fetch('http://localhost:3000/students/1', options)
   ```

2. options

   ```js
   {
       // 请求方法
       method: 'POST',
       headers: {
         // 请求数据类型   
         'Content-Type': 'application/x-www-form-urlencoded',
         // 'Content-Type': 'application/json'
       },
       // 通过 body 去发送数据时，必须通过请求头来指定数据的类型
       body: 'name=xiaoxin&gender=男'
   }
   ```

3. 获取请求数据

   ```js
   fetch('http://localhost:3000/students/2')
       .then(res => {
         if (res.status === 200) {
           // res.json() 可以用来读取 json 格式的数据
           return res.json()
         } else {
           throw new Error('加载失败！')
         }
       })
       .then(res => {
         // 获取到数据，将数据渲染到页面中
         console.log(res.data)
       })
       .catch(err => {
         console.log('出错了！', err)
       })
   ```

   第一个 then 获取整个响应对象，然后 `res.json()` 获取的是 响应中 json 格式的数据，将其保存到 Promise 中；

   第二个 then 获取的是上一个 保存到 Promise 中的 json 格式的响应体；

   catch 捕获错误

### 取消请求

```js
// 创建一个 AbortController
controller = new AbortController()

// 在 fetch 中配置
fetch('http://localhost:3000/test', {
	signal: controller.signal
})
```



## CORS（跨域资源共享）

- 跨域请求

  - 如果两个网站完整的域名不相同

    a 网站：http://haha.com https://haha.com

    b 网站：http://heihei.com

  - 跨域需要检查三个东西：

    - 协议
    - 域名
    - 端口号

  - 当我们通过 AJAX 去发送跨域请求时，浏览器为了服务器的安全，会阻止 JS 读取服务器的数据，<mark style="background-color: #fad4b5">CORS error 是为了保护服务器</mark>

- 解决方案

  - 在服务器中设置一个允许跨域的头

    `Access-Control-Allow-Origin`允许哪些客户端访问我们的服务器

    ```js
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    或
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    // Access-Control-Allow-Methods 允许的请求方式
    // Access-Control-Allow-Headers 允许传递的请求头
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    ```

> [!attention]
>
> `Access-Control-Allow-Origin` 设置指定值时，只能设置一个

    

## 本地存储

登录成功以后，需要保持用户的登录状态，需要将用户的信息存储到某个地方

> [!attention]
>
> 因为 REST 风格的服务器，客户端和服务器不在一个域下，所以，cookie 无法使用

我们需要将用户信息存储到本地存储

什么是本地存储？

```js
sessionStorage
localStorage
```

所谓的本地存储就是指浏览器自身的存储空间，可以将用户数据存储到浏览器内部

区别：

- sessionStorage 中存储的数据，页面一关闭就会丢失，只在当前页面有效
- localStorage 存储的时间比较长

使用：

- sessionStorage

  | 方法           | 说明         |
  | -------------- | ------------ |
  | `setItem()`    | 用来存储数据 |
  | `getItem()`    | 用来获取数据 |
  | `removeItem()` | 删除数据     |
  | `clear()`      | 清空数据     |

  ```js
  btn01.onclick = () => {
    // console.log(sessionStorage)
  
    // setItem() 用来存储数据
    sessionStorage.setItem('name', '孙悟空')
    sessionStorage.setItem('age', '18')
    sessionStorage.setItem('gender', '男')
    sessionStorage.setItem('address', '花果山')
  }
  
  btn02.onclick = () => {
    const name = sessionStorage.getItem('name')
    console.log(name)
    sessionStorage.removeItem('name')
    sessionStorage.clear()
  }
  ```

- localStorage

  | 方法           | 说明         |
  | -------------- | ------------ |
  | `setItem()`    | 用来存储数据 |
  | `getItem()`    | 用来获取数据 |
  | `removeItem()` | 删除数据     |
  | `clear()`      | 清空数据     |

## 案例2

```html
<body>
  <div id="root">
    <h1>请登录以后再做操作</h1>
    <h2 id="info"></h2>
    <form>
      <div>
        <input id="username" type="text">
      </div>
      <div>
        <input id="password" type="password">
      </div>
      <div>
        <button id="login-btn" type="button">登录</button>
      </div>
    </form>
  </div>
  <script>
    //  点击 login-btn 后，实现登录功能
    const loginBtn = document.getElementById('login-btn')
    const root = document.getElementById('root')

    function loadData() { 
      fetch('http://localhost:3000/students')
        .then(res => {
          if (res.status === 200) {
            // res.json() 可以用来读取 json 格式的数据
            return res.json()
          } else {
            throw new Error('加载失败！')
          }
        })
        .then(res => {
          // 获取到数据，将数据渲染到页面中
          if (res.status === 'ok') {
            const dataDiv = document.getElementById('data')
            // 创建一个 table 
            const table = document.createElement('table')
            dataDiv.appendChild(table)
            table.insertAdjacentHTML('beforeend', '<caption>学生列表</caption>')
            table.insertAdjacentHTML(
              'beforeend', 
              `<thead>
                <tr>
                  <th>学号</th>
                  <th>姓名</th>
                  <th>年龄</th>
                  <th>性别</th>
                  <th>地址</th>
                </tr>
              </thead>`)
            
            const tbody = document.createElement('tbody')
            table.appendChild(tbody)

            // 遍历数据
            for(let stu of res.data) {
              tbody.insertAdjacentHTML('beforeend',
              `<tr>
                <td>${stu.id}</td>
                <td>${stu.name}</td>
                <td>${stu.age}</td>
                <td>${stu.gender}</td>
                <td>${stu.address}</td>
              </tr>`)
            }
          }
        })
        .catch(err => {
          console.log('出错了！', err)
        })
    }

    // 判断用户是否登录
    if (localStorage.getItem('userId')) {
        // 用户已经登录
        // 登录成功
        root.innerHTML = `
            <h1>欢迎${localStorage.getItem('nickname')} 回来！</h1>
            <hr>
            <button id="load-btn" type="button" onclick="loadData()">加载数据</button>
            <hr>
            <div id="data"></div>
          `
      } else {
        loginBtn.onclick = () => {
        // 获取用户输入的用户名和密码
        const username = document.getElementById('username').value.trim()
        const password = document.getElementById('password').value.trim()

        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          if (res.status === 'ok') {
            // 登录成功
            // 登录成功，向本地存储中插入用户的信息
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('nickname', res.data.nickname)

            // 用户已经登录
            // 登录成功
            root.innerHTML = `
                <h1>欢迎${localStorage.getItem('nickname')} 回来！</h1>
                <hr>
                <button id="load-btn" type="button" onclick="loadData()">加载数据</button>
                <hr>
                <div id="data"></div>
              `
          } else {
            throw new Error(res.data)
          }
          
        })
        .catch(err => {
          console.log('出错了！', err)
          // 登录失败 
          const info = document.getElementById('info')
          info.style.color = 'red'
          info.innerText = '用户名或密码错误'
        })
      }
    }
  </script>
</body>
```

问题：

- 现在是登录以后直接将用户信息存储到本地 `localStorage`

- 主要存在两个问题：

  1. 数据安全问题
  2. 服务器不知道你有没有登录

- 解决问题

  - 如何告诉服务器客户端的登录状态，rest 风格的服务器是无状态的，所以不要在服务器中存储用户的数据

  - 服务器中不能存储用户信息，可以将用户信息发送给客户端保存，客户端每次访问服务器时，直接将用户信息发回，服务器就可以根据用户信息来识别用户的身份，但是如果将数据直接发给客户端同样会有数据安全的问题，所以我们必须对数据进行加密，加密以后，再发送给客户端保存，这样就可以避免数据的泄露

  - 在 node 中可以直接使用 jsonwebtoken 这个包对数据进行加密

    jsonwebtoken（jwt）——> 通过对 json 加密后，生成一个 web 中使用的令牌

## token 

### 使用步骤

1. 安装

   ```bash
   yarn add jsonwebtoken
   ```

2. 引入

   ```js
   const jwt = require('jsonwebtoken')
   ```

3. 对对象或者字符串或Buffer进行加密

   ```js
   // 使用 jwt 对 json 数据进行加密
   const token = jwt.sign(obj, 'xiaoxin', {
     expiresIn: '1'
   })
   ```

   传递三个参数

   - 第一个参数，obj 表示要加密的数据
   - 第二个参数，'xiaoxin' 表示密钥
   - 第三个参数表示配置对象，expiresIn 表示过期时间
   - 参考：[jsonwebtoken - npm (npmjs.com)](https://www.npmjs.com/package/jsonwebtoken)

4. 解密

   ```js
   try {
     // 服务器收到客户端的 token 后
     const decodeData = jwt.verify(token, 'xiaoxin')
     console.log(decodeData)
   } catch (error) {
     // 说明 token 解码失效，说明 token 无效
     console.log('无效的token')
   }
   ```

   如果 token 失效，会抛出 `TokenExpiredError: jwt expired` 错误，因此，解密的时候需要 try-catch


## Axios



