/*
* 对象扩展
*/
{
  let o=1,k=2;
  let es5 = {
    o: o,
    k: k
  };
  //ES6简介表示法
  let es6={ o, k};
  console.log('es5', es5, 'es6', es6);
  
  let es5_method = {
    hello: function(){
      console.log("hello");
    }
  };
  let es6_method = {
    hello(){
      console.log("hello");
    }
  };
  es5_method.hello();
  es6_method.hello();
}
//属性表达式
{
  let a = 'b';
  let es5_obj = {
    a: 'c',
    b: 'c'
  };
  let es6_obj ={
    [a]: 'c'   //[]-指表达式
  }
  console.log(es5_obj);    //{a: "c", b: "c"}
  console.log(es6_obj);   //{b: "c"}
}
//新增API
{
  console.log('字符串',Object.is('abc','abc'), 'abc'==='abc');   //字符串 true true, 等同于'abc'==='abc'
  console.log('数组', Object.is([],[]),[]===[]);   //数组 false false, 等同于[]===[]
  console.log('拷贝', Object.assign({a:'a'},{b:'b'}));   //浅拷贝
  let test ={k: 123, o:456};
  for(let [key,value] of Object.entries(test)){
    console.log([key,value]);
  }
}
//扩展运算符，babel的支持不太友好
{
  let {a,b,...c} = {a:'test',b:'kill',c:'ddd',d:'ccc'};
  //结果是
  c ={
    c:'ddd',
    d:'ccc'
  }
}