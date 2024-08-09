# pprof

想要写出三高代码，pprof 性能分析工具告诉你慢在哪

1. 三种性能指标采集方式
   1. web 网页采集
   2. 性能测试采集
   3. 硬编码采集
2. pprof 的8个性能指标
3. 如何使用 pprof 进行分析

## 『三高』代码

高性能：避免 io 操作，采用合适的算法和数据结构

高并发：避免 io 操作，io 不支持并发

高可用：避免状态，使应用程序变成无状态应用程序

## 性能指标

![image-20240804095454385](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408040955611.png)

allocs：查看过去所有内存的分配信息

block：查看导致同步原语阻塞的堆栈跟踪

cmdline：查看当前程序的命令行完整的调用路径

goroutine：查看当前所有协程堆栈跟踪

heap：查看活动对象的内存分配情况

mutex：查看互斥锁的竞争持有者的堆栈跟踪

profile：CPU的使用报告

threadcreate：查看创建新线程的堆栈跟踪

trace：查看整个应用程序的调用的堆栈信息

## 引入 pprof

```go
package main

import (
	"net/http"
	_ "net/http/pprof"
)

func main() {
	http.ListenAndServe(":6060", nil)
}
```

浏览器输入：`http://localhost:6060/debug/pprof/?debug=1`，打开页面

![image-20240804132913384](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041329567.png)

## 案例代码

### 目录

```
pprof
├───constants
└───data
    ├───block
    ├───cpu
    ├───goroutine
    ├───mem
    └───mutex
```

### 代码

*constants.go*

```go
package constants

const (
	I = 1 << (iota * 10)
	Ki
	Mi
	Gi
	Ti
	Pi
)
```

*main.go*

```go
package main

import (
	"goProject/src/pprof/data"
	"goProject/src/pprof/data/block"
	"goProject/src/pprof/data/cpu"
	"goProject/src/pprof/data/goroutine"
	"goProject/src/pprof/data/mem"
	"goProject/src/pprof/data/mutex"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"
	"runtime"
	"time"
)

var cmds = []data.Cmd{
	&cpu.Cpu{},
	&mem.Mem{},
	&block.Block{},
	&goroutine.Goroutine{},
	&mutex.Mutex{},
}

func main() {
	log.SetFlags(log.Llongfile)
	log.SetOutput(os.Stdout)

	// 开启对锁调用的跟踪
	runtime.SetMutexProfileFraction(1)
	// 开启对阻塞操作的跟踪
	runtime.SetBlockProfileRate(1)

	go func() {
		http.ListenAndServe(":6060", nil)
	}()

	for {
		for _, v := range cmds {
			v.Run()
		}
		time.Sleep(time.Second)
	}
}
```

*data.go*

```go
package data

type Cmd interface {
	Name() string
	Run()
}
```

*block.go*

```go
package block

import (
	"log"
	"time"
)

type Block struct {
}

func (b *Block) Name() string {
	return "cpu"
}

func (b *Block) Run() {
	log.Println(b.Name(), "Run")
	<-time.After(time.Second)
}
```

*cpu.go*

```go
package cpu

import "log"

type Cpu struct {
}

func (c *Cpu) Name() string {
	return "cpu"
}

func (c *Cpu) Run() {
	log.Println(c.Name(), "Run")
	for i := 0; i < 1000000000; i++ {

	}
}
```

*goroutine.go*

```go
package goroutine

import (
	"log"
	"time"
)

type Goroutine struct {
}

func (g *Goroutine) Name() string {
	return "cpu"
}

func (g *Goroutine) Run() {
	log.Println(g.Name(), "Run")
	for i := 0; i < 10; i++ {
		go func() {
			time.Sleep(30 * time.Second)
		}()
	}
}
```

*mem.go*

```go
package mem

import (
	"goProject/src/pprof/constants"
	"log"
)

type Mem struct {
	buffer [][constants.Mi]byte
}

func (m *Mem) Name() string {
	return "cpu"
}

func (m *Mem) Run() {
	log.Println(m.Name(), "Run")
	for len(m.buffer)*constants.Mi < constants.Gi {
		m.buffer = append(m.buffer, [constants.Mi]byte{})
	}
}
```

*mutex.go*

```go
package mutex

import (
	"goProject/src/pprof/constants"
	"log"
	"sync"
	"time"
)

type Mutex struct {
	buffer [][constants.Mi]byte
}

func (m *Mutex) Name() string {
	return "cpu"
}

func (m *Mutex) Run() {
	log.Println(m.Name(), "Run")
	mutex := &sync.Mutex{}
	mutex.Lock()
	go func() {
		time.Sleep(time.Second)
		mutex.Unlock()
	}()
	mutex.Lock()
}
```

## 常用命令

> [!NOTE]
>
> 以上述案例，查看内存为例

- 以命令行交互方式查看命令

```
go tool pprof http://localhost:6060/debug/pprof/allocs?debug=1
```

![image-20240804172724631](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041727807.png)

![image-20240804172900302](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041729447.png)

- 以文本方式输出最高的几条

```
top 
top -n 
go tool pprof -top http://localhost:6060/debug/pprof/allocs?debug=1
```

![image-20240804173141746](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041731893.png)

![image-20240804173246786](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041732946.png)

- 展示函数对应的带注释源代码

```
list function
```

![image-20240804173528196](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041735376.png)

- 通过 web 浏览器展示可视化图形

```
web
```

> [!WARNING]
>
> 需要先下载插件
>
> [Download | Graphviz](https://graphviz.org/download/)

![image-20240804174053812](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041740980.png)

![image-20240804174107608](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041741789.png)

观察红色的线，红色的框。

哪个红改哪个；哪个线粗改哪个；哪个比例高改哪个。

## 查看 CPU

![image-20240804180414698](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041804895.png)

![image-20240804180451573](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041804711.png)

![image-20240804180540490](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041805660.png)

## 以基准测试方式采集数据

### 目录

```
data_test
 └───data_test.go
```

### 代码

*data_test.go*

```go
package data_test

import (
	"goProject/src/pprof/data/block"
	"goProject/src/pprof/data/cpu"
	"goProject/src/pprof/data/goroutine"
	"goProject/src/pprof/data/mem"
	"goProject/src/pprof/data/mutex"
	"testing"
)

func BenchmarkData(b *testing.B) {
	b.Run("block", func(b *testing.B) {
		o := block.Block{}
		for i := 0; i < b.N; i++ {
			o.Run()
		}
	})
	b.Run("cpu", func(b *testing.B) {
		o := cpu.Cpu{}
		for i := 0; i < b.N; i++ {
			o.Run()
		}
	})
	b.Run("mem", func(b *testing.B) {
		o := mem.Mem{}
		for i := 0; i < b.N; i++ {
			o.Run()
		}
	})
	b.Run("goroutine", func(b *testing.B) {
		o := goroutine.Goroutine{}
		for i := 0; i < b.N; i++ {
			o.Run()
		}
	})
	b.Run("mutex", func(b *testing.B) {
		o := mutex.Mutex{}
		for i := 0; i < b.N; i++ {
			o.Run()
		}
	})
}
```

运行

```
go test -bench . .\data_test\ -blockprofile block.out -cpuprofile cpu.out -memprofile mem.out -mutexprofile mutex.out -trace trace.out -outputdir .\testout
```

test_out 目录结构

![image-20240804185246192](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041852309.png)

使用 pprof 查看

```
go tool pprof .\cpu.out
```

![image-20240804190458187](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408041904359.png)

## 硬编码采集

### 目录

```
code_collection/
├── main.go
└── out
    ├── cpu.out
    ├── mem.out
    └── trace.out
```

### 代码

*main.go*

```go
package main

import (
	"goProject/src/pprof/data"
	"goProject/src/pprof/data/block"
	"goProject/src/pprof/data/cpu"
	"goProject/src/pprof/data/goroutine"
	"goProject/src/pprof/data/mem"
	"goProject/src/pprof/data/mutex"
	"log"
	_ "net/http/pprof"
	"os"
	"runtime"
	"runtime/pprof"
	"runtime/trace"
	"time"
)

var cmds = []data.Cmd{
	&cpu.Cpu{},
	&mem.Mem{},
	&block.Block{},
	&goroutine.Goroutine{},
	&mutex.Mutex{},
}

func main() {
	log.SetFlags(log.Llongfile)
	log.SetOutput(os.Stdout)

	// 开启对锁调用的跟踪，不开启的话抓取不到
	runtime.SetMutexProfileFraction(1)
	// 开启对阻塞操作的跟踪
	runtime.SetBlockProfileRate(1)

	cpufile, err := os.OpenFile("code_collection/out/cpu.out", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		log.Fatalln(err)
	}
	err = pprof.WriteHeapProfile(cpufile)
	defer pprof.StopCPUProfile()
	defer cpufile.Close()

	memfile, err := os.OpenFile("code_collection/out/mem.out", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		log.Fatalln(err)
	}
	err = pprof.WriteHeapProfile(memfile)
	defer memfile.Close()

	tracefile, err := os.OpenFile("code_collection/out/trace.out", os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		log.Fatalln(err)
	}
	err = trace.Start(tracefile)
	defer trace.Stop()
	defer tracefile.Close()
	// 业务代码

	for i := 0; i < 20; i++ {
		for _, v := range cmds {
			v.Run()
		}
		time.Sleep(time.Second)
	}
}
```

### 使用 go tool pprof 查看输出结构

```
 go tool pprof .\cpu.out
```

![image-20240804212833140](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202408042128321.png)