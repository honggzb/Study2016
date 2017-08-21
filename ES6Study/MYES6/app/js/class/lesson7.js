/*
* 函数新增特征
*/
{
  function test(x,y='world') {   //参数默认值, 注：默认值后面不能没有默认值的变量，如test(x,y='world'，c)错误，test(x,y='world'，c='123')错误
    console.log('默认值',x,y);
  }
  test('hello');        //默认值 hello world
  test('hello','kill'); //默认值 hello kill
}
{
  let x="test";
  function test2(x,y=x) {
    console.log('作用域1',x,y);
  }
  test2('kill');   //作用域1 kill kill
  let x1="test";
  function test3(c,y=x1) {
    console.log('作用域2',c,y);
  }
  test3('kill');   //作用域2 kill test
}
//rest参数
{
  function test4(...arg) { //...arg必须是最后一个参数，后面不能是其他参数
    for(let v of arg){
      console.log('rest',v);
    }
  }
  test4(1,2,3,'d');
}
{
  console.log(...[1,2,4]);        //1 2 4- 单独使用时候起分散作用
  console.log('a', ...[1,2,4]);   //a 1 2 4
}
//箭头函数
{
  let arrow = v => v*2;
  let arrow2 = (v) => 5;
  console.log('arrow', arrow(3));   //arrow 6
  console.log('arrow2', arrow2(3));   //arrow2 5
}
//尾调用是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数
{
  function tail(x) {
    console.log('tail',x);
  }
  function fx(x) {
    return tail(x);
  }
  fx(123);    //tail 123
}
