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

> references

- 在线编译：  http://babeljs.io/repl/
- [ES2015 & babel 实战：开发NPM模块](https://cnodejs.org/topic/565c65c4b31692e827fdd00c)
- [给 JavaScript 初心者的 ES2015 实战](http://gank.io/post/564151c1f1df1210001c9161)
