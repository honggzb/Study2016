## js之高阶函数、map/reduce/filter/sort

### 1. 高阶函数 Higher-order function

一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数, 编写高阶函数，就是让函数的参数能够接收别的函数。

```javascript
function add(x, y, f) {
    return f(x) + f(y);
}
add(-5, 6, Math.abs)
```

在ES5中，一共有9个Array方法 http://kangax.github.io/compat-table/es5/

- Array.prototype.indexOf
- Array.prototype.lastIndexOf
- Array.prototype.every
- Array.prototype.some
- Array.prototype.forEach
- Array.prototype.map
- Array.prototype.filter
- Array.prototype.reduce
- Array.prototype.reduceRight

### 2. 高阶函数之map

map()对数组的每个元素进行一定操作（映射）后，会返回一个新的数组, map()接收的回调函数可以有3个参数：`arr.map(function(currentValue, index, array){ ... });`

```javascript
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow);  // [1, 4, 9, 16, 25, 36, 49, 64, 81]
//
var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];
function getNewArr(ordArr){
  return oldArr.map(function(item,index){
    item.full_name = [item.first_name,item.last_name].join(" ");
    return item;
  });
}  // [{first_name:"Colin",last_name:"Toh", full_name: "Colin Toh"},{first_name:"Addy",last_name:"Osmani", full_name: "Addy Osmani"},{first_name:"Yehuda",last_name:"Katz", full_name: "Yehuda Katz"}];
//1 reverse a string
var str = '12345';
Array.prototype.map.call(str, function(x) {
  return x;
}).reverse().join('');  // Output: '54321'
//2 把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字
var arr1 = ['adam', 'LISA', 'barT'];
arr1.map(function (x) {
    x = x.toLowerCase();
    x = x.charAt(0).toUpperCase()+x.substr(1);
    return x;
});
//3 字符串转换为Number之map篇
var arr = "12324";
function string2int(arr){
    return arr.split("").map(function (x) {
          return  parseInt(x);
      }).join("");
 }
console.log(parseInt(string2int(arr)));  
```

### 3. 高阶函数之reduce

reduce()可以实现一个累加器的功能，将数组的每个值（从左到右）将其降低到一个值。reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是：

`[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)`

`[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
  return previousValue + currentValue;
});`

```javascript
var arr = [1, 3, 5, 7, 9];
// 1 对一个Array求和
arr.reduce(function (x, y) {
    return x + y;
}); // 25
// 2 把Array[1, 3, 5, 7, 9]变换成整数13579
arr.reduce(function (x, y) {
    return x * 10 + y;
}); // 13579
// 3 字符串转换为Number之reduce篇
function string2int(arr){ 
  arr =  arr.split("");
  return arr.reduce(function (x, y) {
      return (x*1 + y)*1;
  })*1;   // 最后的*1是为特殊情况 string2int('0')
}
// 4 统计一个数组中有多少个不重复的单词
var arr = ["apple","orange","apple","orange","pear","orange"];
function getWordCnt(){
  return arr.reduce(function(prev,next){
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  },{});
}
```

### 4. 高阶函数之filter

- 用于把Array的某些元素过滤掉，然后返回剩下的元素
- 和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素

```JavaScript
//删掉偶数，只保留奇数
[1, 2, 4, 5, 6, 9, 10, 15].filter(function (x) {
    return x % 2 !== 0;
});  // [1, 5, 9, 15]
//删掉空字符串
['A', '', 'B', null, undefined, 'C', '  '].filter(function (x) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});  // ['A', 'B', 'C']
```

### 5. 高阶函数之sort

- sort()方法默认把所有元素先转换为String再排序
- 返回的结果仍是当前Array

```JavaScript
//按数字大小排序, 如直接使用sort()会出现错误 , [10, 20, 1, 2].sort(); // [1, 10, 2, 20]
[10, 20, 1, 2]..sort(function (x, y) {
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
}); // [1, 2, 10, 20]
//倒序排序
[10, 20, 1, 2]..sort(function (x, y) {
    if (x < y) { return 1; }
    if (x > y) { return -1; }
    return 0;
});  // [20, 10, 2, 1]
//忽略大小写，按照字母序排序, ['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']
['Google', 'apple', 'Microsoft'].sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) { return -1;}
    if (x1 > x2) { return 1; }
    return 0;
}); // ['apple', 'Google', 'Microsoft']
```

> Reference

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- [廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499355829ead974e550644e2ebd9fd8bb1b0dd721000)

