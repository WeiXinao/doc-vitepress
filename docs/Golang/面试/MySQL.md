3. 详细描述一条 SQL 语句在 MySQL 中的执行流程。

   **回答重点：**

   1. 先通过连接器进行校验权限
   2. 利用分析器进行 SQL 语句的词法分析和语法分析，构建解析树
   3. 利用查询优化器选择合适的索引和表连接顺序，最终选择一个最佳的执行计划
   4. 利用执行器，调用引擎层查询数据，返回结果集给客户端

   **扩展知识：**

   [SQL执行流程](obsidian://bookmaster?type=open-book&bid=oiAqINqxSKWvCmEM&aid=572d1a65-0a90-d665-c9b9-4c9b12bf7e09&page=4)

4. MySQL的存储引擎有哪些？它们之间有什么区别？

   [引擎介绍](obsidian://bookmaster?type=open-book&bid=ihLWNreHXaXurrPu&aid=abc54974-2822-a7e5-cc03-b4862db95c8c&page=4)

   [存储引擎特点](obsidian://bookmaster?type=open-book&bid=fBODdZcCPEBuvWUl&aid=6b81724b-6e83-3340-bf8c-d425219e1596&page=3)

5. MySQL 的索引类型有哪些？

   https://zhuanlan.zhihu.com/p/10815417482

   [索引的分类](obsidian://bookmaster?type=open-book&bid=mvWfzCrTatvTvaaa&aid=569f635e-f2fe-586a-25aa-16ca69350da0&page=1)

6. MySQL InnoDB 引擎中的聚簇索引和非聚簇索引有什么区别？

   [聚集索引&二级索引](obsidian://bookmaster?type=open-book&bid=fBODdZcCPEBuvWUl&aid=df535232-08ce-6be9-285d-8bc027f60d5f&page=17)

7. MySQL 中的回表是什么？

   [回表查询](obsidian://bookmaster?type=open-book&bid=fBODdZcCPEBuvWUl&aid=ddd0a141-fa90-68fe-2733-8cd518b30232&page=19)

8. MySQL 索引的最左前缀匹配原则是什么？

   [最左前缀法则](obsidian://bookmaster?type=open-book&bid=fBODdZcCPEBuvWUl&aid=da653b10-340e-0746-9eea-a61d8074a3a7&page=31)

9. MySQL 的覆盖索引是什么？

   [覆盖索引](obsidian://bookmaster?type=open-book&bid=fBODdZcCPEBuvWUl&aid=120902cf-1641-a227-4e15-3915a328b056&page=40)

10. MySQL 的索引下推是什么？

    [索引下推](obsidian://bookmaster?type=open-book&bid=bhwqlEikpCBKfzjZ&aid=c6581ebd-1952-1e41-6c05-b87336be6027&page=20)
    
    https://ask.csdn.net/questions/1095456
    
    https://www.cnblogs.com/three-fighter/p/15246577.html

