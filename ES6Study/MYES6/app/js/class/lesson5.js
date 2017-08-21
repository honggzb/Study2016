/*
* 数值扩展
*/
//二进制和八进制
{
  console.log(0b111110111);   //503, 二进制 
  console.log(0o767);         //503, 八进制 
}
//new API
{
  console.log('15',Number.isFinite(15));   //15 true
  console.log('NaN',Number.isFinite(NaN)); //NaN false
  console.log('1/0',Number.isFinite(1/0)); //1/0 false
  
  console.log('NaN',Number.isNaN(NaN));  //NaN true
  console.log('0',Number.isNaN(0));      //NaN true
   
  console.log('24',Number.isInteger(24));      //24 true
  console.log('24.0',Number.isInteger(24.0));  //24.0 true
  console.log('24.1',Number.isInteger(24.1));  //24.1 false
  console.log('abd',Number.isInteger('abd'));  //abd false
  
  console.log(Number.MAX_SAFE_INTEGER);    //9007199254740991
  console.log(Number.MIN_SAFE_INTEGER);    //-9007199254740991
  
  console.log('10', Number.isSafeInteger(10));  //10 true
  console.log('a', Number.isSafeInteger('a'));  //a false
  
  //Math.trunc()-取整
  console.log('10.2', Math.trunc(10.2));  //10.2 10
  console.log('10.5', Math.trunc(10.5));  //10.5 10
  console.log('10.9', Math.trunc(10.9));  //10.9 10
  
  //Math.sign()-判断正数、负数，零
  console.log('-5', Math.sign(-5));  //-5 -1
  console.log('0', Math.sign(0));  //0 0
  console.log('5', Math.sign(5));  //5 1
  console.log('5.4', Math.sign(5.4));  //5.4 1
  console.log('50', Math.sign('50'));  //50 1, 将字符50转换为数字对象，返回1
  console.log('foo', Math.sign('foo'));  //foo NaN，字符串无法转换，返回NaN
  
  //Math.cbrt()- 立方根
  console.log('-1', Math.cbrt(-1)); 
  console.log('2', Math.cbrt(2)); 
}