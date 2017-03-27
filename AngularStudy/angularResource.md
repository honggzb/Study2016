- [csdn上AngularJS专题](http://lib.csdn.net/base/23)
- [实践总结 - 不可错过的Angular应用技巧](https://my.oschina.net/blogshi/blog/293631#comment-list)
- [my code segment](#top)
  - [1. autocomplete](#autocomplete)
  - [2. Ajax using](#Ajax-using)
  - [3. showing a loader icon](#loader-icon)

<h3 id="autocomplete">1. autocomplete</h3>

```javascript
// autocomplete
var keyups = Observable.fromEvent($("#search"),"keyup")
                       .map(e => e.target.value)
                       .filter(text => text,length>=3)
                       .debounceTime(400)
                       .distinctUntilChanged()         //erase duplicate word
                       .flatMap(searchItem => {        // switch to another stream
                          var url ="http://....";
                          var promise = $.getJSON(url);            //wrap to promise
                          return Observable.fromPromise(promise);  //wrap promise to Observable
                       });
var subscription = keyups.subscribe(data => console.log(data));
subscription.unsubscribe();
```

[back to top](#top)

<h3 id="Ajax-using">2. Ajax using</h3>

```javascript
//Ajax using
export class PostService{    //defining methods in a service
  private url ="...";
  constructor(private _http:Http){}
  getPost(){
    return this._http.get(this.url).map(res => res.json());
  }
}
//using service in component
import { HTTP_PROVIDERS } from 'angular2/http';
import {PostService } from './post.service';
@Component({
  //...
  providers: [PostService, HTTP_PROVIDERS]
})
export class AppComponent implement OnInit {
  constructor(private _postService: PostService){ }
  ngOnInit(){     // usually put in OnInit trigger
    this._postService.getPosts()
                     .subscribe(posts => console.log(posts));
  }
}
```

[back to top](#top)

<h3 id="loader-icon">3. showing a loader icon</h3>

```javascript
//showing a loader icon
@Component({
  //...
  template: `<div *ngIf="isLoading"><i class="fa fa-spinner fa-spin fa-3x"></i></div>`  <!-- using font awesome-->
})
export class AppComponent implement OnInit {
  isLoading = true;
  //...
  ngOnInit(){     // usually put in OnInit trigger
    this._postService.getPosts()
                     .subscribe(posts => {
                       this.isLoading = false;
                       console.log(posts);
                     });
  }
}
```

[back to top](#top)

<h3 id="loader-icon">4. showing a loader icon</h3>

```javascript
```

[back to top](#top)
