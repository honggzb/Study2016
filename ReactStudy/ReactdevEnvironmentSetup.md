
- atom
  - language-babel
- node
  - browserify

## 1. Environment setup 1 - using browser-sync and react itself

### 1.1 mocking server and realtime monitoring

`npm install --save browser-sync`

modify package.json

```javascript
"scripts": {
  "dev": "browser-sync start --server --files *.*"
},
```

run in command line :  `npm run dev`

### 1.2 import JXF transformer support in index.html

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
<script type="text/jsx;harmony=true" src="app.jsx">
```

## 2. Environment setup 2 - using webpack

### 2.1 packages needed

```
npm install --save react
npm install --save react-dom
npm install --save-dev webpack
npm install webpack-dev-server -g
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react
```

### 2.2 codes

```javascript
//create webpack.config.js in root directory
module.exports = {
  entry:  './app-client.jsx',
      output: {
        filename: "public/bundle.js"
      },
      module:{
        loaders: [
          {
            exclude: /(node_modules|app-server.js)/,
            loader: 'babel',
            query:{ presets:['es2015', 'react'] }
          }
        ]
      }
};

//edit package.json
...
"scripts": {
  "prestart": "webpack",
  "start": "node app-server.js"
},
...
//app-client.js in root directory
import React from 'react';
import ReactDOM from 'react-dom';
import APP from './components/APP.js';
ReactDOM.render(<APP/>, document.getElementById('react-container'));

//APP.js in components directory
var React = require('react');
var APP = React.createClass({
  render: function() {
    return (<h1>Hello world from React.</h1>);
  }
});
module.exports = APP;
```

index.html

```html
<script type="text/javascript" src="bundle.js"></script>
```

### 2.3 fire up the Webpack dev server to see our components on the page live in action

`webpack-dev-server --progress --colors`

watch as terminal in browser : http://localhost:8080/webpack-dev-server/

### 2.4 running app

`npm start`


## 3. webpack.config.js

### 3.1 webpack.config.js配置

```javascript
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    //插件项, 这里使用了CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个common.js 来方便多页面之间进行复用
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/page/index.js',
	//支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },  //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },  //.js 文件使用 jsx-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'}, //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}  //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径, 查找module的话从这里开始查找
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',  //后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};

```

- 可以点[这里](http://webpack.github.io/docs/list-of-loaders.html)查阅全部的 loader 列表
- 关于 webpack.config.js 更详尽的配置可以参考[这里](http://webpack.github.io/docs/configuration.html)。

**CommonsChunkPlugin 插件来提取多个页面之间的公共模块，并将该模块打包为 common.js, 有时候我们希望能更加个性化一些，可以这样配置**

```javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        p1: "./page1",
        p2: "./page2",
        p3: "./page3",
        ap1: "./admin/page1",
        ap2: "./admin/page2"
    },
    output: {
        filename: "[name].js"
    },
    plugins: [
        new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
        new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
    ]
};
// <script>s required:
// page1.html: commons.js, p1.js
// page2.html: commons.js, p2.js
// page3.html: p3.js
// admin-page1.html: commons.js, admin-commons.js, ap1.js
// admin-page2.html: commons.js, admin-commons.js, ap2.js
```

### 3.2 运行 webpack

```javascript
webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
webpack --watch   //监听变动并自动打包, 实时刷新, webpack 提供了 webpack-dev-server 解决实时刷新页面的问题，同时解决实时构建的问题
webpack -p    //压缩混淆脚本，这个非常非常重要！
webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
```

事情是按以下顺序发生的，

1. js 文件修改
2. webpack-dev-server 监控到变化
3. webpack 在内存中重新构建 bundle.js
4. webpack-dev-server 保证页面引用的 bundle.js 文件与内存中一致

webpack-dev-server 提供了两种模式用于自动刷新页面：

**iframe 模式**

访问 http://localhost:8080/webpack-dev-server/index.html

**inline 模式**

在命令行中指定该模式，webpack-dev-server --inline。这样 http://localhost:8080/index.html 页面就会在 js 文件变化后自动刷新了。

以上说的两个页面自动刷新的模式都是指刷新整个页面，相当于点击了浏览器的刷新按钮。

### 3.3 独立打包样式文件

希望项目的样式能不要被打包到脚本中，而是独立出来作为.css，然后在页面中以<link>标签引入, 需要 extract-text-webpack-plugin 

```javascript
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
   plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")],
   entry: {
        ...
```

### 3.4 与 grunt/gulp 配合

```javascript
gulp.task("webpack", function(callback) {
    webpack({
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
```

更多参照信息请参阅：[grunt配置](http://webpack.github.io/docs/usage-with-grunt.html) / [gulp配置](http://webpack.github.io/docs/usage-with-gulp.html) 


> references

- [霹雳渔](http://www.piliyu.com/)
- [Setting up React for ES6 with Webpack and Babel](https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html)
- [一小时包教会 —— webpack 入门指南](http://www.cnblogs.com/vajoy/p/4650467.html)
- [webpack入门指谜](http://segmentfault.com/a/1190000002551952)
- [webpack 使用教程](https://www.zfanw.com/blog/webpack-tutorial.html)
- [React 入门教程](https://hulufei.gitbooks.io/react-tutorial/content/index.html)
