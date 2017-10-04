[react高级实战大众点评(React+Webpack 1)](#top)

- [1. 准备工作](#准备工作)
- [2. React Developer Tools](#tools)
- [3. 项目架构](#项目架构)
- [4. React性能优化](#React性能优化)
  - [4.1 react 性能检测工具 react-addons-perf](#性能检测工具)
  - [4.2 PureRenderMixin优化](#PureRenderMixin优化)
  - [4.3 Immutable.js 优化](#Immutable优化)
- [5. Redux](#Redux)
- [6. React + Redux详细分析](#store)
- [7. 项目开发](#项目开发)
  - [7.1 首页](#首页)
  - [7.2 City页](#City页)
  - [7.3 Search页](#Search页)
  - [7.4 详情页](#详情页)
  - [7.5 登录页](#登录页)
  - [7.6 收藏和购买](#收藏和购买)
  - [7.7 评价页](#评价页)

<h3 id="准备工作">1. 准备工作</h3>

修改package.json - 如在window下

```shell
set NODE_ENV=xxx & ...
rm -rf ./build #改为rd/s/q build
#如果运行报错，手动创建一个build文件夹
```

- [fetch polyfill](https://github.com/github/fetch)

[back to top](#top)

<h3 id="tools">2. React Developer Tools & Redux Developer Tools</h3>

- [react-devtools](https://github.com/facebook/react-devtools)
- [redux-devtools](https://github.com/zalmoxisus/redux-devtools-extension)

```javascript
const store = createStore(
    rootReducer, initialState,/* preloadedState, */
    // 触发 redux-devtools和redux-devtools
    window.devToolsExtension ? window.devToolsExtension() : undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

[back to top](#top)

<h3 id="项目架构">3. 项目架构</h3>

```
├── root
│   ├──  app
│   │    ├──  components/   #木偶组件
│   │    ├──  containers/    #智能组件
│   │    ├──  containers/    #智能组件
│   │    │      ├──  City/
│   │    │      ├──  Detail/
│   │    │      ├──  Home/
│   │    │      │     ├──  Category/   #轮播图组件, react-swipe
│   │    │      │     └──  index.jsx
│   │    │      ├──  Search/
│   │    │      ├──  User/
│   │    │      ├──  Home/
│   │    │      ├──  Search/
│   │    │      ├──  User/
│   │    │      ├──  index.jsx     #最外层组件
│   │    │      └──  404.jsx
│   │    ├──  router/   
│   │    │      └── RouterMap.jsx
│   │    ├──  constants/
│   │    ├──  static/   
│   │    ├──  fetch/    
│   │    │      ├──  get.jsx
│   │    │      └──  post.jsx
│   │    ├──  actions/      #Reduce之: Action向store派发指令 
│   │    ├──  reducers/     #Reduce之规则: 负责管理整个应用的State树
│   │    ├──  store/        #Reduce之
│   │    ├──  util/   
│   │    ├──  index.jsx     #入口文件
│   │    └──  index.tmpl.html
│   ├──  docs/      #说明文档
│   ├──  mock/
│   │    └──  server.js
│   └── test/
├── .babelrc
├── package.json
├── webpack.config.js
└── webpack.production.config.js
```

开发分工协作分析

- **布局组** - 负责 contianer、component 部分（要求对 HTML + CSS 布局比较熟悉，只需要会简单的 js 即可， 不需要完整地理解redux流程）
  - 任务1：静态布局 - 使用HTML + CSS 静态布局
    - 能力要求：只需要会使用 HTML + CSS （SASS）进行布局即可
    - 任务内容：1. 苹果篮子组件（容器组件） 2. 水果组件（显示组件）
  - 任务2：动态布局 - 使用JSX语法对静态布局做动态渲染处理
- **逻辑组** - 负责 action、reducer 部分（要求对 js 比较熟悉，最好可以比较完整地理解redux流程， 但基本不需要涉及HTML + CSS布局工作）
  - 任务1：action 开发 - 制作 redux 流程的 action
  - 任务2：reducer 开发 - 制作 redux 流程的 reducer
  
![](https://i.imgur.com/uBFpPoh.png)

[back to top](#top)

<h3 id="React性能优化">4. React性能优化</h3>

- `react-dianping-getready-perf-todolist`
- `react-dianping-getready-perf-optimization`

<h4 id="性能检测工具">4.1 react 性能检测工具 react-addons-perf</h4>

`npm i react-addons-perf --save`，然后在./app/index.jsx中

```javascript
// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}
```

在console中运行 `Perf.start()`开始检测，然后进行若干操作，运行`Perf.stop()`停止检测，然后再运行`Perf.printWasted()`即可打印出浪费性能的组件列表。在项目开发过程中，要经常使用检测工具来看看性能是否正常

<h4 id="PureRenderMixin优化">4.2 PureRenderMixin优化</h4>

`npm i react-addons-pure-render-mixin --save`，然后在组件中引用并使用

```javascript
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    //...省略其他内容...
}
```

每个 React 组件中都尽量使用PureRenderMixin

<h4 id="Immutable优化">4.3 Immutable.js 优化</h4>

React 的终极优化是使用 Immutable.js 来处理数据，Immutable实现了js中不可变数据的概念

- 不是所有的场景都适合用它，当我们组件的props和state中的数据结构层次不深（例如普通的数组、对象等）的时候，就没必要用它。但是当数据结构层次很深（例如obj.x.y.a.b = 10这种），就得考虑使用了
- 之所以不轻易使用是，Immutable 定义了一种新的操作数据的语法，如下。和我们平时操作 js 数据完全不一样，而且每个地方都得这么用，学习成本高、易遗漏，风险很高

```javascript
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
```
因此，这里建议优化还是要从设计着手，尽量把数据结构设计的扁平一些，这样既有助于优化系统性能，又减少了开发复杂度和开发成本。

[back to top](#top)

<h3 id="Redux">5. Redux</h3>
<h3 id="Store">6. React + Redux详细分析</h3>

> 参见： React+redux学习.md

<h3 id="项目开发">7. 项目开发</h3>

<h4 id="首页">7.1 首页</h4>

**7.1.1 route**

```html
<!-- app\router\routeMap.jsx -->
class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='/city' component={City}/>
                    ...
                </Route>
            </Router>
        )
    }
}
export default RouterMap
```

- 关键点
  - 进入系统的默认路由（即浏览器一访问http://localhost:8080/），默认渲染Home组件
  - Home组件上层还有一个App组件作为其父组件, 可以将公共的部分写在该父组件中

**最外层组件 - app\containers\index.jsx**

- `{this.props.children}`直接渲染子组件。
- 如果我们访问的是http://localhost:8080/，按照路由配置的规则，现在它的子组件就是Home，那么这里的`{this.props.children}`代表的就是Home

**Head组件**

<h4 id="City页">7.2 City页</h4>

<h4 id="Search页">7.3 Search页</h4>

<h4 id="详情页">7.4 详情页</h4>

<h4 id="登录页)">7.5 登录页</h4>

userInfo和userInfoActions使用Redux，所以登录组件包裹到Redux中

**路由配置**

```html
<Router history={this.props.history}>
    <Route path='/' component={App}>
      <!-- 可选的参数router即登录之后需要跳转的页面 -->
        <Route path='/Login(/:router)' component={Logon}/>
    </Route>
</Router>
```

**登录组件**

`{ this.state.checking ? <div>{/* 等待中 */}</div> : <h2>显示登录组件</h2> }`

<h4 id="收藏和购买)">7.6 收藏和购买</h4>

<h4 id="评价页)">7.7 评价页</h4>

[back to top](#top)


> References

- [【React 模仿大众点评 webapp】实战教程 - 文档目录总结](http://www.imooc.com/article/16082)
- [React 最佳实践——那些 React 没告诉你但很重要的事](https://segmentfault.com/a/1190000005013207)
- [React.js学习](http://blog.csdn.net/sinat_17775997/article/details/70144239)
- [实例讲解基于 React+Redux 的前端开发流程](https://segmentfault.com/a/1190000005356568)
- https://github.com/reactjs/redux
- [React + Redux技术详解](https://github.com/bailicangdu/react-pxq)


