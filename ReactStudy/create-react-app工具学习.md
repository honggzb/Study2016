[react.js 教程之 create-react-app 命令行工具系统讲解](#top)

- [1. 快速开始](#快速开始)
- [2. 更新到最新版本](#更新到最新版本)
- [3. 文件结构](#文件结构)
- [4. 在vsCode中调试代码](#在vsCode中调试代码)
- [5. 代码分割](#代码分割)
- [6. 静态资源：css处理，图片，字体和文件](#静态资源)
- [7. public目录](#public目录)
- [8. 使用全局变量](#使用全局变量)
- [9. 添加环境变量](#添加环境变量)
- [10. 自定义设置proxy](#自定义设置proxy)
- [11. 在开发环境中使用HTTPS](#在开发环境中使用HTTPS)
- [12. 运行测试功能](#运行测试功能)

<h3 id="快速开始">1. 快速开始</h3>

```shell
npm install -g create-react-app
create-react-app my-app
cd my-app/
npm start
# 通过http://localhost:3000/查看你的app
npm run build     #编译打包程序, 在生产环境中编译代码，并放在build目录中
npm test          #文件修改后测试, 在交互监视模式下启动测试运行程序
```

[back to top](#top)

<h3 id="更新到最新版本">2. 更新到最新版本</h3>

创建react app的主要分为两个包，

- 一个包是create-react-app命令行
- 一个包是react-scripts，这个是用来生成具体项目的第三方依赖，如果要更新的话，基本上不需要更新create-react-app包，它就是使用最新版本的react-scripts包创建项目的，所以你创建的项目能够获取最新的特性和改进而不需要更新create-react-app包，而只用更新react-scripts包，而要更新这个包，可以打开https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md找到你当前的react-scripts版本，然后通过给定的命令一步步更新，这样可能会很麻烦，但是你也可以直接修改package.json中的版本号，然后直接npm install安装，但是这样可能导致潜在的破坏变化

[back to top](#top)

<h3 id="文件结构">3. 文件结构</h3>

注意如下几点：

1. 项目目录下面的public和src目录下的index文件必须存在不能改名，其他的文件可以删除和改名，可在src目录下面创建子目录，react为了达到最快速的代码重建，只有在src根目录下的文件会被webpack编译，所以必须把文件放在src根目录下面，否则webpack不会识别
2. 只用public目录下的文件才会被public/index.html引用，请阅读下面的说明，从而使用js和html静态资源
3. 能创建更多的和public同级的顶级目录，他们不会包含在项目构建中，可使用他们作为项目文档

<h3 id="在vsCode中调试代码">4. 在vsCode中调试代码</h3>

这个功能可谓是vsCode的神作，对于调试前端框架中的代码非常给力，强烈推荐使用
点击你的vsCode上面的调试按钮中的添加配置，把里面的配置项删除，然后添加如下代码

```json
{
    "version": "0.2.0",
    "configurations": [{
        "name": "Chrome",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceRoot}/src",
        "userDataDir": "${workspaceRoot}/.vscode/chrome",
        "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
        }
    }]
}
```

[back to top](#top)

<h3 id="代码分割">5. 代码分割</h3>

此即按需加载，要实现这个功能就是使用import函数，注意这和导入组件的import是有差别的

```javascript
//1) 假设模块A中写如下代码
const moduleA = 'hello';
export { moduleA };
//2) 在app.js中按需导入模块A
import('./moduleA').then(({moduleA}) => {
  // 在这里面可以使用模块A
}).catch( err => {
    // ...
})
```

[back to top](#top)

<h3 id="静态资源">6. 静态资源：css处理，图片，字体和文件</h3>

- css文件后处理
  - 这部分内容是来对css文件压缩和自动添加css兼容性前缀的，其实使用的就是webpack的postcss-loader，这个loader，react的脚手架已经配置好了，vue-cli也用了这个
- css文件的预处理
  - react配置的sass预处理器，如果你必须要用sass，关于这部分配置可以去查看官网，我个人觉得没有必要使用sass，使用框架开发，有很多配套的ui框架，而你只需要简单的调整一下布局就可以了，在这一节你要知道，react脚手架并没有对sass做配置，需要你手动配置
- 添加图片，字体和文件
  - 添加这类的静态资源和添加css文件类似, `import logo from './logo.png';`
  - 使用import导入一个图片或者一个文件比如PDF，返回的是会是一个路径，这和css的import是不同的，返回的这个路径值可以当做src或者href的属性值，为了减少http请求，react脚手架对不超过10000字节的图片做了data URI处理，SVG格式的图片不支持这项设置，
 - 注意点：在css文件中导入图片等静态资源，使用相对路径，webpack在编译的时候会自动的替换成绝对路径
 
[back to top](#top)

<h3 id="public目录">

1. 添加其他的静态资源

放在public目录下面的文件只是简单的复制到build目录中，那么想要正确的引入这个文件需要使用PUBLIC_URL这个变量， `<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">` , 也就是说写路径的时候 "%PUBLIC_URL%" + "/img/logo.png" 这种格式

注意点：这个变量只能在上述的情况下使用，如果你想导入src目录或者node_modules目录中的文件，你要把他复制过来，在编译的时候上面的变量会替换成绝对路径，如果你在js中导入可以如 `return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />`

2. 什么时候应该使用public文件夹？
    1. 你需要一些文件有特殊的文件名
    2. 当你有很多图片，并且这些图片的路径是动态添加的，懂不？？就比如你在页面上展示一个图片，这个图片要一直变，使用webpack编译后的文件不能做到这点，思考一下
    3. 如果使用其他的很小的js库，并且这个库已经压缩和优化了，可以直接用
    4. 还有一些js库和webpack是有冲突的，必需通过script标签的形式导入

[back to top](#top)
   
<h3 id="使用全局变量">8. 使用全局变量</h3>

如果在src目录中的js文件中使用上面所述的js文件中的全局变量，那么会报错，因为eslint并不知道这个变量是什么，为了避免这个错误的发生可以通过window来访问，即`const $ = window.$;`这样类似的结构就可以访问到全局变量，如果不想通过window访问可以在使用变量的那一行代码的后面添加 `// eslint-disable-line` 此注释即可

[back to top](#top)

<h3 id="添加环境变量">9. 添加环境变量</h3>

1. 在项目中可以使用声明在环境中的变量，默认情况下，可使用的环境变量有NODE_ENV(内置的环境变量, 可以通过process.env.NODE_ENV访问到这个变量)，和其他以REACT_APP_开头的环境变量
2. 普通的环境变量的创建必须要添加REACT_APP_开头，并且其他的环境变量除了NODE_ENV以外，都会被忽略，这是为了避免和系统本机的公钥冲突，如果修改了环境变量，必须重启项目
3. 这些环境变量会被定义在process.env上面，比如有一个环境变量叫做REACT_APP_SECRET_CODE当你在js中使用必须通过`process.env.REACT_APP_SECRET_CODE`才能访问到
4. 定义变量的方式有两种，第一种是在你的命令行工具中定义，第二种是新建一个.env文件，在public中的index.html中也可以使用环境变量`%REACT_APP_WEBSITE_NAME%`必须以REACT_APP开头，所有的环境变量都是编译的时候插入
  - 第一种方式：通过命令行的方式临时的添加环境变量，只介绍windows: `set REACT_APP_SECRET_CODE=abcdef & npm start`
  - 第二种方式：将环境变量定义在.env文件中: 在项目根目录中创建.env文件，在里面定义变量 `REACT_APP_SECRET_CODE=abcdef`

[back to top](#top)
  
<h3 id="添加环境变量">10. 自定义设置proxy</h3>

使用[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)

```javascript
//几种代理路径的方式
{
    // ...
    "proxy": {
        // 以/api的请求都匹配
        "/api": { "target": "<url_1>" },
        // 匹配/bar/abc.html
        "/bar/*.html": { "target": "<url_3>" },
        // 匹配 /baz/abc.html and /baz/sub/def.html
        "/baz/**/*.html": {"target": "<url_4>" }
    }
    // ...
}
```

[back to top](#top)
  
<h3 id="在开发环境中使用HTTPS">11. 在开发环境中使用HTTPS</h3>

后台使用https的，可在cmd运行的时候输入`set HTTPS=true & npm start`即可

<h3 id="运行测试功能">12. 运行测试功能</h3>

- react脚手架使用jest作为测试工具，jest工具用来做单元测试的，端到端的测试react不支持
- jest找自己的测试文件，放在src目录下，有如下三条规则
  - `__tests__`目录下的`.js`文件
  - 后缀`.test.js`文件
  - 后缀`.spec.js`文件
- 建议最好将测试文件和源文件放一起，减少搜索路径
- 命令行接口: 运行npm run test，jest会开启watch模式，一旦以保存文件，就会重新更新

[back to top](#top)

> [react.js 教程之 create-react-app 命令行工具系统讲解](http://www.cnblogs.com/ye-hcj/p/7191153.html)
