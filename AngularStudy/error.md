1. no base href set
2. sfa

###1. no base href set -Angular 2 router no base href set

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
