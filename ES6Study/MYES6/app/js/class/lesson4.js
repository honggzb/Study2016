/*
* 字符串扩展
*/
//Unicode表示法
{
  console.log('a','\u0061');   //a a
  console.log('s','\u20BB7');   //s ₻7, 如果Unicode编码大于两个字符
  console.log('s','\u{20BB7}');   //s 𠮷，ES6使用{}可正常显示于两个字符的Unicode
}
{
  //ES5
  let s ='𠮷';
  console.log('length',s.length);  //length 2
  //取字符
  console.log('0',s.charAt(0));  //0 �
  console.log('1',s.charAt(1));  //1 �
  //取码值
  console.log('at0',s.charCodeAt(0));  //at0 55362
  console.log('at1',s.charCodeAt(1));  //at1 57271
  //ES6
  let s1 ='𠮷a';
  console.log('length',s1.length);    //length 3
  console.log('code0',s1.codePointAt(0));    //code0 134071
  console.log('code0',s1.codePointAt(0).toString(16));  //code0 20bb7, 转换为16进制
  console.log('code1',s1.codePointAt(1));  //code1 57271， 取的是后两个字节
  console.log('code2',s1.codePointAt(2));  //code2 97, 取的是a
}
//difference function in es5 and es6
{
  console.log(String.fromCharCode("0x20bb7"));   //ஷ, ES5
  console.log(String.fromCodePoint("0x20bb7"));  //𠮷, ES6, 正常显示大于两个字符的uicode字符
}
//handle
{
  let str='\u{20bb7}abc';
  for(let i=0;i<str.length;i++){
    console.log('es5',str[i]);
  }
  for(let code of str){  //直接使用let of可识别大于两个字符的uicode字符
    console.log('es6',code);   
  }
}
//new API
{
  let str = "string";
  console.log('includes', str.includes('s'));   //includes true
  console.log('start',str.startsWith('str'));   //start true
  console.log('end',str.endsWith('ng'));       //end true
  let str1="abc"; 
  console.log('repeat',str.repeat(2));        //repeat stringstring
}
/*
* 模板字符串
*/
{
  let name = "list";
  let info = "hello world";
  let m =`I am ${name}, ${info}`;
  console.log(m);    //I am list, hello world
}
//补白API
{
  console.log('1'.padStart(2,'0'));   //01, 向前补白
  console.log('1'.padEnd(2,'0'));   //10, 向后补白
}
/*标签模板
* 标签模板是函数调用的一种特殊形式, 标签指的是函数，紧跟在后面的模板字符串就是它的参数
* 用于1）防止ssl攻击，2）多语言输出
*/
{
  let user={
    name: "list",
    info: "hello world"
  };
  console.log(abc`I am ${user.name}, ${user.info}`);   //I am ,, ,listhello world， abc就是一个标签模板
  function abc(s,v1,v2){    //v1,v2指向上面两个模板字符串
    console.log('s[0]',s[0]);   //s[0] I am 
    console.log('s[1]',s[1]);   //s[1] , 
    console.log('s[2]',s[2]);   //s[2]
    console.log(s,v1,v2);   //(3) ["I am ", ", ", "", raw: Array(3)]
    return s+v1+v2;     
  }
  abc`I am ${user.name}, ${user.info}`;     //(3) ["I am ", ", ", "", raw: Array(3)]
}
//标签模板更复杂的例子
{
  var total = 30;
  var msg = passthru`The total is ${total} (${total*1.05} with tax)`;
  function passthru(literals){
      var result = "";
      var i = 0;
      while (i<literals.length){
          result += literals[i++]; //literals这个数组包括的是模板字符串中那些没有变量替换的部分，也就是The total is,(,with tax).
          if(i<arguments.length){
              result+=arguments[i]; //arguments这个数组包括的是全部的参数，因为执行到这里的时候，i已经加1，所以result连接的是模板字符串各个变量被替换后的值。也就是这里的30,31.5
          }
      }
      return result;
  }
 console.log(msg);    //The total is 30 (31.5 with tax)
}
//上个例子的进化， passthru函数采用rest参数的写法如下
{
  var total = 30;
  var msg = passthru`The total is ${total} (${total*1.05} with tax)`;
  function passthru(literals,...values){
    var output ="";
    for(var index = 0;index<values.length;index++){
        output += literals[index]+values[index];
    }
    output+=literals[index];
    return output;
  }
  console.log(msg);   //The total is 30 (31.5 with tax)
}
//标签模板的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容
{
  function SaferHTML(templateData){
    var s = templateData[0];
    var i;
    for(i = 1;i<arguments.length;i++){
        var arg = String(arguments[i]);
        s += arg.replace(/&/g,"&amp;")    //可能有特殊字符，进行转义
                .replace(/</g,"&lt;")
                .replace(/>/g,"&gt;");
        s += templateData[i];
    }
    console.log(i);    //2，表示这个循环只执行了一次，因为templateData[0]="<p>",arguments这个数组只有${sender}这个元素，后面一长串字符都是templateData[2];
    return s;
  }
  var sender = '<script>alert("abc")</script>';
  var message = SaferHTML`<p>${sender} has sent you a message.</p>`;
  console.log(message);   //<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
}
//标签模板的另一个应用是多语言转换（国际化处理）
{
  var book = {
    title:"shiji",
    author:"simaqian"
  };
  var book1 = {
      title:"sanguo",
      author:"luo"
  };
  var myBooks = [book,book1];
  function hashTemplate(templateData){
      var s = "";
      var i = 0;
      while(i<templateData.length){
          s += templateData[i++];
          if(i<arguments.length){
              s += arguments[i];
          }
      }
      return s;
  }
  var libraryHtml = hashTemplate`
      <ul>
          #for book in ${myBooks}
              <li><i>${book.title}</i> by ${book.author}</li>
          #end
      </ul>
  `;
  console.log(libraryHtml);
}
//String.raw(), 往往用来充当模板字符串的处理函数，返回一个反斜线都被转义（即反斜线前面再加一个反斜线）的字符串，对应于替换变量后的模板字符串
{
  console.log(String.raw`Hi\n${1+2}`);  //Hi\n3 无换行
  console.log(`Hi\n${1+2}`);            //有换行
}
