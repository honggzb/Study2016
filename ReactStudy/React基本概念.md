## React

## Basic Framework

** `ReactDOM.render()`**: React 的最基本方法，用于将模板转为 HTML语言，并插入指定的 DOM 节点

** React允许将代码封装成组件（component）**，然后像插入普通 HTML 标签一样，在网页中插入这个组件。`React.createClass` 方法就用于生成一个组件类

- `this.props.children`, `this.props`对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children`属性。它表示组件的所有子节点, this.props.children 的值有三种可能：
  - 如果当前组件没有子节点，它就是 undefined ;
  - 如果有一个子节点，数据类型是 object ；
  - 如果有多个子节点，数据类型就是 array 
  - 所以，处理 this.props.children 的时候要小心。React 提供一个工具方法 React.Children 来处理 this.props.children。可以用 `React.Children.map` 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object
- `PropTypes`: 用来验证组件实例的属性是否符合要求, `getDefaultProps` 方法可以用来设置组件属性的默认值

**获取真实的DOM节点(虚拟DOM（virtual DOM）)**: 根据React的设计，所有的DOM变动，都先在虚拟DOM上发生，然后再将实际发生变动的部分，反映在真实DOM上，这种算法叫做DOM diff ，它可以极大提高网页的性能表现。但是，有时需要从组件获取真实 DOM 的节点，这时就要用到`ref`属性

```javascript
    var MyComponent = React.createClass({
      handleClick: function() {
        this.refs.myTextInput.focus();
      },
      render: function() {
        return (
          <div>
            <input type="text" ref="myTextInput" />  // 设置ref属性，然后this.refs.[refName] 就会返回这个真实的DOM节点。
            <input type="button" value="Focus the text input" onClick={this.handleClick} />
          </div>
        );
      }
    });
    ReactDOM.render(
      <MyComponent />,
      document.getElementById('example')
    );
```

** 组件与用户互动 - `this.state` **

- `this.state`-- React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染UI
  - this.props 表示那些一旦定义，就不再改变的特性
  - this.state 是会随着用户互动而产生变化的特性
  - getInitialState 定义初始状态，也就是一个对象，这个对象可以通过this.state属性读取
  - this.setState 修改状态值，每次修改以后，自动调用this.render方法，再次渲染组件

```javascript
    var LikeButton = React.createClass({
      getInitialState: function() {   //getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过this.state属性读取
        return {liked: false};
      },
      handleClick: function(event) {
        this.setState({liked: !this.state.liked});  //this.setState 修改状态值
      },
      render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
          <p onClick={this.handleClick}>
            You {text} this. Click to toggle.
          </p>
        );
      }
    });
    ReactDOM.render(
      <LikeButton />,
      document.getElementById('example')
    );
```

** 表单 **: 用户在表单填入的内容，属于用户跟组件的互动，所以不能用`this.props`读取, 需要定义一个事件的回调函数，通过`event.target.value` 读取用户输入的值。

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

### 组件的生命周期

- Mounting：已插入真实DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

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

### Ajax

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

一共用了三个库： 它们必须首先加载

- react.js: react.js 是 React 的核心库
- react-dom.js: react-dom.js 是提供与 DOM 相关的功能
- Browser.js : 作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成

```
└── CommentBox
    ├──  CommentList
    │    └── Comment
    └──  CommentForm
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

> Reference

- [React 入门实例教程- 阮一峰](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [React's official site](http://facebook.github.io/react)
- [React's official examples](https://github.com/facebook/react/tree/master/examples)
- [React (Virtual) DOM Terminology](http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html), by Sebastian Markbåge
- [React JS Tutorial and Guide to the Gotchas](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/), by Justin Deal
- [React Primer](https://github.com/BinaryMuse/react-primer), by Binary Muse
