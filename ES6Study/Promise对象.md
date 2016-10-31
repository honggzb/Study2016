<h3>Table of Contents</h3>

- [一、运行环境](#一、运行环境)
- [二、Promise 对象两个特点](#2)
- [三、基本用法](#3)
- [四、基本的 api](#4)
- [五、多个 Promise 包装](#5)

**ES6 原生提供了 Promise 对象**

### 一、运行环境

```
npm install es6-promise   // 命令行
var Promise = require('es6-promise').Promise;   //解决： 找不到Promise Module
```

<h4 id="#2"> 二、Promise 对象两个特点</h4>

- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称 Fulfilled）和 `Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。

<h3 id="#3"> 三、基本用法</h3>

```Javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {   // 第一个回调函数是Promise对象的状态变为Resolved时调用
  // success
}, function(error) {    //第二个回调函数是Promise对象的状态变为Reject时调用, 可选
  // failure
});
```

- ES6规定，Promise对象是一个构造函数，用来生成Promise实例
- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject
- Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数

案例

```Javascript
 //异步加载图片
 function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}
//用Promise对象实现的Ajax操作
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });
  return promise;
};
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

<h4 id="#4"> 四、基本的 api</h4>

- Promise.resolve()
- Promise.reject()
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.all() // 所有的完成
- Promise.race() // 竞速，完成一个即可

**说明**： 

1. 如果Promise状态已经变成Resolved，再抛出错误是无效的

```javascript
var promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');   //Promise在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });   
```

2. Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获

```javascript
getJSON("/post/1.json").then(function(post) { 
  return getJSON(post.commentURL);  
}).then(function(comments) {
  // some code
}).catch(function(error) { 
  // 处理前面三个Promise产生的错误： 一共有三个Promise对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获
});
```

<h4 id="#5"> 五、多个 Promise 包装</h4>

Promise.all 和 Promise.race 方法都可以将多个 Promise 对象包装成一个，两者的区别在于：

- Promise.all 中所有 Promise 对象成员都成功时，包装对象才会成功，任何一个成员失败都会导致包装对象失败(非常用于于处理一个动态大小均匀的 Promise 列表)
- Promise.race 包装对象的行为与第一个发生改变的 Promise 对象成员一致，而忽略后续其它的成员
- Promise.props 处理一个 promise 的 map 集合。只有有一个失败，所有的执行都结束

```javascript
// 生成一个Promise对象的数组 ,promises是包含6个Promise实例的数组，只有这6个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});
Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
// 如果5秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数
var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p.then(response => console.log(response))
 .catch(error => console.log(error));
//
Promise.props({
  pictures: getPictures(),
  comments: getComments(),
  tweets: getTweets()
 }).then(function(result) {
  console.log(result.tweets, result.pictures, result.comments);
 });
```

> reference

- [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/promise)
- [Javascript 中的神器——Promise](http://www.jianshu.com/p/063f7e490e9a)
- [JavaScript Promise迷你书](http://liubin.org/promises-book/#ch2-promise-resolve)
