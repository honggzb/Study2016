[ES6尾调用优化](#top)

- [1. 尾调用概念](#尾调用概念)
- [2. 尾调用优化](#尾调用优化)

<h2 id="#尾调用概念">1. 尾调用概念</h2>

尾调用的概念非常简单，就是指某个函数的最后一步是调用另一个函数。

```javascript
function tail(x) {
  console.log('tail',x);
}
function fx(x) {
  return tail(x);
}
fx(123);    //tail 123
//尾调用不一定出现在函数尾部，只要是最后一步操作即可, 下面函数m和n都属于尾调用，因为它们都是函数f的最后一步操作
function f(x) {  
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```

[back to top](#top)

<h2 id="#尾调用优化">2. 尾调用优化</h2>

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回到A，B的调用记录才会消失。如果函数B内部还调用函数C，那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成一个"调用栈"（call stack）

![](http://i.imgur.com/taBBZwp.png)

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了

**"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录**。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义

案例1- 阶乘函数

- 计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n)
- 如果改写成尾递归，只保留一个调用记录，复杂度 O(1)

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 
//尾递归写法
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5) // 120
//facitorial(5,1)
//facitorial(4,5)
//facitorial(3,20)
//facitorial(2,60)
//facitorial(1,120)
//120
```

案例2- Fibonacci 数列

```javascript
//非尾递归的 Fibonacci 数列实现
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n-1) + Fibonacci(n-2);
}
Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出
//尾递归优化过的 Fibonacci 数列实现
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

"尾调用优化"对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6也是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署"尾调用优化"。这就是说，在 ES6 中，只要使用尾递归，就不会发生栈溢出，相对节省内存。

> References

- [尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)
- [尾调用](https://zh.wikipedia.org/wiki/%E5%B0%BE%E8%B0%83%E7%94%A8)
- [ ES6 尾调用优化--函数编程中规范](http://blog.csdn.net/kill_bugs/article/details/72757688)
