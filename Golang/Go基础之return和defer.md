# defer 和 return 执行的先后顺序
[Go ---- defer 和 return 执行的先后顺序 - 清明-心若淡定 - 博客园 (cnblogs.com)](https://www.cnblogs.com/saryli/p/11371912.html#:~:text=Go%20%E4%B8%AD%20defer%20%E5%92%8C,return%20%E6%89%A7%E8%A1%8C%E7%9A%84%E5%85%88%E5%90%8E%E9%A1%BA%E5%BA%8F%20%E5%A4%9A%E4%B8%AAdefer%E7%9A%84%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E4%B8%BA%E2%80%9C%E5%90%8E%E8%BF%9B%E5%85%88%E5%87%BA%E2%80%9D%EF%BC%9B%20defer%E3%80%81return%E3%80%81%E8%BF%94%E5%9B%9E%E5%80%BC%E4%B8%89%E8%80%85%E7%9A%84%E6%89%A7%E8%A1%8C%E9%80%BB%E8%BE%91%E5%BA%94%E8%AF%A5%E6%98%AF%EF%BC%9Areturn%E6%9C%80%E5%85%88%E6%89%A7%E8%A1%8C%EF%BC%8Creturn%E8%B4%9F%E8%B4%A3%E5%B0%86%E7%BB%93%E6%9E%9C%E5%86%99%E5%85%A5%E8%BF%94%E5%9B%9E%E5%80%BC%E4%B8%AD%EF%BC%9B%E6%8E%A5%E7%9D%80defer%E5%BC%80%E5%A7%8B%E6%89%A7%E8%A1%8C%E4%B8%80%E4%BA%9B%E6%94%B6%E5%B0%BE%E5%B7%A5%E4%BD%9C%EF%BC%9B%E6%9C%80%E5%90%8E%E5%87%BD%E6%95%B0%E6%90%BA%E5%B8%A6%E5%BD%93%E5%89%8D%E8%BF%94%E5%9B%9E%E5%80%BC%E9%80%80%E5%87%BA%E3%80%82)

## 案例

```go
package main

import "fmt"

func main() {
	s := test()
	fmt.Println("s:", s)
}

func hello() bool {
	fmt.Println("hello")
	return true
}

func test() bool {
	defer func() {
		fmt.Println("texting")
	}()
	return hello()
}

```

运行结果：

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202402052124700.png)

