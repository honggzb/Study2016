[Angular for TypeScript 语法快速指南 (基于2.0.0版本)](http://blog.csdn.net/shenlei19911210/article/details/53171370)

| NgModules | `import { NgModule } from '@angular/core';` |
| :------------- | :------------- |
|`declarations: [MyRedComponent, MyBlueComponent, MyDatePipe]`|数组，包括从属于当前模块的组件、指令和管道|
|`imports: [BrowserModule, SomeOtherModule]`|数组，包括被导入到当前模块中的所有模块。来自被导入模块的declarations也同样对当前模块有效|
|`exports: [MyRedComponent, MyDatePipe]`|数组，包括对导入当前模块的模块可见的组件、指令、管道|
|`providers: [MyService, { provide: ... }]`|数组，包括在对前模块及导入当前模块的模块中的内容物（组件、指令、管道、提供商等）可见的依赖注入提供商|
|`bootstrap: [MyAppComponent]`|数组，包括由当前模块引导时应该引导的组件|

---

| 模板语法| 说明 |
| :------------- | :------------- |
|`<input [value]="firstName">`|把属性value绑定到表达式firstName|
|`<div [class.extra-sparkle]="isDelightful">`|元素是否出现CSS类extra-sparkle，绑定到一个表达式isDelightful的结果是否为真|
|`<div [style.width.px]="mySize">`|把样式的width属性绑定到表达式mySize，以px为单位(可选的)|
|`<button (click)="readRainbow($event)">`|当按钮(及其子元素)上的click事件被触发时，调用readRainbow方法，并把事件对象作为参数传入|
|`<div title="Hello {{ponyName}}">`|把属性绑定到一个插值表达式字符串|
|`<my-cmp [(title)]="name">`|双向数据绑定。等价于：`<my-cmp [title]="name" (titleChange)="name=$event">`|
|`<video #movieplayer ...> <button (click)="movieplayer.play()"> </video>`|建一个局部变量 movieplayer ，它提供到video元素实例的访问，可用于当前模板中的数据绑定和事件绑定表达式中|
|`<p *myUnless="myExpression">...</p>`|`*`符号表示当前元素将被转变成一个内嵌模板。等价于： `<template [myUnless]="myExpression"><p>...</p></template>`|
|`<p>Card No.: {{cardNumber \myCardNumberFormatter}}</p>`|通过名叫myCardNumberFormatter的管道，转换表达式的当前值cardNumber|
|`<p>Employer: {{employer?.companyName}}</p>`|安全导航运算符(?.)表示employer字段是可选的，如果它是undefined，表达式剩下的部分将被忽略|
|`<svg:rect x="0" y="0" width="100" height="100"/>`|SVG模板需要在它们的根节点上带一个svg:前缀，以消除模板中HTML元素和SVG元素的歧义|
|`<svg><rect x="0" y="0" width="100" height="100"/></svg>`|`<svg>`元素在无需前缀的情况下，也能被自动检测为SVG|

---

|表单| 说明 |
| :------------- | :------------- |
| `<input [(ngModel)]="userName">` | 提供双向绑定，为表单控件提供解析和验证|

---

|指令配置| `@Directive({ property1: value1, ... })` |
| :------------- | :------------- |
| `selector: '.cool-button:not(a)'` | 指定一个CSS选择器，以便在模板中找出该指令。支持的选择器包括`element`, `[attribute]`, `.class`, 和 `:not()`。不支持父子关系选择器|
|`providers: [MyService, { provide: ... }]`|为当前指令及其子指令提供依赖注入的providers数组|

---

|供指令类或组件类用的字段装饰器 |`@Component`扩展了`@Directive`, 以便`@Directive`中的配置项也能用在组件上`|
| :------------- | :------------- |
|`@Input() myProperty;`|声明一个输入属性，以便我们可以通过属性绑定更新它。(比如：`<my-cmp [my-property]="someExpression">)`|
|`@Output() myEvent = new EventEmitter();`|声明一个输出属性，以便我们可以通过事件绑定进行订阅。(比如：`<my-cmp (my-event)="doSomething()">)`|
|`@HostBinding('[class.valid]') isValid;`|把宿主元素的属性(比如CSS类：`valid`)绑定到指令/组件的属性(比如：`isValid`)|
|`@HostListener('click', ['$event']) onClick(e) {...}`|通过指令/组件的方法(例如onClick)订阅宿主元素的事件(例如click)，可选传入一个参数($event)|
|`@ContentChild(myPredicate) myChildComponent;`|把组件内容查询(myPredicate)的第一个结果绑定到类的myChildComponent属性|
|`@ContentChildren(myPredicate) myChildComponents;`|把组件内容查询(myPredicate)的全部结果，绑定到类的myChildComponents属性|
|`@ViewChild(myPredicate) myChildComponent;`|把组件视图查询(myPredicate)的第一个结果绑定到类的myChildComponent属性。对指令无效|
|`@ViewChildren(myPredicate) myChildComponents;`|把组件视图查询(myPredicate)的全部结果绑定到类的myChildComponents属性。对指令无效|

---

|指令和组件的变更检测与生命周期钩子| 作为类方法实现|
| :------------- | :------------- |
|`constructor(myService: MyService, ...) { ... }`|类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作|
|`ngOnChanges(changeRecord) { ... }`|在输入属性每次变化了之后、开始处理内容或子视图之前被调用|
|`ngOnInit() { ... }`|在执行构造函数、初始化输入属性、第一次调用完ngOnChanges之后调用|
|`ngDoCheck() { ... }`|每当检查组件或指令的输入属性是否变化时调用。通过它，可以用自定义的检查方式来扩展变更检测逻辑|
|`ngAfterContentInit() { ... }`|当组件或指令的内容已经初始化、ngOnInit完成之后调用|
|`ngAfterContentChecked() { ... }`|在每次检查完组件或指令的内容之后调用|
|`ngAfterViewInit() { ... }`|当组件的视图已经初始化完毕，每次ngAfterContentInit之后被调用。只适用于组件|
|`ngAfterViewChecked() { ... }`|每次检查完组件的视图之后调用。只适用于组件|
|`ngOnDestroy() { ... }`|在所属实例被销毁前，只调用一次|

---

|依赖注入配置| |
| :------------- | :------------- |
|`{ provide: MyService, useClass: MyMockService }`|把MyService类的提供商设置或改写为MyMockService|
|`{ provide: MyService, useFactory: myFactory }`|把MyService的提供商设置或改写为myFactory工厂函数|
|`{ provide: MyValue, useValue: 41 }`|把MyValue的提供商设置或改写为值41|

> http://https//angular.io/docs/ts/latest/guide/cheatsheet.html

