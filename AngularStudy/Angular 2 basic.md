
## Angular 2

- [1. Architecture of Angular](#Architecture)
- [2. 组件开发](#组件开发)
	- 2.1 模板语法](#)
	- 2.2 模板的逻辑控制](#)
	- 2.3 Component Content Projection - ng-content](#)
	- 2.4 Component Lifecycle Hooks](#)
	- 2.5 ViewChildren & contentChildren](#)
	- 2.6 为模板应用样式](#)
	- 2.7 属性与事件](#)
- Angular CLI](#)
- 3 Built-In Directives](#)
	- 3.1 NgFor](#)
	- 3.2 NgIf & NgSwitch](#)
	- 3.3 NgStyle & NgClass](#)
	- 3.4 ngNonBindable](#)
	- 3.5 structural directives](#)
- 4 Customer Directives](#)
- 5 Reactive Programming = Streams + Operations](#)
	- 5.1 Observable](#)
	- 5.2 Angular observables(Reactive Programming in Angular)](#)
- 6 **Pipes** - filters in Angular 1(angular 2- pipes.md)](#)
- 7 Form](#)
	- 7.1 Model driven Form](#)
	- 7.2 Reactive Model Form](#)
	- 7.3 Template Driven Form](#)
- 8 Dependency Injection & Providers](#)
	- 8.1 injector](#)
	- 8.2 Provider](#)
	- 8.3 Tokens](#)
	- 8.4 Configuring Dependency Injection in Angular](#)
	- 8.5 NgModule.providers vs Component.providers vs Component.viewProviders](#)
- 9 HTTP](#)
	- 9.1 Core HTTP](#)
	- 9.2 HTTP via Promises](#)
	- 9.3 HTTP via observables](#)
	- 9.4 JSONP via Observables](#)
- 10 routing](#)
	- 10.1 Local web server configuration](#)
	- 10.2 Route Configuration](#)
	- 10.3 Navigating](#)
		- 10.3.1 hardcoded URLS](#)
		- 10.3.2 program by the router](#)
		- 10.3.3 program by a routerLink directive](#)
	- 10.4 Parameterised Routes(by ID)](#)
	- 10.5 Nested Routes](#)
	- 10.6 Router Guards](#)
	- 10.7 Routing Strategies](#)
	- 10.8 Querying parameters/extracting query parameters](#)
- 11 Unit Testing](#)
	- 11.1 Jasmine - Behavior Driven Development(BDD)](#)
	- 11.2 Karma](#)
	- 11.3 Angular CLI](#)
	- 11.4 Testing with Mocks & Spies](#)
	- 11.5 Angular Test Bed](#)
	- 11.6 Test Asynchronous functions](#)
	- 11.7 Testing Dependency Injection](#)
	- 11.8 Testing Components, Directives, Model Driven Form, Http and Jsonp, Routing](#)

<h3 id="Architecture">1. Architecture of Angular</h3>

- Components - encapsulates the template, data and the behavior of a view
- Directives - modify DOM elements and/or extend their behavior
- Routers
- Services

![](http://i.imgur.com/uuXXkHf.png)

![](http://i.imgur.com/BjDIUB4.png)

**ES6工具链**

- systemjs - 通用模块加载器，支持AMD、CommonJS、ES6等各种格式的JS模块加载
- es6-module-loader - ES6模块加载器，systemjs会自动加载这个模块
- traceur - ES6转码器，将ES6代码转换为当前浏览器支持的ES5代码。systemjs会自动加载 这个模块

![](http://i.imgur.com/Bpmt8I0.png)

```html
<!--组件渲染锚点-->
	<my-app></my-app>
    <!--定义一个ES6脚本元素-->
<script type="module">
    //从模块库引入三个类型定义
    import {Component,View,bootstrap} from "angular2/angular2";
     //1. 定义Angular2组件 - 定义一个类，然后给这个类添加注解
	//@Component: 通过selector属性（值为CSS选择符），指定这个组件渲染到哪个DOM对象上
     @Component({selector:"my-app"})
	//@View: 通过template属性，指定渲染的模板
     @View({template:"<h1>Hello,Angular2</h1>"})
     class EzApp{}       
     //2. 渲染组件
     bootstrap(EzApp);
</script>
```

- 支持多种渲染引擎: 以组件而非DOM为核心，意味着Angular2在内核隔离了对DOM的依赖 - DOM仅仅作为一种可选的渲染引擎存在

![](http://i.imgur.com/MVAG1Rs.png)

<h3 id="组件开发">2. 组件开发</h3>

- An Angular application is a number of components nested together
- Angular2以组件为核心，bootstrap是围绕组件开始的
- tree structure - just one root component
- Small components glued together through inputs and outputs
  - **One way data-binding**
    - with [property] bind to the input of a component  - 绑定属性Property binding
    - with (event) bind to the output event of a component - 监听事件event binding
  - **Two way data-binding**
    - with `<input [(ngModel)]="firstName">`和`<p>Hello {{ firstName }}</p>` and both input property binding as well as output event binding
![](http://i.imgur.com/4Csv2sJ.png)

- Declare all components on the NgModule
- @Input/@Output decorator
- EventEmitter and $Event
- Use # to create template local variable(link a DOM element to a local template variable)

![](http://i.imgur.com/mfnPy5V.png)

![](http://i.imgur.com/OEoWkPQ.png)

```javascript
class Joke {  //domain model(component)
  setup: string;
  punchline: string;
  hide: boolean;
  constructor(setup:string, punchline:string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }
  toggle(){ this.hide = !this.hide; }
}
// joke component
@Component({
  selector: 'joke',
  template: `<div class="panel panel-info">
               <div class="panel-heading">{{ joke.setup }}</div>
               <div class="panel-body">
                  <p class="card-text" [hidden]="joke.hide">{{ joke.punchline }}</p>
                  <button class="btn btn-primary" (click)="joke.toggle()">Tell Me</button>
                  <button class="btn btn-danger" (click)="deleteJoke()">Delete</button>
               </div>
             </div>`
})
class JokeComponent {
  @Input() joke: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();
  deleteJoke(){
    this.jokeDeleted.emit(this.joke);
  }
}
//components
@Component({    
  selector: 'app',
  template: `<joke></joke>`
})
class AppComponent {
}
// Declare all components on the NgModule
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {   //root module, just one
}
platformBrowserDynamic().bootstrapModule(AppModule);
```

#### 2.1 模板语法

**2.1.1 [property] - 绑定属性**

- 使用一对中括号将HTML元素或组件的属性绑定到组件模型的某个表达式， 当表达式的值变化时，对应的DOM对象将自动得到更新
- 也可以使用bind-前缀进行属性绑定
- 常量字符串: 给字符串加引号，或者去掉中括号

![](http://i.imgur.com/o5RtgiV.png)

```
//使用bind-前缀进行属性绑定
@View({template:`<h1 bind-text-content="title"></h1>`})
//常量字符串
@View({template:`<h1 [text-content]="'Hello,Angular2'"></h1>`})
@View({template:`<h1 text-content="Hello,Angular2"></h1>`})
```

**2.1.2 (event) - 监听事件**

- 小括号包裹事件名称，并绑定到表达式
- 事件名称前加on-前缀

```javascript
@View({template : `<h1 (click)="onClick()">HELLO</h1>`})
@View({template : `<h1 on-click="onClick()">HELLO</h1>`})
```

**2.1.3 #var - 局部变量**

```javascript
@View({
    directives:[EzCalc],
    template : "<ez-calc #c></ez-calc>"
    //模板内的局部变量c指向EzCalc的实例
})
```

#### 2.2 模板的逻辑控制

**2.2.1 [ng-if] - 条件逻辑**

```javascript
<img src="ad.jpg" [ng-if]="trial==true">   
<img src="ad.jpg" template="ng-if tiral==true">//or
<img src="ad.jpg" *ng-if="tiral==true">//or
```

```javascript
//引入NgIf类型
import {Component,View,bootstrap,NgIf} from "angular2/angular2";
@Component({selector:"ez-app"})
@View({
    directives:[EzReader],
    template:`<ez-reader [trial]="true"></ez-reader>`
})
class EzApp{}
@Component({
    selector : "ez-reader",
    properties:["trial"]
})
@View({
    directives:[NgIf],
    template : `
               	<img [src]="banner" *ng-if="trial==true">
                <pre>{{content}}</pre>`
})
class EzReader{
    constructor(){
      var self = this;
      this._trial = true;
      this.banner = "img/banner.jpg";
      this.content = `this is content	`;
    }
}
bootstrap(EzApp);
</script>
```

**2.2.2 [NgSwitch] - 分支逻辑**

```
<ANY [ng-switch]="...">
    <!--与变量比较-->
    <template [ng-switch-when]="variable">...</template>
    <!--与常量比较-->
    <template ng-switch-when="constant">...</template>
    <template ng-switch-default>...</template>
</ANY>
```

NgSwitch系列指令都是Angualr2的预置指令，在模板中使用之前，需要

- 从Angular2库中引入NgSwitch系列指令
- 通过ViewAnnotation的directives属性进行声明

```javascript
//引入NgSwitch类型
import {Component,View,bootstrap,NgSwitch,NgSwitchWhen,NgSwitchDefault} from "angular2/angular2"
@Component({selector:"ez-app"})
@View({
    directives:[EzPromotion],
    template:`<ez-promotion gender="Female"></ez-promotion>`
})
class EzApp{}
@Component({
    selector : "ez-promotion",
    properties:["gender"]
})
@View({
    directives:[NgSwitch,NgSwitchWhen,NgSwitchDefault],
    template : `
    <div [ng-switch]="gender">
      <template ng-switch-when="Male"><img src="img/male-ad.jpg"></template>
      <template ng-switch-when="Female"><img src="img/female-ad.jpg"></template>
      <template ng-switch-default><h1>Learn Something, NOW!</h1></template>                    
    </div>`
})
class EzPromotion{}
bootstrap(EzApp);
```

**2.2.3 [NgFor] - 条件逻辑 - 循环逻辑**

```
<template ng-for [ng-for-of]="items" #item #i="index">
    <li>[{{i+1}}] {{item}}</li>
</template>
//or
//使用template attribute
<ANY template="ng-for #item of items;#i=index">...</ANY>
//使用*前缀
<ANY *ng-for="#item of items;#i=index">...</ANY>
```

```javascript
//引入NgSwitch类型
    	import {Component,View,bootstrap,NgFor} from "angular2/angular2";
@Component({selector:"ez-app"})
@View({
    directives:[EzStar],
    template:`<ez-star></ez-star>`
})
class EzApp{}
@Component({
    selector : "ez-star"
})
@View({
    directives:[NgFor],
    template : `
    <div>
        <h2>{{actor}} - Films</h2>
        <ul>
            <li *ng-for="#film of films;#i=index">[{{i+1}}]{{film}}</li>
        </ul>
    </div>`
})
class EzStar{
    constructor(){
      this.actor = "Jason Statham";
      this.films = ["Mechanic: Rescurrection / 2016","Spy / 2015"];
    }
}
bootstrap(EzApp);
```

**2.3 Component Content Projection - ng-content**

`<ng-content select=".moo"></ng-content>`
`<ng-content select=".foo"></ng-content>`

**2.4 Component Lifecycle Hooks**

![](http://i.imgur.com/O1t14eF.png)

**2.5 ViewChildren & contentChildren**

- components can nest as view children(`@ViewChild`, `@ViewChildren`) or content children(`@ContentChild`, `@ContentChildren`)
	- view Children of a component: in the template for this component view
	- content children of a component: via content projection from a host component
- references to these children in components with `@ViewChild` and `@ContentChild` decorators
- view children exist in components view, are initialised by `AfterViewInit`
- content children are projected into components view, are initialised by `AfterContentInit`

```java
class JokeListComponent implements OnInit, AfterContentInit, AfterViewInit {
	//......
	@ViewChild(JokeComponent) jokeViewChild: JokeComponent;
	@ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
	@ViewChild("header") headerEl: ElementRef;
	@ContentChild(JokeComponent) jokeContentChild: JokeComponent;  //jokeContentChild property and bind it to the content child by using the @ContentChild decorator
}
```

####2.6 为模板应用样式

**2.6.1 styles - 设置模板样式**

```javascript
@Component({
  selector: 'joke-form',
  templateUrl: 'joke-form-component.html',
  styleUrls: ['component.css'],
  encapsulation: ViewEncapsulation.Native
})
```

**2.6.1.1 内联样式**

```javascript
@View({
    styles:[`h1{background:#4dba6c;color:#fff}`]
})
```

**2.6.1.2 外部样式**

也可以把样式定义在单独的文件中, 如ez-greeting.css, 然后使用View注解的styleUrls属性来引入外部样式：

```javascript
@View({
    styleUrls:["ez-greeting.css"]
})
```

**2.6.1.3 Sytle encapsulation strategy - encapsulates component**

- ViewEncapsulation.Native
- ViewEncapsulation.Emulated
- ViewEncapsulation.None

####2.6.2 ShadowDom - 封装私有样式

Angular2采用ShadowDom作为组件的渲染基础，这意味着组件被渲染到独立的`Shadow Tree`上，可实现DOM对象和样式的良好封装。除了Chrome之外的大多数的浏览器目前还不支持ShadowDom，因此，Angular2提供了三种将模板渲染到DOM的策略

- 全局仿真策略/EmulatedUnscopedShadowDomStrategy: Angular2将模板直接插入DOM树，并将模板的样式原封不动地插入head头部。这意味着不同组件之间的样式可能冲突，这个策略不需要浏览器原生支持ShadowDom，是当前版本（alpha.28）的默认策略
- 作用域仿真策略/EmulatedScopedShadowDomStrategy: Angular2将模板直接插入DOM树，对模板的样式重新定义CSS选择符后 插入head头部。由于样式进行了重命名，所以不同组件之间的样式不会冲突。这个策略也不需要浏览器原生支持ShadowDom。
- 原生策略/NativeShadowDomStrategy: Angular2将在组件的宿主DOM对象上建立一个ShadowDom树，这颗树与主DOM树是隔离 的，所以，这是实现Web组件的理想方案

在Angular2中，ShadowDom的三种策略对应于三个类，这三个类继承自ShadowDomStrategy

```html
<h1>我是H1，我在组件外</h1>
<ez-app></ez-app>
<script type="module">
    import {bind,Component,View,bootstrap} from "angular2/angular2";
      import {ShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/shadow_dom_strategy';
      import {DOCUMENT_TOKEN} from 'angular2/src/render/dom/dom_renderer';
      import {EmulatedUnscopedShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy';
      import {EmulatedScopedShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy';
      import {NativeShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/native_shadow_dom_strategy';
      @Component({selector:"ez-app"})
      @View({
        template:"<h1>我是H1，我在组件内</h1>",
        styles:["h1{color:red}"]
      })
      class EzApp{}
      //提交给Angular2的注入器/DI
      //可以理解为：如果注入器需要实例化一个ShadowDomStrategy 实例，应当以DOCUMENT_TOKEN为参数，调用一个匿名的工厂函数，而这个工厂函数将返回一个 NativeShadowDomStrategy类的实例 
      var injectables = [    // 
        bind(ShadowDomStrategy).toFactory((doc) => new NativeShadowDomStrategy(doc.head), [DOCUMENT_TOKEN])  //绑定不同策略
      ];		
      bootstrap(EzApp,injectables);
</script>
```

#### 2.6.7 属性与事件

**2.6.7.1 属性声明 - 暴露成员变量**

在Component注解的 properties属性中声明组件的成员变量

```javascript
//具有属性接口的组件 - EzCard
@Component({
    selector:"ez-card",
    properties:["name","country"]
})
@View({
    template : `<div class='ez-card'>My name is <b>{{name}}</b>, I am from <b>{{country}}</b>.</div>`
})
class EzCard{		
    constructor(){
        this.name = "Mike";
        this.country = "Sweden";
    }	
}
```
	
**2.6.7.2 事件声明 - 暴露事件源**

定义一个事件源/EventEmitter， 然后通过Component注解的events接口包括出来

```javascript
@Component({z
    events:["change"]
})
class EzCard{
    constructor(){ this.change = new EventEmitter(); }
}
@View({
    template : "<ez-card (change)="onChange()"></ez-card>"    //每次EzCard触发change事件时，EzApp的onChange()方法都将被调用。
})
```

### Angular CLI

- Bootstrapping a project
- Serving and live reloading 
- Code generation
- Testing
- Packaging and releasing

``

###3 Built-In Directives

###4 Custom Directives

###5 **Reactive Programming = Streams + Operations**

####5.1 Observable --> Streams & Operations

- create streams
- subscribe to them
- react to new values
- combines two streams to create a third

![](http://i.imgur.com/cDsXgLV.png)

[A Decision Tree of Observable Operators - Interval, Take, Map](http://reactivex.io/documentation/operators.html#filtering)

####5.2 Angular observables(Reactive Programming in Angular)

- EventEmitter: under the hood this works via Observables
- HTTP: HTTP requests in Angular are all handled via Observables
- Forms: Reactive forms in Angular expose an observable, a stream of all the input fields in the form combined 

###6 **Pipes** - filters in Angular 1

###7 Form

- 7.1 Model driven Form
- 7.2 Reactive Model Form
- 7.3 Template Driven Form

**Wrapping up**

template driven | model driven
---|---
create form model via directives on template form HTML|link template from HTML with a form model created on component
easy to setup and use, saving develpment time | harder to setup, scalability
use ngModel directive(two way data binding)|
low logic, hard for end to end testing| strong logic on component

###8 Dependency Injection(DI) & Providers

![](http://i.imgur.com/XUfLhao.png)

- token: uniquely identifies
- Dependency:  the actual code want injected, 一个Dependence是某个对象被创建的类型。
- Provider  :  a map between a token and a list of dependancies
- Injector  :  a function which when passed a token returns a denpendency(or a list of dependancies)

- 8.1 injector
- 8.2 Provider
- 8.3 Tokens
- 8.4 Configuring Dependency Injection in Angular
- 8.5 NgModule.providers vs Component.providers vs Component.viewProviders

NgModule.providers|Component.providers|Component.viewProviders
---|---|---
providers on NgModel | providers on Components and Directives | viewProviders on Components

refer to [plunk-providers.zip](https://github.com/honggzb/Study2016/blob/master/AngularStudy/plunk-providers.zip)

###9 HTTP

Two ways to handle HTTP in Angular2

- Promise
- Observable

###10 Routing

###11 Unit Testing

**[Built-in matchers](http://jasmine.github.io/edge/introduction.html#section-Included_Matchers)**

```
expect(array).toContain(member);
expect(fn).toThrow(string);
expect(fn).toThrowError(string);
expect(instance).toBe(instance);
expect(mixed).toBeDefined();
expect(mixed).toBeFalsy();
expect(mixed).toBeNull();
expect(mixed).toBeTruthy();
expect(mixed).toBeUndefined();
expect(mixed).toEqual(mixed);
expect(mixed).toMatch(pattern);
expect(number).toBeCloseTo(number, decimalPlaces);
expect(number).toBeGreaterThan(number);
expect(number).toBeLessThan(number);
expect(number).toBeNaN();
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(number);
expect(spy).toHaveBeenCalledWith(...arguments);
```

setup|Function
---|---
beforeAll| This function is called once, before all the specs in describe test suite are run
afterAll|This function is called once after all the specs in a test suite are finished
beforeEach|This function is called before each test specification, it function, has been run
afterEach|This function is called after each test specification has been run

> Reference

- [Angular2 入门 ](http://www.hubwiz.com/course/5599d367a164dd0d75929c76/)
- [angular.io](https://angular.io/docs/ts/latest/quickstart.html#!#create-and-configure)
- [angularjs 2.0官方新手入门教程](http://alvinwei.blog.163.com/blog/static/214666110201682843045254/)
- [Dependence Injection(依赖注入)](https://segmentfault.com/a/1190000003781566)
- f
