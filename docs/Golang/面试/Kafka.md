1. Kafka 是什么？它的主要应用场景有哪些？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027669527556098#heading-0

   ![image-20250324220243987](https://cdn.jsdelivr.net/gh/WeiXinao/imgBed2@main/img/202503242202098.png)

2. Kafka 的基本架构包括哪些组件？各组件的作用是什么？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027669749854210#heading-0

   [基本概念](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=40c21eaf-7fea-059e-f32b-5cfb47585a05&page=14)

3. Kafka 的 Topic 是什么？它的作用是什么？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027669959569409

   [在Kafka 中还有两个特别重要的概念—主题（Topic）与分区（Partition）。Kafka 中的消
   息以主题为单位进行归类，生产者负责将消息发送到特定的主题（发送到 Kafka 集群中的每一
   条消息都要指定一个主题），而消费者负责订阅主题并进行消费。](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=a3eef82b-7fa0-05f0-b24d-3b413f6ce46f&page=15)

   [主题是一个逻辑上的概念，它还可以细分为多个分区，一个分区只属于单个主题，很多时
   候也会把分区称为主题分区（Topic-Partition）。同一主题下的不同分区包含的消息是不同的，
   分区在存储层面可以看作一个可追加的日志（Log）文件，消息在被追加到分区日志文件的时
   候都会分配一个特定的偏移量（offset）。offset 是消息在分区中的唯一标识，Kafka 通过它来保
   证消息在分区内的顺序性，不过 offset 并不跨越分区，也就是说，Kafka 保证的是分区有序而不
   是主题有序。](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=fe710493-8c79-b588-1f6d-ea27d8cc1112&page=15)

4. Kafka 中的 Producer 和 Consumer 分别是什么角色？它们如何进行消息的生产和消费？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027670194450434

5. 在 Kafka 中，Partition 是什么？Partition 的划分对性能有什么影响？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027670433525762#heading-0

   [为了能够有效地治理负载失衡的情况，Kafka 引入了优先副本（preferred replica）的概念。
   所谓的优先副本是指在 AR 集合列表中的第一个副本。比如上面主题 topic-partitions 中分区 0
   的AR集合列表（Replicas）为[1,2,0]，那么分区 0 的优先副本即为 1。理想情况下，优先副
   本就是该分区的 leader 副本，所以也可以称之为 preferred leader。](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=08ee8bef-4943-c714-8b39-46f4ccd485e0&page=146)

   [在实际生产环境中，一般使用 path-to-json-file 参数来分批、手动地执行优先副本
   的选举操作。尤其是在应对大规模的 Kafka 集群时，理应杜绝采用非 path-to-json-file
   参数的选举操作方式。同时，优先副本的选举操作也要注意避开业务高峰期，以免带来性能方
   面的负面影响。](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=abe6fe26-8abe-b620-feb6-c050ed6caa83&page=149)

6. Kafka 是如何保证消息顺序性的？在什么场景下顺序性是必须的？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027670668406786#heading-0

   [Kafka 可以保证同一个分区中的消息是有序的。如果生产者按照一定的顺序发送消息，那
   么这些消息也会顺序地写入分区，进而消费者也可以按照同样的顺序消费它们。对于某些应用
   来说，顺序性非常重要，比如MySQL 的 binlog 传输，如果出现错误就会造成非常严重的后果。
   如果将 acks 参数配置为非零值，并且 max.in.flight.requests.per.connection 参数
   配置为大于 1 的值，那么就会出现错序的现象：如果第一批次消息写入失败，而第二批次消息
   写入成功，那么生产者会重试发送第一批次的消息，此时如果第一批次的消息写入成功，那么
   这两个批次的消息就出现了错序。一般而言，在需要保证消息顺序的场合建议把参数
   max.in.flight.requests.per.connection 配置为 1，而不是把 acks 配置为 0，不过
   这样也会影响整体的吞吐。](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=52eed087-e702-7f88-657b-47c3adfac1e7&page=55)
   https://www.cnblogs.com/yangms/p/14445307.html

   [消息顺序性：顾名思义，消息顺序性是指保证消息有序。这个功能有一个很常见的应用场景就是 CDC（Change Data Chapture），以MySQL 为例，如果其传输的 binlog 的顺序出错，比](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=31cfbb3d-df9f-3893-677f-509cf6920ce3&page=408)[如原本是先对一条数据加 1，然后乘以 2，发送错序之后就变成了先乘以 2 后加 1 了，造成了数据不一致。](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=a869cb37-9344-b023-fe10-734ade3ada8d&page=409)

7. Kafka 的消息是如何持久化的？它默认的存储机制是什么？

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027670911676418#heading-0

   [5.5 磁盘存储](obsidian://bookmaster?type=open-book&bid=YWTEdUtRlloIhgin&aid=e41de45e-d348-9234-2f3b-6d1bb37d7857&page=205)

8. 在 Kafka 中，如何创建一个 Topic？可以通过哪些方式管理 Topic?

   https://www.mianshiya.com/bank/1837027669393338369/question/1837027671167528962#heading-0

   

9. Kafka 的 Offset 是什么？如何追踪消息的消费进度？

   