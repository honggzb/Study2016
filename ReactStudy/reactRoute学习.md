### 1. Render as route

```javascript
//index.js
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './modules/routes';
render(
  <Router routes={routes} history={hashHistory} />, 
  document.getElementById('app')
);
//routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import About from './About';
import Repos from './Repos';
import Repo from './Repo';
import Home from './Home';
module.exports =(
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/repos" component={Repos}>
          <Route path="/repos/:userName/:repoName" component={Repo} />
        </Route>
        <Route path="/about" component={About} />
      </Route>
)
```

- path参数：
  - `paramName`: `paramName`匹配URL的一个部分，直到遇到下一个`/、?、#`为止。这个路径参数可以通过`this.props.params.paramName`取出。
  - `()`： `()`表示URL的这个部分是可选的。
  - `*`： `*`匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
  - `**` ： `**` 匹配任意字符，直到下一个`/、?、#`为止。匹配方式是贪婪模式。
- `history`参数，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供React Router匹配
  - `hashHistory`: 路由的切换由URL的hash变化决定，即URL的#部分发生变化。举例来说，用户访问http://www.example.com/，实际会看到的是http://www.example.com/#/
  - `browserHistory`: 浏览器的路由不再通过Hash完成了，而显示正常的路径example.com/some/path，背后调用的是浏览器的`History API`, 但是，这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。如果开发服务器使用的是webpack-dev-server，加上`--history-api-fallback`参数, `webpack-dev-server --inline --content-base . --history-api-fallback`
  - `createMemoryHistory`: 主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动, 
`const history = createMemoryHistory(location)`
- `IndexRoute`显式指定Home是根路由的子组件，即指定默认情况下加载的子组件。可把`IndexRoute`想象成某个路径的index.html, 注意，`IndexRoute`组件没有路径参数`path`

### 2. navigating with link

- Link组件用于取代<a>元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态

```javascript
<Link to="/about" activeStyle={{color: 'red'}}>About</Link>
<Link to="/repos" activeClassName="active">Repos</Link>
```
- 在Router组件之外，导航到路由页面，可以使用浏览器的History API，像下面这样写。

```javascript
import { browserHistory } from 'react-router';
browserHistory.push('/some/path');
```

-IndexLink组件: 如果链接到根路由/，不要使用Link组件，而要使用IndexLink组件, `<IndexLink to="/" activeClassName="active">Home</IndexLink>`, 等同于`<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link>`, 实际上，IndexLink就是对Link组件的onlyActiveOnIndex属性的包装。

### 3 Redirect 组件和IndexRedirect 组件

- `<Redirect>`组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。
- `<IndexRedirect>`组件用于访问根路由的时候，将用户重定向到某个子组件。

```javascript
<Route path="inbox" component={Inbox}>
  <Redirect from="messages/:id" to="/messages/:id" />  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
</Route>
<Route path="/" component={App}>
  <IndexRedirect to="/welcome" />   { /* 用户访问根路径时，将自动重定向到子组件welcome */ }
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
```

### 4. 表单处理

```html
    <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="userName"/>
      <input type="text" placeholder="repo"/>
      <button type="submit">Go</button>
    </form>
```

第一种方法是使用`browserHistory.push`

```javascript
    import { browserHistory } from 'react-router'
      handleSubmit(event) {
        event.preventDefault()
        const userName = event.target.elements[0].value
        const repo = event.target.elements[1].value
        const path = `/repos/${userName}/${repo}`
        browserHistory.push(path)
      },
```

第二种方法是使用`context`对象。

```javascript
    export default React.createClass({
      // ask for `router` from context
      contextTypes: {
        router: React.PropTypes.object
      },
      handleSubmit(event) {
        // ...
        this.context.router.push(path)
      },
    })
```

### 5. 路由的钩子

每个路由都有onEnter和onLeave钩子，用户进入或离开该路由时触发

```javascript
//onEnter钩子用来做认证
const requireAuth = (nextState, replace) => {
    if (!auth.isAdmin()) {
        // Redirect to Home page if not an Admin
        replace({ pathname: '/' })
    }
}
export const AdminRoutes = () => {
  return (
     <Route path="/admin" component={Admin} onEnter={requireAuth} />
  )
}
//当用户离开一个路径的时候，跳出一个提示框，要求用户确认是否离开
const Home = withRouter(
  React.createClass({
    componentDidMount() {
      this.props.router.setRouteLeaveHook(
        this.props.route, 
        this.routerWillLeave
      )
    },
    routerWillLeave(nextLocation) {
      // 返回 false 会继续停留当前页面，否则，返回一个字符串，会显示给用户，让其自己决定
      if (!this.state.isSaved)
        return '确认要离开？';
    },
  })
)
```

> Reference

- [React Router使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
