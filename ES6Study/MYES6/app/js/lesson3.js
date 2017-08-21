/*
* 正则扩展-新增加的特性
*/
{
  //ES5
  let regex = new RegExp('xyz','i');
  let regex2 = new RegExp(/xyz/i);
  console.log(regex.test('xyz123'),regex2.test('xyz123'));
  //ES6中新增加的写法，容许第二个参数新定义修饰符，来代替原来的修饰符
  let regex3 = new RegExp(/xyz/ig, 'i');
  console.log(regex3.test('xyz123'));
  console.log(regex3.flags);  //i代替了ig
}
//y修饰符
{
  let s = 'bbb_bb_b';
  let a1 = /b+/g;
  let a2 = /b+/y;
  console.log("one",a1.exec(s),a2.exec(s));   //one ["bbb"] ["bbb"]
  console.log("two",a1.exec(s),a2.exec(s));  //two ["bb"] null
  console.log(a1.sticky, a2.sticky);    //false true
}
//u修饰符, unicode字符处理
{
  console.log('u-1',/^\uD83D/.test('\uD83D\uDC2A'));   //u-1 true， 将\uD83D\uDC2A当成两个个字符
  console.log('u-2',/^\uD83D/u.test('\uD83D\uDC2A'));  //u-2 false，加了u修饰符，将\uD83D\uDC2A当成一个字符
  
  console.log(/\u{61}/.test('a'));   //false
  console.log(/\u{61}/u.test('a'));   //true, 加了u修饰符，将\u{61}当成一个字符
  
  console.log('\u{20BB7}');    //𠮷, 大于两个字节的符号
  let s='𠮷';    //将大于两个字节的符号赋给s
  console.log('u-1',/^.$/.test(s));  //u-1 false， .无法匹配任何字符
  console.log('u-2',/^.$/u.test(s)); //u-2 true, 加了uu修饰符，.可匹配任何字符
  
  console.log('test',/𠮷{2}/.test('𠮷𠮷'));   //test false
  console.log('test',/𠮷{2}/u.test('𠮷𠮷'));   //test true
  
  //s修饰符（ES6还未支持）, 用于 .无法处理四个特殊字符，换行符、回车符，行分隔符和段分隔符的情况
} 
