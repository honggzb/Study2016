/*
ES6模块化
 */
// export let A = 13;
// export function test(){
//   console.log('test');
// }
// export class Hello{
//   test(){
//     console.log('class');
//   }
// }
// 优化写法
let A = 13;
function test(){
  console.log('test');
}
class Hello{
  test(){
    console.log('class');
  }
}

export default {
  A,
  test,
  Hello
}