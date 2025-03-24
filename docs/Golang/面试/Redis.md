3. Redis 通常应用于哪些场景？

   [Redis的10种常见应用场景深度解析_redis应用-CSDN博客](https://blog.csdn.net/love7489/article/details/137373197)

   [Redis 16 个常见使用场景_redis用途-CSDN博客](https://blog.csdn.net/agonie201218/article/details/123640871)

   [【超长好文】Redis在项目中的17种使用场景_redis在项目中的应用场景-CSDN博客](https://blog.csdn.net/finally_vince/article/details/139499195)

4. Redis 为什么这么快？

   主要有 3 个方面的原因，分别是存储方式，优秀的线程模型以及 IO 模型、高效的数据结构。

   - Redis 将数据存储在内存中，提供快速的读写速度，先相比于传统的磁盘数据库，内存访问速度快得多。
   - Redis 使用单线程事件驱动模型结合 I/O 多路复用，避免了多线程上下切换和竞争条件，提高了并发处理效率。
   - Redis 提供了多种高效的数据机构（如字符串、哈希、列表、集合等）这些机构经过优化，能够快速完成各种操作。

   **扩展知识**

   [Redis为何能实现高性能？ | 程序员渣哥](https://zha-ge.cn/java/eywkn22n/#🔧-3-高效的数据结构优化)

   ![image-20250323010222678](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503230102825.png)

   ![image-20250323011051408](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503230110532.png)

5. 为什么 Redis 设计为单线程？6.0 版本为何引入多线程？

   [Redis为何采用单线程设计？6.0版本引入多线程的原因是什么？ | 程序员渣哥](https://zha-ge.cn/java/kg8y7047/)

   ![image-20250323174039330](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231740449.png)

   ![image-20250323174130378](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231741455.png)

   ![image-20250323174915311](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231749393.png)

   简单来说，Redis4.0之前一直采用单线程的主要原因有以下三个：

   1 使用单线程模型是 Redis 的开发和维护更简单，因为单线程模型方便开发和调试；

   2 即使使用单线程模型也并发的处理多客户端的请求，主要使用的是IO多路复用和非阻塞IO；

   3 对于Redis系统来说，主要的性能瓶颈是内存或者网络带宽而并非 CPU。

   ![image-20250323175457733](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231754856.png)

   ![image-20250323175750544](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231757640.png)

   ![image-20250323180123390](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231801497.png)

   ![image-20250323175922773](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231759846.png)

   ![image-20250323180046570](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231800647.png)

6. Redis 中常见的数据类型有哪些？

   https://zha-ge.cn/java/fehacqls/

   ![image-20250323191241204](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231912318.png)

   ![image-20250323191520842](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231915934.png)

   ![image-20250323191922302](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503231919406.png)

7. Redis 中跳表的实现原理是什么？

   跳表主要是通过**多层链表来实现**，底层链表保存所有元素，而每一层链表都是下一层的子集。

   - **插入时**，首先从高层开始查找插入位置，然后随机决定新节点的层数，最后在相应的层中插入节点并更新指针。

   - **删除时**，同样从最高层开始查找要删除的节点，并在各层中更新指针，以保持跳表的结构。

   - **查找时**，从最高层开始，逐层向下，直到找到目标元素或确定元素不存在。查找效率高，时间复杂度为 O(log~n~)


   ![image-20250324174332464](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241743678.png)

   ![image-20250324174428189](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241744268.png)

   ![image-20250324174502033](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241745122.png)

   

![image-20250324174757258](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241747342.png)

![image-20250324174838226](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241748305.png)

![image-20250324175109335](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241751433.png)

![image-20250324175125073](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241751143.png)

![image-20250324175244668](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241752739.png)

8. Redis 的 hash 是什么？

   Redis 的 hash 是一种键值对集合，可以将多个字段和值存储在同一个键中，便于管理一些关联数据。

   特点如下：

   1. 适合存储小数据，使用哈希表实现，能够在内存中高效存储和操作。
   2. 支持快速的字段操作（如增、删、改、查），非常适合存储对象的属性。

   **扩展**

   ![image-20250324180213959](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241802038.png)

![image-20250324180321123](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241803209.png)

![image-20250324180401151](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241804219.png)

![image-20250324180507205](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241805281.png)

![image-20250324183251080](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241832193.png)

![image-20250324183317641](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241833700.png)

![image-20250324183409431](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241834511.png)

![image-20250324183720576](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241837659.png)

![image-20250324183847526](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241838612.png)

![image-20250324184206119](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241842220.png)

![image-20250324184804290](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241848396.png)

![image-20250324185054990](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241850121.png)

![image-20250324185535608](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241855709.png)

![image-20250324190117289](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241901373.png)

![image-20250324190148965](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241901043.png)

![image-20250324191550647](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503241915766.png)

9. Redis 和 Memcached 有哪些区别？

   [Redis与Memcached的区别在哪里？ | 程序员渣哥](https://zha-ge.cn/java/yq7l1g0d/)

   https://redis.com.cn/redis-vs-memcached.html

   https://zhuanlan.zhihu.com/p/55822406

   https://www.zhihu.com/question/19829601

10. Redis 支持事务吗？如何实现？

    Redis 支持事务，**但是它的事务与 MySQL 中的事务有所不同**。MySQL 中的事务主要支持 ACID 的特性，而 Redis 中的事务主要保证的是多个命令执行的原子性，即所有的命令在一个原子操作中执行，不会被打断。

    还有一个很重要的点，就是 **MySQL 中的事务是支持回滚的，而 Redis 中的事务是不支持回滚的**。

    **扩展知识**

    [Redis是否支持事务？其实现方式是什么？ | 程序员渣哥](https://zha-ge.cn/java/juws5zr7/)

    ![image-20250324211735437](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242117545.png)

![image-20250324212154417](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242121528.png)

![image-20250324212250356](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242122451.png)

![image-20250324212400799](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242124878.png)

![image-20250324212501561](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242125650.png)

![image-20250324212544186](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242125266.png)

![image-20250324212735568](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242127678.png)

![image-20250324212928186](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242129338.png)