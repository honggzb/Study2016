/*
* 数组扩展
*/
{
  let arr = Array.of(3,4,5,9,11);   //将一组数据变量转换为数组
  console.log('arr=', arr);
  let empty = Array.of();
  console.log('empty=', empty);
}
//Array.from(array, [function(){}])
{
  let p = document.querySelectorAll('p');
  console.log(p);
  let pArr = Array.from(p);   //将集合转换为数组
  pArr.forEach( item =>  console.log(item.textContent))
  
  console.log(Array.from([1,3,4], function(item){ return item*2 }));
//Array.fill()-替换
  console.log('fill-7', [1,'a',undefined].fill(7));       //fill-7 (3) [7, 7, 7]
  console.log('fill,pos', ['a', 'b', 'c'].fill(7, 1, 3)); //fill,pos (3) ["a", 7, 7] - 替换从第1到第3个
//遍历相关
{
  for(let i of ['1','c','ks'].keys()){
    console.log('keys', i);
  }
  for(let i of ['1','c','ks'].values()){
    console.log('values', i);
  }
  for(let [i, v] of ['1','c','ks'].entries()){
    console.log('index', i, ', value', v);
  }
}
//复制
{
  console.log([1,2,3,4,5].copyWithin(0,3,4));   //开始位置，替换开始位置，替换截止位置- [4, 2, 3, 4, 5]
//查找- find/findIndex： 只找到符合条件的第一个
  console.log([1,2,3,4,5,6].find(function(item){return item>3;}));   //4
  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3;}));   //3
//
  console.log('number', [1,2,NaN].includes(1));   //number true
  console.log('NaN', [1,2,NaN].includes(NaN));   //NaN true
}