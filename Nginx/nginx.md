# Nginx

## 腾讯云ip

腾讯云ip:`43.142.9.177`

## 安装Nginx

- 安装gcc
  
  ```bash
  yum install -y gcc
  ```

- 安装perl库
  
  ```bash
  yum install -y pcre pcre-devel
  ```

- 接下来执行
  
  > - make
  > - make install

## 启动Nginx

进入安装好的目录`/user/local/nginx/sbin`

> ./nginx                     启动
> 
> ./nginx -s stop        快速停止
> 
> ./nginx -s quit         优雅关闭，在退出前已经结束的连接请求
> 
> ./nginx -s roload     重写加载配置

## 安装成系统脚本

服务脚本内容

```text
[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

重新加载系统服务

```
systemctl daemon-reload
```

启动服务

```
systemctl start nginx.service
```

**开机启动**

```
systemctl enable
```

## Nginx配置

### Nginx最小配置

```
worker_processes  1;                        # 默认为1，表示开启一个业务进程

events {
    worker_connections  1024;                  # 单个业务进程可接受连接数 
}


http {
    include       mime.types;                # 单个业务进程可接受连接数
    default_type  application/octet-stream; # 如果mime类型没匹配上，默认使用二进制流的方式传输。 

    # 使用linux的sendfile(socket, file, len)高效网络传输，也就是数据0拷贝。
    sendfile        on;                     

    keepalive_timeout  65;


    server {    
        listen       80;                    # 监听端口号
        server_name  localhost;                # 主机名

        location / {                        # 匹配路径
            root   html;
            index  index.html index.htm;    # 文件根目录
        }

        # 报错编码对应页面
        error_page   500 502 503 504  /50x.html; 
        location = /50x.html {
            root   html;
        }
    }

}
```

> serve_name 和 listen 两个加起来应该有唯一性 

### 虚拟主机

原本一台服务器只能对应一个站点，通过虚拟主机技术可以虚拟化成多个站点同时对外提供服务

### 域名解析记录类型

- A                                                       将域名指向一一个IPV4地址
- CNAME                                            将域名指向另外一个域名
