### 插件推荐

- autocomplete-plus — 完善自带autocomplete,有二度设置,接下来列出的一些有二度设置
    - autocomplete-paths
    - autocomplete-html
    - autocomplete-bibtex — github的markdown语法
    - autocomplete-snippets — 如名字
    - autocomplete-css
- autoclose-html
- autoprefixer — 用来补充css前缀的,会自动生成多个浏览器的前缀
- less-autocompile — 实时编译

- docblockr — 注释插件,,非常的实用

- atom-beautify 必备；格式化代码的，快捷键`ctrl-alt-b`
- color-picker  取色器

- Emmet - snippet(代码片段,不如用专门的片段插件), abbreviation expand(简写展开) 
    - 官网的Emmet Cheat Sheet :http://docs.emmet.io/cheat-sheet/
    - `Ctrl+Alt+Enter` 唤出文本框
- snippets
    - css-snippets
    - gulp-snippets
    - javascript-snippets

- file-icons — 增加许多图标,在侧边蓝文件名前面的icon,,很赞

- pigment - display colors in project and files

- minimap

- highlight-selected
- minimap-highlight-selected

- language-babel  - Babel javascript ES201x, React JSX & Flow Grammar & Transpiler

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

- open-in-browser
- preview

- markdown-writer
- markdown-preview-plus

- fold-function:  fold/unfold function, keymap设置如下

```
"fold-functions":
    autofold: true
    shortfileCutoff: 42
    autofoldGrammars: []
    autofoldIgnoreGrammars: ['SQL', 'CSV', 'JSON', 'CSON', 'Plain Text']
```

- git-plus — 与Sublime Text 的sublimegit功能基本一致

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

> references

- https://atom-china.org/
