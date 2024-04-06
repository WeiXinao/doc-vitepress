# HTTP 协议

- 网络基础

- 网络的服务器基于请求和响应的

  1. 当浏览器中输入地址以后发生了什么？

     https:// notes.xiaoxin.link /index.html

     https:// 协议名 http ftp ...

     notes.xiaoxin.com 域名 domain

     ​	整个网络中存在着无数个服务器，每一个服务器都有它自己的唯一标识

     ​		这个标识被称为 ip 地址 192.168.1.17 但是 ip 地址不方便记忆

     ​		域名就相当于是 ip 地址的别名

  ​	    

  ​		/index.html

  ​			网址资源路径

  1. 在浏览器中输入地址以后发生了什么？
     https:// notes.xiaoxin.link /index.html

     1. DNS 解析，获取网址的 IP 地址
     2. 浏览器需要和服务器建立连接（tcp/ip，三次握手）
     3. 向服务器发生请求（http协议）
     4. 服务器处理请求，并返回响应（http协议）
     5. 浏览器将响应的页面渲染
     6. 断开和服务器的连接（四次挥手）

  2. 客户端如何和服务器建立（断开）连接

     - 通过三次握手和四次挥手

       - 三次握手

         - 三次握手是客户端和服务器建立连接的过程

           1. 客户端向服务器发送连接请求

              SYN

           2. 服务器收到连接请求，向客户端返回消息

              SYN	ACK

           3. 客户端向服务器发送同意连接的信息

              ​		 ACK

       - 四次挥手（断开连接）

         1. 客户端向服务器发送请求，通知服务器数据发送完毕，请求断开连接

            FIN

         2. 服务器向客户端返回数据，知道了

            ACK

         3. 服务器向客户端返回数据，收完了，可以断开连接

            FIN ACK

         4. 客户端向服务器发数据，同意断开

            ACK

  请求和响应实际上就是一段数据，只是这段数据需要遵循一个特殊的格式，这个特殊的格式有 HTTP 协议来规定

  

  TCP/IP 协议簇

  - TCP/IP 协议簇中包含了一组协议
    - 这组协议规定了互联网中所有的通信的细节
  - 网络通信的过程由四层组成
    - 应用层
      - 软件层面，浏览器、服务器都数据应用层
    - 传输层
      - 负责对数据进行拆分，把大数据分为一个一个小包
    - 网路层
      - 负责给数据包，添加信息
    - 数据链路层
      - 传输信息

  - HTTP 协议就是应用层的协议，用来规定客户端和服务器间通信的报文格式
  - 报文（message）
    - 浏览器和服务器之间通信是基于请求和响应的
      - 浏览器向服务器发送请求（request）
      - 服务器向浏览器返回响应（response）
      - 浏览器向服务器发送请求相当于给浏览器写信，服务器向浏览器返回响应，相当于服务器给浏览器回信，这个信在 HTTP 协议中就被称为报文
      - HTTP 协议就是对这个报文的格式进行规定

  - 请求报文（request）

    - 客户端发送给服务器的报文称为请求报文

    - 请求报文的格式如下：

      - 请求行

        - 请求首行就是请求报文的第一行

          ```md
          GET ws://127.0.0.1:5500/07_http%E5%8D%8F%E8%AE%AE/01_http%E5%8D%8F%E8%AE%AE.html/ws HTTP/1.1
          ```

          第一部分 get 表示请求的方式，get 表示发送的是 get 请求

          现在常用的方式就是 get 和 post 请求

          - get 请求主要用来向服务器请求资源
          - post 请求主要用来向服务器发送数据

          第二部分 /01_http%E5%8D%8F%E8%AE%AE.html?username=sunwukong

          - 表示请求资源的路径，？后边的内容叫做查询字符串

            - 查询字符串是一个名值对结构，一个名字对应一个值，使用 `=` 连接，多个名值对之间使用 & 分割

              `username=XiaoXin&password=123`

            - get 请求通过查询字符串将数据发送给服务器

              由于查询字符串会在浏览器地址栏中直接显示，所有

              1. 它安全性较差
              2. 由于 url 地址长度有限制，所有 get 请求无法较大的数据

             

            - post 请求通过请求体来发送数据

              - 在 chrome 中通过 payload 来查看

                post 请求通过请求体发送数据，无法在地址栏直接查看，所以安全性较好

                ```md
                username: XiaoXin
                password: qwe
                ```

                请求体的大小没有限制，可以发送任意大小的数据

            - 如果你需要向服务器发送数据，能用 post 尽量用 post 

          第三部分

          ​	HTTP/1.1 协议的版本

      - 请求头

        - 请求头也是明值对结构，用来告诉服务器我们浏览器的信息
        - 每一个请求头都有它的作用
          - Accept 浏览器可以接受的文件类型

        ```md
        Host: 127.0.0.1:5500
        Connection: Upgrade
        Pragma: no-cache
        Cache-Control: no-cache
        	User-Agent 用户代理，它是一段用来描述浏览器信息的字符串
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36
        Upgrade: websocket
        Origin: http://127.0.0.1:5500
        Sec-WebSocket-Version: 13
        	Accept-Encoding 浏览器允许的压缩的编码 
        Accept-Encoding: gzip, deflate, br 
        	Accept-Language 客户端浏览器可以接受的语言
        Accept-Language: zh-CN,zh;q=0.9
        Sec-WebSocket-Key: hcq0L8i4H3LQ697h8G1Sjg==
        Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
        ```

      - 空行

        - 用来分隔请求头和请求体

      - 请求体

        - post 请求通过请求体来发送数据

        ```md
        GET ws://127.0.0.1:5500/07_http%E5%8D%8F%E8%AE%AE/01_http%E5%8D%8F%E8%AE%AE.html/ws HTTP/1.1
        Host: 127.0.0.1:5500
        Connection: Upgrade
        Pragma: no-cache
        Cache-Control: no-cache
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36
        Upgrade: websocket
        Origin: http://127.0.0.1:5500
        Sec-WebSocket-Version: 13
        Accept-Encoding: gzip, deflate, br
        Accept-Language: zh-CN,zh;q=0.9
        Sec-WebSocket-Key: hcq0L8i4H3LQ697h8G1Sjg==
        Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
        ```

- 响应报文

  - 响应首行

    - ```md
      HTTP/1.1 200 OK
      ```

    - 200 响应状态码

    - ok 响应状态码的描述

    - 响应状态码的规则

      - 1xx 请求处理中
      - 2xx 表示成功
      - 3xxx 表示请求的重定向
      - 4xx 表示客户端错误
        - 404 not found
        - 403 没有权限
      - 5xx 表示服务器的错误

  - 响应头

    - 响应头也是一个个的名值对结构，用来告诉浏览器响应的信息

    - ```
      Content-Type: text/html; charset=UTF-8
      Content-Length: 1944
      ```

      - `Content-Type` 用来描述响应体的类型
      - `Content-Length` 用来描述响应体的大小

  - 空行

    - 空行用来分隔响应体和响应体

  - 响应体

    - 响应体就是服务器返回给客户端的内容

    

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <form action="./02_target.html" method="post">
        <input type="text" name="username"> 
        <input type="password" name="password">
        <button type="submit">提交</button>
      </form>
    </body>
    </html>
    ```

```md
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Tue, 09 May 2023 05:05:20 GMT
ETag: W/"1c3-187fee65604"
Content-Type: text/html; charset=UTF-8
Content-Length: 1944
Date: Tue, 09 May 2023 05:21:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

网页、css、js 这些资源会作为响应报文中的哪一部分发送？响应体

- 服务器
  - 一个服务器的主要功能：
    1. 可以接受浏览器发送的请求报文
    2. 可以向浏览器返回响应报文