- this指向当前函数的拥有者-既上下文执行，只能在函数内部使用
- 上下文执行对象在函数内部取决于函数的被调用方式
- 使用call，apply可改变上下文执行对象

```javascript
// 1. this指向pet对象
var pet = {
  words: '...',
  speak: function(){
    console.log(this.words);
    console.log(this === pet);    //true, this指向pet对象
  }
}
pet.speak();

// 2. 构造函数中，指向新构建好的对象
function Pet(words) {
  this.words = words;
  this.speak = function () {
    console.log(this.words);
    console.log(this);         //true, this指向pet对象
  }
}
var cat = new Pet('...');
cat.speak();

//3. 默认指向全局对象
function pet(words) {
  this.words = words;
  console.log(this.words);
  console.log(this === global); //true, this指向全局对象
}
pet('...');
```
