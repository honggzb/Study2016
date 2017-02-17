###1. Install AngularFire 2 and Firebase

`npm install angularfire2 firebase --save`

###2. Setup @NgModule

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
// Must export the config
export const firebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};
@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
    //AngularFireModule.initializeApp(firebaseConfig, authConfig, 'my-app-name')     //Custom FirebaseApp Names
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

###3. Inject AngularFire

```javascript
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(af: AngularFire) {
  //...
  }
  //...
  this.items = af.database.list('/items');
}
```

###4. Troubleshooting

1. Cannot find namespace 'firebase'.

If you run into this error while trying to invoke ng serve, open src/tsconfig.json and add the "types" array as follows:

```javascript
{
  "compilerOptions": {
    ...
    "typeRoots": [
      "../node_modules/@types"
    ],

    // ADD THIS
    "types": [
      "firebase"
    ]
  }
}
```

2. Cannot find name 'require' (This is just a temporary workaround for the Angular CLI).

If you run into this error while trying to invoke ng serve, open src/typings.d.ts and add the following two entries as follows:

```javascript
declare var require: any;
declare var module: any;
```

> Reference

https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md#custom-firebaseapp-names
