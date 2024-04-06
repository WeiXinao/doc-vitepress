# MySQL

## MySQL数据库基本操作-DDL

### 1、DDL解释

DDL（Data Definition Language），数据定义语言，该语言部分包括一下内容：

- 对数据库的常用操作
- 对表的常用操作
- 修改表结构

### 2、对数据库的常用操作

| 功能            | SQL                                                     |
| ------------- | ------------------------------------------------------- |
| 查看所有数据库       | `show databases`                                        |
| 创建数据库         | `create database [if not exists] mydb1 [chartset=utf8]` |
| 切换（选择要操作的数据库） | `use mydb1;`                                            |
| 删除数据库         | `drop database [if exist] mydb1`                        |
| 修改数据库编码       | `alert database mydb1 character set utf-8;`             |
