## 实用的JavaScript技巧、窍门和最佳实践

1. [使用===，而不是＝＝](#11)
2. [使用闭包实现私有变量](#22)
3. [创建对象的构造函数](#33)
4. [**IIFE**--Immediately Invoked Function Expression](#44)
5. [不要使用 delete 来删除一个数组中的项](#44)
6. [使用 length 来截短一个数组](#66)
7. [AND/OR 做条件判断](#77)
8. [使用for-in遍历一个对象内部属性的时候注意检查属性](#88)
9. [缓存需要计算和查询（calculation or querying）的变量](#99)
10. [避免使用 eval() 和 Function 构造函数](#110)
11. [避免使用 with()](#111)
12. [避免使用 for-in 来遍历一个数组](#112)
13. [避免使用 with()](#113)
14. [在调用 setTimeout() 和 setInterval() 的时候传入函数，而不是字符串](#114)
15. [为创建的对象指定prototype对象](#115)
16. [为 XMLHttpRequests 设置超时](#116)
17. [处理WebSocket超时](#117)
18. [牢记，原始运算符始终比函数调用要高效](#118)
19. [从数组中获取一个随机项](#119)
20. [在特定范围内获取一个随机数](#120)
21. [在0和设定的最大值之间生成一个数字数组](#121)
22. [生成一个随机的数字字母字符串](#122)
23. [打乱一个数字数组](#123)
24. [附加（append）一个数组到另一个数组上](#124)
25. [将arguments对象转换成一个数组](#125)
26. [验证参数是否是数字（number](#126)
27. [验证参数是否是数组](#127)
28. [获取一个数字数组中的最大值或最小值](#128)
29. [清空一个数组](#129)


<h3 id="11">1. 使用===，而不是==</h3>

==（或!=）操作符在需要的时候会自动执行类型转换。===（或!==）操作不会执行任何转换。它将比较值和类型，而且在速度上也被认为优于==

```javascript
[10] === 10    // is false
[10]  == 10    // is true
'10'  == 10     // is true
'10' === 10    // is false
 []   == 0     // is true
 []  === 0     // is false
 ''  == false   // is true but true == "a" is false
 '' === false   // is false
```

<h3 id="#22">2. 使用闭包实现私有变量</h3>
```javascript
function Person(name, age) {
    this.getName = function() { return name; };
    this.setName = function(newName) { name = newName; };
    this.getAge = function() { return age; };
    this.setAge = function(newAge) { age = newAge; };
    
    //未在构造函数中初始化的属性
    var occupation;
    this.getOccupation = function() { return occupation; };
    this.setOccupation = function(newOcc) { occupation = 
                         newOcc; };
}
```

<h3 id="#33">3. 创建对象的构造函数</h3>

```javascript
function Person(firstName, lastName){
    this.firstName =  firstName;
    this.lastName = lastName;
}
 
var Saad = new Person("Saad", "Mousliki");
```

<h3 id="#44">4. IIFE-Immediately Invoked Function Expression </h3>

创建后立即自动执行函数

```javascript
(function(){
	// some private code that will be executed automatically
})();
(function(a,b){
    var result = a+b;
    return result;
})(10,20)
```

<h3 id="#44">5. 不要使用 delete 来删除一个数组中的项</h3>

使用 splice 而不要使用 delete 来删除数组中的某个项。使用 delete 只是用 undefined 来替换掉原有的项，并不是真正的从数组中删除。

不要使用这种方式：

```javascript
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ];
items.length;      // return 11
delete items[3];   // return true
items.length;      // return 11
/* items will be equal to [12, 548, "a", undefined × 1, 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119]   */
```

而使用：

```javascript
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ];
items.length;   // return 11
items.splice(3,1) ;
items.length;   // return 10
/* items will be equal to [12, 548, "a", 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119]   */
```
delete 方法应该被用来删除一个对象的某个属性。

<h3 id="#66">6. 使用 length 来截短一个数组</h3>

```javascript
var myArray = [12 , 222 , 1000 , 124 , 98 , 10 ];
myArray.length = 4; 
// myArray will be equal to [12 , 222 , 1000 , 124].
```

此外，如果你将一个数组的 length 设置成一个比现在大的值，那么这个数组的长度就会被改变，会增加新的 undefined 的项补上。 数组的 length 不是一个只读属性。

```javascript
myArray.length = 10;   // the new array length is 10
myArray[myArray.length - 1] ;   // undefined
```

<h3 id="#77">7. AND/OR 做条件判断</h3>

```javascript
var foo = 10;
foo == 10 && doSomething();  // 等价于 if (foo == 10) doSomething();
foo == 5 || doSomething();   // 等价于 if (foo != 5) doSomething();
```

逻辑 AND 还可以被使用来为函数参数设置默认值

```javascript
function doSomething(arg1){
    Arg1 = arg1 || 10; 
// 如果arg1没有被设置的话，Arg1将被默认设成10
}
```

<h3 id="#88">8. 使用for-in遍历一个对象内部属性的时候注意检查属性</h3>

下面的代码片段能够避免在遍历一个对象属性的时候访问原型的属性

```javascript
for (var name in object) {
    if (object.hasOwnProperty(name)) {
		// do something with name
    }
}
```

<h3 id="#99">9. 缓存需要计算和查询（calculation or querying）的变量</h3>

对于jQuery选择器，我们最好缓存这些DOM元素。

```javascript
var navright = document.querySelector('#right');
var navleft = document.querySelector('#left');
var navup = document.querySelector('#up');
var navdown = document.querySelector('#down');
```

<h3 id="#110">10. 避免使用 eval() 和 Function 构造函数</h3>

使用 eval 和 Function 构造函数是非常昂贵的操作，因为每次他们都会调用脚本引擎将源代码转换成可执行代码。

```javascript
var func1 = new Function(functionCode);
var func2 = eval(functionCode);
```

<h3 id="#111">11. 避免使用 with()</h3>

使用 with() 会插入一个全局变量。因此，同名的变量会被覆盖值而引起不必要的麻烦。

<h3 id="#112">12. 避免使用 for-in 来遍历一个数组</h3>

```javascript
var sum = 0;
for (var i in arrayNumbers) {
    sum += arrayNumbers[i];
}
```

更好的方式是：

```javascript
var sum = 0;
for (var i = 0, len = arrayNumbers.length; i < len; i++) {
    sum += arrayNumbers[i];
}
```

附加的好处是，i 和 len 两个变量的取值都只执行了一次，会比下面的方式更高效：

    for (var i = 0; i < arrayNumbers.length; i++)

为什么？因为arrayNumbers.length每次循环的时候都会被计算。

<h3 id="#114">14. 在调用 setTimeout() 和 setInterval() 的时候传入函数，而不是字符串</h3>

如果你将字符串传递给 setTimeout() 或者 setInterval()，这个字符串将被如使用 eval 一样被解析，这个是非常耗时的。

不要使用：

```javascript
setInterval('doSomethingPeriodically()', 1000);
setTimeOut('doSomethingAfterFiveSeconds()', 5000)
```

而用：

```javascript
setInterval(doSomethingPeriodically, 1000);
setTimeOut(doSomethingAfterFiveSeconds, 5000);
```

<h3 id="#115">15. 为创建的对象指定prototype对象</h3>

写一个函数来创建一个以指定参数作为prototype的对象是有可能：

```javascript
function clone(object) {
    function OneShotConstructor(){};
    OneShotConstructor.prototype= object;
    return new OneShotConstructor();
}
clone(Array).prototype ;  
// []
```

<h3 id="#116">16. 为 XMLHttpRequests 设置超时</h3>

在一个XHR请求占用很长时间后（比如由于网络问题），你可能需要中止这次请求，那么你可以对XHR调用配套使用 setTimeout()。

```javascript
var xhr = new XMLHttpRequest ();
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        clearTimeout(timeout);
        
// do something with response data
    }
}
var timeout = setTimeout( function () {
    xhr.abort(); 
// call error callback
}, 60*1000 
/* timeout after a minute */
 );
xhr.open('GET', url, true);  
 
xhr.send();
```

此外，一般你应该完全避免同步的Ajax请求。

<h3 id="#117">17. 处理WebSocket超时</h3>

通常，在一个WebSocket连接创建之后，如果你没有活动的话，服务器会在30秒之后断开（time out）你的连接。防火墙也会在一段时间不活动之后断开连接。

为了防止超时的问题，你可能需要间歇性地向服务器端发送空消息。要这样做的话，你可以在你的代码里添加下面的两个函数：一个用来保持连接，另一个用来取消连接的保持。通过这个技巧，你可以控制超时的问题。

使用一个 timerID：

```javascript
function keepAlive() {
    var timeout = 15000;
    if (webSocket.readyState == webSocket.OPEN) {
        webSocket.send('');
    }
    timerId = setTimeout(keepAlive, timeout);
}
function cancelKeepAlive() {
    if (timerId) {
        cancelTimeout(timerId);
    }
}
```

<h3 id="#118">18. 牢记，原始运算符始终比函数调用要高效</h3>

举例来说，不使用：

```javascript
var min = Math.min(a,b);
A.push(v);
```

而用：

```javascript
var min = a < b ? a b;
A[A.length] = v;
```

<h3 id="#119">19. 从数组中获取一个随机项</h3>

```javascript
var items = [12,548 ,'a' ,2 ,5478 ,'foo' ,8852, ,'Doe' ,2145 ,119];
var  randomItem = items[Math.floor(Math.random()*items.length)];
```

<h3 id="#120">20. 在特定范围内获取一个随机数</h3>

这个代码片段在你想要生成测试数据的时候非常有用，比如一个在最小最大值之间的一个随机薪水值。

	var x = Math.floor(Math.random() * (max - min + 1)) + min;

<h3 id="#121">21. 在0和设定的最大值之间生成一个数字数组</h3>

```javascript
var numbersArray=[] , max = 100;
for( var i=1; numbersArray.push(i++)<max;);  
// numbers = [0,1,2,3 ... 100]
v

<h3 id="#122">22. 生成一个随机的数字字母字符串</h3>

```javascript
function generateRandomAlphaNum(len) {
    var rdmstring = "";
    for( ; rdmString.length &lt; len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}
```

Math.random()生成0到1之间的随机数，number.toString(36)是将这个数字转换成36进制（0-9，a-z），最后substr去掉前面的“0.”字符串

<h3 id="#123">23. 打乱一个数字数组</h3>

```javascript
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers = numbers.sort(function(){ return Math.random() - 0.5});
/* the array numbers will be equal for example to [120, 5, 228, -215, 400, 458, -85411, 122205]  */
```

<h3 id="#124">24. 附加（append）一个数组到另一个数组上</h3>

```javascript
var array1 = [12 , "foo" , {name: "Joe"} , -2458];
var array2 = ["Doe" , 555 , 100];
Array.prototype.push.apply(array1, array2);
/* array1 will be equal to  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

其实concat可以直接实现两个数组的连接，但是它的返回值是一个新的数组。这里是直接改变array1

<h3 id="#125">25. 将arguments对象转换成一个数组</h3>

var argArray = Array.prototype.slice.call(arguments);

[arguments对象是一个类数组对象，但不是一个真正的数组](http://debuggable.com/posts/turning-javascript-s-arguments-object-into-an-array:4ac50ef8-3bd0-4a2d-8c2e-535ccbdd56cb)


<h3 id="#126">26. 验证参数是否是数字（number）</h3>

```javascript
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
```

<h3 id="#127">27. 验证参数是否是数组</h3>

```javascript
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

注意：如果toString()方法被重写了（overridden），你使用这个技巧就不能得到想要的结果了。或者你可以使用：

```javascript
Array.isArray(obj); 
// 这是一个新的array的方法
```
如果你不在使用多重frames的情况下，你还可以使用 instanceof 方法。但如果你有多个上下文，你就会得到错误的结果。

```javascript
var myFrame = document.createElement('iframe');
document.body.appendChild(myFrame);
 
var myArray = window.frames[window.frames.length-1].Array;
var arr = new myArray(a,b,10); 
// [a,b,10]
// instanceof will not work correctly, myArray loses his constructor
// constructor is not shared between frames
arr instanceof Array; 
// false
```

[instanceof considered harmful (or how to write a robust isArray](http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/)

<h3 id="#128">28. 获取一个数字数组中的最大值或最小值</h3>

```javascript
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
var maxInNumbers = Math.max.apply(Math, numbers);
var minInNumbers = Math.min.apply(Math, numbers);
```

<h3 id="#129">29. 清空一个数组</h3>

	var myArray = [12 , 222 , 1000 ];
	myArray.length = 0;   // myArray will be equal to [].


> Reference

- [45个实用的JavaScript技巧、窍门和最佳实践](http://blog.jobbole.com/54495/)
- [JavaScript Performance Best Practices (CC)](http://developer.nokia.com/Community/Wiki/JavaScript_Performance_Best_Practices)
- [Google Code JavaScript tips](https://code.google.com/p/jslibs/wiki/JavascriptTips)
- [StackOverFlow tips and tricks](http://stackoverflow.com/questions/724826/javascript-tips-and-tricks-javascript-best-practices)
- [TimeOut for XHR](http://stackoverflow.com/questions/6888409/settimeout-for-xhr-requests)

