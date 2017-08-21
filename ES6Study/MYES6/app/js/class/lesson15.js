/*
* Iterator
 */
{
  let tell = function*() {
    yield 'hello';
    yield 'world';
    return 'ending';
  };
  let k = tell();
  console.log(k.next());   //Generator函数开始执行，直到遇到第一个yield表达式为止
  console.log(k.next());   //Generator函数从上次yield表达式停下的地方，一直执行到下一个yield表达式
  console.log(k.next());   //Generator函数从上次yield表达式停下的地方，一直执行到下一个yield表达式
  console.log(k.next());   //此时Generator函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值
}
// 由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator接口
{
  let obj = {};
  obj[Symbol.iterator] = function*() {   //Generator函数赋值给Symbol.iterator属性，从而使得obj对象具有了 Iterator 接口，可以被...运算符遍历了
    yield 1;
    yield 2;
    yield 3;
  }
  for(let value of obj){
    console.log('value=', value);
  }
  console.log(...obj);   //1 2 3
}
//Generator函数是一个状态机，封装了多个内部状态
{
  let state = function* () {
    while(1){
      yield 'a';
      yield 'b';
      yield 'c';
    }
  }
  let s = state();
  console.log(s.next());   //通过 next()来获取当前状态
  console.log(s.next());
  console.log(s.next());
  console.log(s.next());
  console.log(s.next());
}
//async语法糖
// {
//   let state = async function() {
//     while(1){
//       await 'a';
//       await 'b';
//       await 'c';
//     }
//   }
//   let s = state();
//   console.log(s.next());   //通过next()来获取当前状态
//   console.log(s.next());
//   console.log(s.next());
//   console.log(s.next());
//   console.log(s.next());
// }
// 案例 - 抽奖按钮
{
  let draw = function (count) {
    console.info(`剩余${count}`);
  }
  let residue = function*(count) {
    while(count >0){    //如果count<=0的时候，抽奖逻辑将不再执行，即点击按钮不再起作用
      count--;
      yield draw(count);
    }
  }
  let star = residue(5);
  let btn = document.createElement('button');
  btn.id = 'start';
  btn.textContent = '抽奖';
  document.body.appendChild(btn);
  document.getElementById('start').addEventListener('click',function(e){
    star.next();
  },false);
}
// 案例 - 长轮询简化
{
  let ajax = function* () {
    yield new Promise(function (resolve, reject) {
      setTimeout(function() {
        resolve({code: 1})
      }, 200);
    })
  };
  let pull = function () {
    let generator = ajax();
    let step = generator.next();
    step.value.then(function (d) {
      if(d.code!=0){
        setTimeout(function() {
          console.info('查询中。。。');
        }, 1000);
      }else{
        console.log(d);
      }
    })
  };
  pull();
}
// 案例 - 异步操作的同步化表达
// {
//   function* loadUI() {
//     showLoadingScreen();
//     yield loadUIDataAsynchronously();
//     hideLoadingScreen();
//   }
//   var loader = loadUI();   //第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器
//   loader.next();    // 加载UI, 下一次对该遍历器调用next方法，则会显示Loading界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）
//   loader.next();   // 卸载UI, 再一次使用next方法，则会隐藏Loading界面
// }
