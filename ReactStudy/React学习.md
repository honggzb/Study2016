[React Study](#top)

- [1. Installation](#Installation)
  - [1.1 Creating a New Application](#Creating-a-New-Application)
  - [1.2 Adding React to an Existing Application](#Adding-React)
  - [1.3 Using a CDN](#Using-a-CDN)
- [2. JSX 用法](#JSX用法)
  - [2.1 Embedding Expressions in JSX](#Embedding-Expressions)
  - [2.2 属性Attributes与行内样式 with JSX](#属性Attributes与行内样式)
  - [2.3 Objects in JSX](#Objects-in-JSX)
- [3. Rendering Elements](#Rendering-Elements)
- [4. Components and Props](#Components-Props)
- [5. State and Lifecycle](#State-Lifecycle)
- [6. Handling Events](#Handling-Events)
- [4. Basic Framework](#Basic-Framework)

```
- JSX: html+javascript => javascript
- 虚拟DOM
```

<h3 id="Installation">1. Installation</h3>

<h4 id="Creating-a-New-Application">1.1 Creating a New Application</h4>

```shell
npm install -g create-react-app
create-react-app my-app
cd my-app
npm start
npm run build  #deploy to production
```

<h4 id="Adding-React">1.2 Adding React to an Existing Application</h4>

```shell
#1)install React by npm
npm init
npm install --save react react-dom
```

<h4 id="Using-a-CDN">1.3 Using a CDN</h4>

```html
<script src="https://unpkg.com/react@15/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
```

- [Creating a Production Build with Create React App](https://facebook.github.io/react/docs/optimizing-performance.html#create-react-app)
- [Creating a Production Build with Single-File Builds](https://facebook.github.io/react/docs/optimizing-performance.html#single-file-builds)
- [Creating a Production Build with Brunch](https://facebook.github.io/react/docs/optimizing-performance.html#brunch)
- [Creating a Production Build with Browserify](https://facebook.github.io/react/docs/optimizing-performance.html#browserify)
- [Creating a Production Build with Rollup](https://facebook.github.io/react/docs/optimizing-performance.html#rollup)
- [Creating a Production Build with Webpack](https://facebook.github.io/react/docs/optimizing-performance.html#webpack)

[back to top](#top)

<h3 id="JSX用法">2. JSX 用法</h3>

<h4 id="Embedding-Expressions">2.1 Embedding Expressions in JSX</h4>

Embed any JavaScript expression in JSX by wrapping it in curly braces `{ }`

```JavaScript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

<h4 id="属性Attributes与行内样式">2.2 属性Attributes与行内样式 with JSX</h4>

```javascript
// 1) use quotes
const element = <div tabIndex="0"></div>;
// 2) use curly braces
const element = <img src={user.avatarUrl}></img>;
// 3) 行内样式
ReactDOM.render(
  <ul style={{ backgroundColor: 'yellow' }, abc="123" }>  //use curl bracket
    <Item />
  </ul>, document.getElementById('test')
)  
React.createElement('ul',
  { style: {backgroundColor: 'yellow'}, abc: 123 }    //props
)
```

<h4 id="Objects-in-JSX">2.3 creating Objects in JSX</h4>

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
//或
const element = React.createElement(   //React.createElement() performs a few checks to help you write bug-free code
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
//或
function element(){
  return ( <h1 className="greeting">Hello, world!</h1> )
}
```

[back to top](#top)

<h3 id="Rendering-Elements">3. Rendering Elements(`ReactDOM.render()`)</h3>

`ReactDOM.render()`: React 的最基本方法，用于将模板转为 HTML语言，并插入指定的 DOM 节点

```javascript
//推荐写法1
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
//推荐写法2 - Composing Components
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//const element = <Welcome name="Sara" />;
function element() {
  return (
    <div>
      <Welcome name="Sara" />   // refer to other components in their output
      <Welcome name="Cahal" />
    </div>
  )
}
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

**Updating the Rendered Element - React elements are immutable**

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);    //
```

[back to top](#top)

<h3 id="Components-Props">4. Components and Props</h3>

- components accept arbitrary inputs (called `props`) and return React elements describing what should appear on the screen
- Props are Read-Only

components输入|components输出
---|---
props|React Element

- `this.props.children`, `this.props`对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children`属性。它表示组件的所有子节点, this.props.children 的值有三种可能：
  - 如果当前组件没有子节点，它就是 undefined ;
  - 如果有一个子节点，数据类型是 object ；
  - 如果有多个子节点，数据类型就是 array 
  - 所以，处理 this.props.children 的时候要小心。React 提供一个工具方法 React.Children 来处理 this.props.children。可以用 `React.Children.map` 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object
- `PropTypes`: 用来验证组件实例的属性是否符合要求, `getDefaultProps` 方法可以用来设置组件属性的默认值

[back to top](#top)

<h3 id="State-Lifecycle">5. State and Lifecycle</h3>

- reusable and encapsulated
- `this.state`-- 组件与用户互动, React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染UI
  - this.props 表示那些一旦定义，就不再改变的特性
  - this.state 是会随着用户互动而产生变化的特性

```javascript
class Clock extends React.Component {  //1) Converting a Function to a Class, create an ES6 class with the same name that extends React.Component
  constructor(props) {   //3) Add a class constructor that assigns the initial this.state
    super(props);        // pass props to the base constructor(Class components should always call the base constructor with props)
    this.state = {date: new Date()};  // assigns the initial this.state
  }
  componentDidMount() {    //4)  set up a timer whenever the Clock is rendered to the DOM for the first time
    this.timerID = setInterval( () => this.tick(), 1000 );
  }
  componentWillUnmount() { clearInterval(this.timerID); }   //4) clear that timer whenever the DOM produced by the Clock is removed
  tick() {
    this.setState({ date: new Date() }); //5) this.setState() to schedule updates to the component local state
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>   //2) Adding Local State to a Class
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,    //there is no need to add date prop in <Clock /> element
  document.getElementById('root')
);
```

**Note**

- Do Not Modify State Directly, instead, use `setState()`
- this.props and this.state updates may be Asynchronous. To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
//correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

[back to top](#top)

<h3 id="Handling-Events">6. Handling Events</h3>

- similar to handling events on DOM elements
- e is a synthetic event. React defines these synthetic events according to the W3C spec, so you don't need to worry about cross-browser compatibility.

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called
    this.handleClick = this.handleClick.bind(this); // This binding is necessary to make `this` work in the callback
  }
  handleClick() {
    this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

<h3 id="Conditional-Rendering">7. Conditional Rendering</h3>

```javascript
class LoginControl extends React.Component {  //stateful component 
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) { return <UserGreeting />; }
  return <GuestGreeting />;
}
// use variables to store elements
function LoginButton(props) {
  return (<button onClick={props.onClick}>Login</button>);
}
function LogoutButton(props) {
  return (<button onClick={props.onClick}>Logout</button>);
}
ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[back to top](#top)



- 获取真实的DOM节点(**虚拟DOM（virtual DOM）**): 根据React的设计，所有的DOM变动，都先在虚拟DOM上发生，然后再将实际发生变动的部分，反映在真实DOM上，这种算法叫做DOM diff ，它可以极大提高网页的性能表现。但是，有时需要从组件获取真实 DOM 的节点，这时就要用到`ref`属性


- **表单**: 用户在表单填入的内容，属于用户跟组件的互动，所以不能用this.props读取, 需要定义一个事件的回调函数，通过event.target.value 读取用户输入的值。

```javascript
    var Input = React.createClass({
      getInitialState: function() {
        return {value: 'Hello!'};
      },
      handleChange: function(event) {
        this.setState({value: event.target.value});
      },
      render: function () {
        var value = this.state.value;
        return (
          <div>
            <input type="text" value={value} onChange={this.handleChange} />
            //文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值
            <p>{value}</p>
          </div>
        );
      }
    });
    ReactDOM.render(<Input/>, document.body);
```

[back to top](#top)

<h4 id="Basic-Framework">2.1 组件的生命周期</h4>

- Mounting：已插入真实DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数

- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)
- componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

```javascript
    var Hello = React.createClass({
      getInitialState: function () {
        return { opacity: 1.0 };
      },
      componentDidMount: function () {
        this.timer = setInterval(function () {
          var opacity = this.state.opacity;
          opacity -= .05;
          if (opacity < 0.1) { opacity = 1.0; }
          this.setState({ opacity: opacity }); // 每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染
        }.bind(this), 100);
      },
      render: function () {
        return (
          //[React组件样式](https://facebook.github.io/react/tips/inline-styles.html)是一个对象，所以第一重大括号表示这是JavaScript语法，第二重大括号表示样式对象
          <div style={{opacity: this.state.opacity}}>
            Hello {this.props.name}
          </div>
        );
      }
    });
    ReactDOM.render(
      <Hello name="world"/>,
      document.body
    );
```

[back to top](#top)

<h4 id="Ajax">2.2 Ajax</h4>

可以使用`componentDidMount`方法设置Ajax请求，等到请求成功，再用`this.setState`方法重新渲染 UI（查看 demo11 ）

```
    var UserGist = React.createClass({
      getInitialState: function() {
        return {
          username: '',
          lastGistUrl: ''
        };
      },
      componentDidMount: function() {
        $.get(this.props.source, function(result) {
          var lastGist = result[0];
          if (this.isMounted()) {
            this.setState({
              username: lastGist.owner.login,
              lastGistUrl: lastGist.html_url
            });
          }
        }.bind(this));
      },
      render: function() {
        return (
          <div>
            {this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a>.
          </div>
        );
      }
    });
    
    ReactDOM.render(
      <UserGist source="https://api.github.com/users/octocat/gists" />,
      document.body
    );
```


甚至可以把一个Promise对象传入组件，请看Demo12。

如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

```javascript
    var RepoList = React.createClass({
      getInitialState: function() {
        return { loading: true, error: null, data: null};
      },
      componentDidMount() {
        this.props.promise.then(
          value => this.setState({loading: false, data: value}),
          error => this.setState({loading: false, error: error}));
      },
      render: function() {
        if (this.state.loading) {
          return <span>Loading...</span>;
        }
        else if (this.state.error !== null) {
          return <span>Error: {this.state.error.message}</span>;
        }
        else {
          var repos = this.state.data.items;
          var repoList = repos.map(function (repo) {
            return (
              <li>
                <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
              </li>
            );
          });
          return (
            <main>
              <h1>Most Popular JavaScript Projects in Github</h1>
              <ol>{repoList}</ol>
            </main>
          );
        }
      }
    });
```

官网上的案例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React Tutorial</title>
    <script src="https://unpkg.com/react@15.3.1/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15.3.1/dist/react-dom.js"></script>
    <script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/babel" src="scripts/example.js"></script>  <!-- type 属性为 text/babel -->
    <script type="text/babel">  <!-- type 属性为 text/babel -->
    </script>
  </body>
</html>
```


```javascript
var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }, 
  handleCommentSubmit: function(comment) {
    // optimistic updates
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an id generated by the server. In a production application you would likely not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
var Comment = React.createClass({
  //protecting from XSS attack
  rawMarkup: function() {
    var md = new Remarkable();   //a third-party library remarkable which takes Markdown text and converts it to raw HTML
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function(){
    return(
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
});
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});  // send request to the server
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form  className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}  />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
ReactDOM.render(
  <CommentBox url="/api/comments"  pollInterval={2000} />,
  document.getElementById('content')
);
```

[back to top](#top)



> Reference

- https://facebook.github.io/react/docs
- [React 入门实例教程- 阮一峰](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [React's official site](http://facebook.github.io/react)
- [React's official examples](https://github.com/facebook/react/tree/master/examples)
- [React (Virtual) DOM Terminology](http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html), by Sebastian Markbåge
- [React JS Tutorial and Guide to the Gotchas](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/), by Justin Deal
- [React Primer](https://github.com/BinaryMuse/react-primer), by Binary Muse
