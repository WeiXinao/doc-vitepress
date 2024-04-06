# Go Web

## 网络基础知识

 ### OSI 七层模型

- 应用层
  - 应用层
  - 表示层
  - 会话层
- 传输层
- 网络层
- 数据链路层
- 物理层

### TCP/IP 协议

应用层：http、smtp、pop3、ftp、dns

传输层：tcp、udp

网络层：ospf、bgp、ip、arp（rarp）

### HTTP 协议

- HTTP（HyperText Transfer Protocol，超文本传输协议）是访问互联网使用的核心通信协议，是所有 web 应用程序使用的通信协议。
- 消息模型：客户端发送请求消息，服务器返回相应消息。传输层使用具有状态的 TCP 协议，HTTP 协议本身不具有状态。

#### HTTP 请求

- HTTP 请求消息分为消息头和消息主体（可选），消息头和消息主体用空白行分隔。

  ![image-20231223152057565](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231520637.png)

#### HTTP 请求说明

1. 消息头第一行由三个以空格分隔的元素组成，分别以 HTTP 方法、请求的 URL 和使用的 HTTP 版本

   - HTTP 方法：
     1. GET：用于获取资源，参数通过 url 查询字符串方式提交给服务器，无消息主体
     2. POST：用于执行操作，参数可以通过 URL 查询字符串方式和消息主体提交给服务
     3. HEAD：用于检测资源是否存在，与 GET 类似，区别在于在响应消息中返回的消息主体为空
     4. TRACE：用于诊断，可判断客户端和服务器之间是否存在代理服务器，原理：服务器在响应主体中返回收到的请求消息
     5. OPTIONS：用于要求服务器报告对某一资源有效的 HTTP 方法，服务器常返回 Allow 消息头的响应，并列出所有有效的方法
     6. PUT：使用请求主体中的内容向服务器上传指定资源
     7. DELETE：用于删除资源
     8. CONNECT
   - 请求 URL：用于指定请求的资源名称以及查询参数
   - 使用的 HTTP 版本：常用1.0 和 1.1 版本，在 1.1 版本中请求消息中必须包含 Host 请求头

2. 其他

   - Host: 指定请求访问的主机名，当多个 web 站点部署在同一台主机上时，需要使用 Host 消息头

   - User-Agent：指定客户端软件的信息，例如浏览器类型和版本、操作系统类型和版本等。

   - Accept：告诉服务器端接收哪些格式的内容

   - Accept-Language：支持的语言格式

   - Accept-Encoding：`gzip` 是否支持压缩

   - Referer：表示发送请求的原始 URL

   - Cookie：用来跟踪用户状态，一个客户端的存储，提交服务器向客户端发布的其他参数

   - Connection：在创建连接一段时间，保持连接不释放

   - HTTP 请求格式	

     ```
     请求行 method url 协议
     请求头 key:value
     
     请求体 请求发送给服务器的内容
     ```

#### HTTP 响应

- HTTP响应消息分为消息头和消息主体（可选），消息头和消息主体用空白行分隔。

![image-20231223162110755](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312231621224.png)

#### HTTP 响应说明

1. 消息头第一行由三个空格分开的元素组成，分别表示 HTTP 版本、状态码、请求状态描述
2. 其他：
   - Server: 旗标，指明使用的 web 服务器软件
   - Set-Cookie：设置 cookie 信息，在随后向服务器发送的请求中由 Cookie 消息头返回
   - Content-Type：指定消息主体类型
   - Content-Length：指定消息主体的字节长度

## 应用开发

http 包提供了 HTTP 服务器和客户端的开发接口，内置 web 服务器

针对 web 服务器开发的流程为

- 定义处理器/处理器函数
  - 接收用户数据
  - 返回信息
- 绑定 URL 处理器/处理器函数
- 启动 web 服务器

### 面向对象：定义处理器

![image-20231225230104169](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252301255.png)

![image-20231225230703285](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252307339.png)

<img src="https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252309579.png"/>

![image-20231225234425788](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252344890.png)

```go
package main

import (
	"io"
	"net/http"
	"time"
)

// 处理器
// Handler 接口
// ServeHTTP(http.ResponseWriter, *http.Request)

type TimeHandler struct {
}

func (h *TimeHandler) ServeHTTP(response http.ResponseWriter, request *http.Request)  {
	now := time.Now().Format("2006-01-02 15:04:05")
	io.WriteString(response, now)
}

func main() {
	http.Handle("/time/", &TimeHandler{})

	http.ListenAndServe(":9998", nil)
}
```

### 面向过程：定义处理器函数

![image-20231225234544396](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252345458.png)

![image-20231225235330053](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252353517.png)

```go
package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {
	// 1. 定义处理器/处理器函数
	// 2. 绑定 URL 处理器/处理器函数
	// 3. 启动 web 服务

	/*
		1. 处理器函数
		参数：http.ResponseWriter, *http.Request
	*/
	timeFunc := func(response http.ResponseWriter, request * http.Request) {
		// fmt.Println(request)

		now := time.Now().Format("2006-01-02 15:04:05")
		// io.WriteString(response, now)
		_, err := fmt.Fprint(response, now)
		if err != nil {
			fmt.Println("fmt.Fprintf err:", err)
			return
		}
	}
	
	/*
		2. 绑定 URL 关系
		http.HandleFunc(path,处理器函数)
	*/

	http.HandleFunc("/time/", timeFunc)
	http.HandleFunc("/", func (response http.ResponseWriter, request *http.Request)  {
		ctx, err := os.ReadFile("./index.html")
		if err == nil {
			response.Write(ctx)
		} else {
			fmt.Fprint(response, "欢迎")
		}
	})

	/*
		http.listenAndServe(addr, nil)
	*/
	http.ListenAndServe(":9999", nil)
}
```

### 获取 header 中的参数

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// 当请求 URL 未绑定，按照 URL 中最近匹配的绑定关系去处理
	/*
		/ indexHandleFunc
		/time/ timeHandleFunc

		/time/ => timeHandleFunc
		/time/xxx/xxx => /time/ => timeHandleFunc

		/abc/abc/ => / => indexHandleFunc
	*/

	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		fmt.Println(
			req.Method,
			req.URL,
			req.Proto,
		)

		fmt.Printf("%T, %#v\n", req.Header, req.Header)
		fmt.Println(req.Header.Get("User-Agent"))
	})

	http.ListenAndServe(":8888", nil)
}
```

### 获取 GET 请求参数

1. 通过 `req.Form` 属性

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// http 协议
	// GET
	// url?params
	// params k=v&k2=v2

	http.HandleFunc("/", func (resp http.ResponseWriter, req *http.Request)  {
		// 1. 解析参数
		req.ParseForm()
		// 2. 获取
		fmt.Printf("req.Form: %v\n", req.Form)
		fmt.Println(req.Form.Get("a")) // 这种方式只能获取一个值
		fmt.Println(req.Form["a"])
	})

	http.ListenAndServe(":8888", nil)
}
```

2. 通过 `req.FormValue()` 方法

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// http 协议
	// GET
	// url?params
	// params k=v&k2=v2

	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		fmt.Printf("req.FormValue(\"a\"): %v\n", req.FormValue("a")) // req.FormValue("a"): b
	})

	http.ListenAndServe(":8888", nil)
}
```

### 获取 POST 请求参数

方式1：使用 `Form` 或者 `postForm` 属性

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// http post
	// 提交数据 请求体
	// 有编码格式
	// application/x-www-form-urlencoded
	// k=v&v2=v2
	// 上传文件 => multipart/form-data
	// application/json {"a": 1}

	// 有编码格式
	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		// 1. 解析参数
		req.ParseForm()
		// 2. 获取
		fmt.Printf("req.Form: %v\n", req.Form) // 包含请求体和 URL 中的数据
		// req.Form: map[a:[1 3 4] b:[2] c:[5]]
		fmt.Printf("req.Form.Get(\"a\"): %v\n", req.Form.Get("a"))
		// req.Form.Get("a"): 1
		fmt.Printf("req.Form[\"a\"]: %v\n", req.Form["a"])
		// req.Form["a"]: [1 3 4]
		fmt.Printf("req.PostForm: %v\n", req.PostForm) // 只包含请求体中的数据
		// req.PostForm: map[a:[1 3] b:[2]]
	})

	http.ListenAndServe(":8888", nil)
}
```

测试命令

```go
curl -X POST "http://localhost:8888?a=4&c=5" -d "a=1&b=2&a=3"
```

方式2：使用 `PostFormValue` 方法

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// http 协议
	// GET
	// url?params
	// params k=v&k2=v2

	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		fmt.Printf("req.PostFormValue(\"a\"): %v\n", req.PostFormValue("a"))
		// req.PostFormValue("a"): 1
	})

	http.ListenAndServe(":8888", nil)
}
```

测试命令

```go
curl -X POST "http://localhost:8888?a=4&c=5" -d "a=1"
```

### 处理 formdata 格式

使用 curl 进行接口测试

```bash
curl -X POST "http://localhost:8888?b=1" -F "a=@main.go" -F "c=3"
```

方式1：使用 `MultipartForm` 获取值和文件

![image-20231225235800460](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252358478.png)

![image-20231226000301744](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312260003807.png)

![image-20231226000403647](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312260004700.png)

![image-20231226000509578](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312260005661.png)

```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	// http 协议
	// GET
	// url?params
	// params k=v&k2=v2

	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		// 1. 解析提交内容
		err := req.ParseMultipartForm(1024 * 1024)
		if err != nil {
			return
		}
		fmt.Printf("req.MultipartForm: %v\n", req.MultipartForm) // Value, File
		// url 数据 => Form, FormValue
		// body 值类型 => Form, FormValue, PostForm, PostFormValue req.MultipartForm.Value
		// file req.MultipartForm.File["name"][0].Open()
		// FormFile

		// Todo: 参数检查
		file, _ := req.MultipartForm.File["a"][0].Open()
		io.Copy(os.Stdout, file)
	})

	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		return
	}
}
```

方式2：使用 `FomFile` 方法

```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	// http 协议
	// GET
	// url?params
	// params k=v&k2=v2

	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		file, header, _ := req.FormFile("a")
		io.Copy(os.Stdout, file)

		fmt.Println(header.Filename)
		fmt.Println(header.Size)
		fmt.Println(header.Header)
	})

	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		return
	}
}
```

### 处理 application/json 格式

![image-20231226170849764](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261708935.png)

![image-20231226171058548](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261710602.png)

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	// http post
	// 提交数据 请求体
	// 有编码格式
	// application/x-www-form-urlencoded
	// k=v&v2=v2
	// 上传文件 => multipart/form-data
	// application/json {"a": 1}

	// 有编码格式
	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		// 需要读取请求中数据
		// io.Copy(os.Stdout, req.Body)
		decoder := json.NewDecoder(req.Body)
		var info map[string]any
		err := decoder.Decode(&info)
		if err != nil {
			fmt.Println("decode json err:", err)
			return
		}
		fmt.Println(info)
	})

	http.ListenAndServe(":8888", nil)
}
```

### cookie

在 cookie 中设置一个 counter 键值对，每次访问将对应值 +1

![image-20231226171903970](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261719053.png)

```go
package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func ParseCookie(cookie string) map[string]string {
	cookieMap := make(map[string]string)
	cookies := strings.Split(cookie, ";")
	// todo: 格式检查
	for _, cookie := range cookies {
		each := strings.Split(cookie, "=")
		if len(each) == 2 {
			cookieMap[strings.TrimSpace(each[0])] = strings.TrimSpace(each[1])
		}
	}
	return cookieMap
}

func main() {
	// cookie 浏览器端存储
	// 读取 cookie 中数据
	// counter += 1 设置在浏览器中（counter无，设置为 0 + 1）

	// 请求获取：Cookie
	// 响应设置：Set-Cookie
	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		// 读取 cookie
		cookie := ParseCookie(req.Header.Get("Cookie"))

		counter := 0
		if v, err := strconv.Atoi(cookie["counter"]); err == nil {
			counter = v
		}

		counterCookie := &http.Cookie{
			Name:     "counter",
			Value:    strconv.Itoa(counter + 1),
			HttpOnly: true,
		}
		http.SetCookie(resp, counterCookie)
		fmt.Fprintf(resp, "counter: %d", counter)
	})

	http.ListenAndServe(":8888", nil)
}
```

### redirect 重定向

访问首页时重定向到登录页面

![image-20231226172214417](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261722477.png)

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	// 重定向，让浏览器重新发起请求到新的地址上
	http.HandleFunc("/home/", func(resp http.ResponseWriter, req *http.Request) {
		http.Redirect(resp, req, "/login/", 302)
		fmt.Fprint(resp, "首页")
	})

	http.HandleFunc("/login/", func(resp http.ResponseWriter, req *http.Request) {
		fmt.Fprint(resp, "登录页面")
	})

	http.ListenAndServe(":8888", nil)
}
```

![image-20231225223658332](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252236535.png)

![image-20231225223805197](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252238262.png)

### 静态文件服务器

```go
package main

import "net/http"

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("src/goWeb/13_static/static"))))
	http.Handle("/static2/", http.StripPrefix("/static2/", http.FileServer(http.Dir("src/goWeb/13_static/www"))))

	http.ListenAndServe(":8888", nil)
}

```

![image-20231225224215766](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312252242827.png)

![image-20231226173805303](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261738421.png)

![image-20231226174231405](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261742469.png)

### 创建客户端	

1. 发送 GET 请求

```go
package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
)

func main() {
	resp, err := http.Get("http://localhost:8888?a=1&b=2")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(resp.Proto, resp.StatusCode, resp.Status)
		fmt.Println(resp.Header)
		io.Copy(os.Stdout, resp.Body)
	}
}
```

![image-20231226190604081](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261906180.png)

2. POST 请求发送 `application/json` 数据

![image-20231226192002580](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261920649.png)

![image-20231226192515135](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261925202.png)

```go
package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
)

func main() {
	buffer := bytes.NewBufferString(`{"aadsasdas": 11111}`)
	resp, err := http.Post("http://localhost:8888", "application/json", buffer)
	fmt.Println(resp, err)
}
```

3. POST 请求发送 `application/x-www-form-urlencoded` 数据

![image-20231226192734788](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312261927871.png)

```go
package main

import (
	"fmt"
	"net/http"
	"net/url"
)

func main() {
	params := url.Values{}
	params.Add("a", "1")
	params.Add("a", "2")
	params.Add("b", "3")

	resp, err := http.PostForm("http://localhost:8888", params)
	fmt.Println(resp, err)
}

```

golang 发送 http 请求的第三方库：https://pkg.go.dev/github.com/imroc/req/v3#section-readme

## RPC
RPC 即远程过程调用（Remote Produre Call），用于构建计算机之间的通信协议，该协议允许运行于一台计算机的程序调用另一台计算机上的程序，开发人员无需对交互过程进行编程

rpc 和 rpc/jsonrpc 包提供了对 rpc 的支持
- rpc 构建于 TPC 或 HTTP 协议之上，底层数据编码使用 gob，因 gob 编码为 golang 自定义，所以无法支持跨语言调用
- rpc/jsonrpc 构建于 TCP 协议之上，底层数据编码使用 json，可支持跨语言调用

### 定义 RPC 结构体和方法
- RPC 结构体和方法必须为公开
- 方法必须有两个参数和返回值 error，第一个参数为请求结构体变量指针，用于获取客户端提交的参数，第二参数为响应结构体指针变量，用于响应结果返回，返回值 error 用于告知客户端错误信息

### jsonrpc
 jsonrpc 包常用函数
- Dial：连接 JSONRPC 
- ServeConn：处理客户端连接
![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312272339435.png)
- 15_jsonrpc/data/calculator.go

```go
package data  

// CalculatorRequest calculator service 请求对象  
type CalculatorRequest struct {  
    Left  int  
    Right int  
}  
  
// CalculatorResponse calculator service 响应对象  
type CalculatorResponse struct {  
    Result int  
}
```

- 15_jsonrpc/server/service/calculator.go

```go
package service  
  
import (  
    "goProject/src/goWeb/15_jsonrpc/data"  
    "log")  
  
// Calculator 定义计算服务  
type Calculator struct {  
}  
  
// Add 定义 + 方法  
func (c *Calculator) Add(request *data.CalculatorRequest, response *data.CalculatorResponse) error {  
    log.Printf("[+] call add method")  
    response.Result = request.Left + request.Right  
    return nil  
}
```

- 15_jsonrpc/server/main.go

```go
package main

import (
	"goProject/src/goWeb/15_jsonrpc/server/service"
	"log"
	"net"
	"net/rpc"
	"net/rpc/jsonrpc"
)

func main() {
	addr := ":9999"
	// 注册服务 指定服务名称
	rpc.RegisterName("calc", &service.Calculator{})
	// 注册服务 未指定服务名称，默认结构体名
	rpc.Register(&service.Calculator{})
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		err = listener.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()
	log.Printf("[+] listen on: %s", addr)

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("[-] error client: %s\n", err.Error())
			continue
		}
		log.Printf("[+] client connected: %s\n", conn.RemoteAddr())

		// 使用例程启动 jsonrpc 处理客户端请求
		go jsonrpc.ServeConn(conn)
	}
}
```

- 15_jsonrpc/client/main.go

```go
package main

import (
	"fmt"
	"goProject/src/goWeb/15_jsonrpc/data"
	"log"
	"net/rpc/jsonrpc"
)

func main() {
	addr := "127.0.0.1:9999"
	conn, err := jsonrpc.Dial("tcp", addr)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		err = conn.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()

	// 定义请求对象
	request := &data.CalculatorRequest{2, 5}
	// 定义响应对象
	response := &data.CalculatorResponse{}
	// 调用远程方法
	err = conn.Call("calc.Add", request, response)
	// 获取结果
	fmt.Println(err, response.Result)
}
```
### rpc 
![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202312281444332.png)

- 16_rpc/data/calculator.go

```go
package data  
  
// CalculatorRequest calculator service 请求对象  
type CalculatorRequest struct {  
    Left  int  
    Right int  
}  
  
// CalculatorResponse calculator service 响应对象  
type CalculatorResponse struct {  
    Result int  
}
```

- 16_rpc/server/service/calculator.go

```go
package service  
  
import (  
    "goProject/src/goWeb/16_rpc/data"  
    "log"
    )  
  
// Calculator 定义计算服务  
type Calculator struct {  
}  
  
// Add 定义 + 方法  
func (c *Calculator) Add(request *data.CalculatorRequest, response *data.CalculatorResponse) error {  
    log.Printf("[+] call add method")  
    response.Result = request.Left + request.Right  
    return nil  
}
```

- 16_rpc/server/main.go

```go
package main

import (
	"goProject/src/goWeb/16_rpc/server/service"
	"log"
	"net"
	"net/http"
	"net/rpc"
)

func main() {
	// 注册 rpc 服务
	err := rpc.Register(&service.Calculator{})
	if err != nil {
		log.Fatal(err)
	}
	rpc.HandleHTTP() // 使用 HTTP 服务

	server, err := net.Listen("tcp", ":8888") // 监听服务
	if err != nil {
		log.Fatal(err)
	} else {
		http.Serve(server, nil)
	}

	defer func() {
		err = server.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()
}
```

- 16_rpc/client/main.go

```go
package main

import (
	"goProject/src/goWeb/16_rpc/data"
	"log"
	"net/rpc"
)

func main() {
	client, err := rpc.DialHTTP("tcp", "localhost:8888")
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		err = client.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()

	req := &data.CalculatorRequest{Left: 5, Right: 7}
	resp := &data.CalculatorResponse{}
	err = client.Call("Calculator.Add", req, resp)
	if err != nil {
		log.Fatal(err)
	} else {
		log.Printf("response result: %d", resp.Result)
	}
}
```

### 异步方式调用 rpc 服务
- 16_rpc/client_async/main.go

```go
package main

import (
	"goProject/src/goWeb/16_rpc/data"
	"log"
	"net/rpc"
)

func main() {
	client, err := rpc.DialHTTP("tcp", "localhost:8888")
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		err = client.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()

	req := &data.CalculatorRequest{Left: 5, Right: 7}
	resp := &data.CalculatorResponse{}
	call := client.Go("Calculator.Add", req, resp, nil)
	<-call.Done
	if err != nil {
		log.Fatal(err)
	} else {
		log.Printf("response result: %d", resp.Result)
	}
}
```

## HTML
 1. 浏览一遍，知道有哪些
	 
	 尝试标签 => 页面显示的样子 
2. 用的时候再找

## 模板技术
text/template 包用于处理处理字符串模板和数据驱动生成目标字符串，在字符串模板中可以使用数据显示、流程控制、函数、管道、子模板等功能。

### 常用结构体

- Template

### 常用函数
	
- New：创建模板 
	
![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071033989.png)
		
- ParseFiles：指定文件模板

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071048493.png)
	
- ParseGlob：指定文件模板匹配模式

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071051509.png)

		
- Must：帮助函数，对模板创建结果进行验证，并返回模板对象指针

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071044755.png)
	
### 常用方法

- Parse：解析模板字符串

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071117736.png)

- ParseFiles：指定文件模板

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071042098.png)
	
- ParseGlob：指定文件模板匹配模式 

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071037996.png)

- Execute：模板渲染

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071120588.png)


- ExecuteTemplate：指定模板执行模板渲染

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071122318.png)

- Funcs：指定自定义函数字典

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071124895.png)


- Clone：克隆模板进行模板复用

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071126043.png)
### 案例
1. text/template 和 html/template 解析模板字符串

	```go
	package main  
	  
	import (  
	    "fmt"  
	    htmlTemplate "html/template"  
	    "os"    "text/template"
	)  
	  
	func main() {  
	    // 显示数据  
	    tplText := "我叫{{.}}"  
	    tpl, err := template.New("tpl").Parse(tplText)  
	    fmt.Println(err)  
	    tpl.Execute(os.Stdout, `<img src="xxxx">`)  
	    fmt.Println()  
	  
	    htmlTpl, err := htmlTemplate.New("tpl").Parse(tplText)  
	    htmlTpl.Execute(os.Stdout, `<img src="xxxx">`)  
	}
	```

2. 在不同的数据上应用模板

	```go
	package main
	
	import (
		"fmt"
		"html/template"
		"os"
	)
	
	func main() {
		tplText := "{{ . }}"
		tpl := template.Must(template.New("tpl").Parse(tplText))
		tpl.Execute(os.Stdout, "kk")
		fmt.Println()
	
		// 切片
		tpl.Execute(os.Stdout, []int{1, 2, 3, 4, 5})
		fmt.Println()
	
		// 映射
		tpl.Execute(os.Stdout, map[string]int{"one": 1, "two": 2})
		fmt.Println()
	
		// 结构体
		tpl.Execute(os.Stdout, struct {
			ID   int
			Name string
		}{1, "小新"})
	}

	```

3. 在模板中遍历切片

	```go
	package main
	
	import (
		"fmt"
		"html/template"
		"os"
	)
	
	func main() {
		tplText := "{{ index . 1 }}-{{ index . 0 }}"
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		// 切片
		tpl.Execute(os.Stdout, []int{1, 2, 3, 4, 5})
		fmt.Println()
	}
	```

4. 在模板中遍历映射

	```go
	package main

	import (
		"fmt"
		"html/template"
		"os"
	)
	
	func main() {
		tplText := "{{ .one }}-{{ .two }}-{{ .three }}"
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		// 映射
		tpl.Execute(os.Stdout, map[string]int{"one": 1, "two": 2})
		fmt.Println()
	}
	```

5. 在模板中访问结构体属性

	```go
	package main
	
	import (
		"html/template"
		"os"
	)
	
	func main() {
		tplText := "{{ .ID }}-{{ .Name }}"
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		// 结构体
		tpl.Execute(os.Stdout, struct {
			ID   int
			Name string
		}{1, "小新"})
	}
	```

6. 在模板中使用分支结构

	```go
	package main
	
	import (
		"html/template"
		"os"
	)
	
	func main() {
		tplText := `
			{{ .ID }}-{{ .Name }}
			{{ if eq .Sex 1 }}男{{ else }}女{{ end }}
		`
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		// 结构体
		tpl.Execute(os.Stdout, struct {
			ID   int
			Name string
			Sex  int // 1 => 男 0 => 女
		}{1, "小新", 0})
	}
	```

7. 在模板中遍历结构体切片

	```go
	package main
	
	import (
		"html/template"
		"os"
	)
	
	type Addr struct {
		Street string
		No     int
	}
	
	func main() {
		tplText := `
			{{ range . }}
				{{ .ID }}-{{ .Name }}-{{ if eq .Sex 1 }}男{{ else }}女{{ end }} {{ .Addr.Street }}
			{{ end }}
			`
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		// 结构体
		tpl.Execute(os.Stdout, []struct {
			ID   int
			Name string
			Sex  int // 1 => 男 0 => 女
			Addr Addr
		}{{1, "小新", 1, Addr{"西安", 1111}}, {2, "和珅", 1, Addr{"北京大学", 2222}}})
	}
	```

8. 给模板传递自定义函数映射

	```go
		package main

		import (
			"html/template"
			"os"
			"strings"
		)
		
		type Addr struct {
			Street string
			No     int
		}
		
		func main() {
			tplText := `{{ title . }}`
		
			// 自定义函数
			// key 字符串 函数名称 在模板中调用
			// value 函数
			funcs := template.FuncMap{
				"upper": strings.ToUpper,
				"title": func(test string) string {
					//runes := []rune(test)
					//runes[0] -= 32
					//return string(runes)
					return strings.ToUpper(test[:1]) + test[1:]
				},
			}
			tpl := template.Must(template.New("tpl").Funcs(funcs).Parse(tplText))
		
			tpl.Execute(os.Stdout, "abcdefg") // Abcdefg
		}
	```

9. 定义单个模板块

	```go
	package main 
	
	import (
		"html/template"
		"os"
	)
	
	type Addr struct {
		Street string
		No     int
	}
	
	func main() {
		tplText := `输入内容：{{ block "content" . }} {{ . }} {{ end }}`
	
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		tpl2, _ := tpl.Clone()
		tpl2, _ = tpl2.Parse(`{{ define "content" }} {{ len . }} {{ end }}`)
	
		tpl.Execute(os.Stdout, "abcdef")
		tpl2.Execute(os.Stdout, "abcdef")
	}
	```

10. 定义多个模板块

	```go
	package main
	
	import (
		"html/template"
		"os"
	)
	
	type Addr struct {
		Street string
		No     int
	}
	
	func main() {
		tplText := `
		{{ define "len" }} {{ len . }} {{ end }}
		{{ define "raw" }} {{ . }} {{ end }}
		
		{{ template "raw" . }}
		`
	
		tpl := template.Must(template.New("tpl").Parse(tplText))
	
		tpl.Execute(os.Stdout, "abcdef")
	
		tpl.ExecuteTemplate(os.Stdout, "len", "abcdef")
		tpl.ExecuteTemplate(os.Stdout, "raw", "abcdef")
	}
	```

11. 解析模板文件

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071201295.png)

	html/len.html

	```html
	{{ len . }}
	```

	html/index.html

	```go
	{{ range. }}  
	{{ . }}  
	{{ end }}  
	  
	{{ template "len.html" . }}
	```

	main.go

	```go
	package main

	import (
		"html/template"
		"os"
	)
	
	type Addr struct {
		Street string
		No     int
	}
	
	func main() {
		tpl := template.Must(template.ParseFiles("src/goWeb/29_tpl/html/index.html",
			"src/goWeb/29_tpl/html/len.html"))
		tpl.ExecuteTemplate(os.Stdout, "index.html", []int{1, 2, 3})
	}
	```

12. 解析多个自定义模板

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071207437.png)

	html/len.html

	```html
	{{ len . }}
	```

	html/index.html

	```go
	{{ range. }}  
	{{ . }}  
	{{ end }}  
	  
	{{ template "len.html" . }}
	```

	main.go

	```go
		package main 
		
		import (
			"html/template"
			"os"
		)
		
		type Addr struct {
			Street string
			No     int
		}
		
		func main() {
			tpl := template.Must(template.ParseGlob("src/goWeb/29_tpl/html/*.html"))
			tpl.ExecuteTemplate(os.Stdout, "index.html", []int{1, 2, 3})
		}
	```

13. Todolist 案例

	![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071212280.png)

	models/task.go

	```go
	package models
	
	type Task struct {
		ID     int
		Name   string
		Status string
	}
	
	var tasks = []*Task{
		&Task{1, "洗衣服", "正在执行"},
		&Task{2, "做作业", "未执行"},
	}
	
	func GetTask() []*Task {
		return tasks
	}
	
	func AddTasks(name string) {
		tasks = append(tasks, &Task{len(tasks) + 1, name, "新增"})
	}
	```

	views/add.html

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>任务列表</title>
	</head>
	<body>
	  <form action="/add/" method="POST">
	    <label>任务名：<input type="text" name="name" value=""></label>
	    <input type="submit" value="新增">
	  </form>
	</body>
	</html>
	```

	views/list.html

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>任务列表</title>
	</head>
	<body>
	  <a href="/add/">新增</a>
	  <table>
	    <thead>
	      <tr>
	        <th>ID</th>
	        <th>任务</th>
	        <th>状态</th>
	      </tr>
	    </thead>
	    <tbody>
	      {{ range . }}
	        <tr>
	          <td>{{ .ID }}</td>
	          <td>{{ .Name }}</td>
	          <td>{{ .Status }}</td>
	        </tr>
	      {{ end }}
	    </tbody>
	  </table>
	</body>
	</html>
	```

	main.go

	```go
	package main

	import (
		"goProject/src/goWeb/31_todolist/models"
		"html/template"
		"net/http"
	)
	
	func main() {
		addr := "localhost:9999"
		http.HandleFunc("/list/", func(response http.ResponseWriter, request *http.Request) {
			tpl := template.Must(template.ParseFiles("src/goWeb/31_todolist/views/list.html"))
			tpl.ExecuteTemplate(response, "list.html", models.GetTask())
		})
	
		http.HandleFunc("/add/", func(resp http.ResponseWriter, req *http.Request) {
			if req.Method == http.MethodPost {
				name := req.PostFormValue("name")
				models.AddTasks(name)
				http.Redirect(resp, req, "/list/", 302)
			}
	
			tpl := template.Must(template.ParseFiles("src/goWeb/31_todolist/views/add.html"))
			tpl.ExecuteTemplate(resp, "add.html", models.GetTask())
		})
	
		http.ListenAndServe(addr, nil)
	}
	```

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071219171.png)

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202401071220699.png)
