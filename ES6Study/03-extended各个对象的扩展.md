### 1 字符串的扩展

方法| 说明 | 例子
---|---|---
字符的Unicode表示法|采用\uxxxx形式表示一个字符,将码点放入大括号，就能正确解读该字符|`"\u0061" //"a"  "\u{41}\u{42}\u{43}" //"ABC"`
includes()|返回布尔值，表示是否找到了参数字符串|`'Hello world!'.includes('Hello', 6) // false`
startsWith()|返回布尔值，表示参数字符串是否在源字符串的头部|`'Hello world!'.startsWith('world', 6) // true`
endsWith()|返回布尔值，表示参数字符串是否在源字符串的尾部 |`'Hello world!'.endsWith('Hello', 5) // true`
repeat()|将原字符串重复n次|`'hello'.repeat(2) // "hellohello",'na'.repeat(0) // ""`
padStart()|字符串头部补全长度|`'x'.padStart(4, 'ab') // 'abax'`
padEnd()|字符串尾部补全长度|`'x'.padEnd(4, 'ab') // 'xaba'`
模板字符串（template string）|用反引号标识|如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中,模板字符串中嵌入变量，需要将变量名写在${}之中|

```javascript
//模板字符串编译案例
template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');
template = 'echo(`' + template + '`);';
var script =
`(function parse(data){
  var output = "";
  function echo(html){
    output += html;
  }
  ${ template }
  return output;
})`;
return script;
}
var parse = eval(compile(template));
console.log(parse({ supplies: [ "broom", "mop", "cleaner" ] }));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

### 2 正则的扩展

方法| 说明 | 例子
---|---|---
RegExp构造函数|RegExp('字符串', '正则表达式的修饰符（flag）')|match()、replace()、search()、split()

### 3 数值的扩展

方法| 说明 | 例子
---|---|---
二进制数值|用前缀0b（或0B）表示|
八进制数值|用前缀0o（或0O）表示|
检查Infinite和NaN两个特殊值|Number.isFinite()和Number.isNaN()|与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false
Number.parseInt()和Number.parseFloat()|Number对象方法|将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变，`Number.parseInt === parseInt // true`
Number.isInteger()|判断一个值是否为整数|
Number.EPSILON|极小的常量|`Number.EPSILON  // 2.220446049250313e-16, Number.EPSILON.toFixed(20) // '0.00000000000000022204'`
Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER两个常量|表示整数范围的上下限|
Number.isSafeInteger()|则是用来判断一个整数是否落在整数范围之内, 如上

### Math对象的扩展

方法| 说明 | 例子
---|---|---
Math.trunc()|去除一个数的小数部分，返回整数部分|`Math.trunc(-4.9) // -4`, 对于空值和无法截取整数的值，返回NaN
Math.sign() |判断一个数到底是正数(返回+1)、负数(返回-1)、还是零(返回0)|-0(返回-0)、其他值，返回NaN
Math.cbrt()|计算一个数的立方根|
Math.clz32()|返回一个数的32位无符号整数形式有多少个前导0|`Math.clz32(0b00100000000000000000000000000000) // 2`, 可以配合（<<）和（>>）使用
Math.imul()|返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数|
Math.fround()|返回一个数的单精度浮点数形式|
Math.hypot()|返回所有参数的平方和的平方根|
ath.expm1(x)|返回ex - 1，即Math.exp(x) - 1|
Math.log1p(x)|方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN|
Math.log10(x)|返回以10为底的x的对数。如果x小于0，则返回NaN|
Math.log2(x)|返回以2为底的x的对数。如果x小于0，则返回NaN|
Math.sinh(x)|返回x的双曲正弦（hyperbolic sine）|
Math.cosh(x)|返回x的双曲余弦（hyperbolic cosine）|
Math.tanh(x)|返回x的双曲正切（hyperbolic tangent）|
Math.asinh(x)|返回x的反双曲正弦（inverse hyperbolic sine）|
Math.acosh(x)|返回x的反双曲余弦（inverse hyperbolic cosine）|
Math.atanh(x)|返回x的反双曲正切（inverse hyperbolic tangent）|
`**`|指数运算符|`2 ** 3 // 8`
`**=`|赋值运算符|`let b = 3;b **= 3;  // b = b * b * b`

```javascript
//Number.EPSILON的实质是一个可以接受的误差范围
function withinErrorMargin (left, right) {   //误差检查函数
  return Math.abs(left - right) < Number.EPSILON
}
withinErrorMargin(0.1 + 0.2, 0.3)
// true
withinErrorMargin(0.2 + 0.2, 0.3)
// false
```

## 4 数组的扩展

4.1 Array.from() ---将两类对象转为真正的数组

- 数组的对象（array-like object）
- 可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
//实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});
// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

4.2 Array.of() ---将一组值，转换为数组

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

4.3 copyWithin() ---在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

`Array.prototype.copyWithin(target, start, end)`

- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)   // [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)   // [4, 2, 3, 4, 5], -2相当于3号位，-1相当于4号位
// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)  // {0: 1, 3: 1, length: 5}
// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);   // Int32Array [3, 4, 5, 4, 5]
// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

4.4 数组实例的find()和findIndex()

- find()，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
- findIndex()的用法与find()非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
})   // 10
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
[NaN].indexOf(NaN)   // -1
[NaN].findIndex(y => Object.is(NaN, y))   // 0
```

4.5 fill() ---使用给定值，填充一个数组

```javascript
['a', 'b', 'c'].fill(7)   // [7, 7, 7]
new Array(3).fill(7)   // [7, 7, 7]
// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
['a', 'b', 'c'].fill(7, 1, 2)   // ['a', 7, 'c']
```

4.6 entries()，keys()和values() ---遍历数组

- 都返回一个遍历器对象Iterator，可以用for...of循环进行遍历
- keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
- 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历

```javascript
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}   // 0 "a",  1 "b"
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
```

4.7 Array.prototype.includes() ---返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, NaN].includes(NaN); // true
//第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

4.8 数组推导（array comprehension

允许直接通过现有数组生成新数组。这项功能本来是要放入ES6的，但是TC39委员会想继续完善这项功能，让其支持所有数据结构（内部调用iterator对象），不像现在只支持数组，所以就把它推迟到了ES7。Babel转码器已经支持这个功能。

```javascript
var a1 = [1, 2, 3, 4];
var a2 = [for (i of a1) i * 2]; // a2 = [2, 4, 6, 8]
var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];
[for (year of years) if (year > 2000) year]; // [ 2006, 2010, 2014 ]
[for (year of years) if (year > 2000) if(year < 2010) year]; // [ 2006]
[for (year of years) if (year > 2000 && year < 2010) year]; // [ 2006]
var customers = [
  {
    name: 'Jack',
    age: 25,
    city: 'New York'
  },
  {
    name: 'Peter',
    age: 30,
    city: 'Seattle'
  }
];
var results = [
  for (c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
];
results // { name: "Peter", age: 30 }
```

