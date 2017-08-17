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

#### 3.2 对象的解构赋值

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

#### 3.4 数值和布尔值的解构赋值


#### 3.5 函数参数的解构赋值

```javascript
function add([x, y]){
  return x + y;
}
add([1, 2]) // 3
```

#### 3.6 圆括号问题


#### 3.7 用途

- 交换变量的值
- 从函数返回多个值
- 函数参数的定义
- 提取JSON数据
- 函数参数的默认值
- 遍历Map结构
- 输入模块的指定方法

