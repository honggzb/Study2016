使用Rest参数，ES6为我们提供一种新的方式来创建可变参数的函数，可以用来代替 arguments 对象。

```javascript
let fn = function(word, ...names) {
    let len = names.length;
    for (let i = 0; i < len; i++) {
        console.log(word + ' ' + names[i]);
    }
};
fn('Hello', 'A', 'B', 'C');
// Hello A
// Hello B
// Hello C
```

- 参数默认值的表达式是在函数调用时从左到右计算的，这意味着表达式可以使用前面已经被填充的参数
- 如果将 ... 用在数组之前，就会将数组拆分成逗号分割的参数
  - 利用扩展运算符 ...，**快速合并多个数组**
  - 利用扩展运算符 ...，**快速将字符串转换成数组**

```javascript
let arr = ['X', 'Y', 'Z'];
fn('Hi', ...arr);
// Hi X
// Hi Y
// Hi Z
let arr1 = [1, 2, 3],
    arr2 = [4, 5, 6],
    arr3 = [7, 8, 9],
    newArr = [...arr1, ...arr2, ...arr3];
console.log(newArr); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
//还可以将字符串转换成数组
console.log([...'Banri']); // [ 'B', 'a', 'n', 'r', 'i' ]
```
