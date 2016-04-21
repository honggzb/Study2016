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

  | 说明 | 例子
--|--|--
RegExp构造函数|RegExp('字符串', '正则表达式的修饰符（flag）')|match()、replace()、search()、split()

### 3 数值的扩展
| 说明 | 例子
--|--|--
二进制数值|用前缀0b（或0B）表示|
八进制数值|用前缀0o（或0O）表示|
检查Infinite和NaN两个特殊值|Number.isFinite()和Number.isNaN()|与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false
Number.parseInt()和Number.parseFloat()|Number对象方法|将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变，`Number.parseInt === parseInt // true`
Number.isInteger()|判断一个值是否为整数|
Number.EPSILON|极小的常量|`Number.EPSILON  // 2.220446049250313e-16, Number.EPSILON.toFixed(20) // '0.00000000000000022204'`
Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER两个常量|表示整数范围的上下限|
Number.isSafeInteger()|则是用来判断一个整数是否落在整数范围之内, 如上

### Math对象的扩展

| 说明 | 例子
--|--|--
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
