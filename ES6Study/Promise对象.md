<h3>Table of Contents</h3>

- [一、运行环境](#运行环境)
- [二、Promise 对象两个特点](#Promise对象两个特点)
- [三、基本用法](#基本用法)
- [四、基本的 api](#基本的api)
- [五、Promise Chain](#Promise-Chain)
- [六、多个Promise 包装](#多个Promise包装)
- [使用Promise封装简单Ajax方法](#使用Promise封装简单Ajax方法)

**ES6 原生提供了 Promise 对象**

<h2 id="运行环境">一、运行环境</h2>

```
npm install es6-promise   // 命令行
var Promise = require('es6-promise').Promise;   //解决： 找不到Promise Module
```

<h2 id="Promise对象两个特点">二、Promise 对象两个特点</h2>

- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称 Fulfilled）和 `Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。

<h2 id="基本用法">三、基本用法</h2>

```Javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code, 异步处理
  if (/* 异步操作成功 */){   // 处理结束后、调用resolve 或 reject
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
promise.then(onFulfilled, onRejected)   //resolve(成功)时调用onFulfilled, reject(失败)时调用onRejected
       .catch(onRejected)               //异常处理
```

- ES6规定，Promise对象是一个构造函数，用来生成Promise实例, new Promise(fn) 返回一个promise对象, 在fn 中指定异步等处理
- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject
- Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数

**Typical sample**

```javascript
//#1
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
//#2
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                  finalHandler(undefined)
                  |------------------|
//#3
doSomething().then(doSomethingElse())
  .then(finalHandler);
doSomething
|-----------------|
doSomethingElse(undefined)
|---------------------------------|
                  finalHandler(resultOfDoSomething)
                  |------------------|
//#4
doSomething().then(doSomethingElse)
  .then(finalHandler);
doSomething
|-----------------|
                  doSomethingElse(resultOfDoSomething)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
```

**案例**

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
function getURL(URL) {    //用Promise把XHR处理包装起来的名为getURL的函数, 该函数返回一个promise对象
    return new Promise(function (resolve, reject) {   //new Promise构造器之后，会返回一个promise对象
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);     //只有在通过XHR取得结果状态为200,也就是只有数据取得成功时, 才会调用 resolve
            } else {
                reject(new Error(req.statusText));  //其他情况（取得失败）时则会调用reject方法, 创建一个Error对象后再将具体的值传进去, 传给reject
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText)); 
        };
        req.send();
    });
}
// 运行示例
var URL = "http://httpbin.org/get"; 
getURL(URL).then(function onFulfilled(value){   //设置resolve后的回调函数
    console.log(value);  
}).catch(function onRejected(error){ 
    console.error(error);
});
//
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

<h2 id="基本api">四、基本的api</h2>

- Promise.resolve()
- Promise.reject()
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.all() // 所有的完成
- Promise.race() // 竞速，完成一个即可

**说明**： 

1. new Promise的快捷方式

- 静态方法Promise.resolve(value) 是 new Promise() 方法的快捷方式
- 静态方法Promise.reject(error) 也是 new Promise() 方法的快捷方式
- Promise.then(fn1).then(fn2).catch(fn) 只是 promise.then(undefined, onRejected); 方法的一个别名

```javascript
Promise.resolve(42);   //这个promise对象立即进入确定（即resolved）状态，并将42传递给后面then里所指定的 onFulfilled 函数
//可以认为是以下代码的语法糖
new Promise(function(resolve){
    resolve(42);
});
Promise.reject(new Error("出错了"))
//可以认为是以下代码的语法糖
Promise.reject(new Error("BOOM!")).catch(function(error){
    console.error(error);
});
//
Promise.resolve(42).then(function(value){  //Promise.resolve(value); 的返回值也是一个promise对象
    console.log(value);
});
```

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

1. Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获

```javascript
getJSON("/post/1.json").then(function(post) { 
  return getJSON(post.commentURL);  
}).then(function(comments) {
  // some code
}).catch(function(error) { 
  // 处理前面三个Promise产生的错误： 一共有三个Promise对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获
});
```

<h2 id="Promise-Chain">五、Promise Chain</h2>

- then 方法每次都会创建并返回一个新的promise对象

```javascript
// 1: 对同一个promise对象同时调用then方法
var aPromise = new Promise(function (resolve) { resolve(100); });
aPromise.then(function (value) {
    return value * 2;    // => 100,then调用几乎是在同时开始执行的，而且传给每个 then 方法的 value 值都是 100
}); 
aPromise.then(function (value) {
    return value * 2;  //  => 100,then调用几乎是在同时开始执行的，而且传给每个 then 方法的 value 值都是 100
});
aPromise.then(function (value) {
    console.log("1: " + value);   // => 100,then 调用几乎是在同时开始执行的，而且传给每个 then 方法的 value 值都是 100
})
// vs
// 2: 对 then进行 promise chain方式进行调用
var bPromise = new Promise(function (resolve) { resolve(100); });
bPromise.then(function (value) {
          return value * 2;     // => 100
      }).then(function (value) {
          return value * 2;   // => 100 * 2
      }).then(function (value) {
          console.log("2: " + value);    // => 100 * 2 * 2
      });
```

###5.1 Promise Chain

```javascript
function taskA() { 
  console.log("Task A"); 
  throw new Error("throw Error @ Task A") 
}
function taskB() { console.log("Task B");  // 不会被调用 }
function onRejected(error) { console.log(error);   // => "throw Error @ Task A" }
function finalTask() { console.log("Final Task");  }
var promise = Promise.resolve();
promise.then(taskA)
       .then(taskB)
       .catch(onRejected)
       .then(finalTask);
```

![](http://i.imgur.com/oBT7DP6.png)

- 由于在promise chain中，由于在onRejected和Final Task后面没有catch处理了，因此在这两个Task中如果出现异常的话将不会被捕获, 如Task A产生异常时，Task B 是不会被调用的

![](http://i.imgur.com/FVBsGPx.png)

###5.2 promise chain 中如何传递参数

在Task中return的返回值，会在下一个Task执行时传给它

```javascript
function doubleUp(value) { return value * 2; }
function increment(value) { return value + 1; }
function output(value) { console.log(value);// => (1 + 1) * 2; }
var promise = Promise.resolve(1);     // 1)Promise.resolve(1); 传递1给 increment 函数
promise.then(increment)               // 2)函数increment对接收的参数进行 +1 操作并返回（通过return）
       .then(doubleUp)                // 3)参数变为2，并再次传给 doubleUp 函数
       .then(output)                  // 4)在函数 output 中打印结果
       .catch(function(error){        // promise chain中出现异常的时候会被调用
          console.error(error);
      });
```

[back to top](#top)

<h2 id="多个Promise包装">六、多个Promise包装</h2>

<h3 id="多个Promise包装1">6.1 多个Promise处理</h2>

为了应对需要对多个异步调用进行统一处理的场景，Promise准备了 Promise.all 和 Promise.race 这两个静态方法。 Promise.all 和 Promise.race方法都可以将多个Promise 对象包装成一个，两者的区别在于：

- Promise.all 接收一个promise对象的数组作为参数，当这个数组里的所有promise对象全部变为resolve或reject状态的时候，它才会去调用.then 方法, 任何一个成员失败都会导致包装对象失败(非常用于于处理一个动态大小均匀的 Promise 列表), 传递给Promise.all 的promise并不是一个个的顺序执行的，而是同时开始、并行执行的
- Promise.race 包装对象的行为与第一个发生改变的 Promise 对象成员一致，而忽略后续其它的成员, 即romise.race只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理
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

<h3 id="多个Promise包装2">6.2 使用Promise进行顺序（sequence）处理</h3>

- 方法1： 循环使用then调用的方法
- 方法2： 使用for循环的方法
- 方法3： 使用reduce的方法
- 方法4： 分离出顺序处理函数的方法

```javascript
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var request = {
        comment: function getComment() {
            return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
        },
        people: function getPeople() {
            return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
        }
    };
```

方法1： 循环使用then调用的方法

```javascript
function main() {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);   // [] 用来保存初始化的值
    return request.comment().then(pushValue).then(request.people).then(pushValue);  //循环使用then调用的方法
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.error(error);
});
```

方法2： 使用for循环的方法

```javascript
function main() {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);  // [] 用来保存初始化值
    var tasks = [request.comment, request.people];  // 返回promise对象的函数的数组
    var promise = Promise.resolve();  // 临时变量
    for (var i = 0; i < tasks.length; i++) {    //通过不断对promise进行处理，不断的覆盖 promise 变量的值，以达到对promise对象的累积处理效果
        var task = tasks[i];
        promise = promise.then(task).then(pushValue);
    }
    return promise;
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.error(error);
});
```

方法3： 使用reduce的方法

```javascript
function main() {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    var tasks = [request.comment, request.people];
    return tasks.reduce(function (promise, task) {   //第二个参数用来设置盛放计算结果的初始值
        return promise.then(task).then(pushValue);   //return的值，则会被赋值为下次循环时的 promise 。也就是说，通过返回由 then 创建的新的promise对象，就实现了和for循环类似的 Promise chain 了
    }, Promise.resolve());
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.error(error);
});
```

方法4： 分离出顺序处理函数的方法

```javascript
function sequenceTasks(tasks) {    // 使用reduce的方法重构出一个函数, 接收的参数是一个函数的数组
    function recordValue(results, value) {
        results.push(value);
        return results;     //返回一个promise对象
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var request = {
        comment: function getComment() {
            return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
        },
        people: function getPeople() {
            return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
        }
    };
function main() {
    return sequenceTasks([request.comment, request.people]);
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.error(error);
});
```

[back to top](#top)

<h2 id="使用Promise封装简单Ajax方法">使用Promise封装简单Ajax方法</h2>

```javascript
//定义
function getJSON (url) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.responseText, this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send()
    })
}
function postJSON(url, data) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}
//使用
getJSON('/api/v1/xxx')    // => 这里面是就try
.catch( error => {
  // dosomething          // => 这里就是catch到了error，如果处理error以及返还合适的值
})
.then( value => {
  // dosomething          // 这里就是final
})
```

[back to top](#top)

> reference

- [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/promise)
- [Javascript 中的神器——Promise](http://www.jianshu.com/p/063f7e490e9a)
- [JavaScript Promise迷你书](http://liubin.org/promises-book/#ch2-promise-resolve)
