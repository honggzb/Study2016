[React+redux学习](#top)

- [5. Redux](#Redux)
- [6. React + Redux详细分析](#store)

<h3 id="Redux">5. Redux</h3>

- Redux并不是必须的，它的作用相当于在顶层组件之上又加了一个组件，作用是进行逻辑运算、储存数据和实现组件尤其是顶层组件的通信。如果组件之间的交流不多，逻辑不复杂，只是单纯的进行视图的渲染，这时候用回调，context就行，没必要用redux，用了反而影响开发速度。但是如果组件交流特别频繁，逻辑很复杂，那redux的优势就特别明显了。 
- Redux的react绑定库是基于“容器组件”和“展示组件”相分离 的开发思想。
- Redux用于管理多组件使用的公共信息，state变量就是数据（Redux只有唯一的state树），组件就是数据的呈现形式，action是动作，action是通过reducer来更新state的
- Redux只是定义了应用的数据流程，只解决了 “数据层”（model layer） 的问题，一般还会使用React，Angular 等作为“显示层” （UI layer） 来一起使用，我们项目采用React作为显示框架
- Redux三个概念
  - **store** 是应用的状态管理中心，保存着是应用的状态（state），当收到状态的更新时，会触发视觉组件进行更新
  - **container** 是视觉组件的容器，负责把传入的状态变量渲染成视觉组件，在浏览器显示出来
  - **reducer** 是动作(action)的处理中心， 负责处理各种动作并产生新的状态（state），返回给store
  - 从对象的包含关系上讲，reducer是store的一部分，但在逻辑上把它分出来，这样会比较容易理解整个redux流程
- 一个形象的比喻： Redux相当于一趟环路巴士
  - js是巴士，store, container, reducer是三个车站，state和action是两种乘客
  - Redux机制像一趟环路巴士，js巴士从store车站出发，载上state乘客 ，state乘客到达某个container车站下车并把自己展示出来 
  - 过了一会，有一个action乘客上车了，js巴士把action乘客送到reducer车站，在这里action乘客和state乘客生了一个孩子new state，js巴士把new state送回了store车站
- View层不能直接对state进行操作，而需要依赖Actions派发指令来告知Store修改状态，Store接收Actions指令后发生相应的改变，View层同时跟着Store的变化而变化

![](https://i.imgur.com/TI6RU26.png)

```javascript
import { createStore } from 'redux';
export default function () {
  // 1)定义计算规则，即 reducer
  function counter(state = 0, action) {
      switch (action.type) {
          case 'INCREMENT': return state + 1
          case 'DECREMENT': return state - 1
          default: return state
      }
  }
  // 2)根据计算规则生成 store, 
  // Create a Redux store holding the state of your app. Its API is { subscribe, dispatch, getState }.
  let store = createStore(counter)
  // 3)定义数据（即 state）变化之后的派发规则
  store.subscribe(() => {
      console.log('current state', store.getState())
  })
  // 4)触发数据变化
  //The only way to mutate the internal state is to dispatch an action.
  // The actions can be serialized, logged or stored and later replayed.
  store.dispatch({type: 'INCREMENT'})   // 1
  store.dispatch({type: 'INCREMENT'})   // 2
  store.dispatch({type: 'DECREMENT'})   // 1
}
```

[back to top](#top)

<h3 id="Store">6. React + Redux详细分析</h3>

| 只使用redux流程 | 用了react-redux之后流程|
| :------------- | :------------- |
|`component --> dispatch(action) --> reducer --> subscribe --> getState --> component`|`component --> actionCreator(data) --> reducer --> component`|

![](https://i.imgur.com/WDeGf9d.png)

**Store**

store是一个对象，store承接了react的state，store里面的数据是不可修改的，只能返回一个new state。 页面中所有的渲染操作所需数据来是从store拽下来的 

store有四个方法, 常用的是dispatch，这是修改State的唯一途径

- getState()： 获取应用当前State。 
- subscribe()：添加一个变化监听器。 
- dispatch()：分发 action。修改State。 
- replaceReducer()：替换 store 当前用来处理 state 的 reducer

**Provider - 将store传给组件**

- Provider是一个组件, 它作为整个App的容器，原有的App Container的基础上再包上一层
- Provider的工作很简单，就是接受Redux的store作为props，并将其声明为context的属性之一，然后通过context往下传，这样react中任何组件都可以通过this.context.store获取store。也就意味着我们可以在任何一个组件里利用dispatch(action)来触发reducer改变state，并用subscribe监听state的变化，然后用getState获取变化后的值。但是并不推荐这样做，它会让数据流变的混乱，过度的耦合也会影响组件的复用，维护起来也更麻烦

```javascript
// config app root
const history = createHistory()
const root = (
  <Provider store={store} key="provider">
    <Router history={history} routes={routes} />
  </Provider>
)
```

**connect - 将组件与redux关联起来**

- 绑定组件:  将component封装到connent中
- `connect(mapStateToProps, mapDispatchToProps, mergeProps, options)`是一个函数，它接受四个参数并且再返回一个函数–wrapWithConnect，wrapWithConnect接受一个组件作为参数wrapWithConnect(component)，它内部定义一个新组件Connect(容器组件)并将传入的组件(ui组件)作为Connect的子组件然后return出去
  - `mapStateToProps(state, [ownProps])`: 负责返回需要传递给子组件的State（属性），然后connect会拿到返回的数据写入到react组件中，然后组件中就可以通过props读取数据
  - `mapDispatchToProps(dispatch,[ownProps])`: 负责返回需要传递给子组件的State（方法）
  - `mapDispatchToProps(dispatch,[ownProps])`: 
  - options: `pure = true` 表示Connect容器组件将在shouldComponentUpdate中对store的state和ownProps进行浅对比，判断是否发生变化，优化性能。为false则不对比

```javascript
class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>hello world</p><hr/>
                <A userinfo={this.props.userinfo}/><hr/>
                <C actions={this.props.userinfoActions}/>
            </div>
        )
    }
    componentDidMount() {
        this.props.userinfoActions.login({
            userid: 'abc',
            city: 'beijing'
        })
    }
}
function mapStateToProps(state) {
    return { userinfo: state.userinfo  }
}
function mapDispatchToProps(dispatch) {
    return { userinfoActions: bindActionCreators(userinfoActions, dispatch)  }
}
export default connect(    //绑定组件
    mapStateToProps,
    mapDispatchToProps
)(Hello)
```

- 组件通过dispatch发出action，store根据action的type属性调用对应的reducer并传入state和这个action，reducer对state进行处理并返回一个新的state放入store，connect监听到store发生变化，调用setState更新组件，此时组件的props也就跟着变化
- connect，Provider，mapStateToProps,mapDispatchToProps是react-redux提供的，redux本身和react没有半毛钱关系，它只是数据处理中心，没有和react产生任何耦合，是react-redux让它们联系在一起 

> References

- [实例讲解基于 React+Redux 的前端开发流程](https://segmentfault.com/a/1190000005356568)
- https://github.com/reactjs/redux
- [React + Redux技术详解](https://github.com/bailicangdu/react-pxq)
