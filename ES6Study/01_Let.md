## ECMAScript 6 Note

1. [Setting up ]()
2. [let and const Variables](#using-let-and-const-Variables)
3. [Destructuring 解构赋值](#Destructuring解构赋值)
4. 在线编译：  http://babeljs.io/repl/

---

对ES6的支持可以查看 http://kangax.github.io/es5-compat-table/es6/

<h3 id="using-let-and-const-Variables">2. let and const Variables</h3>

| variable   |comment  |
| :--------: | --------| 
| var   | function-scoped |
| let     |block-scoped 块级作用域|  
| const      | 常量Constant, const一旦声明变量，就必须立即初始化，不能留到以后赋值 | 

####2.1 跨模块常量

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

####2.2 let

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

####全局对象的属性

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

<h3 id="Destructuring解构赋值">3. Destructuring解构赋值</h3>

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

####3.1 数组的解构赋值

```javascript
var [a, b, c] = [1, 2, 3];
//等于
var a = 1; var b = 2; var c = 3;
```

- 如果解构不成功，变量的值就等于undefined。
- 等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功

```javascript
	let [a, [b], d] = [1, [2, 3], 4];
	a // 1   b // 2    d // 4
```

- 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

	`let [foo] = 1;  // 报错`

- 解构赋值不仅适用于var命令，也适用于let和const命令。
- 对于Set结构，也可以使用数组的解构赋值。
- 事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。

```javascript
let [x, y, z] = new Set(["a", "b", "c"])
x // "a"
```

- **默认值**:  解构赋值允许指定默认值

```javascript
var [foo = true] = [];   //foo=true
[x, y = 'b'] = ['a'] // x='a', y='b'
[x, y = 'b'] = ['a', undefined] // x='a', y='b'
```

注意，ES6内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。

```javascript
var [x = 1] = [undefined]; //x =1
var [x = 1] = [null]; // x =null
```

上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```javascript
function f(){
  console.log('aaa');
}
let [x = f()] = [1];
```

上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

```javascript
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError
```

上面最后一个表达式之所以会报错，是因为x用到默认值y时，y还没有声明。

####3.2 对象的解构赋值

	var { foo, bar } = { foo: "aaa", bar: "bbb" }; //foo= "aaa", bar = "bbb"

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。



####3.3 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a = "h"
b = "e"
c = "l"
d = "l"
e = "o"
```

####3.4 数值和布尔值的解构赋值


####3.5 函数参数的解构赋值

```javascript
function add([x, y]){
  return x + y;
}
add([1, 2]) // 3
```

####3.6 圆括号问题


####3.7 用途

- 交换变量的值
- 从函数返回多个值
- 函数参数的定义
- 提取JSON数据
- 函数参数的默认值
- 遍历Map结构
- 输入模块的指定方法

