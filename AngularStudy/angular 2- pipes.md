##6. **Pipes** - filters in Angular 1

Pipes are a way of having a different visual representation for the same piece of data

###6.1 Built-In pipes

- currencyPipe `{{ 1234.56|currency:"GBP":true }}`
- DatePipe 6
	-  `{{ dateVal|date: 'shortTime' }}`  4:38PM
	-  `{{ dateVal|date: 'fullDate' }}`   Tuesday, October 4, 2016
	-  `{{ dateVal|date: 'd/M/y' }}`      4/10/2016
- DecimalPipe  
	- format:   "minIntegerDigits.minFractionDigits-maxFractionDigits
	- `{{ 3.14159265 | number: '3.1-2' }}`  003.14
	- `{{ 3.14159265 | number: '1.4-4' }}`  3.1416
- JsonPipe   `{{ jsonVal | json }}`   `{ moo: 'foo', goo: { too: 'new' }}`
- LowerCasePipe    `{{ 'ASIM' | lowercase }}`
- UpperCasePipe    `{{ 'ASIM' | uppercase }}`
- PercentPipe    `{{ 'ASIM' | percent : '2.1-2'}}`
- SlicePipe
	- `{{ [1,2,3,4,5,6] | slice : 1:3 }}`    from 1st to 3rd(indexes start at 0)    : 2,3
	- `{{ [1,2,3,4,5,6] | slice : 2 }}`      from 2nd index to end                  : 3,4,5,6
	- `{{ [1,2,3,4,5,6] | slice : 2: -1 }}`  from 2nd index to one from end of array: 3,4,5

###6.2 Async pipes with Promises and Observables

- Async pipe makes rendering data from Observables and promises easier
- for Promises automatically calls then
- for observables automatically calls subscribe and unsubscribe

```javascript
// did not use async pipe
@Component({
selector: 'async-pipe',
template: `
	<div class="card card-block">
		<h4 class="card-title">AsyncPipe</h4>
		<p class="card-text" ngNonBindable>{{ promiseData }}</p>
		<p class="card-text">{{ promiseData }}</p>
	</div>
`
})
class AsyncPipeComponent {
	promiseData: string;
	constructor() {
		this.getPromise().then(v => this.promiseData = v);
	}
	getPromise() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve("Promise complete!"), 3000);
		});
	}
}
// use Async pipe
@Component({
selector: 'async-pipe',
template: `
	<div class="card card-block">
		<h4 class="card-title">AsyncPipe</h4>
		<p class="card-text" ngNonBindable>{{ promise }}</p>
		<p class="card-text">{{ promise | async }}</p>     <!-- (1) -->
	</div>
`
})
class AsyncPipeComponent {
	promise: Promise<string>;      // (2)
	constructor() {
		this.promise = this.getPromise();   // (3)
	}
	getPromise() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve("Promise complete!"), 3000);
		});
	}
}
```

```javascript
// did not use async pipe for Observable
import { Observable } from 'rxjs/Rx';
//...
@Component({
selector: 'async-pipe',
template: `
	<div class="card card-block">
		<h4 class="card-title">AsyncPipe</h4>
		<p class="card-text" ngNonBindable>{{ ObservableData }}</p>
		<p class="card-text">{{ ObservableData }}</p>
	</div>
`
})
class AsyncPipeComponent implements OnDestroy {
	ObservableData: number;
	subscription: Object = null;
	constructor() {
		this.subscribeObservable();
	}
	getObservable() {
		return Observable.interval(1000)
										 .take(10)
										 .map((v) => v*v);
	}
	subscribeObservable(){
		this.subscription = this.getObservable().subscribe(v => this.ObservableData = v);
	}
	ngOnDestroy(){
		if(this.subscription){
			this.unsubscription.unsubscribe();
		}
	}
}
// use Async pipe
import { Observable } from 'rxjs/Rx';
//...
@Component({
selector: 'async-pipe',
template: `
	<div class="card card-block">
		<h4 class="card-title">AsyncPipe</h4>
		<p class="card-text" ngNonBindable>{{ Observable | async }}</p>
		<p class="card-text">{{ Observable | async }}</p>     <!-- (1) -->
	</div>
`
})
class AsyncPipeComponent {
	Observable: Observable<number>;      // (2)
	constructor() {
		this.observable = this.getObservable();   // (3)
	}
	getObservable() {
		return Observable.interval(1000)
										 .take(10)
										 .map((v) => v*v);
	}
}
```

###6.3 Custom pipes 

- @pipe decorator
- transform function

```javascript
import { Pipe } from '@angular/core';
@Pipe({
	name: "default"
})
class DefaultPipe{
	transform(value: string, fallback: string, forceHttps: boolean=false) : string {
		let image = "";
		if(value){ image = value;}
		else{ image = fallback;}
		if(forceHttps){
			if(image.indexOf("https") == -1) { image = image.replace("http","https"); }
		}
		return image;
	}
}
@Component({
	selector: 'app',
	template: `
			<img [src]="imageUrl | default:'http://s3.amazonaws.com/uifaces/faces/twitter/sillyleo/128.jpg':true"/>
	`
})
class AppComponent {
	imageUrl: string = "";
}
```
