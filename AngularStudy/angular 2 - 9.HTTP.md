###9 HTTP

Two ways to handle HTTP in Angular2

- Promise
- Observable

####9.1 Core HTTP

方法|语法|含义|数据库操作|说明
---|---|---|---|---
GET|http.get|查，查看|select|会向数据库发索取数据的请求，一般用于获取/查询资源信息
POST|http.post|改，创建|insert|向服务器端发送数据的，但是该请求会改变数据的种类等资源，就像数据库的insert操作一样，会创建新的内容。几乎目前所有的提交操作都是用POST请求的
PUT|http.put|更新|增，update|向服务器端发送数据的，从而改变信息，该请求就像数据库的update操作一样，用来修改数据的内容，但是不会增加数据的种类等，也就是说无论进行多少次PUT操作，其结果并没有不同
DELETE|http.delete|删，删除|delete|删除某一个资源

> 幂等: 对同一URL的多个请求应该返回同样的结果

```javascript
import 'rxjs/Rx';
// 1) inject to class
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';
class MyClass{
	constructor(private http: Http) { }
}
@NgModule({
	imports: [ HttpModule ]
	// ...
})
// 2) Configuring into root NgModule: global
import { HttpModule } from '@angular/http';
// ...
@NgModule({
	imports: [ HttpModule ]
	// ...
	providers: [ Http ]
})
```

- 9.2 HTTP via Promises

```javascript
import 'rxjs/add/operator/toPromise';
// ...
search(term:string) {
	let promise = new Promise((resolve, reject) => {
	let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
	this.http.get(apiURL)
		.toPromise()
		.then(
			res => { // Success
				console.log(res.json());
				resolve();
			}, msg => { // Error
				reject(msg);
		});
	});
	return promise;
}
```

- 9.3 HTTP via observables

```javascript
```javascript
import 'rxjs/add/operator/map';
// ...
search(term:string): Observable<SearchItem[]> {
	let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
	return this.http.get(apiURL)
		.map(res => {
			console.log(res.json());
		});
	});
	return promise;
}
```
```

####9.4 JSONP via Observables

How JSONP works:

1. treat the API as a javascript file
2. The API wraps the JSON response in a function who’s name we define
3. When the browser downloads the fake API script it runs it, it calls the function passing it the
JSON data

We can only use JSONP when:

1. The API itself supports JSONP. It needs to return the JSON response wrapped in a function and it
usually lets us pass in the function name we want it to use as one of the query params.
2. We can only use it for GET requests, it doesn’t work for PUT/POST/DELETE and so on.
Refactor to
