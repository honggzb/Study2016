[React从入门到进阶](#top)

- [1. React Components](#React-Components)
- [2. JSX内置表达式](#JSX内置表达式)
- [3. React属性与事件](#React属性与事件)
  - [3.1 state和props](#state和props)
  - [3.2 事件和数据的双向绑定](#事件和数据的双向绑定)
    - 事件的绑定
    - 父页面向子页面传递参数 - 直接使用props
    - 子页面向父页面传递参数 --通过调用父页面传来的事件方法和state
    - 多页面快递传递参数技巧 - {...props}
  - [3.3 DOM操作和Refs](#可复用组件)
- [4. React的样式](#React的样式)
  - [4.1 内联样式](#内联样式)
  - [4.2 样式模块化](#样式模块化)
- [5. React UI library](#React-UI-library)
  - material UI(google)
  - Ant Design(阿里)
  - React Bootstrap
  - Elemental UI
  - Grommet
  - Semantic UI
- [6. React Router v4](#React-Router-v4)
  - [6.1 基本用法](#基本用法)
  - [6.2 router参数传递 - path params](#router参数传递)
- [7. 移动端开发](#移动端开发)
- [8. 注册模块](#注册模块)
- [Appendix](#Appendix)
  - [Appendix 1 - 插件babel-plugin-react-html-attrs](#插件babel)

<h3 id="React-Components">1. React Components</h3>

- 组件入口定义： `ReactDOM.render(<App />, document.getElementById('root'));`
- 外部组件代码格式: 

```javascript
import React, { Component } from 'react';
class ComponentName extends Component {
  render() {
    return (
      //...
    );
  }
}
export default ComponentName;
```

- 组件可定义为变量，这样组件可通过参数的形式进行传递

```javascript
class ComponentName extends Component {
  render() {
    var bodycomponent;
    if(login){
      bodycomponent = <bodyLogin />;
    } else {
      bodycomponent = <bodylogon />;
    }
    return (
      <MyHeader />
      {bodycomponent}
      <MyFooter />
    );
  }
}
export default ComponentName;
```

[back to top](#top)

<h3 id="JSX内置表达式">2. JSX内置表达式</h3>

- `{jsx内置表达式}`
- `{/注释/}`
- **JSX内置表达式是html的情况**- dangerouslySetInnerHTML

```javascript
//空格等特殊字符的注意事项
var html ="IMOOC&nbsp;LESSON";
//方法1: 使用Unicode
var html ="IMOOC\\u0020LESSON";
<p>{html}</p>
//方法2: 使用dangerouslySetInnerHTML，但该法可能存在XSS攻击威胁
var html ="IMOOC&nbsp;LESSON";
<p dangerouslySetInnerHTML={{__html:html}}</p>
```

[back to top](#top)

<h3 id="React属性与事件">3. React属性与事件</h3>

<h4 id="state和props">3.1 state和props</h4>

- state
  - this.state是会随着用户互动而产生变化的特性
  - 对于模块属于自身属性
  - state的作用域只属于当前的类，不污染其他模块
  - 动态的, Lifecycle
  - 在constructor中初始化
  - 修改state: `this.setState()`
  - 使用state： `this.state.username`
- props
  - this.prop表示那些一旦定义，就不再改变的特性
  - 对于模块属于外来属性
  - 静态的、只读的、无状态的
  - 可为模块传递参数
  - props: `this.setProps()`
  - 模块中接收参数 `this.props.userid`

```javascript
class BodyIndex extends Component {
  constructor(){
    super();  //调用基类的所有的初始化方法
    this.state = {username: 'parry'};  //初始化赋值
  }
  render() {
    setTimeout(()=> {
      this.setState({username: 'IMOOC'});
    }, 2000);
    return (
        <p className="App-intro">
          {this.state.username}
        </p>
    );
  }
}
```

[back to top](#top)

<h4 id="事件和数据的双向绑定">3.2 事件和数据的双向绑定</h4>

#### 事件的绑定

```javascript
//在构造函数里绑定
this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
//调用时绑定
 onClick={this.changeuserInfo.bind(this, 99)}
```

#### 父页面向子页面传递参数 - 直接使用props

```javascript
//在父页面定义参数
<BodyIndex userid={123456}/>
//在子页面直接使用
{this.props.userid}
```

#### 子页面向父页面传递参数 --通过调用父页面传来的事件方法和state

```javascript
//在父页面定义方法，并使用event, 使用event.target.value接收子页面参数
handleChildValueChange(event){
  this.setState({age: event.target.value});
}
<p>{this.state.age}</p>
<BodyChild handleChildValueChange={this.handleChildValueChange.bind(this)}/>
//在子页面定义事件并使用父页面定义的方法
<input type="text" onChange={this.props.handleChildValueChange}/>
```

#### 多页面快递传递参数技巧

```javascript
//app.js
<BodyIndex userid={123456} username={"parry1"}/>
//BodyIndex.js, 利用{...this.props}将其父页面app的props传给子页面bodyChild，同时定义了一个新props参数id传给子页面bodyChild
<BodyChild {...this.props} id={4} handleChildValueChange={this.handleChildValueChange.bind(this)}/>
//bodyChild.js中得到父父页面app的参数{this.props.userid} {this.props.username}，也得到其父页面的参数{this.props.id}
<p>{this.props.userid} {this.props.username} {this.props.id}</p>
```

[back to top](#top)

<h4 id="可复用组件">3.3 DOM操作和Refs</h4>

- Refs是访问到组件内部DOM唯一可靠的方法
- Refs会自动销毁对子组件的引用
- 不要在render和render之前（如在constructor和willMount中进行调用）对Refs进行调用

#### 直接操作DOM方法 1 - 使用原生JavaScript直接操作DOM

```javascript
changeuserInfo(age){
  this.setState({age: age});
  var mySubbutton = document.getElementById('submitButton');
  ReactDOM.findDOMNode(mySubbutton).style.color = 'red';
}
//...
<input id="submitButton" type="button" value="submit" onClick={this.changeuserInfo.bind(this, 99)}/>
```

#### 直接操作DOM方法 2 - 使用refs

```javascript
changeuserInfo(age){
  this.setState({age: age});
  this.refs.submitButton.style.color = 'red';
}
//...
<input ref="submitButton" type="button" value="submit" onClick={this.changeuserInfo.bind(this, 99)}/>
```

[back to top](#top)

<h3 id="React的样式">4. React的样式</h3>

<h4 id="内联样式">4.1 内联样式</h4>

```javascript
class MyHeader extends Component {
  constructor(){
    super();
    this.state = {miniHeader: true}; 
  }
  switchHeader(){  //动态操作内联样式
    this.setState( {miniHeader:!this.state.miniHeader} );
  }
  render() {
    const styleComponentHeader = {   //定义内联样式为一个常量
      header: {
        height: (this.state.miniHeader) ? "80px" : "150px"
      }
    };
    return (
      <div className="App-header" style={styleComponentHeader.header}>   /*引用内联样式*/
        <Logo className="App-logo" alt="logo" onClick={this.switchHeader.bind(this)}/>
      </div>
    );
  }
}
```

[back to top](#top)

<h4 id="样式模块化">4.2 样式模块化</h4>

使用webpack, css-loader, style-loader, 并配置好webpack.config.js

```javascript
var footerCss = require("./footer.css");
//...
<footer className={footerCss.miniFooter}>
```

[JSX样式和css样式在线互转工具](http://staxmanade.com/CssToReact/)

[back to top](#top)

<h4 id="React-UI-library">5. React UI library</h4>

- [material UI(google)](www.material-ui.com):  `yarn add material-ui`, `yarn add react-tap-event-plugin`
- [Ant Design(阿里)](https://ant.design/docs/react/introduce-cn)

[How to Customize Ant Design with React & Webpack… the Missing Guide](https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f)

1) install library

```shell
npm install antd --save
npm install less less-loader css-loader style-loader --save-dev
```

2) 配置按需加载antd - 使用babel-plugin-import???????????????not found sample for webpack 3

 `npm install babel-plugin-import --save-dev`

[back to top](#top)

<h3 id="React-Router-v4">6. React Router v4</h3>

> Reference

- [A Simple React Router v4 Tutorial](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
- [codesandbox sample](https://codesandbox.io/s/vVoQVk78)
- [react-router official documenation](https://reacttraining.com/react-router/web/guides/quick-start)

<h4 id="基本用法">6.1 基本用法</h4>

![](http://i.imgur.com/Vwj1BCH.png)

- use `<BrowserRouter>`, `<Route>`, and `<Link>` import from  `react-router-dom`
- browser based projects
  - `<BrowserRouter>`: handle dynamic requests(respond to URI) -**preferable to use**
  - `<HashRouter>`:    handle static websites(only respond to requests for files that it knows about)
- **History Object**: Each router creates a history object, which it uses to keep track of the current location[1] and re-render the website whenever that changes
-  A React Router component that does not have a router as one of its ancestors will fail to work

<h4 id="router参数传递">6.2 router参数传递</h4>

**props.match.params object**

```html
<!-- -->
<Route path="/details/:uniquekey" component={PCNewsDetails}/>
<Link to={`/details/${newsItem.uniquekey}`}>{newsItem.title}</Link>
<!-- component can use the props.match.params object to determine which news data should be rendered -->
fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
```

[back to top](#top)

<h3 id="移动端开发">7. 移动端开发</h3>

```
yarn add react-responsive
import MediaQuery from 'react-responsive';
<div>
  <MediaQuery query='(min-device-width:1224px)'>
    <PCIndex/>
  </MediaQuery>
  <MediaQuery query='(max-device-width:1224px)'>
    <MobileIndex/>
  </MediaQuery>
</div>
```

[back to top](#top)

<h3 id="注册模块">8. 注册模块</h3>

```
yarn add fetch
import MediaQuery from 'react-responsive';
<div>
  <MediaQuery query='(min-device-width:1224px)'>
    <PCIndex/>
  </MediaQuery>
  <MediaQuery query='(max-device-width:1224px)'>
    <MobileIndex/>
  </MediaQuery>
</div>
```

[back to top](#top)




<h3 id="Appendix">Appendix</h3>

<h4 id="插件babel">Appendix 1 - 插件babel-plugin-react-html-attrs(直接引入和使用css样式)</h4>

Transforms JSX class attributes into className and for attributes into htmlFor, allowing you to copy and paste HTML into your React components without having to manually edit these particular attributes each time.

https://github.com/insin/babel-plugin-react-html-attrs





> Reference

- [JSX样式和css样式在线互转工具](http://staxmanade.com/CssToReact/)
- 


## Service Worker

- https://github.com/oliviertassinari/serviceworker-webpack-plugin
- https://github.com/NekR/offline-plugin

## Vue.js

- [Vue.js——60分钟快速入门](http://www.cnblogs.com/keepfool/p/5619070.html)
- [vue.js资源汇总，vue.js教程大全](http://blog.csdn.net/qianhong_/article/details/52522645)
- [vue.js视频教程，vue.js视频教程下载](http://blog.csdn.net/sinat_17775997/article/details/52542317)
