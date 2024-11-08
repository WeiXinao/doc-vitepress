# Panic时返回错误

go 函数中，返回值未命名，发生了 panic，但是在函数内 recover了，函数返回什么值？

   ```go
   func test() error  {
   	var err error 
   	defer func ()  {
   		if r := recover(); r != nil {
   			err = errors.New(fmt.Sprintf("%s", r))
   		}
   	}()
	    raisePanic()
   	return err
   }
   
   func raisePanic() {
   	panic("发生了错误")
   }
   ```


1. 函数返回了什么值？
   
   答：test() 返回值为 nil，因为，当执行到 defer 修饰的函数时，该函数不会立即被执行，而是会将该函数压入到一个栈中，压栈时，会将该函数用到的参数也辅助一份，当 test() 函数返回后，再弹出栈中的函数，一个一个的执行。
   
2. 如果 err 未成功返回，那么怎样修改函数，能使得 err 成功返回？ 

	答：主要是给函数的返回值命名，这样就可以在 recover 后设置这个被命名的返回值，调用方就可以根据这个返回值判断被调用函数内部是否 panic 了, 如下：
   
```go
   package main
   
   import (
   	"errors"
   	"fmt"
   )
   
   func test() (err error) { 
   	defer func ()  {
   		if r := recover(); r != nil {
   			err = errors.New(fmt.Sprintf("%s", r))
   		}
   	}()
   	raisePanic()
   	fmt.Println("we got here")
   	return err
   }
   
   func raisePanic() {
   	panic("发生了错误")
   }
```

  最终的代码看起来非常的相似，不过通过命名我们的返回变量，当我们声明这个函数时，我们的程序将会立刻返回这个 err 变量，即使我们从未触碰到 doStuff 函数的末尾的返回语句。由于这个细微的差别，现在我们可以更改被我们 defer 的函数中的 err 变量，并且成功地捕获到这个 panic。

原文：[「知乎」在 Go 中使用命名返回变量捕获 panic](https://zhuanlan.zhihu.com/p/136760696#)