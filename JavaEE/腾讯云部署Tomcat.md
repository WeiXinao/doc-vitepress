---
search: false
---
# 腾讯云部署Tomcat

- 腾讯云ip:`43.142.9.177`

## 安装tomcat

1. 进入Tomcat官网：https://tomcat.apache.org/download-90.cgi
2. 选择相应版本，下载

   ![image-20220519075517018](https://s2.loli.net/2022/05/23/16IdRUFMENTtQZW.png)
3. 将文件上传到云服务器

   ![image-20220519075655196](https://s2.loli.net/2022/05/23/dcqR4b2zl5gDOrj.png)
4. 到服务器查看是否上传成功。

    ![image-20220519080714234](https://s2.loli.net/2022/05/23/LcwBhMfRCsk2H4Z.png)

5. 解压

![image-20220519080123774](https://s2.loli.net/2022/05/23/pwIhHO5lfxNMTgL.png)

## 安装JDK

1. 进入[oracle](https://www.oracle.com/java/technologies/downloads/#java8)官网，下载相应版本

   ![image-20220519084037861](https://s2.loli.net/2022/05/23/EnVt7CNif418ZTO.png)
2. 将下载的jdk上传到腾讯云

   ![image-20220519084822605](https://s2.loli.net/2022/05/23/ylmnuxizD2AeSkG.png)
3. 在腾讯云中进行查看

   ![image-20220519084145608](https://s2.loli.net/2022/05/23/I5JvUCVAW1BSwh8.png)
4. 输入 `tar -zxvf jdk-8u333-linux-x64.tar.gz `，解压

   ![image-20220519084301199](https://s2.loli.net/2022/05/23/jwVhdiaIN5eWGFA.png)

   - jdk目录为：

     ```
     /home/lighthouse/jdk/jdk1.8.0_333
     ```
   - jre目录为：

     ```
     /home/lighthouse/jdk/jdk1.8.0_333/jre
     ```

   > 注：本目录以实际解压目录为准
   >
5. 配置环境变量

   输入 `vim /etc/profile`, 输入以下内容

   ```bash
   set java environment
   JAVA_HOME=/home/lighthouse/jdk/jdk1.8.0_333
   JRE_HOME=/home/lighthouse/jdk/jdk1.8.0_333/jre
   CLASS_PATH=:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
   PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
   export JAVA_HOME JRE_HOME CLASS_PATH PATH
   ```
6. 验证环境变量是否配置成功，在任意目录下，输入 `java -version`，如出现版本信息，则配置成功

   ![image-20220519084727172](https://s2.loli.net/2022/05/23/D8XrbzPTfRsJQp5.png)

## 配置端口

1. 查看tomcat 运行状态

   ![image-20220519094922732](https://s2.loli.net/2022/05/23/iGkwphTPnx5gW4d.png)
2. 开放8080端口

   ![image-20220519095030806](https://s2.loli.net/2022/05/23/dSiXUFD8P2bwzxN.png)
3. 查看8080端口是否开放

   ![image-20220519095130679](https://s2.loli.net/2022/05/23/tmVbiLj8IZPerxD.png)
4. 查看防火墙状态

   ```bash
   firewall-cmd --state
   ```

   ![image-20220519095227700](https://s2.loli.net/2022/05/23/L29JnVXiIcpz8xF.png)
5. 开启防火墙

   ```bash
   systemctl start firewalld
   ```

   ![image-20220519095546652](https://s2.loli.net/2022/05/23/cM7NRJSH5TiVGhf.png)
6. 向firewall添加需要开放的端口

   ```bash
   firewall-cmd --permanent --zone=public --add-port=8080/tcp  #永久的添加该端口。去掉--permanent则表示临时。

   # 对应关闭的命令
   firewall-cmd --zone=public --remove-port=8080/tcp --permanent
   ```

   ![image-20220519100049628](https://s2.loli.net/2022/05/23/WiCRYnbUxpPSQHF.png)
7. 加载配置，使得修改有效

   ```bash
   firewall-cmd --reload  
   ```

   ![image-20220519100223103](https://s2.loli.net/2022/05/23/BXzQOJGCsxhfYgV.png)
8. 使用命令 查看开启的端口，出现8080/tcp这开启正确

   ```bash
   firewall-cmd --permanent --zone=public --list-ports
   ```

   ![image-20220519100636502](https://s2.loli.net/2022/05/23/o7s49NTkpqnJexi.png)
9. 再次启动防火墙

   ```bash
   systemctl start firewalld.service 
   ```
10. 启动成功

    ![image-20220519101020915](https://s2.loli.net/2022/05/23/c7iWRZUmab1qoSN.png)

# 项目

1. 在tomcat中修改项目的默认路径

   - 进入tomcat的安装路径

     ![image-20220519123122383](https://s2.loli.net/2022/05/23/S2tLh8BW9PcNJTw.png)
   - 进入conf目录

     ![image-20220519123255865](https://s2.loli.net/2022/05/23/lKwYTpbvLhV3mrk.png)
   - 在Host标签中添加如下标签

     ```xml
     <Context path="" docBase="xiaomi_mall" reloadable="true" />
     ```
     ![image-20220519123540822](https://s2.loli.net/2022/05/23/pbQGVza93xkZ2fn.png)

     > `<mark>`注意`</mark>`：
     >
     > path为空：表示直接输入主机ip地址即可访问项目
     >
     > docBase：输入path时想要访问的项目
     >
   - 访问项目

     ![image-20220519124021188](https://s2.loli.net/2022/05/23/8mDrpq2n1hSBaXL.png)
