[Angular 4 - first project](#top)

- [1. setup environment](#setup-environment)
- [2. Angular Architecture](#Angular-Architecture)
- [3. Routing](#Routing)
- [4. Service](#Service)
- [5. Directive && Pipe](#Directive)
- [6. Refactoring](#Refactoring)

- Components
- Routing
- Service
- Modules
- Styles  - Angular Material2
- Directive & Pipes

<h2 id="setup-environment">1. setup environment</h2>

my cloud9: [your development environment in the cloud](https://c9.io/)

- email: gzbhong@gmail.com
- Name: Joanna Q
- UserName: honggzb

```shell
honggzb:~/workspace $nvm install 6.9.1   #node v6.9.1
honggzb:~/workspace $npm install -g angular-cli
honggzb:~/workspace $ng new ng-angular4-app    #not work ?????, but local env work
```

edit package.json

```json
"scripts": {
  "ng": "ng",
  "start": "ng serve --port 8080 --live-reload",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng tslint \"src/**/*.ts\"",
  "e2e": "ng e2e"
},
```

[back to top](#top)

<h2 id="Angular-Architecture">2. Angular Architecture</h2>

- DOM transformation
  - Directives
    - tell DOM how to transform
    - are Classes with `@Directive` decorator
    - are inserted into HTML with tags
    - can apply logic: condition/iteration
  - Components - Directives with a template
    - extended from Directive class
    - have HTML-bindable properties
    - binding use {{ }} syntax
    - "selector" metadata provides tags for HTML placement
- Data Binding 
  - One-Way(Interpolation): read-only when rendered/refreshed programmatically
  - Two-Way binding: refreshed programmatically, or via User-triggered events
- metadata
  - the properties of a class decorator
  - Decorator:  functions that modify javaScript Classes
  - properties includes: selector, templateURL, styleURL, moduleId, providers
- Service
  - Singleton Objects
  - Available throu DI
  - scoped across entire application
  - lazily instantiated

<h2 id="Routing">3. Routing</h2>

- routes is navigation between views
- routes are triggered by UI interaction or browser address bar changes
- securites can be implemented via routes
- the router is an optional Service, is not part of @angular/core
- router consist of 
  - Services:  RouterModule are in @angular/router
  - Directive: RouterOutlet, RouterLink, RouterLinkActive
  - Configuration: Routes

```javaScript
//in app.module.ts
import { RouterModule } from '@angular/router';
@NgModule({
  //...
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'movies', component: MoviesListComponent },
      { path: 'characters', component: CharactersListComponent }
    ])
  ],
//...
})
//in app.component.html
<a routerLink = "/movies">Movies</a>
<a routerLink = "/characters">Characters</a>
<router-outlet></router-outlet>
```

<h2 id="Service">4. Service</h2>

- Provided via DI
- is a Singleton

[back to top](#top)

<h2 id="Directive">5. Directive && Pipe</h2>

<h3>5.1 Directive - Enable true SPA</h3>

- Directives are components， 组件继承于指令，并扩展了与 UI 视图相关的属性，如 template、styles、animations、encapsulation 等，详细内容请参考 -[ Angular 2 Directive Lifecycle](https://segmentfault.com/a/1190000008716308)
- Add behaviour to DOM elements
- Three kinds of Directive
  - Component Directive:     Directive with Template: components
  - Structural Directive:    Add, Delete, Replace DOM elements
  - Attribute Directive:     Change appearance of DOM elements

![](https://i.imgur.com/asluHCi.png)

| 内置指令     | 说明     |
| :------------- | :------------- |
| 内置属性指令| ngStyle指令: 用于设定给定DOM元素的style 属性<br>ngClass指令: 用于动态的设定 DOM元素的CSS class|
| 内置结构指令|ngIf指令<br>ngFor指令<br>ngSwitch指令<br>|

```html
<!--ngStyle指令:  绑定常量 -->
<div [ngStyle]="{'background-color': 'green'}"></div>
<!--ngStyle指令:  绑定表达式 -->
<div [ngStyle]="{'background-color': person.country === 'UK' ? 'green' : 'red'}">
<!--ngStyle指令:  还可使用 [style.<property>] 的语法 -->
<ul *ngFor="let person of people">
       <li [style.color]="getColor(person.country)">
          {{ person.name }} ({{person.country}})
       </li>
</ul>
<!--ngClass指令:  绑定常量 -->
<div [ngClass]="{'text-success': true }"></div>
<!--ngClass指令:  绑定表达式 -->
<div [ngClass]="{'text-success': person.country === 'CN'}"></div>
```

**自定义属性指令**

```javaScript
//指令定义： 该指令用于在用户点击宿主元素时，根据输入的背景颜色，更新宿主元素的背景颜色。宿主元素的默认颜色是黄色
import {Directive, Input, ElementRef, Renderer, HostListener} from "@angular/core";
@Directive({ selector: '[exeBackground]' })     //@Directive 修饰器
export class ExeBackgroundDirective {
  private _defaultColor = 'yellow';
  @Input('exeBackground')
  backgroundColor: string;                     // 输入属性，用于设置元素的背景颜色
  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.setStyle(this._defaultColor);
  }
  @HostListener('click')
  onClick() {                                 // 监听宿主元素的点击事件，设置元素背景色
    this.setStyle(this.backgroundColor || this._defaultColor);
  }
  private setStyle(color: string) { // 调用renderer对象提供的API设置元素的背景颜色
    this.renderer.setElementStyle(this.elementRef.nativeElement, 
      'backgroundColor', color);
  }
}
//使用
import { Component } from '@angular/core';
@Component({
  selector: 'my-app', 
  template: `<h1 [exeBackground]="'red'">Hello {{name}}</h1>`,
})
export class AppComponent  {
  name = 'Angular'; 
}
```

**自定义结构指令**

```javaScript
//指令定义： 该指令实现 ngIf 指令相反的效果，当指令的输入条件为 Falsy 值时，显示DOM元素
import {Directive, Input, ElementRef, Renderer, HostListener} from "@angular/core";
@Directive({ selector: '[exeUnless]' })
export class UnlessDirective {
  @Input('exeUnless')
  set condition(newCondition: boolean) {
    if (!newCondition) { // 创建模板对应的内嵌视图
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  constructor(private templateRef: TemplateRef<any>,
     private viewContainer: ViewContainerRef) {
  }
}
//使用
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<h1 [exeBackground]="'red'" *exeUnless="condition">Hello {{name}}</h1>`, 
})
export class AppComponent  {
  name = 'Angular'; 
  condition: boolean = false;
}
```

**自定义属性指令中的 ElementRef 与 Renderer 的作用** - [Angular 2 ElementRef](https://segmentfault.com/a/1190000008653690)

为了能够支持跨平台，Angular 2 通过抽象层封装了不同平台的差异，统一了 API 接口。如定义了抽象类 Renderer 、抽象类 RootRenderer 等。此外还定义了以下引用类型：ElementRef、TemplateRef、ViewRef 、ComponentRef 和 ViewContainerRef 等

**TemplateRef与ViewContainerRef的作用**  - [Angular 2 TemplateRef & ViewContainerRef](https://segmentfault.com/a/1190000008672478)

- **TemplateRef**：用于表示内嵌的 template 模板元素，通过 TemplateRef 实例，我们可以方便创建内嵌视图(Embedded Views)，且可以轻松地访问到通过 ElementRef 封装后的 nativeElement。需要注意的是组件视图中的 template 模板元素，经过渲染后会被替换成 comment 元素。
- **ViewContainerRef**：用于表示一个视图容器，可添加一个或多个视图。通ViewContainerRef 实例，我们可以基于 TemplateRef 实例创建内嵌视图，并能指定内嵌视图的插入位置，也可以方便对视图容器中已有的视图进行管理。简而言之，ViewContainerRef 的主要作用是创建和管理内嵌视图或组件视图。

<h3>5.2 Pipe- Encapsulate transformation</h3>

Pipe(管道)与Angular 1.x中的filter(过滤器)的作用的是一样的。都是用来对输入的数据进行处理，如大小写转换、数值和日期格式化等

 |  Angular 2内建管道| 作用  |
 | :------------- | :------------- |
 |String -> String|UpperCasePipe<br>LowerCasePipe<br>TitleCasePipe |
 |Number -> String|DecimalPipe<br>PercentPipe<br>CurrencyPipe |
 |Object -> String|JsonPipe<br>DatePipe<br>Tools<br>SlicePipe<br>AsyncPipe<br>I18nPluralPipe<br>I18nSelectPipe |

**管道参数**- 管道可以接收任意数量的参数，使用方式是在管道名称后面添加:和参数值。如`number: '1.4-4'`，若需要传递多个参数则参数之间用冒号隔开

```html
<div>
  <p ngNonBindable>{{ 'semlinker' | slice:0:3 }}</p>
  <p>{{ 'semlinker' | slice:0:3 }}</p> <!-- Output: sem -->
</div>
```

**管道链**- 将多个管道连接在一起，组成管道链对数据进行处理

`<p>{{ 'semlinker' | slice:0:3 | uppercase }}</p> <!-- Output: SEM -->`

**自定义管道**

```javaScript
//1) 定义
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'welcome' })                             //1.1 使用 @Pipe 装饰器
export class WelcomePipe implements PipeTransform {    //1.2  实现 PipeTransform 接口
  transform(value: string): string {                   //1.3 定义的 transform 方法
    if(!value) return value;
    if(typeof value !== 'string') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    return "Welcome to " + value;
  }
} 
//最后在Module的declarations数组中包含这个管道
//2) 使用
 <p>{{ 'semlinker' | welcome }}</p> <!-- Output: Welcome to semlinker -->
<!--当 WelcomePipe 的输入参数，即 value 值为非字符串时，如使用 123，则控制台将会抛出异常-->
```

**管道分类**

- pure管道：仅当管道输入值变化的时候，才执行转换操作，默认的类型是pure类型。(备注：输入值变化是指原始数据类型如：string、number、boolean 等的数值或对象的引用值发生变化)
- impure管道：在每次变化检测期间都会执行，如鼠标点击或移动都会执行 impure 管道

[back to top](#top)

<h2 id="Refactoring">6. Refactoring</h2>

- Domain Module:  such as movie module
- Routed Module:  lazily loaded, not exports, never imported
- Routing Module:  all routing Configuration
- Service Module:  contains services only, no Declarables 
- Widget Module:   collection of UI stuff, shared by most Modules

```
├── modules/
│   ├──  move/
│   │     ├── components/
│   │     │   ├── movie/
│   │     │   └── movies-list/
│   │     ├── classes/
│   │     │   ├── movie.ts
│   │     │   └── data-movies.ts
│   │     ├──  services/
│   │     │   └── movie.service.ts
│   │     ├── movie.module.ts
│   │     └── movie-routing-module.ts
│   ...
├── app.module.ts 
├── app-routing-module.ts
```

```javaScript
/* 主模块 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MovieModule } from './modules/movie/movie.module';   //输入子模块：Movie module  
import { AppRoutingModule } from './app-routing-module';      //主模块的route
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CharacterService } from './services/character.service';
@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    CharacterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MovieModule,       //import Movie module  
    AppRoutingModule
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { PageNotFoundComponent } from './page-not-found.component';
const appRoutes: Routes = [
  {path: 'characters',   component: CharactersListComponent },
  {path: '', redirectTo: '/characters', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)     //主router使用 forRoot
  ],
  exports: [ RouterModule ]             //输出为route
})
export class AppRoutingModule {}
/*子模块 */
//movie.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { PageNotFoundComponent } from '../../page-not-found.component';
import { MovieService } from './services/movie.service';
import { MovieRoutingModule } from './movie-routing-module';    //子模块的route
@NgModule({
  imports: [CommonModule, MovieRoutingModule],
  declarations: [
    MoviesListComponent,
    MovieComponent
  ],
  providers: [MovieService]
})
export class MovieModule { }
//movie-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
const movieRoutes: Routes = [
  {path: 'movies', component: MoviesListComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(movieRoutes)    //主router使用 forChild
  ],
  exports: [ RouterModule ]               //输出为route
})
export class MovieRoutingModule {}
```

<h2 id="Styling">6. Styling - angular material</h2>

```shell
npm install @angular/material hammerjs --save
npm i --save-dev @types/hammerjs
#tsconfig.json
"compilerOptions": {
  # ...
  "types": [ "hammerjs" ]
}
#index.html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
#app.module.ts
import { MaterialModule } from '@angular/material';
import 'hammerjs';
```

> Reference
- [Angular 2 Directive](https://segmentfault.com/a/1190000008626070)
- [Angular 2 Pipe](https://segmentfault.com/a/1190000008646187)
