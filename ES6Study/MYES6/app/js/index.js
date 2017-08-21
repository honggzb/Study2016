//import 'babel-polyfill';  //for lesson 4,5,6，15 兼容ES7
import './class/lesson17';

//lesson17.js
// import {A,test, Hello} from './class/lesson17.js';
// console.log(A,test, Hello);
// 2) 当导出的内容非常多的时候
// import * as lesson from './class/lesson17.js';
// console.log(lesson.A);
// console.log(lesson.test);
// console.log(lesson.Hello);
//3) 优化写法的引用
import lesson17 from './class/lesson17.js';
console.log(lesson17.A);
console.log(lesson17.test);
console.log(lesson17.Hello);
