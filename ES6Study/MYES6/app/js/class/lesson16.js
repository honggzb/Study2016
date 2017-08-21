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
//案例- 日志系统
{
  let log = (type) => {
    return function(target, name, descriptor) {
      let src_method = descriptor.value;
      descriptor.value = (...args) => {
        src_method.apply(target, args);
        console.log(`log ${type}`);
      }
    }
  };
  class  AD {
    @log('show')
    show() {
      console.info('ad is show');
    }
    @log('click')
    click(){
      console.info('ad is click');
    }
  }
  let ad = new AD();
  ad.show();    //ad is show, log show
  ad.click();   //ad is click, log click
}