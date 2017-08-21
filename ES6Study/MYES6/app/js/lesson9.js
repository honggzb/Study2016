/*
* Symbol数据类型-ES6新增类型 
 */
//Symbol声明
{
  let a1 = Symbol();
  let a2 = Symbol();
  console.log(a1 === a2);   //false
  let a3 = Symbol.for('a3');   //'a3'是key值
  let a4 = Symbol.for('a3');   //'a3'是key值
  console.log(a3 === a4);    //true
}
{
  let a1 = Symbol.for('abc');
  let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
  };
  console.log(obj);
  //有Symbol时候无法使用let取到值
  for(let [key,value] of Object.entries(obj)){
    console.log('let of - ', key, value);
  }
  //只取到Symbol中的值
  Object.getOwnPropertySymbols(obj).forEach(function(item){
    console.log('getOwnPropertySymbols - ',item, obj[item]);
  });
  Reflect.ownKeys(obj).forEach(function(item){
    console.log('Reflect.ownKeys - ', item, obj[item]);
  });
}