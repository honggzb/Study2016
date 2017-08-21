/*
* 数组解构赋值
*/
{
  let a,b,rest;
  [a,b]=[1,2];
  console.log("a="+a+",b="+b);
}
//数值的解构赋值
{
  let a,b,rest;   
  [a,b,...rest]=[1,2,4,5,6];
  console.log(a,b,rest);
}
//对象的解构赋值
{
  let a,b;    
  ({a,b}={a:1,b:2});
  console.log(a, b);
}
//
{
  let a,b,c;
  [a,b,c=3]=[1,2];
  console.log(a,b,c); //1 2 3
}
{
  let a,b,c;
  [a,b,c]=[1,2];
  console.log(a,b,c);   //1 2 undefined, c=undefined
}
//适用场景1- 变量交换
{
  let a=1, b=2;
  [a,b]=[b,a];
  console.log(a,b);    //2 1
}
//适用场景2- 快速得到函数的返回值，并赋给多个变量
{
  function f(){
    return [1,2];
  }
  let a,b;
  [a,b] = f();
  console.log(a,b);  //1 2
}
//适用场景3
{
  function f(){
    return [1,2,3,4,5];
  }
  let a,b;
  [a,,,b] = f();
  console.log(a,b);  //1 4
}
//适用场景4
{
  function f(){
    return [1,2,3,4,5];
  }
  let a,b;
  [a,,...b] = f();
  console.log(a,b);  //1 [3, 4, 5]
}
/*
* 对象解构赋值
*/
{
  let o={p:42,q:true};
  let {p,q} =o;
  console.log(p,q);   //42 true
}
{
  let {a=10,b=5}={a:3};
  console.log(a,b);   //3 5
}
//适用场景1- json的处理，特别用于api数据的处理
{
  let metaData = {
    title: 'abc',
    test: [{
      title: 'test',
      desc: "description"
    }]
  };
  let {title:esTitle, test:[{title:cnTitle}]}=metaData;
  console.log(esTitle,cnTitle);   //abc test
}