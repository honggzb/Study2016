### 常用命令

```shell
show dbs                    #show database names
show collections          #show collections in current database
show users                 # show users in current database
show profile                # show most recent system.profile entries with time >= 1ms
show logs                   # show the accessible logger names
show log [name]          # prints out the last segment of log in memory, 'global' is default
use <db_name>          #  set current database
db.foo.find()                # list objects in collection foo
db.foo.find( { a : 1 } )    #list objects in foo where a == 1
it                                #result of the last line evaluated; use to further iterate
exit                            #quit the mongo shell
```


### 查询游标方法

名称|说明
---|---
cursor.count()|	返回游标中的文档的数量
cursor.explain()|	报告的查询执行计划，包括索引使用的游标
cursor.hint()|	若要使用查询的特定索引的部队 MongoDB
cursor.limit()|	约束游标的结果集的大小
cursor.next()|	返回游标中的下一个文档
cursor.skip()|	返回一个游标，开始传递或跳过的一些文件后才返回结果
cursor.sort()|	返回结果排序根据排序的规范
cursor.toArray()|	返回一个数组，包含由光标返回的所有文档
 
名称|说明
---|---
db.collection.insert()|	在集合中创建一个新文档
db.collection.save()|	提供insert()和update ()插入新文件的包装
db.collection.update()|	修改集合中的文档
db.collection.find()|	集合上执行查询，并返回一个游标对象
db.collection.findOne()|	执行查询，并返回一个单独的文档
db.collection.remove()|	从集合中删除的文件
db.collection.count()|	换行计数集合或匹配查询中返回的文档数的计数
db.collection.distinct()|	返回一个数组没有指定的字段不重复值的文件

### 删除

```shell
db.test_ttlsa_com.remove({"ban_friends_id":"BAN121113"})
-- 删除所有数据
> db.test_ttlsa_com.count()
> db.test_ttlsa_com.remove({})
-- 删除集合
db.test_ttlsa_com.drop()
-- 删除整个数据库
db.ttlsa_com.getDB() db.dropDatabase()
```

> reference

- http://limingnihao.iteye.com/blog/1938383
