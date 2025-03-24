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