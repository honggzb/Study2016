[mongoDB安装和配置](#top)

- [1. MongoDB software Component](#MongoDB)
- [2. Set up the MongoDB environment](#set-up)

<h3 id="MongoDB">1. MongoDB software Component</h3>

Component|Set	Binaries
---|---
Server|mongod.exe
Router|mongos.exe
Client|mongo.exe
MonitoringTools|mongostat.exe, mongotop.exe
ImportExportTools|mongodump.exe, mongorestore.exe, mongoexport.exe, mongoimport.exe
MiscellaneousTools|bsondump.exe, mongofiles.exe, mongooplog.exe, mongoperf.exe

<h3 id="set-up">2. Set up the MongoDB environment</h3>

```shell
#1) create a new folder
md \data\db
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\test\mongodb\data
#If your path includes spaces
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "d:\test\mongo db data"
#2) Start MongoDB, open a terminal
C:\Program Files\MongoDB\Server\3.4\bin\> mongod.exe
#3) Connect to MongoDB, open another terminal
C:\Program Files\MongoDB\Server\3.4\bin\> mongo.exe
```

> References

-[Official Document](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-windows/?_ga=1.132211401.612260426.1490804868#configure-a-windows-service-for-mongodb-enterprise)
