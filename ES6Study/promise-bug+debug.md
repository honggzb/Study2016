<h4>Table of Contents</h4>

- [一、promise factories](#1)
- [二、返回两个promise的结果](#2)
- [三、problem/bug 常见错误](#3)
- [四、Promise Debugging Techniques](#4)

<h3 href="#1">一、promise factories</h3>

Proimise.all() 是并行执行的, 想一个接一个的执行一系列promise, 可以建立promise工厂

```javascript
function executeSequentially(promiseFactories) {
  var result = Promise.resolve();
  promiseFactories.forEach(function (promiseFactory) {
    result = result.then(promiseFactory);
  });
  return result;
}
//一个 promise 工厂非常简单，它就是一个返回 promise对象的函数
function myPromiseFactory() {
  return somethingThatCreatesAPromise();
}
```

为什么采用promise对象就可以达到目的呢？因为promise工厂只有在调用的时候才会创建promise对象。它和then()方法的工作方式很像，事实上，它们就是一样的东西。

<h3 href="#2">二、返回两个promise的结果</h3>

```javascript
var user;    // 在外层作用域存储user对象
getUserByName('nolan').then(function (result) {
  user = result;
  return getUserAccountById(user.id);
}).then(function (userAccount) {
  // okay, I have both the "user" and the "userAccount"
});
//或者
getUserByName('nolan').then(function (user) {
  return getUserAccountById(user.id).then(function (userAccount) {
    // okay, I have both the "user" and the "userAccount"
  });
});
//
function onGetUserAndUserAccount(user, userAccount) {
  return doSomething(user, userAccount);
}
function onGetUser(user) {
  return getUserAccountById(user.id).then(function (userAccount) {
    return onGetUserAndUserAccount(user, userAccount);
  });
}
getUserByName('nolan')
  .then(onGetUser)
  .then(function () {
  // at this point, doSomething() is done, and we are back to indentation 0
});
putYourRightFootIn()
  .then(putYourRightFootOut)
  .then(putYourRightFootIn)
  .then(shakeItAllAbout);
```

<h3 href="#3">三、problem/bug 常见错误</h3>

- no return
- Callback hell
- no catch()

每一个 promise 对象都会提供一个 then 方法或者是 catch 方法：

```javascript
somePromise().then(function () {
    // I'm inside a then() function!
});
```

在 then 方法内部，我们可以做三件事：

- return 一个 promise 对象
- return 一个同步的值或者是 undefined
- 同步的 throw 一个错误

**3.1 返回另一个`promise`对象**

```javascript
getUserByName('nolan').then(function(user) {
                          return getUserAccountById(user.id);
                      })
                      .then(function(userAccount) {   });
```

这段代码里面的return非常关键，没有这个return的话，getUserAccountById只是一个普通的被别的函数调用的函数。下一个回调函数会接收到undefined 而不是userAccount

**3.2 返回一个同步的值或者是 undefined**

返回一个undefined大多数情况下是错误的，但是返回一个同步的值确实是一个将同步代码转化成 promise 风格代码的好方法。举个例子，现在在内存中有 users。我们可以：

```javascript
getUserByName('nolan').then(function (user) {
                          if (inMemoryCache[user.id]) {
                              return inMemoryCache[user.id];  // returning a synchronous value!
                          }
                          return inMemoryCache[user.id]; // returning a promise
                      }).then(function (userAccount) {
                          // I got a user account
                      })
```

第二个回调函数并不关心userAccount是通过同步的方式得到的还是异步的方式得到的，而第一个回调函数即可以返回同步的值又可以返回异步的值。

不幸的是，如果不显式调用return语句的话，JavaScript里的函数会返回undefined。这也就意味着在你想返回一些值的时候，不显式调用return会产生一些副作用。

鉴于以上原因，养成了一个在then方法内部永远显式的调用return或者throw的习惯。

**3.3 抛出一个同步的错误**

```javascript
getUserByName('nolan').then(function (user) {
                        if (user.isLoggedOut()) {
                          throw new Error('user logged out!'); // throwing a synchronous error!
                        }
                        if (inMemoryCache[user.id]) {
                          return inMemoryCache[user.id];       // returning a synchronous value!
                        }
                        return getUserAccountById(user.id);    // returning a promise!
                      }).then(function (userAccount) {
                        // I got a user account!
                      }).catch(function (err) {
                        // Boo, I got an error!
                      });
```

如果用户已经登出的话，catch() 会收到一个同步的错误，如果有 promise 对象的状态变为 rejected 的话，它还会收到一个异步的错误。catch() 的回调函数不用关心错误是异步的还是同步的。

在使用 promise 的时候抛出异常在开发阶段很有用，它能帮助我们定位代码中的错误。比方说，在 then 函数内部调用 JSON.parse（），如果 JSON 对象不合法的话，可能会抛出异常，在回调函数中，这个异常会被吞噬，但是在使用 promise 之后，我们就可以捕获到这个异常了。

<h3 href="#4">四、Promise Debugging Techniques</h3>

**1. timeoutPromise**

The simplest kind of promise bug is having the promise never being fulfilled by the creator. This could for example happen when a promise creator include an empty constructor body:

```javascript
createPromise(function(resolve, reject) {
  // forget to fulfill
}).then(...)
//or
var doSomething = function(callback) {
  // forget to call callback
}
// solution
var timeoutPromise = function(timeout, construct) {
  return new Promise(function(resolve, reject) {
    construct(resolve, reject);
    setTimeout(function() {
      reject(new Error('timeout error'));
    }, timeout);
  })
}
// can simply detect the bug by changing the createPromise() function
createPromise = function(construct) {
  return timeoutPromise(1000, construct)
}
```

**2. Double Fulfill error**

Potential promise bug is when a user try to fulfill a promise more than once:

```javascript
createPromise(function(resolve, reject) {
  resolve(1)
  resolve(2)
})
//mistake is equivalent to calling callback multiple times in async functions, albeit with less negative side effect
var doSomething = function(callback) {
  callback(null, 1)
  callback(null, 2)
}
```

The double fulfillment error can again be detected by wrapping the promise constructor. In this example an error handler is provided so that the error can be gracefully handled.

```javascript
var detectDoubleFulfilledPromise = function(construct, errHandler) {
  return new Promise(function(resolve, reject) {
    var fulfilled = false;
    var wrap = function(fulfill) {
      return function(val) {
        if(fulfilled) errHandler(new Error('promise is fulfilled multiple time'));
        fulfilled = true;
        fulfill(val);
      }
    }
    construct(wrap(resolve), wrap(reject));
  })
}
var createPromise = function(construct) {
  return detectDoubleFulfilledPromise(construct, console.trace)
}
```

**3.Uncaught Error**

probably most common promise bug is on improper handling of rejected promises. It will be a very common mistake for one to never attach a catch handler:

```javascript
createPromise(function(resolve, reject) {
  reject(1);
}).catch(function(err) {
  console.log('trying to recover from error', err);
  throw new Error('error inside error handler');
  console.log('should never managed to recover fully');
})
```

In such case the error recover failed but is silently ignored, making it almost impossible to detect and debug.

One way to solve this in the userland is to attach two catch handlers, with the second catch handler used to signal fatal error:

```javascript
createPromise(function(resolve, reject) {
  reject(1);
}).catch(function(err) {
  throw new Error('error inside error handler');
}).catch(function(err) {
  console.log('A fatal error has occured!', err);
  abort();   // Abort program or close down cluster instance
})
```

 I'd recommend another promise wrapper used to detect the lack of error handling at the end of a promise chain:, what it essentially does is to wrap around a promise's .then() and .catch() methods to detect whether catch handler is attached to the end of a promise chain. Because a promise might not be chained immediately, a timeout is set before the wrapper checks whether it reach the end of a promise chain.

```javascript
var detectUncaughtPromise = function(promise, timeout, prevCaught) {
  var wrappedPromise = Object.create(promise)
  var chained = false
  var stack = new Error().stack
  wrappedPromise.then = function(onResolved, onRejected) {
    chained = true
    var nextCaught = onRejected ? true : false
    var newPromise = promise.then(onResolved, onRejected)
    return detectUncaughtPromise(newPromise, timeout, nextCaught)
  }
  wrappedPromise.catch = function(errHandler) {
    chained = true
    var newPromise = promise.catch(errHandler)
    return detectUncaughtPromise(newPromise, timeout, true)
  }

  setTimeout(function() {
    if(chained) return
    if(!prevCaught) {
      console.log('uncaught terminal promise detected.',
        'last then() was on:', stack)
    } else {
      promise.catch(function(err) {
        console.log('exception occured inside error handler',
          'of last promise chain:', err)
      })
    }
  }, timeout)
  return wrappedPromise
}
var createPromise = function(construct) {
  var promise = new Promise(construct)
  return detectUncaughtPromise(promise, 1000)
}
```

> Reference

- [谈谈使用 promise 时候的一些反模式](http://efe.baidu.com/blog/promises-anti-pattern/)
- [ES6 Promise Debugging Techniques](https://github.com/soareschen/es6-promise-debugging/blob/master/README.md)
- [JavaScript Promise迷你书（中文版）](http://liubin.github.io/promises-book/)
