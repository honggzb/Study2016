在ES5中，一共有9个Array方法 http://kangax.github.io/compat-table/es5/
九个方法
- Array.prototype.indexOf
- Array.prototype.lastIndexOf
- Array.prototype.every
- Array.prototype.some
- Array.prototype.forEach
- Array.prototype.map
- Array.prototype.filter
- Array.prototype.reduce
- Array.prototype.reduceRight

### indexOf()

indexOf()方法返回在该数组中第一个找到的元素位置，如果它不存在则返回-1

```javascript
var arr = ['apple','orange','pear'];
console.log("found:", arr.indexOf("orange") != -1);
```

### filter()

filter()方法创建一个新的匹配过滤条件的数组

```javascript
var arr = [
  {"name":"apple", "count": 2},
  {"name":"orange", "count": 5},
  {"name":"pear", "count": 3},
  {"name":"orange", "count": 16},
];
var newArr = arr.filter((item) => {
  return item.name === "orange";
});
console.log("Filter results:",newArr);
```

### forEach()

```javascript
var arr = [1,2,3,4,5,6,7,8];
arr.forEach(function(item,index){
  console.log(item);
});
```

### map()

map()是处理服务器返回数据时是一个非常实用的函数。

```javascript
var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];
function getNewArr(){
  return oldArr.map((item,index) => {
    item.full_name = [item.first_name,item.last_name].join(" ");
    return item;
  });

}
```

###  reduce()

reduce()将数组的每个值（从左到右）将其降低到一个值

`array.reduce(callback[, initialValue]);`

- callback : 函数执行在数组中每个值
- callback(previousValue, currentValue, index, array) : 对象作为第一个参数回调的第一次调用使用
  - previousValue   如果指定了initialValue，那就用initialValue 或者 是上一次循环返回的值
  - currentValue   当前执行到的数组的值
  - index          当前执行到的数组的下标
  - array          执行reduce的array

```javascript
var sum = [1, 2, 3, 4].reduce(function (previous, current, index, array) {
  return previous + current;
});
console.log(sum); // 10
// 二维数组扁平化
var matrix = [
  [1, 2],
  [3, 4],
  [5, 6]
];
var flatten = matrix.reduce(function (prev, cur) {
  return prev.concat(cur);
});
console.log(flatten); // [1, 2, 3, 4, 5, 6]
//统计一个数组中有多少个不重复的单词
var arr = ["apple","orange","apple","orange","pear","orange"];
//不使用reduce时
function getWordCnt(){
  var obj = {};
  for(var i= 0, l = arr.length; i< l; i++){
    var item = arr[i];
    obj[item] = (obj[item] +1 ) || 1;
  }
  return obj;    //object{apple:2, orange: 3, pear: 1}
}
//使用reduce时
function getWordCnt(){
  return arr.reduce( function(prev,next) {
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  },{});
}
//object{apple:2, orange: 3, pear: 1}
```
