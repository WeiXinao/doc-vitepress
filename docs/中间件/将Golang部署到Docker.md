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

## CentOS 安装 Docker

在安装 [Docker](https://cloud.tencent.com/product/tke?from_column=20065&from=20065) 之前，先说一下配置，我这里是Centos7 Linux 内核：官方建议 3.10 以上，3.8以上貌似也可。

注意：本文的命令使用的是 root 用户登录执行，不是 root 的话所有命令前面要加 `sudo`

第一步：查看当前的内核版本

```
uname -r
```

第二步：使用 root 权限更新 yum 包（生产环境中此步操作需慎重，看自己情况，学习的话随便搞）

```
yum -y update
```

>[!NOTE]
>yum -y update：升级所有包同时也升级软件和系统内核；​ 
>yum -y upgrade：只升级所有包，不升级软件和系统内核

第三步：卸载旧版本（如果之前安装过的话）

```
yum remove docker docker-common docker-selinux docker-engine
```

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202404111604880.png)

第四步：安装需要的软件包， yum-util 提供yum-config-manager功能，另两个是devicemapper驱动依赖

```
yum install -y yum-utils device-mapper-persistent-data lvm2
```

第五步：设置 yum 源

设置一个yum源，下面两个都可用

```
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo（中央仓库） 
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo（阿里仓库）
```

第六步：选择docker版本并安装

查看可用版本有哪些

```
yum list docker-ce --showduplicates | sort -r
```

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202404111608552.png)

选择一个版本并安装：`yum install docker-ce-版本号`

```
yum -y install docker-ce.x86_64            3:20.10.0-3.el7
```

出现下图说明安装成功

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202404111610328.png)

第七步：启动 Docker 并设置开机自启

```
systemctl start docker
systemctl enable docker
```

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202404111612499.png)

