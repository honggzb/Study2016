[【编程过程中遇到的问题】](#top)

1. [no base href set](#no-base-href-set)
2. [Can't bind to 'formGroup' since it isn't a known property of 'form'](#Cannot-bind-to-formGroup)


<h3 id="no-base-href-set">1. no base href set -Angular 2 router no base href set</h3>

[angular io-routing](https://angular.io/docs/ts/latest/guide/router.html)

 ```html
<!-- Setting the base href  -->
 <head>
  <base href="/">
  <!-- 或 --> 
  <script>document.write('<base href="' + document.location + '" />');</script>
</head>
 ```
 
  ```javascript
// alternative add  -http://stackoverflow.com/questions/34535163/angular-2-router-no-base-href-set
import {APP_BASE_HREF} from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  imports: [routing /* or RouterModule */], 
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
]); 
 ```
 
 [back to top](#top)
 
<h3 id="Cannot-bind-to-formGroup">2. Can't bind to 'formGroup' since it isn't a known property of 'form'</h3>

```javascript
//http://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form
//RC6/RC7/Final release FIX
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//...
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    //...
})
```

 [back to top](#top)
 
 
