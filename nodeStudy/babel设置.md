### 单独编译

```
$ npm install -g babel-cli
$ babel --help
$ npm install babel-preset-es2015 babel-preset-stage-0 --save-dev
```

在根目录下新建文件.babelrc

```
{
  "presets": ["es2015", "stage-0"]
}
```

- **执行单个文件** `$ babel-node test.js`
- **编译单个文件** `$ babel -0 hello.js hello.out.js`
- **编译整个目录** `$ babel src -d target -w`

编译后的 JavaScript 程序有时候需要依赖一些运行时polyfill，通过安装babel-polyfill模块来获得：

	$ npm install babel-polyfill --save

在编译后的js文件的首行加上以下代码来载入babel-polyfill：

	require('babel-polyfill');

再次执行编译即可

## 使用node编译

- `npm3 i babel-core babel-preset-es2015 babel-polyfill --save-dev`
- `.babelrc`

```
{
  "presets": ["es2015"]
}
```

- 在项目根目录下新建一个 index.js 文件，它将作为入口文件，引入其它的 js 模块, 在 index.js 中写入：

```javascript
require('babel-core/register'); // 核心模块
require('babel-polyfill'); // polyfill 模块
require('./test.js'); // 需要调试的 js 文件
```

编辑完 test.js 文件后，切换到 index.js 文件并按下 command + B 

> references

- 在线编译：  http://babeljs.io/repl/
- [ES2015 & babel 实战：开发NPM模块](https://cnodejs.org/topic/565c65c4b31692e827fdd00c)
- [给 JavaScript 初心者的 ES2015 实战](http://gank.io/post/564151c1f1df1210001c9161)
- [Nodejs学习路线图](http://blog.fens.me/nodejs-roadmap/)
