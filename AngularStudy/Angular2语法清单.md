###Angular2语法清单


Template syntax |说明
---|---
`<input [value]="firstName">`	|将value属性绑定到firstName表达式的计算结果
`<div [attr.role]="myAriaRole">`	|将属性 role 绑定到表达式 myAriaRole的值
`<div [class.extra-sparkle]="isDelightful">`	|将CSS类 extra-sparkle 是否有效绑定到表达式 isDelightful的结果
`<div [style.width.px]="mySize">`|将样式属性 width 绑定到表达式 mySize ，默认的是PX，也可以使用单位
`<button (click)="readRainbow($event)">`	|当该组件或者其子元素被点击时调用readRainbow方法，并且传递一个event对象
`<div title="Hello {{ponyName}}">`	|将属性绑定到某个内插值字符串，等价于<div [title]="'Hello' + ponyName">
`Hello {{ponyName}}`	|将文本内容绑定到某个内插值字符串，譬如. "Hello Seabiscuit".
`<my-cmp [(title)]="name">`	|建立一个双向绑定，等价于: <my-cmp [title]="name" (title-change)="name=$event">
`<video **#movieplayer** ...></video> <button (click)="movieplayer.play()">`	|创建一个本地变量 movie player 可以被后续用来操作该 video 元素实例在数据绑定与事件绑定中，注意，该变量的作用域限于当前模板。
`<p *my-unless="myExpression">...</p>`	|这个 `*` 符号意味着当前的元素会被转化到一个内置的模板中，譬如: `<template [myless]="myExpression"><p>...</p></template>`
`Card No.: {{cardNumber \`	|myCreditCardNumberFormatter}}
`Employer:{{employer?.companyName}}`	|有点类似于可选项(?) 意思是如果 employer 域没有被定义，即是undefined时, 余下的部分会直接被忽略

Built-in directives |`import {NgIf, ...} from 'angular2/angular2';`
---|---
`<section *ng-if="showSection">`|根据showSection表达式的结果，移除或者重新创建一个DOM树
`<li *ng-for="#item of list">`	|遍历列表，并且为每一项根据内在创建一个元素
 `<div [ng-switch]="conditionExpression"><template [ng-switch-when]="case1Exp">...</template><template ng-switch-when="case2LiteralString">...</template><template ng-switch-default>...</template></div>`	|根据条件选择展示合适的元素项目
`<div [ng-class]="{active: isActive, disabled: isDisabled}">`	|将CSS类绑定到关联的映射的值中。 右边的表达式应该返回 {class-name: true/false} 这种格式的map

Forms	| `import {FORM_DIRECTIVES} from 'angular2/angular2';`
---|---
`<input [(ng-model)]="userName">`	|提供了双向绑定，解析以及数据验证

Class decorators|	`import {Directive, ...} from 'angular2/angular2';`
---|---
`@Component({...})class MyComponent() {}`	|将某个类声明为组件，并且提供合适的元数据声明
`@Pipe({...})class MyPipe() {}`	|声明某个类为管道，并且提供一些关于该管道的元数据
`@Injectable()class MyService() {}`	|声明某个类的依赖，并且在构造函数中自动注入
  
Directive configuration|	`@Directive({ property1: value1, ... }) )`
---|---
`selector: '.cool-button:not(a)'`	|这是一个特定的CSS选择器，支持: element, [attribute], .class, 以及 :not()，不支持父子关系的选择器
`providers: [MyService, provide(...)]`	|一组依赖注入的提供者

Component configuration|	`@Component extends @Directive`, so the `@Directiveconfiguration` applies to components as well
---|---
`viewProviders:[MyService, provide(...)]`	|将一系列的依赖注入的对象的作用域合并到该类中
`template: 'Hello {{name}}'templateUrl: 'my-component.html'`	|内置或者外链的视图
`styles: ['.primary {color: red}']styleUrls: ['my-component.css']`	|一系列内置或者外连的CSS样式
`directives:[MyDirective, MyComponent]`	|一系列用于本模板中的指令
`pipes: [MyPipe, OtherPipe]`	|一系列用于本模板中的管道

Class field decorators for directives and components	|`import {Input, ...} from 'angular2/angular2';`
---|---
`@Input() myProperty;`	|声明一个输入属性，并且绑定到模板，譬如： <my-cmp [my-property]="someExpression">
`@Output() myEvent = new EventEmitter();	`|声明一个输出口属性，绑定到某个可以绑定的事件： <my-cmp (my-event)="doSomething()">
`@HostBinding('[class.valid]') isValid;`	|将某个元素属性绑定到某个指令或者组件的属性
`@HostListener('click', ['$event']) onClick(e) {...}`	|将某个事件绑定到组件
`@ContentChild(myPredicate) myChildComponent;`	|将第一个可以查到的组件内容对象绑定到当前属性
`@ContentChildren(myPredicate) myChildComponents;`	|将组件内容查询的结果绑定到当前元素
`@ViewChild(myPredicate) myChildComponent;`	|将第一个组件视图查询得到的子组件绑定到当前元素
`@ViewChildren(myPredicate) myChildComponents;`	|将当前根据视图查询到的子组件的列表绑定到当前元素

Directive and component change detection and lifecycle hooks	|(implemented as class methods)
---|---
constructor(myService: MyService, ...) { ... }	|类的构造器会在其他的生命周期函数前调用。主要是在该方法中完成依赖注入，注意要避免将复杂的工作放在这里。
onChanges(changeRecord) { ... }	|会在任何输入属性的变化前被调用，在内容处理与子视图处理之前
onInit() { ... }	|会在构造函数之后调用，在该方法中完成输入属性的处理，以及第一次对onChanges方法的调用
doCheck() { ... }	|在任何一个组件或者指令的输入属性被检查前调用，主要用于在进行自定义的检查前扩展变化的检查
afterContentInit() { ... }	|在onInit方法之后被调用，主要是当组件或者指令的内容被初始化完成后
afterContentChecked() { ... }	|在对于组件或者指令的内容检查之后被调用
afterViewInit() { ... }	|在 afterContentInit方法被调用之后调用，仅仅适用于组件
afterViewChecked() { ... }	|每次进行组件的视图检查之后被调用，仅仅适用于组件
onDestroy() { ... }	|仅仅会被调用一次，主要在实例被摧毁前调用

Dependency injection configuration	|`import {provide} from 'angular2/angular2';`
---|---
provide(MyService, {useClass: MyMockService})	|`provide\`
provide(MyService, {useFactory: myFactory})	|`provide\`
provide(MyValue, {useValue: 41})|	`provide\`

Routing and navigation	| `import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ...} from 'angular2/router';`
---|---
`@RouteConfig([  { path: '/:myParam', component: MyComponent, as: 'MyCmp' },  { path: '/staticPath', component: ..., as: ...},  { path: '/*wildCardParam', component: ..., as: ...}])class MyComponent() {}`	|设置完整的路由表
`<router-outlet></router-outlet>`	|将这个位置设置作为激活组件的注入位置
`<a [router-link]="[ '/MyCmp', {myParam: 'value' } ]">`	|构造一个链接用于跳转到其他的视图，主要依赖于上面路由配置中的路由名称以及可选参数。添加'/'前缀可以匹配根路由，添加'./'前缀可以用于匹配子路由
`@CanActivate(() => { ... })class MyComponent() {}`	|利用组件的修饰器定义了一个方程，路由器会在是否要激活该组件前进行调用。该方程应该返回true或者false或者一个promise结果
`onActivate(nextInstruction, prevInstruction) { ... }`	|在导航到一个组件之后，路由会首先调用组件的onActicate方法
`canReuse(nextInstruction, prevInstruction) { ... }`	|路由会根据组件的canReuse方法来决定是直接重用该组件还是先销毁再重新创建一个新的实例
`onReuse(nextInstruction, prevInstruction) { ... }`	|路由会在重用一个组件的实例的时候调用该onReuse方法
`canDeactivate(nextInstruction, prevInstruction) { ... }`	|路由通过调用canDeactivate方法来判断是否应该在一次导航之后移除该组件，该方法应该返回一个true或者false或者promise对象
`onDeactivate(nextInstruction, prevInstruction) { ... }` | 在路由状态发生变化并且该组件被销毁时调用


[前端之Angular2实战：Angular2语法清单](https://segmentfault.com/a/1190000004071388)
