# Golang 基础之『命名返回值』

刚学习 golang 过程中，会发现 golang 与其他编程语言非常不同的地方，比如变量类型写在变量名之后，统一的变量声明方式，变量、函数或者方法名大写表示公有等等，这其中的一些只会造成代码书写习惯中的不适，而另外一些，如果你不搞清楚golang 如此设计与其他语言的通用写法有哪些区别？有哪些适用场景？对于你写 golang 代码来说，将会造成不小的麻烦，本篇，我们就一起来看看 golang 基础之「命名返回值」。

我们看看同一函数的下面两种写法

写法一：

```go
func getSum(num1 int, num2 int) int {
	sum := num1 + num2
	return sum
}
```

写法二：

```go
func getSum02(num1 int, num2 int) (sum int)  {
	sum = num1 + num2
	return sum
}
```

两个函数都是实现的函数求和，我们运行一下

```go
var (
    num1 int = 1
    num2 int = 2
)
fmt.Println("getSum:", getSum(num1, num2)) // getSum: 3
fmt.Println("getSum02:", getSum02(num1, num2)) // getSum02: 3
```

结果一致，从算法的层面上，二者也没有区别，所不同的是**写法二**在函数定义时，直接将返回的结果遍历声明到函数签名里。难道，二者除此之外真的一定区别也没有么？那 golang 设计者如此设计的初衷在哪呢？顺着这个想法，咱们来尝试对写法二做一些改变。

修改后的写法2：

```go
func getSum02(num1 int, num2 int) (sum int) {
	sum = num1 + num2
	return
}
```

运行一下

```go
var (
    num1 int = 1
    num2 int = 2
)
fmt.Println("getSum:", getSum(num1, num2))     // getSum: 3
fmt.Println("getSum02:", getSum02(num1, num2)) // getSum02: 3
```

结果如上，没有任何改变。

等等，事情开始有点不一样了，我们并未返回结果，如果按照其他的编程语言，要么就会报错，而一些非强类型的语言，要么就会返回对应返回值类型的零值，而在 golang 中，我们任然可以拿到正确的返回结果。

为什么呢？Look here:point_right:https://zhuanlan.zhihu.com/p/485305316

接下来，我们来说说这种写法的应用场景:

场景一：返回 recover 捕获的错误

[Panic时返回错误](../面试/Panic时返回错误.md)

场景二：返回匿名函数中的错误

```go
// login 写一个函数，完成一个登录
func login(userId int, userPwd string) (err error) {
	// 下一步就要开始定协议..
	// 1. 连接到服务器
	conn, err := net.Dial("tcp", "localhost:8889")
	if err != nil {
		fmt.Println("net.Dial err:", err)
		return
	}
	// 延时关闭
	defer func() {
		err = conn.Close()
		if err != nil {
			fmt.Println("conn.Close() err:", err)
			return
		}
	}()

	// 2. 准备通过 conn 发送消息给服务器
	var mes message.Message
	mes.Type = message.LoginMesType
	// 3. 创建一个 LoginMes 结构体
	var loginMes message.LoginMes
	loginMes.UserId = userId
	loginMes.UserPwd = userPwd

	// 4. 将 loginMes 序列化
	data, err := json.Marshal(loginMes)
	if err != nil {
		fmt.Println("json.Marshal err:", err)
		return
	}

	// 5. 把 data 赋给了 mes.Data 字段
	mes.Data = string(data)
	// 6. 将 mes 进行序列化
	data, err = json.Marshal(mes)
	if err != nil {
		fmt.Println("json.Marshal err:", err)
		return
	}

	// 7. 到这个时候 data 就是我们要发送的消息
	// 7.1 先把 data 的长度发送给服务器
	// 先获取到 data 的长度 --> 转成一个表示长度的 byte 切片
	var pkgLen uint32
	pkgLen = uint32(len(data))
	var bytes [4]byte
	binary.BigEndian.PutUint32(bytes[:], pkgLen)
	// 发送长度
	n, err := conn.Write(bytes[:])
	if n != 4 || err != nil {
		fmt.Println("conn.Write(bytes) fail:", err)
		return
	}
	fmt.Println("client send length of message successfully")

	return
}
```

比如上面的 login 函数，`conn.Close()` 我们需要延迟执行，因此需要用 `defer` 关键字来修饰，同时我们也需要保存该函数返回的 err，因此需要将该函数的执行用<mark>匿名函数</mark>包裹起来，形成一个语句块。此时又产生一个问题，怎么拿到匿名内部函数内的语句返回的值？

这时，我们就可以采用命名返回值，因为该**命名返回值变量**是声明在外部函数的签名中的，而内部函数可以访问外部函数声明的变量，这是我们可以直接将内部函数的中的返回值赋给**命名返回值变量**，这样外部函数就可以直接返回了。

