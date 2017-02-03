<h2 id="top">10 Routing</h2>

- [10.1 Local web server configuration](#Local-web-server-configuration)
- [10.2 Route Configuration](#Route-Configuration)
- [10.3 Navigating](#Navigating)
	- [10.3.1 hardcoded URLS](#hardcoded-URLS)
	- [10.3.2 program by the router](#program-by-the-router)
	- [10.3.3 program by a routerLink directive](#program-by-a-routerLink-directive)
- [10.4 Parameterised Routes(by ID)](#Parameterised-Routes)
- [10.5 Nested Routes](#Nested-Routes)
- [10.6 Router Guards](#Router-Guards)
- [10.7 Routing Strategies](#Routing-Strategies)
- [10.8 Querying parameters/extracting query parameters](#Querying-parameters)
- [10.9 Styling Active Route Links](#Styling-Active-Route-Links)

<h3 id="Local-web-server-configuration">10.1 Local web server configuration</h3>

- **nodejs http-server**

```
npm install -g http-server
http-server
```

- **Python local web server**: `python -m SimpleHTTPServer`
- `ng serve`   - for Angular CLI

<span style="">[back](#top)</span>

<h3 id="Route-Configuration">10.2 Route Configuration</h3>

```javascript
//1) inport
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
<router-outlet></router-outlet>
```

<span style="">[back](#top)</span>

<h3 id="Navigating">10.3 Navigating</h3>

<h4 id="hardcoded-URLS">10.3.1 hardcoded URLS</h4>

```html
<a class="navbar-brand" href="/#/">iTunes Search App</a>
<a class="nav-link" href="/#/search">Search</a>
```

<span style="">[back](#top)</span>

<h4 id="program-by-the-router">10.3.2 program by the router</h4>

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

<span style="">[back](#top)</span>

<h4 id="program-by-a-routerLink-directive">10.3.3 program by a routerLink directive<h4>

```html
<li class="nav-item active">
	<a class="nav-link" [routerLink]="['home']" [routerLinkActive]="['active']">Home</a>
</li>
```

`[routerLinkActive]="['active']"` is like `class="active"`

<span style="">[back](#top)</span>

<h3 id="Parameterised-Routes">10.4 Parameterised Routes(by ID)</h3>

```javascript
import {ActivatedRoute} from "@angular/router";    //import Parameterised Route service
//...
{ path: 'blog/:id', component: BlogComponent },    // variable called id
{ path: 'blog/moo', component: MooComponent },
```

- Non-parameterised routes always take priority over parameterised routes, `blog/moo` will precede over `blog/:id`

<span style="">[back](#top)</span>

<h3 id="Nested-Routes">10.5 Nested Routes</h3>

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

<span style="">[back](#top)</span>

<h3 id="Router-Guards">10.6 Router Guards</h3>

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

<span style="">[back](#top)</span>

<h3 id="Routing-Strategies">10.7 Routing Strategies</h3>

Routing Strategy|enable strategy|syntax|cons|description
---|---|---|---|---
HashLocationStrategy | in `@NgModule` `RouterModule.forRoot(routes, {useHash: true})` |`/#/search`|running locally the URLs, good for SPA| it will only ever get asked for the root page and it will only ever return the root page
PathLocationStrategy| default strategy,no need to enable it| `/search`| use HTML5 history API pushstate to change the URL so browser doesn't request the page from server | server needs to be able to return the main application code for every URL, not just the root URL, need to co-operate with a server side

**[Angular Universal](https://universal.angular.io/)** - PathLocationStrategy enables Angular Universal, it can be cached on the server side(Server-side Rendering for Angular 2 apps)

<span style="">[back](#top)</span>

<h3 id="Querying-parameters">10.8 Querying parameters/extracting query parameters</h3>

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

<span style="">[back](#top)</span>

<h3 id="Styling-Active-Route-Links">10.9 Styling Active Route Links</h3>

```html
<!-- 1） 可以自定义active的css -->
<!-- 2） [routerLinkActiveOptions]="{exact: true}"仅在[routerLink]="['']"上，避免Home链接无法取消active状态 -->
<a class="nav-link" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact: true}" [routerLink]="['']">Home</a>
<a class="nav-link" [routerLinkActive]="['active']" [routerLink]="['/tracks']">Tracks</a>
```

<span style="">[back](#top)</span>
