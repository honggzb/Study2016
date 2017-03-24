## Reactive Programming- RxJs 核心概念之Observable

RP(Reactive Programming)是针对异步数据流的编程。流是包含了有时序，正在进行事件的序列，可以发射(emmit)值(某种类型)、错误、完成信号。流在包含按钮的浏览器窗口被关闭时发出完成信号。

对流进行监听，通常称为**订阅**，处理流的函数是**观测者**，流是被观测的主体。这就是**观测者设计模式**。

- RP 提高了编码的抽象程度，你可以更好地关注在商业逻辑中各种事件的联系避免大量细节而琐碎的实现，使得编码更加简洁。
- 使用RP，将使得数据、交互错综复杂的web、移动app开发收益更多。10年以前，与网页的交互仅仅是提交表单、然后根据服务器简单地渲染返回结果这些事情。App进化得越来越有实时性：修改表单中一个域可以同步地更新到后端服务器。“点赞”信息实时地在不同用户设备上同步。

![](http://i.imgur.com/ZYUr0YG.png)

案例： 微博(Twitter)简易版“你可能感兴趣的人” [jsfiddle](https://jsfiddle.net/staltz/8jFJH/48/?utm_source=website&utm_medium=embed&utm_campaign=8jFJH)

- 页面打开后，通过API加载数据展示3个你可能感兴趣的用户账号
- 点击“刷新”按钮，重新加载三个新的用户账号
- 在一个用户账号上点击'x' 按钮，清除当前这个账户，重新加载一个新的账户
- 每行展示账户的信息和这个账户主页的链接

```javascript
//"你可能感兴趣的用户"请求&响应流
// --a------|->  a是字符串 'https://api.github.com/users'
var requestStream = Rx.Observable.just('https://api.github.com/users');
requestStream.subscribe(function(requestUrl) {
  // 执行异步请求
  var responseStream = Rx.Observable.create(function (observer) {
    jQuery.getJSON(requestUrl)
          .done(function(response) { observer.onNext(response); })
          .fail(function(jqXHR, status, error) { observer.onError(error); })
          .always(function() { observer.onCompleted(); });
  });
  responseStream.subscribe(function(response) {
    // 业务逻辑: 在浏览器中渲染响应数据的逻辑
  });
}
// 刷新按钮流:   ----------o--------o---->
// 请求流:       -r--------r--------r---->
// 响应流:       ----R---------R------R-->
// 推荐1个用户:  ----s-----N---s----N-s-->      推荐流
// 
// 小写字母: 请求
// 大写字母: 响应
// N: null
// 刷新“你可能感兴趣的用户” : 刷新点击流发生后，通过产生随机的页面拼凑出URL，并向GitHub发起请求
var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
//
var closeButton1 = document.querySelector('.close1');
var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
// close2 和 close3 作为练习
var requestStream = refreshClickStream
                      .startWith('startup click')
                      .map(function() {
                          var randomOffset = Math.floor(Math.random()*500);
                          return 'https://api.github.com/users?since=' + randomOffset;
                      });
var responseStream = requestStream.flatMap(function (requestUrl) {
    return Rx.Observable.fromPromise($.ajax({url: requestUrl}));
  });
// 刷新按钮流:  ----------o--------o---->
//    请求流:   -r--------r--------r---->
//    响应流:   ----R---------R------R-->   
// 推荐1个用户: ----s-----N---s----N-s-->
var suggestion1Stream = close1ClickStream
                          .startWith('startup click')
                          .combineLatest(responseStream, function(click, listUsers) {
                              // 随机从列表中取出一个用户(“每一次刷新后，清除原来的用户”)
                              return listUsers[Math.floor(Math.random()*listUsers.length)];
                          })
                          .merge(refreshClickStream.map(function(){ return null; }))
                          .startWith(null);
suggestion1Stream.subscribe(function(suggestion) {
  if (suggestion === null) {  // 无数据
    // 隐藏一个用户的DOM元素
  }
  else {
    // 渲染一个新的推荐用户的DOM元素
  }
});
```

### 1 拉取(Pull) V.S. 推送(Push)

拉取和推送是数据生产者和数据消费者之间通信的两种不同机制。 在拉取系统中，总是由消费者决定何时从生产者那里获得数据。生产者对数据传递给消费者的时间毫无感知（被动的生产者，主动的消费者）。

JavaScript函数是典型的拉取系统：函数是数据的生产者，对函数进行调用的代码（消费者）从函数调用后的返回值中拉取单值进行消费。

动作|生产者|消费者
---|---|---
拉取|被动: 在被请求时产生数据|主动: 决定何时请求数据
推送|主动: 控制数据的产生逻辑|被动: 获得数据后进行响应

Promise是典型的推送系统。作为数据生产者的Promise通过resolve()向数据消费者——回调函数传递数据：与函数不同，Promise决定向回调函数推送值的时间。

RxJS在JavaScript中引入了Observable(可观察对象)这个新的推送系统。Observable是多数据值的生产者，向Observer(被动的消费者)推送数据。

方法|区别
---|---
函数|调用后同步计算并返回单一值
生成器函数-遍历器|遍历过程中同步计算并返回0个到无穷多个值
Promise|异步执行中返回或者不返回**单一值**
Observable|同步或者异步计算并返回0个到无穷多个值(**多值**)

### 2 RxJs 核心概念之 Observable 剖析

- Rx官方术语中把流称为“观察的对象”("Observable")，因为流可以被观察、订阅, 通过使用 `Rx.Observable.create` 或者是创建操作符，创建一个`Observable`； `Observable` 被 `Observer`（观察者） 订阅； 在执行时 向观察者发送`next / error / complete `通知；同时执行过程可以被 终止
- Observable（可观察对象）是基于推送（Push）运行时执行（lazy）的**多值集合**
- 在Rx环境中，可简单的通过`var stream = Rx.Observable.fromPromise(promise)`将Promise转换为可观察对象

方法|说明
---|---
创建|`Rx.Observable.create`, 除了使用create创建Observable，通常还使用创建操作符, 如 `of，from， interval`, 等来创建Observable
订阅|`observable.subscribe(x => console.log(x));`
执行|只有在被订阅之后Observable才会执行，执行的逻辑在`Observable.create(function subscribe(observer) {...})`中描述，执行后将会在特定时间段内，同步或者异步地成产多个数据值
终止|Observable的执行可能是无限的，作为观察者需要主动中断执行, `subscription.unsubscribe();`

```javascript
var observable = Rx.Observable.create(function subscribe(observer) {   //1) 创建 2)订阅
  var intervalID = setInterval(() => {
    observer.next('hi 1');      //3)执行
    observer.next('hi 2');      //3)执行
  }, 1000);
  //4) 终止: 终止后释放setInterval的句柄
  return function unsubscribe() {
    clearInterval(intervalID);
  };
  
});
var unsubscribe = subscribe({next: (x) => console.log(x)});
// 一段时间后:
unsubscribe(); // 终止
//4) 终止
var observable = Rx.Observable.from([10, 20, 30]);
var subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe(); 
```

- 订阅:
  - 调用subscribe的观察者并不会共享同一个Observable。观察者调用`observable.subscribe` 时，`Observable.create(function subscribe(observer) {...})`中的subscribe会在调用它的观察者作用域中执行。每一次observable.subscribe的调用，都是彼此独立的
  - 订阅Observable如同调用函数，需要提供相应的回调方法
  - 订阅机制与处理事件的`addEventListener` / `removeEventListenerAPI`完全不同。通过`observable.subscribe`，观察者并不需要在Observable中进行注册，Observable也不需要维护订阅者的列表
  - 订阅后便进入了Observable的执行阶段，在执行阶段值和事件将会被传递给观察者供其消费
- Observable在执行过程中，可以推送三种类型的值：
  - "Next" 通知： 实际产生的数据，包括数字、字符串、对象等
  - "Error" 通知：一个JavaScript错误或者异常
  - "Complete" 通知：一个不带有值的事件
  - "Next"会在执行阶段推送多个，但"Error"和"Complete"仅会在执行阶段推送其一，并不会同时推送错误和完成通知

### 3 RxJs中的Observable

- [http://reactivex.io/](http://reactivex.io/documentation/observable.html)
- [Operators by Categories](http://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/creating_and_querying_observable_sequences/index.html)

Observable|Operators
---|---
Creating Observables|Create, Defer, Empty/Never/Throw, From, Interval, Just, Range, Repeat, Start, Timer
Transforming Observable Items|Buffer, FlatMap, GroupBy, Map, Scan, and Window
Filtering Observables|Debounce, Distinct, ElementAt, Filter, First, IgnoreElements, Last, Sample, Skip, SkipLast, Take, TakeLast
Combining Observables|And/Then/When, CombineLatest, Join, Merge, StartWith, Switch, Zip(在流A的每个之上调用函数， 然后在流B上生成对应的新值)
Error Handling Operators|catch、retry、finally
Utility Operators|Delay, Do, Materialize/Dematerialize, ObserveOn, Serialize, Subscribe, SubscribeOn, TimeInterval, Timeout, Timestamp, Using
Conditional and Boolean Operators|All, Amb, Contains, DefaultIfEmpty, SequenceEqual, SkipUntil, SkipWhile, TakeUntil, TakeWhile
Mathematical and Aggregate Operators|Average, Concat, Count, Max, Min, Reduce, Sum
Converting Observables|To
Connectable Observable Operators|Connect, Publish, RefCount, Replay

- Observable.range：发射一定数量值得序列。
- Observable.toArray: 在序列完成时将所有发射值转换为一个数组。
- Observable.flatMap: 将原始序列流中的元素转化为一个新的序列流，并将这个新的序列流merge到原来的序列中元素的位置。
- Observable.startWith: 它会设置Observable序列的第一个值
- Observable.combineLatest: 类似于promiseAll，在所有序列有结果后才会执行
- Observable.scan: 将序列中每次发射的值可以做聚合，与reduce类似，reduce会将整个序列的值聚合起来，在序列完成时发送一个最终值
- Observable.sample: 从持续的序列中取得一定的样品
- Observable.merge：将多个序列合并成一个，可以做OR来使用
- Observable.timestamp: 能够得到每个发射值的发射时的时间
- Observable.distinctUntilChanged(compare, selector): selector取出用来比较的key，compare用来比较两个key
- Observable.takeWhile() 当参数为false时停止发射数据

> Reference

- [RxJs 核心概念之Observable](https://segmentfault.com/a/1190000005051034)
- ["Reactive Programming是神马？"](https://segmentfault.com/a/1190000004293922)
- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [MagicQ专栏](https://segmentfault.com/blog/caolixiang33)
