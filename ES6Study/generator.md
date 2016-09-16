## generator

generator由function*定义（注意多出的*号），除了return语句，还可以用yield返回多次。

```javascript
function* quips(name) {
  yield "你好 " + name + "!";
  yield "希望你能喜欢这篇介绍ES6的译文";
  if (name.startsWith("X")) {
    yield "你的名字 " + name + "  首字母是X，这很酷！";
  }
  yield "我们下次再见！";
}
var iter = quips("jorendorff");
iter.next(); // "你好 jorendorff!"
iter.next(); // "希望你能喜欢这篇介绍ES6的译文"
iter.next(); // "我们下次再见！"
iter.next(); // undefined
var iter = quips("Xjod");
iter.next(); // "你好 Xjod!"
iter.next(); // "希望你能喜欢这篇介绍ES6的译文"
iter.next(); // "你的名字 Xjod  首字母是X，这很酷！"
iter.next(); // "我们下次再见！"
iter.next(); // undefined
// 1 斐波那契数列
function* fib(max) {
    var  t,a = 0,b = 1,n = 1;
    while (n < max) {
        yield a;
        t = a + b;  a = b; b = t; n ++;
    }
    return a;
}
```

### 调用generator对象有两个方法

直接调用一个generator和调用函数不一样，fib(5)仅仅是创建了一个generator对象，还没有去执行它， 如： 

`fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window} `

- `next()`, next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。 当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了。
- `for ... of`循环迭代generator对象，这种方式不需要我们自己判断done

```javascript
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: true}
for (var x of fib(5)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3
}
```

### generator和普通函数相比，有什么用？

** 1. 可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态 - 因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数 **

```javascript
var fib = { a: 0, b: 1, n: 0, max: 5,
            next: function () {
                var r = this.a, t = this.a + this.b;
                this.a = this.b;
                this.b = t;
                if (this.n < this.max) {
                    this.n++; return r;
                } else {
                    return undefined;
                }
            }
};
console.log(fib.next()); //... repeat max次
for (var i=0;i<fib.max;i++) {
    console.log(fib.next()); // 依次输出0, 1, 1, 2, 3
}
```

** 2. 把异步回调代码变成“同步”代码 **

```javascript
try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
}
catch (err) {
    handle(err);
}
// equal to
ajax('http://url-1', data1, function (err, result) {
    if (err) {
        return handle(err);
    }
    ajax('http://url-2', data2, function (err, result) {
        if (err) {
            return handle(err);
        }
        ajax('http://url-3', data3, function (err, result) {
            if (err) {
                return handle(err);
            }
            return success(result);
        });
    });
});
```

> Reference

- [廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499525761186acdd5ac3a44f8a50cc0ed8606139b000)
- [深入浅出ES6（三）：生成器 Generators](http://www.infoq.com/cn/articles/es6-in-depth-generators)
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
