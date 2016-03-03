##Redis学习笔记1-数据结构

a disk backed in-memory database

**redis适用场合**

redis内存数据库（缓存服务器）适合高并发的读写应用场景，超越磁盘IO读写的瓶颈。

1. 取最新N个数据的操作
2. 排行榜应用,取TOP N 操作
3. 需要精确设定过期时间的应用
4. 计数器应用
5. Uniq操作,获取某段时间所有数据排重值
6. 实时系统,反垃圾系统
7. Pub/Sub构建实时消息系统
8. 构建队列系统
9. 缓存

### 1. Redis安装

[redis 安装配置](http://blog.csdn.net/gaogaoshan/article/details/41011781)

### 2. Redis数据结构和操作

Redis本身存储就是一个hash表，实际实现比hash表更复些

- Key：String类型
- Value：包括String，Set，List，Hash，Zset五种数据类型

|结构类型 |结构存储的值  | 结构的读写能力 |
|-------|------------|--------------|
|STRING  | 字符串、整数或者浮点数􀑙及任何二进制格式的数据 | 对整个字符串或者字符串中的其中一部分进行操作，对整数和浮点数执行自增或者自减操作 |
|LIST  | 一个链表，链表上的每个字节都包含了一个字符串 |从链表的两端推入或者弹出元素；根据偏移量对链表进行修建；读取单个或者多个元素；根据值查找或者移除元素  |
| SET | 包含字符串的无序收集器，并且包含的每个字符串都是不重复的 | 添加、获取、移除单个元素；检查一个元素是否；计算交集、并集、差集；从集合中随机取元素 |
| HASH | 包含键值对的无序散列表 | 添加、获取、移除多个键值对；获取所有键值对 |
| ZSET |字符串成员(member)、浮点数分值(score)之间的有序映射，元素的排列顺序由分值的大小决定 |添加、获取、移除单个元素；根据分值范围或者成员来获取元素  |

####2.1 String

String是最常用的一种数据类型，普通的key/value存储都可以归为此类，value其实不仅是String，也可以是数字

**2.1.1 命令**

```
SET key value [EX seconds] [PX milliseconds] [NX|XX]
GET key
```

- EX 代表设置超时时间，单位为秒
- PX 代表设置超时时间，单位为毫秒
- NX 代表有key不存在才会执行
- XX 代表只有key存在才会更新
- 如果成功，返回ok，失败返回空nil

```
MGET key [key ...]
```

- 返回指定的key的所有值，如果key不存在则返回这个key的值为nil
- 返回对应key的**值列表**

```
MSET key value [key value ...]
```

- 设置多个key value，如果某个key存在，则用新值覆盖旧值
- 整个操作是原子操作，要么同时成功，要么同时失败
- 如果key存在不想覆盖的话，采用MSETNX命令
- *总是返回ok，此操作不会失败*

```
MSETNX key value [key value ...]
```

- MSET类似，但是如果只要有一个key存在，则表示结果失败
- 返回值：1表示设置成功，0表示设置失败

```
append
```

- 如果key已经存在，并且值是string类型，就把新的值最加到原来值的后面
- 如果key不存在，就类似set的功能
- 返回值的字符长度

```
INCR key
```

- 对值进行加一操作，但是只能是值是integer类型才能操作，如果只是integer就会出错
- 最大值为64位有符号值
- 返回值为加完的结果

```
DECR key
```

- 对值进行减一操作，但是只能是值是integer类型才能操作，如果不是就会出错
- 如果key不存在，会对此key赋值为0，再做操作
- 操作能操作的数被限制为64位有符号值
- 返回操作后的结果值

```
DECRBY key decrment
```

- 对值进行减法操作，减去decrement这个值，但是只能是值是integer类型才能操作，如果不是就会出错
- 与DECR类似

```
INCRBY key increment
```

- 对值进行减法法操作，减去decrement这个值，但是只能是值是integer类型才能操作，如果不是就会出错
- 与INCR类似

```
INCRBYFLOAT key increment
```

- 与INCRBY规则一样，但是操作的是浮点数
- 返回操作后的结果值

```
GETSET key value
```

- 原子操作，设置新值的时候，把旧值返回给调用者
- 如果key已经存在或者key不是String类型就会报错
- 此命令一般与INCR联合使用

```
STRLEN key
```

- 返回key对应的值的长度
- 如果值不是string类型，就会报错

```
GETRANGE key start end
```

- 2.0版本前叫做SUBSTR
- 返回字符串类型值的子串
- Start和end的值可取负数，表示倒数第几个，-1表示最后一个字符
- 返回区间字符串

```
GETBIT key offset
```

- 可获得一个字符串类型键指定位置的二进制位的值(0或1)，索引从0开始

```
SETBIT key offset value
```

- 设置 􀘁符串类型键指定位置的二进制位的值，返回值是􀪥位置的旧值

```
Bitcount
```

- 可获得字符串类型键中值是1的二进制位个数

**2.1.2 应用场景**

---

####2.2 Lists

**2.2.1 语句**

```
BLPOP key [key ...] timeout
```

- 以阻塞的方式从以上key里面移除并返回第一个值，只移
除和返回第一个非空的key
- Timeout的单位是秒，如果为，则表示一直阻塞
- 只要list的长度为0或者key不存在就会阻塞
- 当key是多个时，比如blopo key1 key2，则只要有一个key
对应的list不是非空，则不会阻塞
- 返回值依次包含  key 弹出的值 阻塞的时长
- 超时时，如果还没有值可返回，则返回nil

```
LLEN key
```

- 返回对􀚁key的list中值的数量，如果key不存在或者list为空，则返回0

```
RPUSH key value [value ...]
```

- 把所有的值从list的尾部插入，如果key不存在就创建一个空的队列
- 如果key对应的value不是list类型，则会出错
- 元素从左到右依次插入
- 返回list的长度

```
RPUSHX key value
```

- 从list尾部插入一个值，当key不存在时，不会产生插入动作
- 返回list的长度

```
RPOP key
```

- 移除list的最后一个节点，并返回节点数据或者nil

```
BRPOP key [key ...] timeout
```

- 以阻塞的方式从以上key里面移除并返回尾部第一个值，只移
除和返回第一个非空的key
- Timeout的单位是秒，如果为0，则表示一直阻塞
- 只要list的长度为0或者key不存在就会阻塞
- 当key是多个时，比如bRpop key1 key2，则只要有一个key
对应的list不是非空，则不会阻塞
- 返回值依次包含key 弹出的值 阻塞的时长
- 超时时，如果还没有值可返回，则返回nil

```
RPOPLPUSH source destination
```

- 此操作是一个原子操作
- 从source对应的key的list里面的尾部移除一个值，并且加入到destination指定的list的头部
- 如果source的list不存在，则返回nil，但是不会做任何操作
- 如果source和destination是一样的，则等于把list的尾部数据插入到头部
- 返回被弹出和插入的数据

```
BRPOPLPUSH source destination timeout
```

- 功能rpoplpush相似，但是当source为空时，将会进行阻塞
- Timeout单位为秒，如果为0表示一直阻塞

```
LINDEX key index
```

- 返回key指定的队列中位置􀐞index的值
- 从0开始，负数表示从后面开始算

```
LINSERT key BEFORE|AFTER pivot value
```

- 把value的值插入key对应的list中去，位置在pivot这个值的前面before或者后面after
- 如果key，则不存在不会产生任何操作
- 如果pivot对应的值不存在在则返回-1，否则就返回插入后list的长度

```
LRANGE key start stop
```

- 返回一个区间的值，从list的头(左)到尾(右)
- 如果start大于list的长度，就会返回空
- 如果stop大于list的长度，则以list最后一个值为准

```
LREM key count value
```

- 删除值等于value的count个元素
- 如果count大于0，则从头到尾数
- 如果count小于0，则从尾到头数
- 如果count等于0，则删除所有的值等于value的元素

```
LTRIM key start stop
```

- 对key指定的list进行裁剪，即取子集
- 如果start>list的长度或者start>end，将会返回一个空列表，然后导致key被删除
- 如果end大于list的长度，则取list的长度
- 执行完成返回ok

```
LSET key index value
```

- 修改key对应的list中，位置为index的元素的值为value
- 当index超过list的返回，将会出错

**2.2.2 应用场景**

Redis list的应用场景非常多，也是Redis最重要的数据结构之一。  

如可以轻松地实现最新消息排行等功能。  

Lists的另一个应用就是消息队列，可以利用Lists的PUSH操作，将任务存在Lists中，然后工作线程再用POP操作将任务取出进行执行。  
  
**实现方式：** 
 
Redis list的实现为一个双向链表，即可以支持反向查找和遍历，更方便操作，不过带来了部分额外的内存开销，Redis内部的很多实现，包括发送缓冲队列等也都是用的这个数据结构。  
  
`RPOPLPUSH source destination`的例子 
  
一个典型的例子就是服务器的监控程序：它们需要在尽可能短的时间内，并行地检查一组网站，确保它们的可访问性。  

    redis.lpush "downstream_ips", "192.168.0.10"  
    redis.lpush "downstream_ips", "192.168.0.11"  
    redis.lpush "downstream_ips", "192.168.0.12"  
    redis.lpush "downstream_ips", "192.168.0.13"  
    Then:  
    next_ip = redis.rpoplpush "downstream_ips", "downstream_ips"  
  
`BLPOP`的例子  
  
  假设现在有 job 、 command 和 request 三个列表，其中 job 不存在， command 和 request 都持有非空列表。考虑以下命令：
  
```
  BLPOP job command request 30  #阻塞30秒，0的话就是无限期阻塞,job列表为空,被跳过,紧接着command 列表的第一个元素被弹出。  
  1) "command"                  # 弹出元素所属的列表  
  2) "update system..."         # 弹出元素所属的值

```
  为什么要阻塞版本的pop呢，主要是为了避免轮询。举个简单的例子如果我们用list来实现一个工作队列。执行任务的thread可以调用阻塞版本的pop去获取任务这样就可以避免轮询去检查是否有任务存在。当任务来时候工作线程可以立即返回，也可以避免轮询带来的延迟。  

---

#### 2.3 Keys

**2.3.1 语句**

```
DEL key [key ...]
```

- 删除指定的key，如果key不存在，对此key的操作将会忽略
- 返回被删除的key

```
DUMP key
```


- 按照rdb的存储格式把指定的key的值，序列化并返回给客户端，此序列化值里面不包括ttl信息
- 序列化的值中包含校验码
- 不同版本的rdb实现可能存在差异，所以此处序列化的数据可能不对
- Key不存在就返回nil

```
RESTORE key ttl serialized-value [REPLACE]
```

- 把通过dump命令序列化的值再存进去
- 如果没有带replace，且key已经存在，会出错
– 会检查校验值 checksum ，如果不满足会返回错误
- 成功返回ok

```
EXISTS key [key ...]
```

- 判断key是不是存在，如果存在，则返回值加一
- 从3.03版本开始支持多个key，以前的版本只支持一个
- 如果key重复，则返回值会重复判断和加一

```
EXPIRE key seconds
```

- 设置key的超时时间，单位是秒；􀍺当达到超时时间后，key会被删除
- 这个超时时间只能被DEL SET GETSET和*STORE命令修改或者改变，其它命令并不会改变超时设置或者超时时长
- 可通过命令􀑘PERSIST把超时设置取消
– 当key被RENAME命令修改后，超时设置的特性是不会改变
- 设置成功返回1，key不存在或者超时时间设置失败返回0

```
PERSIST key
```

- 移除key的超时设置
- 返回1表示移除成功，返回0表示key不存在或者key上没有超时设置

```
EXPIREAT key timestamp
```

- 设置key的超时时间，与EXPIRE相似，但是设置的是精确时间
- 设置成功返回1，key不存在或者超时时间设置失败返回0

```
Keys pattern
```

- 返回符合pattern的所有的key
- 在生产环境尽量少用，除非数据比较少，此操作会影响性能，可用scan或者sets来达到查找key的业务需求
- `*` 任意字符，`？` 单个􀘁符，`[ae]`  a或者e
- `[^e]` 不等于e，`[a-d]` a，b，c，d

```
ttl key
```
- 返回key对应的超时时间，还剩余多少时间
- 如果key不存在，返回-2
- 如果key上没有设置超时时间，返回-1

``` 
pttl key
```

- 与ttl功能一致，但是返回的是毫秒

```
SCAN cursor [MATCH pattern] [COUNT count]
```

- 基于游标的方式返回当前数据库的key，因此每次返回的数据不多，也不会阻塞服务器，可在生产环境中使用
- Cursor表示的是游标的位置，一般从0开始，返回的数据中第一行代表的就是下一次游标的位置，当返回的下一行游标是0时，表示本次迭代全部完成；此游标值不是一个连续标准值，比如5，10，15是连续标准
- MATCH pattern类似keys中模式一样，返回指定模式的迭代游标
- Count 每次迭代返回的数据条数，默认是10，但是它只是一个太及时，并没有严格保证，实际返回的值可能会比这个值多一些，但是不会多太多
- 与keys或者SMEMBERS命令相比，scan返回的结果不稳定，在执行迭代的过程中，如果key发生变化，比如删除或者新
=增，则返回的结果可能存在以下几个问题
	- 可能会返回重复的key，所以，使用此命令时，业务系统需要判断重复
	- 如果在迭代过程中，有key被删除了，但是在迭代完成前没有被添加进来，则此key并不会出现在迭代中

**2.3.2 应用场景**

---

####2.4 Hash

**2.4.1 命令**

```
HSET key field value
```

- Key代表的是一个hash表，field为hash表的key，value为hash表中key对应的value
- 如果key不存在，则创建一个key及对应的hash表
- 如果field存在，则把value覆盖原来的值
- 如果field是新加入，并且设置成功，则返回1；如果field已经存在，成功更新旧值，则返回0

```
HMSET key field value [field value ...]
```

- 与hset类似，但是一次设置多个值
- 返回ok

```
HSETNX key field value
```

- Key代表的是一个hash表，field为hash表的key，value为hash表中key对应的value
- 当field不存在时才设置
- 如果field不存在，则设置值，返回1；如果field存在，则返回0，做任何操作

```
HKEYS key
```

- 获取key对应的map的所有key
- 返回key的列表

```
HLEN key
```
- 获取key对应的map的field的数量

```
HGET key field
```
- 获取某个field的值，Key代表的是一个hash表，field为hash表的key
- 如果key不存在或者field不存在，返回nil，否则返回值

```
HMGET key field [field ...]
```
- 获取key对应的map的多个值
- 如果key不存在或者field不存在，返回nil，否则返回值列表

```
HVALS key
```
- 返回key对应的map的所有值列表

```
HSTRLEN key field
```
- 返回field对应的值的长度
- 当key不存在或者field不存在，则返回0

```
HDEL key field [field ...]
```
- 删除key对应的map的field，可􀑙原子性操作删除多个field
- 返回删除的值的数量

```
HEXISTS key field
```
- 判断key指定的map中是否存在field属性
- 如果key不存在或者field不存在则返回0，否则返回1

```
HGETALL key
```
- 返回key对应的map的所有key-value对，按照key然后下一行是value的形式展示

```
HINCRBY key field increment
```
- 对field指定的值加上increment，但是值必须是integer类型，
范围在64位有符号的数
- 返回增加后的结果

```
HINCRBYFLOAT key field increment
```
- 对field指定的值加上increment，但是值必须是float类型，
范围在64位有符号在的数
- 如果key或者field不存在则返回0，否则返回1

```
HSCAN key cursor [MATCH pattern] [COUNT count]
```
- 与scan类似，但是迭代的是key对应的map里面的值

**2.4.2 应用场景**

简单举个实例，比如要存储一个用户信息对象数据，包含以下信息：  

- 用户ID，为查找的key，  
- 存储的value用户对象包含姓名name，年龄age，生日birthday 等信息
 
如果用普通的key/value结构来存储，主要有以下2种存储方式
 
1. 第一种方式将用户ID作为查找key,把其他信息封装成一个对象以序列化的方式存储，  
           如：set u001 "李三,18,20010101"  
           这种方式的缺点是，增加了序列化/反序列化的开销，并且在需要修改其中一项信息时，需要把整个对象取回，并且修改操作需要对并发进行保护，引入CAS等复杂问题。  

2. 第二种方法是这个用户信息对象有多少成员就存成多少个key-value对儿，用用户ID+对应属性的名称作为唯一标识来取得对应属性的值，  
           如：mset user:001:name "李三 "user:001:age18 user:001:birthday "20010101"  
           虽然省去了序列化开销和并发问题，但是用户ID为重复存储，如果存在大量这样的数据，内存浪费还是非常可观的。 

那么Redis提供的Hash很好的解决了这个问题，Redis的Hash实际是内部存储的Value为一个HashMap，并提供了直接存取这个Map成员的接口，如：hmset user:001 name "李三" age 18 birthday "20010101"     

也就是说，Key仍然是用户ID,value是一个Map，这个Map的key是成员的属性名，value是属性值，  这样对数据的修改和存取都可以直接通过其内部Map的Key(Redis里称内部Map的key为field), 也就是通过key(用户ID) + field(属性标签) 操作对应属性数据了，既不需要重复存储数据，也不会带来序列化和并发修改控制的问题。很好的解决了问题。  
  
这里同时需要注意，Redis提供了接口(hgetall)可以直接取到全部的属性数据,但是如果内部Map的成员很多，那么涉及到遍历整个内部Map的操作，由于Redis单线程模型的缘故，这个遍历操作可能会比较耗时，而另其它客户端的请求完全不响应，这点需要格外注意。  

**实现方式：**  
上面已经说到Redis Hash对应Value内部实际就是一个HashMap，实际这里会有2种不同实现，这个Hash的成员比较少时Redis为了节省内存会采用类似一维数组的方式来紧凑存储，而不会采用真正的HashMap结构，对应的value redisObject的encoding为zipmap,当成员数量增大时会自动转成真正的HashMap,此时encoding为ht。

---

####2.5 Set

**常用命令： ** 
   
```
SADD key member [member ...]
```
- 向key指定的set集合添加成员，，从2.4版本后才支持添加多个
- 如果key不在则创建key以及set集合
- 返回当前操作成功添加的成员数量，不是所有的成员数量

```
SMOVE source de存stination member
```
- 把key为source的set中值为member的成员移动key为destination的set集合中
- 此操作是原子操作
- 如果source不存在或者member不存在source中，则返回0；否则返回1

```
SPOP key
```
- 从key指定的set集合中移除一个值
- 如果有值可移除就返回被移除的值，没有或者key不存在则返回nil

```
SREM key member [member ...]
```
- 从key指定的set中移除member的成员
- 如果某个member不存在，则会被忽略
- 成功后返回被移除的数量

```
SCARD key
```
– 返回key对应的集合成员数量

```
SMEMBERS key
```
- 返回key对􀚁的set的所有成员

```
SDIFF key [key ...]
```
- 返回第一个key与后面其它可对应的set中不存在的值  
  
```
SDIFFSTORE destination key [key ...]
```

- 与SDIFF一样，但是会把差异存在的值放在destination的set中
- 如果destination已经存在，将会覆盖
- 返回destination中值的个数

```
SINTER key [key ...]
```
- 返回key对应的set中值的交集
- 如果key不存，就被当作是空集合
- 返回值交集的元素

```
SINTERSTORE destination key [key ...]
```
- 与SINTER一样，但是把交集的数据存储在desttination中

```
SISMEMBER key member
```
- 判断member是不是key对应set的成员
- 如果是返回1，如果key不存在或者不是返回0

```
SRANDMEMBER key [count]
```
-  不带参数count，则从key指定的set中随机返回一个成员
- 从2.6版本后，增加count
	- 如果count>0,则随机返回count个
不同的值；
	- 如果count<0,返回多个值，但可能会有相同的值，数量
就是count的绝对值

```
SUNION key [key ...]
```
- 返回所有key中的所有值
- 如果值有相同的，则会去重

```
SUNIONSTORE destination key [key ...]
```
- 与sunion功能一致，不过把合并后的数据放在destination这个set集合
- 返回集合的长度

```
SSCAN key cursor [MATCH pattern] [COUNT count]
```

**应用场景：**  

Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以自动排重的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。  

比如在微博应用中，每个人的好友存在一个集合（set）中，这样求两个人的共同好友的操作，可能就只需要用求交集命令即可。  

Redis还为集合提供了求交集、并集、差集等操作，可以非常方便的实  
  
**实现方式：**  

set 的内部实现是一个 value永远为null的HashMap，实际就是通过计算hash的方式来快速排重的，这也是set能提供判断一个成员是否在集合内的原因。 

####2.6 Sorted Set

**常用命令** 
 
```
– ZADD key [NX|XX] [CH] [INCR] score member [score member ...]
```
- 把后面的成员，按照一定的排序分数放入key指定的sorted set
- 如果member已经存在，则会更新score，同时把此元素插入新的顺序位置
- XX表示只有member存在才能操作，也就是只能更新score
- NX,表示不更新，只做插入，即如果有成员存在，此操作会失败，不存在就加入
- Ch表示返回的值不是新增元素的数量而是发生变化的元素的数量，包括􀍹新增元素和已经存在的但是score被修改的元素
- Incr，当指定此属性时，后面只能有一对score-member，表示给member成员的score增加对应的值
- 当不同的成员具有相同的score时，redis会按照成员的顺序进行排序
- 如果不加ch选择，则返回被添加的新成员的数量；如果采用incr选择则返回的是增加后的元素的score

```
ZRANGE key start stop [WITHSCORES]
```
- 返回key指定的set的某个区间值
- Set的第一个值下标是0，如果start或者stop为负数，则表示倒数第几个
- 当带上属性withscores时，返回的值会带上score

```
ZSCORE key member
```

- 获取key对应的set集合中member成员的score值

```
ZSCAN key cursor [MATCH pattern] [COUNT count]
```
- 与scan类似，以游标的方式遍历key对应的set集合的值
  
```
ZCARD key
```
- 返回key指定的set的所有成员数量

```
ZCOUNT key min max
```
- 返回key指定的set集合中，min<=score<=max的元素的数量

```
ZINCRBY key increment member
```
- 把key中的member元素的score增加increment数

```
ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE
SUM|MIN|MAX]
```
- 求指定的key对􀚁的集合中的交集，numkeys表示被求交集的key的数量，必须完全一致
- 默认交集元素的score是所有集合中score的和，可通过AGGREGATE的参数SUM MIN MAX来指定􀒿它算法
- 还可通过WEIGHTS指定不同key的权重，参与score计算的权重

```
ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE
SUM|MIN|MAX]
```
- 求指定的key对应的集合中的并集，numkeys表示被求交集的key的数量，必须完全一致
- 如果有交集的元素，则这个元素的score是所有集合中score的和，可通过AGGREGATE的参数SUM MIN MAX来指定其它算法
- 还可通过WEIGHTS指定不同key的权重，参与score计算的权重

```
ZRANGEBYLEX key min max [LIMIT offset count]
```
- 当集合的所有元素的score都一样时，通过此命令可取出key的集合中符合字典顺序min max区间的值
- Min和max必须以(或者[开头，代表不等于和等于，比如min为[5，则代表大于等于5
- 用-号代表无穷小，+号代表无穷大，如果min为-，max为+则代表返回所有的值
- Limit用于分页返回，类似于mysql的limit，offset是第几条

```
ZLEXCOUNT key min max
```
- 当集合的所有元素的score都一样时，通过此命令可计算key的集合中符合字典顺序min max区间的值的个数
- Min和max必须以(或者[开头，代表不等于和等于，比如min为[5，则代表大于等于5
- 用-号代表无穷小，+号代表无穷大，如果min为-，max为+则代表返回所有的值

```
ZREVRANGEBYLEX key max min [LIMIT offset count]
```
- 与zrangebylex功能类似，不过它是从大到小的返回值列表

```
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
```
- 取出分数score于min和max之间的元素，默认是包含最小和最大两个边界，还可采用(或者[来明确表示边界
- Withscores可􀑙-把符合要求的元素的score值一起查询出来
- Limit类似mysql的limit，offset代表起始值，count代表查询数量
- 可通过-inf和+inf代表无穷小和无穷大

```
ZRANK key member
```
- 返回key集合中，元素member对应的排序位置
- 如果key不存在或者member不存在，返回nil

```
ZREM key member [member ...]
```
- 删除key指定的set集合中对应的元素
- 返回被删除的元素的数量，不包括不存在的元素

```
ZREMRANGEBYLEX key min max
```
- 当集合所有元素的score相同时，删除此集合中字典序范围为min和max的元素
- Min和max的定义参考ZRANGEBYLEX命令
- 返回被删除的元素个数

```
ZREMRANGEBYRANK key start stop
```
- 删除key对􀚁集合中排序顺序为start和stop中间的元素
- Start和stop可尾负数表示从最大排序的倒数，正序的下标从0开始
- 返回被删除的元素个数

```
ZREMRANGEBYSCORE key min max
```
- 删除key指定的set集合中对应的元素，score满足min和max大小
- 返回被删除的元素的数量，不包括不存在的元素

```
ZREVRANGE key start stop [WITHSCORES]
```
- 与zrange类似，但是以倒序方式查询
- 返回符合条件的元素

```
ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
```
- 以倒序的方式返回key对应集合中，score在max和min中间的元素
- Withscores表示返回元素时显示元素的score值
- Limit类似mysql的limit，offset表示起始值，count表示数量

```
ZREMRANGEBYSCORE key min max
```
- 删除key指定的set集合中对应的元素，score满足min和max大小
- 返回被删除的元素的数量，不包括不存在的元素

```
ZREVRANK key member
```
- 返回key集合中member元素的排序位置，key对应的集合倒排后member所处的位置
- 返回倒序序号，如果key不存在或者member不存在则返回nil

**  使用场景**  

- 以某个条件为权重，比如按顶的次数排序.  
- ZREVRANGE命令可以用来按照得分来获取前100名的用户，ZRANK可以用来获取用户排名，非常直接而且操作容易。  

Redis sorted set的使用场景与set类似，区别是set不是自动有序的，而sorted set可以通过用户额外提供一个优先级(score)的参数来为成员排序，并且是插入有序的，即自动排序。  

比如:twitter 的public timeline可以以发表时间作为score来存储，这样获取时就是自动按时间排好序的。  

比如:全班同学成绩的SortedSets，value可以是同学的学号，而score就可以是其考试得分，这样数据插入集合的，就已经进行了天然的排序。  

另外还可以用Sorted Sets来做带权重的队列，比如普通消息的score为1，重要消息的score为2，然后工作线程可以选择按score的倒序来获取工作任务。让重要的任务优先执行。  
  

- 需要精准设定过期时间的应用  
 
比如你可以把上面说到的sorted set的score值设置成过期时间的时间戳，那么就可以简单地通过过期时间排序，定时清除过期数据了，不仅是清除Redis中的过期数据，你完全可以把Redis里这个过期时间当成是对数据库中数据的索引，用Redis来找出哪些数据需要过期删除，然后再精准地从数据库中删除相应的记录。  
  
  
**  实现方式：**  

Redis sorted set的内部使用HashMap和跳跃表(SkipList)来保证数据的存储和有序，HashMap里放的是成员到score的映射，而跳跃表里存放的是所有的成员，排序依据是HashMap里存的score,使用跳跃表的结构可以获得比较高的查找效率，并且在实现上比较简单。  

> Reference

- [Redis笔记系列(二)--Redis安装部署与维护详解](http://www.codeweblog.com/redis%E7%AC%94%E8%AE%B0%E7%B3%BB%E5%88%97-%E4%BA%8C-redis%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2%E4%B8%8E%E7%BB%B4%E6%8A%A4%E8%AF%A6%E8%A7%A3/)
- [redis 五种数据类型的使用场景](http://blog.csdn.net/gaogaoshan/article/details/41039581)
- [Redis应用场景](http://www.cnblogs.com/shanyou/archive/2012/09/04/2670972.html)
