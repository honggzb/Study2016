### 常用设置

- 打开菜单 file -> config，加入

```json
editor:
    showInvisibles: true
    softWrap: true
whitespace:会向你的终端中安装一个新的名为 atom 的命令，你可以用一个或多个文件路径作为参数去运行 atom 命令。
    removeTrailingWhitespace: false
```

如果使用Mac，Atom的菜单栏有个命令叫做“Install Shell Commands”，它会安装atom和apm命令，如果Atom自己不能安装它们的话。在Windows或者Linux上面，这两个命令作为Atom安装进程的一部分自动安装。

`atom filename`

### 快捷键

- 命令面板:  `cmd-shift-P` 并且当前焦点在一个窗格上的时候，命令面板就会弹出来
- 隐藏或重新显示目录树: `cmd-\` 或 `tree-view:toggle`, 用快捷键 `ctrl-0` 可以将焦点切换到目录树。当焦点位于目录树上时，你可以用快捷键 `a`、`m`以及`delete`来创建、移动或删除文件和目录
- 查找: `cmd-F`
- 在整个项目中查找(缓冲区中查找): `cmd-shift-f`
- 模糊查找框（Fuzzy Finder）: `cmd-T` 或 `cmd-P`(模糊查找框会根据 core.ignoredNames 和 fuzzy-finder.ignoredNames 这两个选项来决定不查找哪些文件)
- 只查找已经打开的文件，而不是所有文件: `cmd-B`
- 只查找从上次 Git 提交之后修改过或新增的文件:  `cmd-shift-B`
- 自动补全: `ctrl-space`, 自动补全功能在atom/autocomplete包中实现
- 折叠所有代码段: `alt-cmd-shift-{`
- 展开所有代码段: `alt-cmd-shift-}`。也可以使用c`md-k cmd-N`来指定折叠的缩进级别，其中N是缩进深度
- 折叠代码或文本的任意一部分: `ctrl-alt-cmd-F`，或者在命令面板中选择“Fold Selection”

#### 编辑和删除文本

基本操作|功能
---|---
ctrl-T|交换光标两边字符的位置
cmd-J|将下一行拼接到当前行的末尾
ctrl-cmd-up, ctrl-cmd-down|上移或者下移当前行
cmd-shift-D|复制当前行
cmd-K, cmd-U|将当前字符转为大写
cmd-K, cmd-L|将当前字符转为小写

Atom也带有一个功能，可以对段落重新排版，在超出提供的最大长度的地方硬换行（hard-wrap）。你可以对当前选中区域格式化，使用cmd-alt-Q，使其一行的长度不超过80个字符（或者editor.preferredLineLength设置为什么都可以）。如果没有选中任何东西，当前段落会被重排

#### 删除和剪切文本

基本操作|功能
---|---
删除当前一行|ctrl-shift-K
删除当前位置到整行末尾的内容（在mac中为cmd-fn-backspace）|cmd-delete
剪切当前位置到整行末尾的内容|ctrl-K
删除当前位置到整行开头的内容|cmd-backspace
删除当前位置到单词开头的内容|alt-backspace, alt-H
删除当前位置到单词末尾的内容|alt-delete, alt-D

#### 多光标选择

基本操作|功能
---|---
cmd-click|添加新的光标
cmd-shift-L|将一个多重选择变为多个光标
ctrl-shift-up, ctrl-shift-down|在当前光标之上或之下添加新的光标
cmd-D|选择文档中与当前所选的单词相同的下一个单词
ctrl-cmd-G|选择文档中与当前所选的单词相同的所有单词

通过这些命令，可以在文档的多个位置放置光标，并且一次性有效地在多个位置执行相同操作

#### 折叠

基本操作|功能
---|---
alt-cmd-[ |折叠
alt-cmd-] |展开
alt-cmd-shift-{ |折叠全部
alt-cmd-shift-} |展开全部
cmd-k cmd-N |指定折叠层级 N为层级数


###主题

- atom-material-ui 好看到爆。
- atom-material-syntax
- seti-icons -The awesome icons provided by Seti UI theme

### 插件推荐

#### 自动补全  -- `ctrl-space 提示补全信息`

- autocomplete-plus — 完善自带autocomplete,有二度设置,接下来列出的一些有二度设置
    - autocomplete-paths
    - autocomplete-html
    - autocomplete-bibtex — github的markdown语法
    - autocomplete-snippets — 如名字
    - autocomplete-css
- autoclose-html - 闭合html标签
- autoprefixer — 用来补充css前缀的,会自动生成多个浏览器的前缀
- less-autocompile — 实时编译
- snippets
    - css-snippets
    - gulp-snippets
    - javascript-snippets
- docblockr — jsdoc 给js添加注释插件,,非常的实用

#### 美化

- atom-beautify 必备；格式化代码的，快捷键`ctrl-alt-b`
- color-picker  取色器
- pigment - display colors in project and files颜色显示插件 （必装）
- fold-function:  fold/unfold function, keymap设置如下

```
"fold-functions":
    autofold: true
    shortfileCutoff: 42
    autofoldGrammars: []
    autofoldIgnoreGrammars: ['SQL', 'CSV', 'JSON', 'CSON', 'Plain Text']
```

#### 代码提示

- Emmet - snippet(代码片段,不如用专门的片段插件), abbreviation expand(简写展开) 
    - 官网的Emmet Cheat Sheet :http://docs.emmet.io/cheat-sheet/
    - `Ctrl+Alt+Enter` 唤出文本框
- file-icons — 增加许多图标,在侧边栏文件名前面的icon,,很赞
- linter 代码校验工具, 默认可以识别多门语言的错误,但是不细致
    - linter-jshint, for JavaScript and JSON, using jshint
    - linter-coffeelint, for CoffeeScript, using coffeelint
    - linter-tslint, for Typescript, using tslint
    - linter-php, for PHP using php -l
    - linter-pylint, for Python, using pylint
    - linter-scss-lint, for SASS/SCSS, using scss-lint
    - linter-less, for LESS, using less
    - linter-csslint, for CSS, using csslint
    - linter-stylint, for Stylus, using stylint
    - linter-stylus, for Stylus, using stylus
- language-babel  - Babel javascript ES201x, React JSX & Flow Grammar & Transpiler
- atom-easy-jsdoc - Control-Shift-d or Control-Shift-j to add comment templates.

#### 文件语法高亮+预览

- minimap
- minimap-git-diff
- highlight-selected
- minimap-highlight-selected
- es-identifier-highlight
- svg-preview svg预览

#### 其他

- open-in-browser
- preview
- terminal-panel 直接在atom里面写命令了(ctrl-shift-t打开)
- markdown-writer
- markdown-preview-plus

### React

- atom-react-autocomplete
- autocomplete-js-import–模块导入智能提示 
- emmet-jsx-css-modules– React内的Emmet补全，非单纯的expand【class => className 】！！
- language-JavaScript-jsx – JavaScript, ES6, ES7, React JSX, Flow支持
- language-babel – 写React必不可少【atom内开发react的核心插件！！！】
- react-es6-snippets – es6写法的react snippet，挺实用
- react-snippets – 和上面的搭配“口味更加”哦！！。。
- js-func-viewer– 新插件，但是很实用，可以查看函数的结构~~~~ 
- atom-react-native-autocomplete – RN的智能补全，react开发也能受用一部分，相当实用！智能提示非autocomplete那种【类似静态语法分析器】
- autocomplete-modules – 模块智能提示【node_modules】

### Git

- git-plus — (Do git things without the terminal) 与Sublime Text 的sublimegit功能基本一致
    - Cmd-Shift-H on MacOS
    - Ctrl-Shift-H on Windows + Linux
- merge-conflicts 解决Atom中合并冲突插件！
- atomatigit 可视化git操作

用颜色表示文件的状态（added, modified, removed)

![](http://i.imgur.com/B7nDBMe.png)

快捷键|功能
---|---
Cmd+T/Cmd+P|列出所有项目中的文件,或Cmd+B列出所有当前打开的文件 
Cmd+Shift+B|来列出所有新建的或更改过的文件, 会列出所有未跟踪或是更改过的文件,相当于Toggle Git Status Finder命令 
`git config --global core.editor "atom --wait"`|将Atom设置为Git的默认编辑器

快捷键|功能
---|---
Alt+G O |在GitHub上打开当前文件 
Alt+G B |在GitHub上用Blame方式打开当前文件 
Alt+G H |在GitHub上用History方式打开当前文件 
Alt+G C |将当前文件在GitHub上的URL复制到剪切板 
Alt+G R |在GitHub上比较分支 
Alt+G ↑和Alt+G ↓|来将光标从当前文件的一块更改移到另一块更改

### 按键绑定keymap

Atom编辑器支持自定义按键绑定,文件格式是CSON

`按键绑定 = 快捷键(Keystroke) + 执行命令(Command) + 来源(Source) + 选择器(Selector)`

官方范例:

```
'atom-text-editor':
   'enter': 'editor:newline'

 'atom-workspace':
   'ctrl-shift-p': 'core:move-up'
   'ctrl-p': 'core:move-down'
```

### Gulp插件
 
- bottom-dock  - 实现gulp面板,还能实现todo[很实用的功能],还有grunt队列也能实现(https://atom.io/users/benjaminRomano)
- gulp-manager package

Bottom-dock快捷键|功能
---|---
ctrl-k ctrl-t|是否显示面板
ctrl-k ctrl-r|刷新窗口
ctrl-k ctrl-c|关闭窗口
---|---
GULP面板快捷键|功能
---|---
ctrl-k ctrl-t|是否显示面板
ctrl-k ctrl-g|创建一个新的gulp面板
ctrl-k ctrl-r|刷新窗口
ctrl-k ctrl-c|关闭窗口
---|---
TODO面板快捷键|功能
---|---
ctrl-k ctrl-t|是否显示面板
ctrl-k ctrl-r|刷新窗口
ctrl-k ctrl-c|关闭窗口
ctrl-k ctrl-m|添加面板

### 同步Atom - sync-settings

- 进入Atom设置中心找到该插件sync-settings，进去setting；
- 打开自己的github创建一个a new person access token ， 然后复制生成的token序列， 粘贴到sync-settings插件的setting里面；
- 再打开github的gist服务，创建一个gist，并复制生成gist id（注意这个id就是你创建的gist服务对应的URL中除去你的用户名，之后的部分），也粘贴到sync-settings插件的setting里面
- 配置完毕后， 在文档编辑页面,按下全局命令搜索面板(Ctrl+shift+p)，搜索sync-，会有可选项：
    - sync-settings:backup – 这条命令是备份当前的配置
    - sync-settings:restore – 这条命令是回复配置,是直接覆盖的;
    - sync-settings:view-backup – 这条是当你执行备份后到线上查询你的备份的,也就是到你的gist code里面
    - sync-settings:check-backup – 这条是查询最后一次是否正常

> references

- https://atom-china.org/
- http://www.kancloud.cn/wizardforcel/atom-flight-manual/92800
- [Github开源编辑器Atom常用插件及安装方法](http://blog.csdn.net/mduanfire/article/details/50278591)
