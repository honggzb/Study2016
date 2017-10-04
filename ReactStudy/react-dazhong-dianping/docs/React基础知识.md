[React 基础知识](#top)

- [1. jsx语法](#jsx语法)
  - [1.1 使用一个父节点包裹](#使用一个父节点包裹)
  - [1.2 样式](#样式)
  - [1.3 事件](#事件)
  - [1.4 循环](#循环)
- [2. 数据传递 & 数据变化](#数据传递)
- [3. 智能组件&木偶组件](#智能组件)
- [4. 约束性和非约束性组件](#约束性和非约束性组件)
- [5. Route路由](#Route路由)

<h3 id="jsx语法">1. jsx语法</h3>

<h4 id="使用一个父节点包裹">1.1 使用一个父节点包裹</h4>

jsx 中不能一次性返回零散的多个节点，如果有多个请包涵在一个节点中, { } 中返回的两个 <p> 也要用 <div> 包裹

```javascript
return (
   <div>
    <p>段落1</p> 
    {
       true ? <p>true</p> : <div> <p>false 1</p> <p>false 2</p> </div> 
    } 
   </div> 
 )
```

<h4 id="样式">1.2 样式</h4>

- css样式： `<p className="class1">hello world</p>`
- 内联样式：`<p style={{display: 'block', fontSize: '20px'}}>hello world</p>`，注意这里的{{...}}，还有fontSize的驼峰式写法
- 样式中包含表达式： `<p style={{display: true ? 'block' : 'none'}}>hello world</p>`

<h4 id="样式">1.3 事件</h4>

```javascript
class Hello extends React.Component {
    render() {
        return ( <p onClick={this.clickHandler.bind(this)}>hello world</p>)
    }
    clickHandler(e) {  // 函数执行时 this 即组件本身，因为上面的 .bind(this)
        console.log(Date.now())
    }
}
```

<h4 id="循环">1.4 循环</h4>

```javascript
class Hello extends React.Component {
    render() {
        const arr = ['a', 'b', 'c']
        return (
            <div>
                {arr.map((item, index) => {
                    return <p key={index}>this is {item}</p>
                })}
            </div>
        )
    }
}
```

> 注意，arr.map是包裹在{}中的，key={index}有助于React的渲染优化，jsx中的{}可放一个可执行的 js 程序或者变量
判断

<h3 id="数据传递">2. 数据传递 & 数据变化</h3>

- **props** - 父组件给子组件传递数据，通过给子组件设置 props 的方式，子组件取得 props 中的值即可完成数据传递。被传递数据的格式可以是任何 js 可识别的数据结构
- **state** - 组件内部自身的属性发生变化，state
- React 会实时监听每个组件的props和state的值，一旦有变化，会立刻更新组件，将结果重新渲染到页面上

**组件间通信(非flux架构)**

- 父组件向子组件之间: 通过props机制传递即可。
- 子组件向父组件通信: 利用回调函数，回调函数本身定义在父组件中，通过props方式传递给子组件，在子组件中调用回调函数。
利用自定义事件机制，这种方法更通用方便，并且可以简化API，关于自定义事件机制的详细使用方法我们在接下来展开。
- 跨级组件通信: context机制和事件机制, context机制react并不是特别推荐(不是特别推荐并不代表会在将来的版本没有，只是说明可能会产生一定的弊端因此要慎用少用)，context机制需要在上级组件(可以是父组件的父组件)定义一个getChildContext函数如下: `getChildContext(){ return{ color:"red"} }`
- 没有层级关系的组件通信： 事件机制

<h3 id="智能组件">3. 智能组件(smart components)&木偶组件(Dumb components)</h3>

分别放在了./app/containers和./app/components两个文件夹中

- 智能组件(smart components): 在日常开发中，我们也简称“页面”。为何说它“智能”，因为它只会做一些很聪明的事儿，脏活累活都不干。它只对数据负责，只需要获取了数据、定义好数据操作的相关函数，然后将这些数据、函数直接传递给具体实现的组件即可
  - 一定包含至少一个Smart或者Dumb的元件，（这肯定啊。。不然他干的啥）
  - 负责把从flux(or redux等)接收到的state传给dumb component
  - 负责call action,并把它的callback传給dumb component
  - 它应该只有结构没有外观
- 木偶组件(Dumb components): 这里“木偶”一词用的特别形象，它总是被人拿线牵着。它从智能组件（或页面）那里接受到数据、函数，然后就开始做一些**展示**工作，它的工作就是把拿到的数据展示给用户，函数操作开放给用户。至于数据内容是什么，函数操作是什么，它不关心
  - 必须能独立运作。。不能依赖依赖这个app的actions或者stores部分, 没有什么关于actions和stores的依赖，拿出项目中也可独立使用，甚至可以和别的actions，stores进行绑定
  - 可以允许有this.props.children,这样的话有助于这个组件有修改弹性
  - 接受数据和数据的改变只能通过props來处理,不必也不能用state
  - 组件的外观能用一个css來维护(这样才更容易重用，类似支付宝的ant)
  - 很少用到state,(一般呈现动画的时候可能会用到。。比如控制下拉框的展开或者收起)

[back to top](#top)

<h3 id="约束性和非约束性组件">4. 约束性和非约束性组件</h3>

- 约束性组件: 通过查询DOM，获取DOM属性的方式来做改变组件的参数
- 非约束性组件： 监控<input>的变化，将值实时保存到state中，直接从state中获取值

```javascript
//约束性组件方式
<input type="text" defaultValue="a" ref="input"/>
var input = this.refs.input;
//非约束性组件方式
<input type="text" value={this.state.name} onChange={this.handleChange} />
handleChange: function(e) { this.setState({name: e.target.value}); }
```

<h3 id="Route路由">5. Route路由</h3>

- 两种路由方法
  - <Link>
  - <Route>

```html
<!-- 第一种路由方法 -->
<Link to="/search/jingdian"><li className="float-left jingdian">景点</li></Link>
<!-- 第二种路由方法 -->
<Router history={this.props.history}> 
  <Route path='/' component={App}>
    <Route path='/search/:category(/:keyword)' component={Search}/>
    <!-- /:category是必填参数，(/:keyword)是选填参数 -->
  </Route> 
</Router>
```

- 路由参数传递: `this.props.params`

```javascript
componentDidMount() { 
  const params = this.props.params; 
  console.log('category param: ' + params.category);
  console.log('key param:' + params.keyword);           
 }
```

- 路由跳转： 

```javascript
hashHistory.push('/search/all/'+encodeURIComponent(value));
window.history.back();
```
