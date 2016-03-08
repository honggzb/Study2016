##SQLCMD命令行工具

 Sqlcmd  参数  
        
 - U 登录 ID        
 - P 密码
 - S 服务器           
 - H 主机名         
 - E 可信连接
 - d 使用数据库名称 
 - l 登录超时值     
 - t 查询超时值
 - h 标题           
 - s 列分隔符      
 - w 屏幕宽度
 - a 数据包大小        
 - e 回显输入        
 - I 允许带引号的标识符
 - c 命令结束            
 - L[c] 列出服务器[清除输出
 - q "命令行查询"   
 - Q "命令行查询" 并退出
 - m 错误级别        
 - V 严重级别     
 - W 删除尾随空格
 - u unicode 输出    
 - r[0|1] 发送到 stderr 的消息
 - i 输入文件         
 - o 输出文件        
 - z 新密码
 - f <代码页> | i:<代码页>[,o:<代码页>] 
 - Z 新建密码并退出
 - k[1|2] 删除[替换控制字符
 - y 可变长度类型显示宽度
 - Y 固定长度类型显示宽度
 - p[1] 打印统计信息[冒号格式
 - R 使用客户端区域设置
 - b 出错时中止批处理
 - v 变量 = "值"...  
 - A 专用管理连接
 - X[1] 禁用命令、启动脚本、环境变量[并退出
 - x 禁用变量情况
 - ? 显示语法摘要


**登录sqlcmd**

```
sqlcmd -S 服务器名称 -U 帐户 -P 密码
sqlcmd -S "HOMESQLEXPRESS" -U "sa" -P "12345678"
```

**直接执行SQL Script**

```
sqlcmd -S 服务器名称 -U 帐户 -P 密码 -d 数据库 -i SQL Script
sqlcmd -S "HOMESQLEXPRESS" -U "sa" -P "12345678" -d "Database" -i "E:My Documentstest.sql"
::不使用用户名和密码
sqlcmd -S "HOMESQLEXPRESS" -i "E:My Documentstest.sql"
```

**查询当前服务器上的数据库**

```
(*) 可能需要 Use Master
Select [Name] From sysdatabases
sp_helpdb
```

**查询当前数据库的表和存储过程**

```
表:select * from sysobjects where status >=0 and xtype='U'
存储过程:select * from sysobjects where status >=0 and xtype='P'
```

1、可以用SQLCMD执行交互式动作，如：

```
C:\sqlcmd>sqlcmd
1> SELECT name from sys.databases
2> GO
```

也可以试着键入如下命令，现实服务器列表

```
1>:ServerList
SERVERS:
WUYZ
```

如果想看其他命令的使用，可以键入:Help /?

**2、执行SQL脚本文件**

`C:\sqlcmd>sqlcmd -i test.sql`

上面的I选项允许执行一个脚本文件，另外，也可以指定O选项，把命令的输出导出到指定文件,当然，也可以在代码中指定输出结果，如下

```
C:\sqlcmd>sqlcmd
1> :out output.txt
2> :r test.sql

```
**3、在脚本中使用变量**

SQLCMD支持可以在脚本中接收用户传入的变量信息，如下面语句：

```
SET NOCOUNT ON
Select $(Cols) from $(tablename)
GO
```

上面语句请求2个参数，可以通过指定相应的参数信息传给脚本，如下：

```
C:\sqlcmd>sqlcmd -i test.sql -o Output.txt -v cols="name,object_id,create_date" tablename="sys.objects"
```

上面语句的用途是：执行TEST.SQL脚本文件，并把输出的信息输出到OUTPUT.TXT文件中，并分别指定了COLS,TABLENAME的参数值

**4、在脚本中设置变量的值**

除了通过外部传入参数的值外，还可以在内部设置参数的值，如下面例子

```
e:\sqlcmd\backuptemplate.sql
use master
backup database [$(db)] to disk='$(file)'
e:\sqlcmd\backupsingle.sql
:setvar db msdb
:setvar file c:\temp\msdb.bak
:r e:\sqlcmd\backuptemplate.sql
```

如果想知道当然定义了哪些变量，可以使用:listvar命令来显示。

主要命令汇总：

```
:r filename
:ServerList
:List
:Listvar
:Error filename | STDOUT | STDERR
:Out filename | STDOUT | STDERR
:Perftrace filename | STDOUT | STDERR
:Connect server[\instance] [timeout] [user_name[password] ]
:On Error [exit | ignore]
:SetVar variable value
:Help:XML ON | OFF
主要环境变量汇总：
-a SQLCMDPACKETSIZE
-d SQLCMDDBNAME
-H SQLCMDWORKSTATION
-h SQLCMDHEADERS
-l SQLCMDLOGINTIMEOUT
-m SQLCMDERRORLEVEL
-P SQLCMDPASSWORD
-S SQLCMSSERVER
-s SQLCMDCOLSEP
-t SQLCMDSTATTIMEOUT
-U SQLCMDUSER
-w SQLCMDCOLWIDTH
```

下面是一个执行sql语句文件进行创建数据库、创建表、输入测试数据的批处理。

```
"::"是批处理文件的一种注释语法，由两个半角英文冒号组成
"echo"是输出字符串到屏幕
"@echo off"是关闭"执行时输出命令语句到屏幕"
其他说明请看"::"后面的注释

@echo off
echo ************** 执行SQL数据库环境配置 ****************
echo.
echo _____________________________________________________
echo ------------------ 启动SQL2005服务 ------------------
::如果没有启动sql服务，会先启动sql服务。"$"后面的是数据库实例名
net start mssql$sql2005
echo _____________________________________________________
echo.
echo _____________________________________________________
echo -------------- 执行T-SQL语句文件设置数据库 ----------
:: 执行T-SQL语句文件请按照下面的格式写
:: 第一种执行方式
:: 使用了Windows信任连接执行，
:: "".\sql2005""是"服务器\实例名"
:: ""bbsDB_T-SQL\上机2.sql""是输入的SQL语句脚本文件存放物理路径，可以是绝对路径或相对本批处理文件路径
:: sqlcmd -S 服务器名 -U 用户名 -P 密码 -d 数据库 -i 脚本文件路径
sqlcmd -S ".\sql2005" -i "bbsDB_T-SQL\上机2.sql"

:: 第二种执行方式
:: 使用了SqlServer账户连接执行
:: "".\sql2005""是"服务器\实例名"
:: "-U"后面的"sqlAdminName"是SQLSqlServer账户
:: "-P"后面的"sqlAdminPwd" 是SQLSqlServer账户的密码
:: ""bbsDB_T-SQL\上机2.sql""是输入的SQL语句脚本文件存放物理路径，可以是绝对路径或相对本批处理文件路径

sqlcmd -U sqlAdminName -P sqlAdminPwd -S ".\sql2005"  -i "bbsDB_T-SQL\上机2.sql"
echo.
echo 任务执行完毕
:: 最后给个暂停命令，便于检查是否出错，不加的话，上面的执行完后不管是否出错都会自动退出
pause
```

> reference

- [sqlcmd 实用工具](https://msdn.microsoft.com/zh-cn/library/ms162773.aspx)
- [用SQLCMD命令行工具执行SQL查询](http://www.cnblogs.com/bingcaihuang/archive/2011/01/31/1948222.html)
- [SQLCMD的介绍](http://blog.sina.com.cn/s/blog_95b5eb8c01019w27.html)
