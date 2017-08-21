/*
* 修饰器Decorator
 */
{
  let readonly = function (target, name,descriptor) {
    descriptor.writable = false;
    return descriptor;
  }
  class Test {
    @readonly
    time(){
      return '2017-03-11';
    }
  }
  let test = new Test();
  // console.log(test.time());
  // test.time = function () {
  //   console.log('reset time'); 
  // };
  console.log(test.time());    //Uncaught TypeError: Cannot assign to read only property 'time' of object '#<Test>'
}
{
  let typename = function (target, name,descriptor) { 
    target.myname = 'hello';  //增加一个静态属性
  }
  @typename
  class Test{
    
  }
  console.log('类修饰符', Test.myname);   //类修饰符 hello
}
