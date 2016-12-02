##文本编辑

###1. 光标移动快捷键

**光标上下移动**|**快捷键**
---|---
光标移动到上一行| Ctrl+P 或 Up
光标移动到下一行| Ctrl+N 或 Down
光标移动到文件头|Cmd+Up
光标移动到文件尾|Cmd+Down
---|---
**光标左右移动**|**快捷键**
光标向左移动一个字符|Ctrl+B 或 Left
光标向右移动一个字符|Ctrl+F 或 Right
光标向左移动一个单词|Alt+B 或 Alt+Left
光标向右移动一个单词|Alt+F 或 Alt+Right
光标移动到行头|Ctrl+A 或 Cmd+Left
光标移动到行尾|Ctrl+E 或 Cmd+Right
---|---
**移动到指定行/列**|**快捷键**
呼出光标移动窗口|Ctrl+G, 填入行:列(30:40)后回车就可以将光标移动到指定位置 
---|---
**符号间跳转**|**快捷键**
在当前文档搜索并跳到符号|Cmd+R 
在工程内搜索并跳到符号|Cmd+Shift+R (需要需要tags文件的支持)
---|---
**使用书签**|**快捷键**
Cmd+F2|在当前行创建或取消书签
Ctrl+F2|列出所有书签
F2|跳转到下一个书签
Shift+F2|跳转到上一个书签

###2. 选择

在移动光标的时候顺便选中内容,只需要在移动快捷键中加上Shift

**上下选择**|**快捷键**
---|---
向上选择一行|Ctrl+Shift+P 或 Shift+Up
向下选择一行|Ctrl+Shift+N 或 Shift+Down
选择当前位置到文件头|Cmd+Shift+Up
选择当前位置到文件尾|Cmd+Shift+Down
**左右选择**|**快捷键**
---|---
向左选择一个字符|Ctrl+Shift+B 或 Shift+Left
向右选择一个字符|Ctrl+Shift+F 或 Shift+Right
向左选择一个单词|Alt+Shift+B 或 Alt+Shift+Left
向右选择一个单词|Alt+Shift+F 或 Alt+Shift+Right
向左选择到行头|Ctrl+Shift+A 或 Cmd+Shift+Left
向右选择到行尾|Ctrl+Shift+E 或 Cmd+Shift+Right
**其他选择**|**快捷键**
---|---
Cmd+L|选中当前行
Cmd+A|全选
Ctrl+Shift+W|选择当前单词
**多光标选择**|**快捷键**
---|---
添加一个新的光标|按住Cmd键后用鼠标点击或选择想要添加新光标的位置 
Cmd+Shift+L|将选中的多行转成多光标的形式 
Cmd+D|选中下一个与当前光标所在单词相同的单词(或是与当前选中单词相同的单词) 
Ctrl+Cmd+G|选中所有与当前光标所在单词相同的单词(或是与当前选中单词相同的单词)

###3. 文本编辑与删除

**基本操作**|**快捷键**
---|---
Ctrl+T|相互调换光标前后字符
Cmd+J|将下一行接到当前行尾
Ctrl+Cmd+Up/Ctrl+Cmd+Down|将当前行向上/下移动一行
Cmd+Shift+D|复制当前行
Cmd+K, Cmd+U|连续输入两个快捷键,将当前单词转为大写字母
Cmd+K, Cmd+L|连续输入两个快捷键,将当前单词转为小写字母
Cmd+Alt+Q|段落重排(在英文写作时比较有用)
**删除和剪切**|**快捷键**
---|---
Ctrl+Shift+K|删除当前行
Cmd+Backspace|从当前光标删除到行头
Cmd+Delete|从当前光标删除到行尾
Alt+Backspace/Alt+H|从当前位置删除到单词头
Alt+Delete``Alt+D|从当前位置删除到单词尾

##括号和引号

**括号和引号**|**快捷键**
---|---
Ctrl+M|光标跳转到临近的括号处,再按一次快捷键光标会跳到另一个对应的括号处 
Ctrl+Cmd+M|选中当前括号内所有内容 
Cmd+Alt+.|补全XML/HTML的标签,比如说当输入<body>后再键入Cmd+Alt+.会自动添加</body>

##文件编码

**Ctrl+Shift+U** 来呼出编码选择窗口并手动选择文件的编码方式, 默认使用UTF-8 

##代码片段(Snippets)

**常用Snippet**|**快捷键**
---|---
HTML5网页|!, 按tab键
HTML网页|html, 按tab键

**自定义Snippets**

Atom的配置目录(如果是Linux系统,这个目录是~/.atom)下包含一个名为snippets.cson的文件,这个文件就负责保存我们的自定义Snippets.可通过主菜单Edit->Open Your Snippets来方便地打开这个文件

基本的Snippet的格式如下:

```
'.source.js':     //指定该Snippet应用的文件类型
  'console.log':
    'prefix': 'log'    //Snippet的名字, 这里为log
    'body': 'console.log(${1:"crash"});$2'   //指明触发的Snippet的具体内容 
```

配置多行的Snippet

```
'.source.js':
  'if, else if, else':
    'prefix': 'ieie'
    'body': """
      if (${1:true}) {
        $2
      } else if (${3:false}) {
        $4
      } else {
        $5
      }
```

##分栏

**常用Snippet**|**快捷键**
---|---
创建新的分栏|Cmd+K+方向键 (其中方向键的方向决定了分栏的方式,比如Cmd+K+↓就会创建一个新的水平分栏)
分栏间切换|Cmd+方向键
关闭一个分栏|Cmd+W

> Reference

- [Atom编辑器入门到精通](http://blog.csdn.net/u010494080/article/category/6277533)
