## ECMAScript 6 Note

1. [Setting up ]参考 nodeStudy中的babel设置
2. [2.1 跨模块常量 const](#using-const)
3. [2.2 let](#using-let)
4. [全局对象的属性](#using-全局对象的属性)
- 在线编译：  http://babeljs.io/repl/
- 对ES6的支持可以查看 http://kangax.github.io/es5-compat-table/es6/

---

<h3 id="using-let-and-const-Variables">2. let and const Variables</h3>

| variable   |comment  |
| :--------: | --------| 
| var   | function-scoped |
| let     |block-scoped 块级作用域|  
| const      | 常量Constant, const一旦声明变量，就必须立即初始化，不能留到以后赋值 | 

<h4 id="using-const">2.1 跨模块常量 const</h4>

- 声明时必须立刻赋值
- 赋值不可改变
- 暂时性死区
- 不存在变量提升
- 禁止重复声明

const 声明的对象本身（指向）不可改变，但对象中的内容可以改变。部分情况下，可以用 const 代替 IIFE 来保护变量不被修改。

const声明的常量只在当前代码块有效。如果想设置跨模块的常量，可以采用下面的写法。

```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

<h4 id="using-let">2.2 let</h4>

let所声明的变量，只在let命令所在的代码块内有效

- 块级作用域
- 暂时性死区
- 不存在变量提升
- 禁止重复声明

```javascript
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined, let声明的变量只在它所在的代码块有效
b // 1
```

for循环的计数器，就很合适使用let命令

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();     // 6, 如果在for中使用var，此时输出为10
```

- 使用 let 可以方便的给循环中的回调函数创建多个闭包环境，不再需要手动添加 IIFE，提升了开发效率

```javascript
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());
// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

<h4 id="using-全局对象的属性">全局对象的属性</h4>

全局对象是最顶层的对象，在浏览器环境指的是`window`对象，在`Node.js`指的是`global`对象。`ES5`之中，全局对象的属性与全局变量是等价的。

JavaScript语言的一大问题，因为很容易不知不觉就创建了全局变量。ES6为了改变这一点，一方面规定，**var命令和function命令声明的全局变量，依旧是全局对象的属性**；另一方面规定，**let命令、const命令、class命令声明的全局变量，不属于全局对象的属性**。

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1
let b = 1;
window.b // undefined
```

上面代码中，全局变量a由var命令声明，所以它是全局对象的属性；全局变量b由let命令声明，所以它不是全局对象的属性，返回undefined。
