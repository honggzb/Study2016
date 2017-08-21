/*
* Iterator
 */
{
  let arr= ['hello','world'];
  let map = arr[Symbol.iterator]();  //注意： [Symbol.iterator]是方法
  console.log(map.next());
  console.log(map.next());
  console.log(map.next());
}
// ES6的有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被for...of循环遍历。原因在于，这些数据结构原生部署了Symbol.iterator属性，另外一些数据结构没有（比如对象）
// 部署Object的Iterator接口
{
  let obj = {
    start: [1,2,3],
    end: [7,9,8],
    [Symbol.iterator](){   //部署Object的Iterator接口, 定义遍历的顺序
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);
      let len = arr.length;
      return {
        next(){    //note: 必须有next方法
          if(index<len){
            return {
              value: arr[index++],
              done: false
            } 
          }else{                //遍历结束
            return {
              value: arr[index++],
              done: true
            }
          }
        }
      }
    }
  }
  for(let key of obj){
    console.log(key);
  }
}
//遍历器实现指针结构
{
  function Obj(value) {
    this.value = value;
    this.next = null;
  }
  Obj.prototype[Symbol.iterator] = function() {
    var iterator = { next: next };
    var current = this;
    function next() {
      if (current) {
        var value = current.value;
        current = current.next;
        return { done: false, value: value };
      } else {
        return { done: true };
      }
    }
    return iterator;
  }
  var one = new Obj(1);
  var two = new Obj(2);
  var three = new Obj(3);
  one.next = two;
  two.next = three;
  for (var i of one){
    console.log(i);      // 1, 2, 3
  }
}
//调用 Iterator 接口的场合
{
  //（1）解构赋值: 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法
  let set = new Set().add('a').add('b').add('c');
  let [x,y] = set;              // x='a'; y='b'
  let [first, ...rest] = set;   // first='a'; rest=['b','c'];
  //（2）扩展运算符: 扩展运算符（...）也会调用默认的 Iterator 接口
  var str = 'hello';
  [...str];                    //  ['h','e','l','l','o']
  let arr = ['b', 'c'];
  ['a', ...arr, 'd'];             // ['a', 'b', 'c', 'd']
  //（3）yield*: yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
}
