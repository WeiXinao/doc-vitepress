# Docker 基础

## Docker 简介

### Docker 是什么？

#### 为什么会有 docker 出现？

假定你正在开发一个项目，你使用的是一台笔记本电脑而且您的开发环境具有特定的配置。其他开发人员身处的环境配置也各有不同。您正在开发的应用依赖于您当前的配置且还要依赖于某些配置文件。此外，您的企业还拥有标准化的测试和生产环境，且具有自身的配置和一系列支持文件。您希望尽可能多在本地模拟这些环境而不产生重新创建服务器环境的开销。请问？

您要如何确保应用能够在这些环境中运行和通过质量检测？并且在部署过程中不出现令人头疼的版本、配置问题，也无需重新编写代码和进行故障修复？

答案就是使用容器。Docker之所以发展如此迅速，也是因为它对此给出了一个标准化的解决方案-----**系统平滑移植，容器虚拟化技术**

环境配置相当麻烦，换一台机器，就要重来一次，费力费时。很多人想到，能不能从根本上解决问题，**软件可以带环境安装？**也就是说，**安装的时候，把原始环境一模一样地复制过来。开发人员利用 Docker 可以消除协作编码时“在我的机器上可正常工作”的问题。**

![img](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151223167.png)

之前在服务器配置一个应用的运行环境，要安装各种软件，就拿电商项目的环境来说，Java/RabbitMQ/MySQL/JDBC驱动包等。安装和配置这些东西有多麻烦就不说了，它还不能跨平台。假如我们是在 Windows 上安装的这些环境，到了 Linux 又得重新装。况且就算不跨操作系统，换另一台同样操作系统的服务器，要**移植**应用也是非常麻烦的。

传统上认为，软件编码开发/测试结束后，所产出的成果即是程序或是能够编译执行的二进制字节码等(java为例)。而为了让这些程序可以顺利执行，开发团队也得准备完整的部署文件，让维运团队得以部署应用程式，**开发需要清楚的告诉运维部署团队，用的全部配置文件+所有软件环境。不过，即便如此，仍然常常发生部署失败的状况**。Docker的出现**使得Docker得以打破过去「程序即应用」的观念。透过镜像(images)将作业系统核心除外，运作应用程式所需要的系统环境，由下而上打包，达到应用程式跨平台间的无缝接轨运作**。 

#### docker 理念

Docker是基于Go语言实现的云开源项目。

Docker的主要目标是“Build，Ship and Run Any App,Anywhere”，也就是通过对应用组件的封装、分发、部署、运行等生命周期的管理，使用户的APP（可以是一个WEB应用或数据库应用等等）及其运行环境能够做到“一次镜像，处处运行”。

![img](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151229207.png)

Linux容器技术的出现就解决了这样一个问题，而 Docker 就是在它的基础上发展过来的。将应用打成镜像，通过镜像成为运行在Docker容器上面的实例，而 Docker容器在任何操作系统上都是一致的，这就实现了跨平台、跨服务器。只需要一次配置好环境，换到别的机子上就可以一键部署好，大大简化了操作。

==一句话：解决了运行环境和配置问题的软件容器，方便做持续集成并有助于整体发布的容器虚拟化技术。==



### 容器与虚拟机比较

#### 容器发展简史

![img](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151238066.png)

![img](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151238734.png)

#### 传统虚拟机技术

虚拟机（virtual machine）就是带环境安装的一种解决方案。

它可以在一种操作系统里面运行另一种操作系统，比如在Windows10系统里面运行Linux系统CentOS7。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序，操作系统和硬件三者之间的逻辑不变。 

虚拟机的缺点：

1   资源占用多2   冗余步骤多3   启动慢

#### 容器虚拟化技术

Linux容器是与系统其他部分隔离开的一系列进程，从另一个镜像运行，并由该镜像提供支持进程所需的全部文件。容器提供的镜像包含了应用的所有依赖项，因而在从开发到测试再到生产的整个过程中，它都具有可移植性和一致性。

Linux 容器不是模拟一个完整的操作系统而是对进程进行隔离。有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。

#### 对比

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151251646.png)

比较了 Docker 和传统虚拟化方式的不同之处：

1. 传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程
2. 容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。
3. 每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。



### 能干嘛

#### 技术职级变化

```
code ---> programmer ---> software engineer ---> DevOps engineer
```

#### 开发/运维（DevOps）新一代开发工程师

一次构建、随处运行

- 更快速的应用交付和部署

  传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。

- 更便捷的升级和扩缩容

  随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。

- 更简单的系统运维

  应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。

- 更高效的计算资源利用

  Docker是**内核级虚拟化**，其不像传统的虚拟化技术一样需要额外的Hypervisor支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。

#### Docker应用场景

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151312315.png)

#### 哪些企业在使用

- 新浪

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151314667.png)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151314674.png)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151314594.png)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151315770.png)

- 美团

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151316444.png)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151315426.png)

- 蘑菇街

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151318674.png)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151318921.png)

### 去哪下

官网

docker官网：http://www.docker.com

仓库

Docker Hub官网: https://hub.docker.com/



## Docker 安装

### 前提

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151322835.png)

目前，CentOS 仅发行版本中的内核支持 Docker。Docker 运行在CentOS 7 (64-bit)上，

要求系统为64位、Linux系统内核版本为 3.8以上，这里选用Centos7.x

```
查看自己的内核
uname命令用于打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）。
```

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151323299.png)

### Docker 基本组成

- 镜像（image）

  Docker 镜像（Image）就是一个**只读**的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。

  它也相当于是一个root文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。

  相当于容器的“源代码”，docker镜像文件类似于Java的类模板，而docker容器实例类似于java中new出来的实例对象。

- 容器（container）

  1 从面向对象角度

  Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，容器是用镜像创建的运行实例。就像是Java中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台

  2 从镜像容器角度

  可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

- 仓库（repository）

  仓库（Repository）是集中存放镜像文件的场所。

  类似于

  Maven仓库，存放各种jar包的地方；

  github仓库，存放各种git项目的地方；

  Docker公司提供的官方registry被称为Docker Hub，存放各种镜像模板的地方。

  仓库分为公开仓库（Public）和私有仓库（Private）两种形式。

  最大的公开仓库是 Docker Hub(https://hub.docker.com/)，

  存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等

- 总结

  需要正确的理解仓库/镜像/容器这几个概念:

  Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个可交付的运行环境，这个打包好的运行环境就是image镜像文件。只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。

  image文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

  - 镜像文件

    image 文件生成的容器实例，本身也是一个文件，称为镜像文件。

  - 容器实例

    一个容器运行一种服务，当我们需要的时候，就可以通过docker客户端创建一个对应的运行实例，也就是我们的容器

  - 仓库

    就是放一堆镜像的地方，我们可以把镜像发布到仓库中，需要的时候再从仓库中拉下来就可以了。

### Docker平台架构图解(入门版)

![image-20240515170355688](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151703769.png)

### Docker 工作原理

Docker是一个Client-Server结构的系统，Docker守护进程运行在主机上， 然后通过Socket连接从客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器。 容器，是一个运行时环境，就是我们前面说到的集装箱。可以对比mysql演示对比讲解

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151706148.png)

### Docker平台架构图解(架构版)

整体架构及底层通信原理简述：

Docker 是一个 C/S 模式的架构，后端是一个松耦合架构，众多模块各司其职。 

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151709984.png)

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151709496.png)

### 安装步骤

#### 官网教程

https://docs.docker.com/engine/install/centos/

#### CentOS7安装 Docker

1. 确定你是CentOS7及以上版本

   ```bash
   $ cat /etc/redhat-release
   ```

2. 卸载旧版本

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151716559.png)

3. 安装 gcc

   1. 确保 CentOS7 能上网

      ![image-20240515172527434](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151725510.png)

   2. ```bash
      $ yum -y install gcc
      ```

   3. ```bash
      $ yum -y install gcc-c++
      ```

4. 安装需要的软件包

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151729959.png)

5. 设置 stable 镜像仓库

   官网要求：

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151753926.png)

   ```bash
   $ yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
   ```

   因为官方源在国外，容易报链接错误

   ```
   1   [Errno 14] curl#35 - TCP connection reset by peer
   2   [Errno 12] curl#35 - Timeout
   ```

   我们使用阿里的源

   ```bash
   $ yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151755111.png)

6. 更新 yum 软件包索引

   ```bash
   $ yum makecache fast
   ```

7. 安装 DOCKER CE

   ```bash
   $ yum -y install docker-ce docker-ce-cli containerd.io
   ```

   官网要求

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151756091.png)

   执行结果

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151757645.png)

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151757825.png)

8. 启动 docker

   ```bash
   $ systemctl start docker
   ```

9. 测试

   ```bash
   $ docker version
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151759718.png)

   ```bash
   $ docker run hello-world
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151801123.png)

10.   卸载

    ```bash
    $ systemctl stop docker 
    $ yum remove docker-ce docker-ce-cli containerd.io
    $ rm -rf /var/lib/docker
    $ rm -rf /var/lib/containerd
    ```

### 阿里云镜像加速

1. 是什么

   https://promotion.aliyun.com/ntms/act/kubernetes.html

2. 注册一个属于自己的阿里云账户（可复用淘宝账号）

3. 获得加速器地址连接

   1. 登陆阿里云开发者平台

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151812010.png)

   2. 点击控制台

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151812794.png)

   3. 选择容器镜像服务

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151809803.png)

   4. 获取加速器地址

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151812404.png)

4. 粘贴脚本直接执行

   ```bash
   $ mkdir -p /etc/docker
   $ tee /etc/docker/daemon.json 
   {
     "registry-mirrors": ["https://aa25jngu.mirror.aliyuncs.com"]
   }
   EOF
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151816042.png)

   或分步骤执行

   ```bash
   $ mkdir -p /etc/docker
   ```

   ```bash
   $ vim  /etc/docker/daemon.json
   ```

   ```
   #阿里云
   {
     "registry-mirrors": ["https://｛自已的编码｝.mirror.aliyuncs.com"]
   }
   ```

5. 重启服务器

   ```bash
   $ systemctl daemon-reload
   $ systemctl restart docker
   ```

### Docker Hello World

启动Docker后台容器(测试运行 hello-world)

```bash
$ docker run hello-world
```

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151822114.png)

输出这段提示以后，hello world就会停止运行，容器自动终止。

run 干了什么?

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151823424.png)

### 底层原理

为什么Docker会比VM虚拟机快？

1. docker有着比虚拟机更少的抽象层

   由于docker不需要Hypervisor(虚拟机)实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。

2. docker利用的是宿主机的内核,而不需要加载操作系统OS内核

   当新建一个容器时,docker不需要和虚拟机一样重新加载一个操作系统内核。进而避免引寻、加载操作系统内核返回等比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载OS,返回新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统,则省略了返回过程,因此新建一个docker容器只需要几秒钟。

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405151825100.png)



## Docker 常用命令

### 帮助启动类命令

- 启动docker： systemctl start docker
- 停止docker： systemctl stop docker
- 重启docker： systemctl restart docker
- 查看docker状态： systemctl status docker
- 开机启动： systemctl enable docker
- 查看docker概要信息： docker info
- 查看docker总体帮助文档： docker --help
- 查看docker命令帮助文档： docker 具体命令 --help

### 镜像命令

- docker images：列出本地主机上的镜像

  - OPTIONS说明：
    - -a :列出本地所有的镜像（含历史映像层）
    - -q :只显示镜像ID。

- docker search 某个XXX镜像名字

  - 官方镜像仓库：https://hub.docker.com

  - 命令

    - docker search [OPTIONS] 镜像名字

    - 案例

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405160954849.png)

      

    - OPTIONS说明：
      - --limit : 只列出N个镜像，默认25个，`docker search --limit 5 redis`

- docker pull 某个XXX镜像名字：下载镜像

  - `docker pull 镜像名字[:TAG]`

    - 没有TAG就是最新版，等价于 `docker pull 镜像名字:latest` 

    - `docker pull ubuntu`

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405160958278.png)

- docker system df 查看镜像/容器/数据卷所占的空间

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405160959020.png)

- docker rmi 某个XXX镜像名字ID：删除镜像
  - 删除单个：docker rmi  -f 镜像ID
  - 删除多个：docker rmi -f 镜像名1:TAG 镜像名2:TAG 
  - 删除全部：docker rmi -f $(docker images -qa)

#### 面试题

谈谈docker虚悬镜像是什么？

- 是什么？仓库名、标签都是`<none>`的镜像，俗称虚悬镜像dangling image

### 容器命令

有镜像才能创建容器，这是根本前提(下载一个CentOS或者ubuntu镜像演示)

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161007737.png)

- docker pull centos

- docker pull ubuntu

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161007279.png)

- 新建+启动容器

  - docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

  - OPTIONS说明（常用）：有些是一个减号，有些是两个减号

    - --name="容器新名字"    为容器指定一个名称；

    - -d: 后台运行容器并返回容器ID，也即启动守护式容器(后台运行)；

    - -i：以交互模式运行容器，通常与 -t 同时使用；

    - -t：为容器重新分配一个伪输入终端，通常与 -i 同时使用；也即启动交互式容器(前台有伪终端，等待交互)；

    - -P: 随机端口映射，大写P

    - -p: 指定端口映射，小写p

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161016165.png)

- 启动交互式容器(前台命令行)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161017795.png)

```
# 使用镜像centos:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。
docker run -it centos /bin/bash 

参数说明：
-i: 交互式操作。
-t: 终端。
centos : centos 镜像。
/bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
要退出终端，直接输入 exit:
```

- 列出当前所有正在运行的容器：`docker ps [OPTIONS]`  

  - OPTIONS说明（常用）：

    - -a :列出当前所有正在运行的容器+历史上运行过的

    - -l :显示最近创建的容器。

    - -n：显示最近n个创建的容器。

    - -q :静默模式，只显示容器编号。

- 退出容器
  - 两种退出方式
    - exit：run进去容器，exit退出，容器停止
    - ctrl+p+q：run进去容器，ctrl+p+q退出，容器不停止
- 启动已停止运行的容器
  - docker start 容器ID或者容器名
- 重启容器
  - docker restart 容器ID或者容器名
- 停止容器
  - docker stop 容器ID或者容器名
- 强制停止容器
  - docker kill 容器ID或容器名
- 删除已停止的容器：docker rm 容器ID
- 一次性删除多个容器实例
  - docker rm -f $(docker ps -a -q)
  - docker ps -a -q | xargs docker rm

> [!IMPORTANT]
>
> 启动守护式容器(后台服务器)
>
> - 在大部分的场景下，我们希望 docker 的服务是在后台运行的，我们可以过 -d 指定容器的后台运行模式。
>
> - docker run -d 容器名
>
>   ```
>   #使用镜像centos:latest以后台模式启动一个容器
>   docker run -d centos
>   问题：然后docker ps -a 进行查看, 会发现容器已经退出
>   很重要的要说明的一点: Docker容器后台运行,就必须有一个前台进程.
>   容器运行的命令如果不是那些一直挂起的命令（比如运行top，tail），就是会自动退出的。
>   这个是docker的机制问题,比如你的web容器,我们以nginx为例，正常情况下,
>   我们配置启动服务只需要启动响应的service即可。例如service nginx start
>   但是,这样做,nginx为后台进程模式运行,就导致docker前台没有运行的应用,
>   这样的容器后台启动后,会立即自杀因为他觉得他没事可做了.
>   所以，最佳的解决方案是,将你要运行的程序以前台进程的形式运行，
>   常见就是命令行模式，表示我还有交互操作，别中断，O(∩_∩)O哈哈~
>   ```
>
> - redis 前后台启动演示case
>
>   - 前台交互式启动： docker run -it redis:6.0.8
>   - 后台守护式启动：docker run -d redis:6.0.8
>
> - 查看容器日志：docker logs 容器ID
>
> - 查看容器内运行的进程：docker top 容器ID
>
> - 查看容器内部细节：docker inspect 容器ID
>
> - 进入正在运行的容器并以命令行交互
>
>   - docker exec -it 容器ID bashShell
>
>     ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161031360.png)
>
>     ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161031915.png)
>
>   - 重新进入docker attach 容器ID
>
>   - 上述两个区别
>
>     - attach 直接进入容器启动命令的终端，不会启动新的进程
>
>       用exit退出，会导致容器的停止。
>
>     - exec 是在容器中打开新的终端，并且可以启动新的进程
>
>       用exit退出，不会导致容器的停止。
>
>     - 推荐大家使用 docker exec 命令，因为退出容器终端，不会导致容器的停止。
>
>   - 进入redis服务
>
>     - docker exec -it 容器ID /bin/bash
>     - docker exec -it 容器ID redis-cli
>     - 一般用-d后台启动的程序，再用exec进入对应容器实例
>
> - 从容器内拷贝文件到主机上
>
>   - 容器→主机
>
>   - docker cp  容器ID:容器内路径 目的主机路径
>
>     ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161033199.png)
>
>     公式：docker cp 容器ID:容器内路径目的主机路径
>
> - 导入和导出容器
>
>   - export 导出容器的内容留作为一个tar归档文件[对应import命令]
>   - import 从tar包中的内容创建一个新的文件系统再导入为镜像[对应export]
>
> - 案例
>
>   - docker export 容器ID > 文件名.tar
>
>     ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161035519.png)
>
>   - cat 文件名.tar | docker import - 镜像用户/镜像名:镜像版本号
>
>     ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161035767.png)

### 总结

常用命令：

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161037140.png)



| 命令    | 说明                                                         | 解释                                                         |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| attach  | Attach to a running container                                | 当前 shell 下 attach 连接指定运行镜像                        |
| build   | Build an image from a Dockerfile                             | 通过 Dockerfile 定制镜像                                     |
| commit  | Create a new image from a container changes                  | 提交当前容器为新的镜像                                       |
| cp      | Copy files/folders from the containers filesystem to the host path | 从容器中拷贝指定文件或者目录到宿主机中                       |
| create  | Create a new container                                       | 创建一个新的容器，同 run，但不启动容器                       |
| diff    | Inspect changes on a container's filesystem                  | 查看 docker 容器变化                                         |
| events  | Get real time events from the server                         | 从 docker 服务获取容器实时事件                               |
| exec    | Run a command in an existing container                       | 在已存在的容器上运行命令                                     |
| export  | Stream the contents of a container as a tar archive          | 导出容器的内容流作为一个 tar 归档文件[对应 import ]          |
| history | Show the history of an image                                 | 展示一个镜像形成历史                                         |
| images  | List images                                                  | 列出系统当前镜像                                             |
| import  | Create a new filesystem image from the contents of a tarball | 从tar包中的内容创建一个新的文件系统映像[对应export]          |
| info    | Display system-wide information                              | 显示系统相关信息                                             |
| inspect | Return low-level information on a container                  | 查看容器详细信息                                             |
| kill    | Kill a running container                                     | kill 指定 docker 容器                                        |
| load    | Load an image from a tar archive                             | 从一个 tar 包中加载一个镜像[对应 save]                       |
| login   | Register or Login to the docker registry server              | 注册或者登陆一个 docker 源服务器                             |
| logout  | Log out from a Docker registry server                        | 从当前 Docker registry 退出                                  |
| logs    | Fetch the logs of a container                                | 输出当前容器日志信息                                         |
| port    | Lookup the public-facing port which is NAT-ed to PRIVATE_PORT | 查看映射端口对应的容器内部源端口                             |
| pause   | Pause all processes within a container                       | 暂停容器                                                     |
| ps      | List containers                                              | 列出容器列表                                                 |
| pull    | Pull an image or a repository from the docker registry server | 从docker镜像源服务器拉取指定镜像或者库镜像                   |
| push    | Push an image or a repository to the docker registry server  | 推送指定镜像或者库镜像至docker源服务器                       |
| restart | Restart a running container                                  | 重启运行的容器                                               |
| rm      | Remove one or more containers                                | 移除一个或者多个容器                                         |
| rmi     | Remove one or more images                                    | 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除] |
| run     | Run a command in a new container                             | 创建一个新的容器并运行一个命令                               |
| save    | Save an image to a tar archive                               | 保存一个镜像为一个 tar 包[对应 load]                         |
| search  | Search for an image on the Docker Hub                        | 在 docker hub 中搜索镜像                                     |
| start   | Start a stopped containers                                   | 启动容器                                                     |
| stop    | Stop a running containers                                    | 停止容器                                                     |
| tag     | Tag an image into a repository                               | 给源中镜像打标签                                             |
| top     | Lookup the running processes of a container                  | 查看容器中运行的进程信息                                     |
| unpause | Unpause a paused container                                   | 取消暂停容器                                                 |
| version | Show the docker version information                          | 查看 docker 版本号                                           |
| wait    | Block until a container stops, then print its exit code      | 截取容器停止时的退出状态值                                   |



## Docker 镜像

### 是什么？

**镜像**是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，我们把应用程序和配置依赖打包好形成一个可交付的运行环境(包括代码、运行时需要的库、环境变量和配置文件等)，这个打包好的运行环境就是image镜像文件。

只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。

#### 分层的镜像

以我们的pull为例，在下载的过程中我们可以看到docker的镜像好像是在一层一层的在下载

![image-20240516140755284](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161407393.png)

#### UnionFS（联合文件系统）

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161347876.png)

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

####  Docker镜像加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。

bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是引导文件系统bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

rootfs (root file system) ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161353942.png)

 平时我们安装进虚拟机的CentOS都是好几个G，为什么docker这里才200M？？

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161354289.png)

对于一个精简的OS，rootfs可以很小，只需要包括最基本的命令、工具和程序库就可以了，因为底层直接用Host的kernel，自己只需要提供 rootfs 就行了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

#### 为什么 Docker 镜像要采用这种分层结构

镜像分层最大的一个好处就是共享资源，方便复制迁移，就是为了复用。

比如说有多个镜像都从相同的 base 镜像构建而来，那么 Docker Host 只需在磁盘上保存一份 base 镜像；

同时内存中也只需加载一份 base 镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。

### 重点理解

> [!IMPORTANT] 
>
> Docker镜像层都是只读的，容器层是可写的。
>
> 当容器启动时，一个新的可写层被加载到镜像的顶部。
>
> 这一层通常被称作“容器层”，“容器层”之下的都叫“镜像层”。

### Docker镜像commit操作案例

1. `docker commit` 提交容器副本使之成为一个新的镜像

2. `docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]`

3. 案例演示ubuntu安装vim

   1. 从Hub上下载ubuntu镜像到本地并成功运行

   2. 原始的默认Ubuntu镜像是不带着vim命令的

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161359721.png)

   3. 外网连通的情况下，安装vim

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161359493.png)

      ```
      docker容器内执行上述两条命令：
      apt-get update
      apt-get -y install vim
      ```

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161400297.png)

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161400994.png)

   4. 安装完成后，commit我们自己的新镜像

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161400773.png)

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161401148.png)

   5. 启动我们的新镜像并和原来的对比

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161402782.png)

      1. 官网是默认下载的Ubuntu没有vim命令
      2. 我们自己commit构建的镜像，新增加了vim功能，可以成功使用。

### 总结

Docker中的镜像分层，支持通过扩展现有镜像，创建新的镜像。类似Java继承于一个Base基础类，自己再按需扩展。

新镜像是从 base 镜像一层一层叠加生成的。每安装一个软件，就在现有镜像的基础上增加一层。

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161403325.png)

## 本地镜像发布到阿里云

### 本地镜像发布到阿里云流程

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161623139.png)

### 镜像的生成方法

基于当前容器创建一个新的镜像，新功能增强

```bash
$ docker commit [OPTIONS] 容器ID [REPOSITORY[:TAG]]
```

### 将本地镜像推送到阿里云

- 本地镜像素材原型

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161627777.png)

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161628244.png)

- 阿里云开发者平台

  https://promotion.aliyun.com/ntms/act/kubernetes.html

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161629617.png)

- 创建仓库镜像

  - 选择控制台，进入容器镜像服务

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161630790.png)

  - 选择个人实例

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161631439.png)

  - 命名空间

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161631492.png)

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161631712.png)

  - 仓库名称

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161631603.png)

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161631718.png)

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161632243.png)

  - 进入管理界面获得脚本

    ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161632932.png)

- 将镜像推送到阿里云

  将镜像推送到阿里云registry

  管理界面脚本

  ![image-20240516165054716](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161650888.png)

  脚本实例

  ```bash
  $ docker login --username=zzyybuy registry.cn-hangzhou.aliyuncs.com
  $ docker tag cea1bb40441c registry.cn-hangzhou.aliyuncs.com/atguiguwh/myubuntu:1.1
  $ docker push registry.cn-hangzhou.aliyuncs.com/atguiguwh/myubuntu:1.1
  ```

  ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161634491.png)

### 将阿里云上的镜像下载到本地

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161651351.png)

```bash
$ docker pull registry.cn-hangzhou.aliyuncs.com/atguiguwh/myubuntu:1.1
```

## 本地镜像发布到私有库

### 本地镜像发布到私有库流程

![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161623139.png)

### 是什么

Docker Registry

1. 官方Docker Hub地址：https://hub.docker.com/，中国大陆访问太慢了且准备被阿里云取代的趋势，不太主流。
2. Dockerhub、阿里云这样的公共镜像仓库可能不太方便，涉及机密的公司不可能提供镜像给公网，所以需要创建一个本地私人仓库供给团队使用，基于公司内部项目构建镜像。
3. Docker Registry是官方提供的工具，可以用于构建私有镜像仓库

### 将本地镜像推送到私有库

1. 下载镜像Docker Registry

   ```bash
   $ docker pull registry
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161656078.png)

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161657409.png)

2. 运行私有库Registry，相当于本地有个私有Docker hub

   ```bash
   $ docker run -d -p 5000:5000  -v /zzyyuse/myregistry/:/tmp/registry --privileged=true registry
   ```

   默认情况，仓库被创建在容器的/var/lib/registry目录下，建议自行用容器卷映射，方便于宿主机联调

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161659170.png)

3. 案例演示创建一个新镜像，ubuntu安装ifconfig命令

   1. 从Hub上下载ubuntu镜像到本地并成功运行

   2. 原始的Ubuntu镜像是不带着ifconfig命令的

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161700343.png)

   3. 外网连通的情况下，安装ifconfig命令并测试通过

      ```bash
      docker容器内执行上述两条命令：
      $ apt-get update
      $ apt-get install net-tools
      ```

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161701273.png)

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161701335.png)

   4. 安装完成后，commit我们自己的新镜像

      ```bash
      公式：
      $ docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
      命令：在容器外执行，记得
      $ docker commit -m="ifconfig cmd add" -a="zzyy" a69d7c825c4f zzyyubuntu:1.2
      ```

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161702305.png)

   5. 启动我们的新镜像并和原来的对比

      1. 官网是默认下载的Ubuntu没有ifconfig命令
      2. 我们自己commit构建的新镜像，新增加了ifconfig功能，可以成功使用。

      ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161702955.png)

4. curl验证私服库上有什么镜像

   ```bash
   $ curl -XGET http://192.168.111.162:5000/v2/_catalog
   ```

   可以看到，目前私服库没有任何镜像上传过

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161703153.png)

5. 将新镜像zzyyubuntu:1.2修改符合私服规范的Tag

   ```
   按照公式： docker   tag   镜像:Tag   Host:Port/Repository:Tag
   ```

   自己host主机IP地址，填写自己的，不要粘贴错误，O(∩_∩)O

   ```
   使用命令 docker tag 将zzyyubuntu:1.2 这个镜像修改为192.168.111.162:5000/zzyyubuntu:1.2
   docker tag  zzyyubuntu:1.2  192.168.111.162:5000/zzyyubuntu:1.2
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161705265.png)

6. 修改配置文件使之支持http

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161706497.png)

   ```
   
   别无脑照着复制，registry-mirrors 配置的是国内阿里提供的镜像加速地址，不用加速的话访问官网的会很慢。
   2个配置中间有个逗号 ','别漏了，这个配置是json格式的。
   2个配置中间有个逗号 ','别漏了，这个配置是json格式的。
   2个配置中间有个逗号 ','别漏了，这个配置是json格式的。
   ```

   vim命令新增如下红色内容：`vim /etc/docker/daemon.json`

   ```json
   {
     "registry-mirrors": ["https://aa25jngu.mirror.aliyuncs.com"],
     "insecure-registries": ["192.168.111.162:5000"]
   }
   ```

   上述理由：docker默认不允许http方式推送镜像，通过配置选项来取消这个限制。修改完后如果不生效，建议重启docker

7. push推送到私服库

   ```bash
   $ docker push 192.168.111.162:5000/zzyyubuntu:1.2
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161708463.png)

8. curl验证私服库上有什么镜像2

   ```bash
   $ curl -XGET http://192.168.111.162:5000/v2/_catalog
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161709528.png)

9. pull到本地并运行

   ```bash
   $ docker pull 192.168.111.162:5000/zzyyubuntu:1.2
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161710542.png)

   ```bash
   $ docker run -it 镜像ID /bin/bash
   ```

   ![graphic](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405161710958.png)



编码开放微服务

上线部署容器化

时时刻刻要监控

devops

### 为什么需要容器数据卷

![](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202405142248878.png)







