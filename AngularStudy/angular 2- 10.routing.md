<h2 id="top">10 Routing</h2>

- [10.1 Local web server configuration服务器端](#Local-web-server-configuration)
- [10.2 Route Configuration -Angular 2/4](#Route-Configuration)
- [10.3 Navigating](#Navigating)
	- [10.3.1 hardcoded URLS](#hardcoded-URLS)
	- [10.3.2 program by the router - navigate between component](#program-by-the-router)
	- [10.3.3 program by a routerLink directive](#program-by-a-routerLink-directive)
- [10.4 Parameterised Routes(by ID)](#Parameterised-Routes)
- [10.5 Nested Routes(children routers)](#Nested-Routes)
- [10.55 Multiple module and multiple router](#Multiple-module)---ng2MultipleRouting+lazingLoad.rar
- [10.6 Lazy-loading](#Lazy-loading) ---ng2MultipleRouting+lazingLoad.rar
- [10.7 Router Guards](#Router-Guards)
- [10.8 Routing Strategies](#Routing-Strategies)
- [10.9 Querying parameters/extracting query parameters](#Querying-parameters)
- [10.10 Styling Active Route Links](#Styling-Active-Route-Links)

<h3 id="Local-web-server-configuration">10.1 Local web server configuration服务器端</h3>

- **nodejs http-server**

```
npm install -g http-server
http-server
```

- **Python local web server**: `python -m SimpleHTTPServer`
- `ng serve`   - for Angular CLI

[back](#top)

<h2 id="Route-Configuration">10.2 Route Configuration -Angular 2/4</h2>

- routes is navigation between views
- routes are triggered by UI interaction or browser address bar changes
- securites can be implemented via routes
- the router is an optional Service, is not part of @angular/core
- router consist of 
  - Services:  RouterModule are in @angular/router
  - Directive: RouterOutlet, RouterLink, RouterLinkActive
  - Configuration: Routes

```javascript
//1) import
import {Routes, RouterModule} from "@angular/router";
// 2)define routes
const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'find', redirectTo: 'search'},
  {path:'home', component: HomeComponent},
  {path:'search/foo/moo', component: SearchComponent},
  {path:'**', component: HomeComponent}    // all other routes
];
// 3) NgModule, use RouterModule.forRoot(routes, {useHash: true}) function
@NgModule({
  imports: [
    //...
    RouterModule.forRoot(routes, {useHash: true})
  ],
//4) in template use router-outlet directive to tell angular where component should be inserted
<a routerLink = "/movies">Movies</a>
<a routerLink = "/characters">Characters</a>
<router-outlet></router-outlet>
```

Angular2对待一个URL的处理流程为：

1. 应用重定向
2. 识别路由状态
3. 应用哨兵与传递数据
4. 激活对应组件

![](https://i.imgur.com/DzWhvJz.png)

```javascript
[
 { path: '', pathMatch: 'full', redirectTo: '/inbox' },
 {
  path: ':folder',
	  children: [
	   { path: '', component: ConversationsCmp },
	   { path: ':id', component: ConversationCmp,
	    children: [
		     { path: 'messages', component: MessagesCmp },
		     { path: 'messages/:id', component: MessageCmp }
		    ]
	   }
	  ]
 },
 { path: 'compose', component: ComposeCmp, outlet: 'popup' },
 { path: 'message/:id', component: PopupMessageCmp, outlet: 'popup' }
]
// 拿到父级参数id(33)
ngOnInit() {
  this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
    this.parentRouteId = +params["id"];
  });
}
```

![](https://i.imgur.com/gsQIRgU.png)

[back](#top)

<h2 id="Navigating">10.3 Navigating</h2>

<h3 id="hardcoded-URLS">10.3.1 hardcoded URLS</h3>

```html
<a class="navbar-brand" href="/#/">iTunes Search App</a>
<a class="nav-link" href="/#/search">Search</a>
```

[back to top](#top)

<h3 id="program-by-the-router">10.3.2 program by the router - navigate between component</h3>

```javascript
import {Router} from "@angular/router";   
//...
<a class="navbar-brand" (click)="goHome()">iTunes Search App</a>  <!-- added click handlers to anchor tag -->
//...
class HeaderComponent {
	constructor(private router: Router) {}     //inject and store a reference to the Router in components
	goHome() {
		this.router.navigate(['home']);    //define URLs
	}
	//...
}
```

[back to top](#top)

<h3 id="program-by-a-routerLink-directive">10.3.3 program by a routerLink directive<h3>

```html
<li class="nav-item">
	<a class="nav-link" [routerLink]="['home']" [routerLinkActive]="['active']">Home</a>
</li>
<li class="nav-item"> <!-- 当点击其他menu时候， home不始终高亮 -->
	<a class="nav-link" [routerLink]="['/']" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact: true}">Home </a>
</li>
```

`[routerLinkActive]="['active']"` is like `class="active"`

[back to top](#top)

<h3 id="Parameterised-Routes">10.4 Parameterised Routes(by ID)</h3>

```javascript
import { ActivatedRoute } from "@angular/router";    //import Parameterised Route service
//...
{ path: 'blog/:id', component: BlogComponent },     // variable called id
{ path: 'blog/moo', component: MooComponent },
//...
constructor(private route: ActivatedRoute) { }
let blogId = this.route.snapshot.params['id'];     //get current Route Params
```

- Non-parameterised routes always take priority over parameterised routes, `blog/moo` will precede over `blog/:id`

[back to top](#top)

<h3 id="Nested-Routes">10.5 Nested Routes(multiple routers)</h3>

```javascript
//Route Configuration-mutiple modules and mutiple routers
const aboutRoutes: Routes = [
  { path: 'about', 
    component: AboutSectionComponent,
    children: [
      { path: '', component: AboutComponent },
      { path: ':username', component: UserComponent }
    ]
  }
];
//...
<div class="card" [routerLink]="['/about', user.username]" [routerLinkActive]="['active']"> ... </div>
```

or

```javascript
//Route Configuration
{ path:'artist/:artistId',      //parent route
  component: ArtistComponent,
  children: [                  //children root
      {path:'', redirectTo:'tracks', pathMatch: 'full'},
      {path:'tracks', component: ArtistTrackListComponent},
      {path:'albums', component: ArtistAlbumListComponent}
  ]
},
//router link -1) relative to root URL
<a class="nav-link" [routerLinkActive]="['active']" [routerLink]="['/tracks']">Tracks</a>
//router link -2) relative to current URL
<a class="nav-link" [routerLinkActive]="['active']" [routerLink]="['./tracks']">Tracks</a>
```

[back to top](#top)

<h3 id="Multiple-module">10.55 Multiple module and multiple router</h3>

```javascript
//main module - app.module.ts/app.routing.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AboutModule,
    appRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//app.routing.ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
const appRoutes: Routes = [
  { path:'', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent }
];
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);   //use forRoot()
```

在Main component(AppComponent)中，很容易使用`ActivatedRoute`拿到当前路由获取参数：

```javascript
ngOnInit() {
        this.route.params.subscribe((params) => {
            this.createPies();
            this.onTopListFilterChange(params['id']);
       });
};
```

another module - about.module.ts/about.routing.ts

```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { UserComponent } from './user/user.component';
import { User } from './user.model';
import { UserService } from './user.service';
import { aboutRouting } from './about.routing';
@NgModule({
  imports: [
    CommonModule,
    aboutRouting
  ],
  declarations: [
    AboutComponent,
    UserComponent
  ],
  providers: [UserService],   //no bootstrap
})
export class AboutModule { }
//about.routing.ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { UserComponent } from './user/user.component';
import { User } from './user.model';
import { UserService } from './user.service';
const aboutRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'about/:username', component: UserComponent }
];
export const aboutRouting: ModuleWithProviders = RouterModule.forChild(aboutRoutes); //use forChild()
```

在children中指定的component要拿到路由参数，这时候再使用ActivatedRoute根本拿不到参数，需要找到父级路由，由父级路由去拿参数。这时需要借用Router类的routeState属性的parent方法(http://www.cnblogs.com/dojo-lzz/p/5883408.html)

```javascript
this.router.routeState.parent(this.activatedRoute).params.subscribe(params => {
   this.getDetailsById(params['id']);
})
```

[back to top](#top)

<h3 id="Lazy-loading">10.6 Lazy-loading</h3>

In your route configuration, use loadChildren with a relative path to your lazy loaded angular module. The string is delimited with a # where the right side of split is the angular module class name(https://www.npmjs.com/package/angular-router-loader).

```javascript
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'lazy', loadChildren: './lazy.module#LazyModule' }    //use loadChildren
  //{ path: 'lazy', loadChildren: './lazy.module#LazyModule?sync=true' }   //Synchronous Loading
];
```

[Lazy-loading content with angular-cli](https://keathmilligan.net/lazy-loading-content-with-angular-cli/)

```javascript
//1)remove all component in lazy module in app.module.ts
//2)modify app.routing.ts and add
const appRoutes: Routes = [
  { path:'', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', loadChildren: './about/about.module#AboutModule'},  //lazing load about module
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent }
];
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);    //use forRoot
//3)about.module.ts -- lazy module
//4)about.routing.ts  -- lazy module routing 
const aboutRoutes: Routes = [
  { path: '',     //note: this path must be '', otherwise can not load whole lazy module
    component: AboutSectionComponent,
    children: [
      { path: '', component: AboutComponent },
      { path: ':username', component: UserComponent }
    ]
  }
];
export const aboutRouting: ModuleWithProviders = RouterModule.forChild(aboutRoutes);  //use forChild
```

[back to top](#top)

<h3 id="Router-Guards">10.7 Router Guards</h3>

1. Not Authenticated
2. Not Authorized
3. Unsaved Changes

- Guards restrict access to certain pages
- can inject dependancies into a guards constructor
- guard function return a boolean or a promise that resolves to a boolean later on
- route can be configred with multiple guards that are checked in order

**guard types**

guard type|description
---|---
CanActivate|Checks to see if a user can visit a route.
CanActivateChild|Checks to see if a user can visit a routes children
CanDeactive|Checks to see if a user can exit a route.
Resolve|Performs route data retrieval before route activation
CanLoad|Checks to see if a user can route to a module that lazy loaded

**guard function can be passed certain arguments:**

- component: 
- route: ActivatedRouteSnapshot - this is the future route that will be activated if the guard passes, can use it’s params property to extract the route params
- state: RouterStateSnapshot - this is the future RouterState if the guard passes, can find the
URL we are trying to navigate to from the url property

```javascript
// these guard class should head up the route
class UnsearchedTermGuard implements CanDeactivate<SearchComponent> {
  canDeactivate(component: SearchComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
    console.log("UnsearchedTermGuard");
    console.log(route.params);
    console.log(state.url);
    return component.canDeactivate() || window.confirm("Are you sure?");
  }
}
//route
{path:'search', component: SearchComponent, canDeactivate: [UnsearchedTermGuard]},
{
    path:'artist/:artistId', 
    component: ArtistComponent,
    canActivate: [AlwaysAuthGuard, OnlyLoggedInUsersGuard],    //guard services
    canActivateChild: [AlwaysAuthChildrenGuard]
},
```

**Custom Route Guard**

```javascript
//custom canActive guard
import {CanActivate, RouteStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from 'rxjs/Rs';
export class UserDetailGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return confirm("Are you sure?");
  }
}
//...
{  path:'artist/:artistId', component: ArtistComponent,
   canActivate: [UserDetailGuard],    //custom guard services
}
// custom canDeactive guard
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Rs';
export interface ComponentCanDeactivate {
	CanDeactivate: () => boolean | Observable<boolean>;
}
export class UserEditGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate():true;
  }
}
//...
<button (click)="done==true">Done</button>
//...
export class UserEditComponent implements ComponentCanDeactivate{
  //...
  canDeactive(): Observable<boolean> | boolean {
    if(!this.done){
    	return confirm('Do you want to leave?');
    }
    return true;
  }
}
//...
{  path:'edit', component: UserEditComponent, canDeactivate: [UserEditGuard]  }    //custom guard services
```

[back to top](#top)

<h3 id="Routing-Strategies">10.8 Routing Strategies</h3>

Routing Strategy|enable strategy|syntax|cons|description
---|---|---|---|---
HashLocationStrategy | in `@NgModule` `RouterModule.forRoot(routes, {useHash: true})` |`/#/search`|running locally the URLs, good for SPA| it will only ever get asked for the root page and it will only ever return the root page
PathLocationStrategy| default strategy,no need to enable it| `/search`| use HTML5 history API pushstate to change the URL so browser doesn't request the page from server | server needs to be able to return the main application code for every URL, not just the root URL, need to co-operate with a server side

**[Angular Universal](https://universal.angular.io/)** - PathLocationStrategy enables Angular Universal, it can be cached on the server side(Server-side Rendering for Angular 2 apps)

[back to top](#top)

<h3 id="Querying-parameters">10.9 Querying parameters/extracting query parameters</h3>

```javascript
<button (click)="onNavigate()">Go Home</button>
{{id}} {{param}}
//1) Imperative Routing(triggered in code)
onNavigate(){
  this.router.navigate(['/']);
}
//2) extracting route params
////2.1) static just trigger when init
constructor(private router: Router, private activedRoute: ActivedRoute){
  this.id = activedRoute.snapshot.params['id'];   
}
////2.2) dynamic 
constructor(private router: Router, private activedRoute: ActivedRoute){
  private subscription: Subscription;   
  this.subscription = activedRoute.subscribe(
    (param: any) => this.id = params['id'];
  );    
}
ngOnDestroy(){
  this.subscription.unsubscribe();  //release memory
}
//3) query params: such as ''/?analytics=100' in url
<a [routerLink]="['']" [queryParams]="{analytics:100}">Home</a>
//...
onNavigate(){
  this.router.navigate(['/'],{queryParams:{'analytics':100}});
}
//extracting queryParams, do same as dynamic
param: string;
constructor(private router: Router){
  this.subscription = router.routerState.queryParams.subscribe(
    (queryParams: any) => this.param = queryParam['analytics']
  );
}
```

[back to top](#top)

<h2 id="Styling-Active-Route-Links">10.10 Styling Active Route Links</h2>

```html
<!-- 1） 可以自定义active的css -->
<!-- 2） [routerLinkActiveOptions]="{exact: true}"仅在[routerLink]="['']"上，避免Home链接无法取消active状态 -->
<a class="nav-link" [routerLinkActive]="['active']" 
		    [routerLinkActiveOptions]="{exact: true}" 
		    [routerLink]="['']">Home</a>
<a class="nav-link" [routerLinkActive]="['active']" 
		    [routerLink]="['/tracks']">Tracks</a>
```

[back to top](#top)

> [Angular2学习笔记——路由器模型（Router）](http://www.cnblogs.com/dojo-lzz/p/5907171.html)
