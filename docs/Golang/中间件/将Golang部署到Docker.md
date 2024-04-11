# 将Golang部署到Docker 
## CentOS 安装 Golang 
第一步：在 Golang 官网下载所需版本：[https://golang.google.cn/dl/](https://golang.google.cn/dl/)

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202404111525758.png)

或者使用 wget 命令行下载安装包到 linux

```bash
wget https://golang.google.cn/dl/go1.22.2.linux-amd64.tar.gz
```

第二步：解压到 /usr/local

```bash
tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
```

第三步：设置环境变量

打开环境变量文件

```bash
vim /etc/profile 
```

在环境变量最后添加GOROOT环境变量，GOROOT变量为go的安装目录，类似java的jdk安装目录，GOPATH类似eclipse的workspace

```
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
export GOPATH=/root/go
export PATH=$PATH:$GOPATH/BIN
```

刷新环境变量

```bash
source /etc/profile
```

第四步：查看go是否安装成功

```
go verison
```

