**grep** (global search regular expression(RE) and print out the line,全面搜索正则表达式并把行打印出来)是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。

Unix的`grep`家族包括`grep`、`egrep`和`fgrep`。egrep和fgrep的命令只跟grep有很小不同。egrep是grep的扩展，支持更多的re元字符， fgrep就是fixed grep或fast grep，它们把所有的字母都看作单词，也就是说，正则表达式中的元字符表示回其自身的字面意义，不再特殊。linux使用GNU版本的grep。它功能更强，可以通过-G、-E、-F命令行选项来使用egrep和fgrep的功能。

### grep格式

`grep [-acinv] [--color=auto] '搜寻字符串' filename`

选项与参数：
- -a ：--text   #不要忽略二进制的数据
- -A：显示行数   --after-context=<显示行数>   #除了显示符合范本样式的那一列之外，并显示该行之后的内容
- -b （byte-offset）   #在显示符合样式的那一行之前，标示出该行第一个字符的编号。   
- -B<显示行数>   --before-context=<显示行数>   #除了显示符合样式的那一行之外，并显示该行之前的内容。
- -c ：（count）计算找到 '搜寻字符串' 的次数
- -C<显示行数>    --context=<显示行数>或-<显示行数>   #除了显示符合样式的那一行之外，并显示该行之前后的内容。
- -d <动作>      --directories=<动作>   #当指定要查找的是目录而非文件时，必须使用这项参数，否则grep指令将回报信息并停止动作  
- -e<范本样式>  --regexp=<范本样式>   #指定字符串做为查找文件内容的样式
- -E      --extended-regexp   #将样式为延伸的普通表示法来使用
- -f<规则文件>  --file=<规则文件>   #指定规则文件，其内容含有一个或多个规则样式，让grep查找符合规则条件的文件内容，格式为每行一个规则样式
- -F   --fixed-regexp   #将样式视为固定字符串的列表
- -G   --basic-regexp   #将样式视为普通的表示法来使用
- -h   --no-filename   #在显示符合样式的那一行之前，不标示该行所属的文件名称
- -H   --with-filename   #在显示符合样式的那一行之前，表示该行所属的文件名称
- -i    --ignore-case   #忽略大小写
- -l    --file-with-matches   #列出文件内容符合指定的样式的文件名称。   
- -L   --files-without-match   #列出文件内容不符合指定的样式的文件名称。   
- -n   --line-number   #在显示符合样式的那一行之前，标示出该行的列数编号
- -q   --quiet或--silent   #不显示任何信息
- -r   --recursive   #此参数的效果和指定“-d recurse”参数相同  
- -s   --no-messages   #不显示错误信息
- -v   --revert-match   #显示不包含匹配文本的所有行，反向选择
- -V   --version   #显示版本信息   
- -w   --word-regexp   #只显示全字符合的列   
- -x    --line-regexp   #只显示全列符合的列
- -y   #此参数的效果和指定“-i”参数相同
- --color=auto ：可以将找到的关键词部分加上颜色的显示喔！

```
#根据文件内容递归查找目录
# grep 'energywise' *           #在当前目录搜索带'energywise'行的文件
# grep -r 'energywise' *        #在当前目录及其子目录下搜索'energywise'行的文件
# grep -l -r 'energywise' *     #在当前目录及其子目录下搜索'energywise'行的文件，但是不显示匹配的行，只显示匹配的文件
```
`# dmesg | grep -n --color=auto 'eth'     #用 dmesg 列出核心信息，再以 grep 找出内含 eth 那行,要将捉到的关键字显色，且加上行号来表示`

### grep与正规表达式

- ^ 强制匹配一行开始的位置
- $ 强制匹配一行结束的位置

```
# grep ^vivek /etc/passwd  #显示以 ‘vivek’ 开头的文本
# grep 'foo$' FILENAME   #检索以 ‘foo’ 结尾的文本
# grep '^$' FILENAME  #搜索空白行
# grep -n '\.$' regular_express.txt  #行尾结束为小数点 (.) 的那一行
```

`grep -E -i -w 'vivek|raj' /etc/passwd      #不区分大小写地检索 ‘vivek’ 和 ‘raj’`

**具体字符**

- [A-Za-z] 任何一个字母
- [0-9] 任何一个数字
- [:alnum:] – 所有文字数字字符
- [:alpha:] – 字母顺序
- [:blank:] – 所有空格和制表符
- [:digit:] – 所有数字
- [:graph:] – 所有非空字符（非空格、控制字符）
- [:cntrl:] – 所有控制字符   
- [:print:] – 所有非空字符（包括空格）   
- [:punct:] – 所有标点符号
- [:space:] – 特殊字符：制表符，换行符，垂直制表符、换页，回车，和空间
- [:lower:] – 所有小写字母
- [:upper:] – 所有大写字母
- [:xdigit:] – 所有十六进制数字（0-9，a-f，A-F）

`grep '[:upper:]' FILENAME   #匹配所有大写字母`

**通配符**

- `.`	匹配任何单个非换行符的字符
- `?`	匹配前一个字符0次或1次
- `*`	匹配0个或多个先前字符
- `+`	匹配前一个字符≥1次
- []   #匹配一个指定范围内的字符，如'[Gg]rep'匹配Grep和grep
- [^]  #匹配一个不在指定范围内的字符，如：'[^A-FH-Z]rep'匹配不包含A-R和T-Z的一个字母开头
- `{N}`	匹配前一个字符N次
- `{N,}`	匹配前一个字符≥m次
- `{N,M}`	匹配前一个字符 N 到 M次
- `–`	如果在列表中的某个列表或某个范围内的结束点，表示该范围
- `^`	开始标记，表示在开始位置匹配一个空字符串。也表示不在列表的范围内的字符
- `$`	结束标记。匹配一个空的字符串
- `\b`	单词锁定符。在一个单词的边缘位置匹配空字符串
- `\B`	在一个单词的非边缘位置匹配空字符串
- `\<`	匹配单词开始的空字符串,锚定单词的开始，如:'\<grep'匹配包含以grep开头的单词的行
- `\>`	匹配单词结尾的空字符串,锚定单词的结束，如'grep\>'匹配包含以grep结尾的单词的行

```
# grep '\<b.t\>' FILENAME  #所有两个字母的结果
# grep '^\.[0-9]' FILENAME   #所有以 ‘.’ 和数字开头的结果
# grep -n 'go*g' regular_express.txt   #找出开头与结尾都是g，但是两个g之间仅能存在至少一个o
# grep -n 'g.*g' regular_express.txt   #找出g开头与g结尾的行，当中的字符可有可无
```

**限定连续 RE 字符范围 {}**

因为{与}的符号在shell是有特殊意义的，因此必须要使用字符\来让他失去特殊意义才行


```
# grep -n 'o\{2\}' regular_express.txt       #找到两个o的字串
# grep -n 'go\{2,5\}g' regular_express.txt       #找出g后面接2到5个 o ，然后再接一个g的字串
# grep -n 'go\{2,\}g' regular_express.txt       #2个o以上的 goooo....g
```

### 扩展grep(grep -E 或者 egrep)

使用扩展grep的主要好处是增加了额外的正则表达式元字符集。

打印所有包含NW或EA的行。如果不是使用egrep，而是grep，将不会有结果查出。
    # egrep 'NW|EA' testfile     
    northwest       NW      Charles Main        3.0     .98     3       34
    eastern         EA      TB Savage           4.4     .84     5       20

`# egrep '[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]
{1,3}' FILENAME       #只匹配一个地址,如 192\168\1\254`


> reference

- [grep命令详解](http://blog.csdn.net/xifeijian/article/details/9209669)
- [每天一个linux命令（39）：grep 命令](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html)
- [linux grep命令详解](http://www.cnblogs.com/ggjucheng/archive/2013/01/13/2856896.html)
