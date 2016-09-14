## js数据类型判断和数组判断

js六大数据类型：

- string： 由单引号或双引号来说明，如"string"
- number：什么整数啊浮点数啊都叫数字，你懂的~
- Boolean: 就是true和false啦
- undefined：未定义，就是你创建一个变量后却没给它赋值~
- null: 故名思久，null就是没有，什么也不表示
- object: 这个我也很难解释的说。就是除了上面五种之外的类型
 
### 1. 数据类型判断之 typeof

typeof可以解决大部分的数据类型判断，是一个一元运算，放在一个运算值之前，其返回值为一个字符串，该字符串说明运算数的类型，所以判断某个是否为String类型，可以直接 `if(typeof(你的值) == "string"){}`
  
```javascript
var a="string"; console.log(a); //string
var a=1; console.log(a); //number
var a=false; console.log(a); //boolean
var a; console.log(typeof a); //undfined
var a = null; console.log(typeof a); //object
var a = document; console.log(typeof a); //object
var a = []; console.log(a); //object
var a = function(){}; console.log(typeof a) //function   除了可以判断数据类型还可以判断function类型
  ```
  
### 2. js判断数组类型的方法

** 方法一之 instanceof **

instanceof 用于判断一个变量是否某个对象的实例，是一个三目运算式---和typeof最实质上的区别

`a instanceof b?alert("true"):alert("false")  //注意b值是你想要判断的那种数据类型，不是一个字符串，比如Array`

** 方法二之 constructor **

```javascript
console.log([].constructor == Array);
console.log({}.constructor == Object);
console.log("string".constructor == String);
console.log((123).constructor == Number);
console.log(true.constructor == Boolean);
//较为严谨并且通用的方法
function isArray(object){
    return object && typeof object==='object' && Array == object.constructor;
}
```

使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false；

- 1、array属于引用型数据，在传递过程中，仅仅是引用地址的传递。
- 2、每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array；切记，不然很难跟踪问题！

** 方法三之 特性判断法 **

以上方法均有一定的缺陷，可根据数组的一些特性来判断其类型 

```javascript
function isArray(object){
    return  object && typeof object==='object' && typeof object.length==='number' && typeof object.splice==='function' &&    
            //判断length属性是否是可枚举的 对于数组 将得到false  
            !(object.propertyIsEnumerable('length'));
}
```

有length和splice并不一定是数组，因为可以为对象添加属性，而不能枚举length属性，propertyIsEnumerable才是最重要的判断因子。

`propertyIsEnumerable(proName)   // 判断指定的属性是否可列举`

- 如果 proName 存在于 object 中且可以使用一个 For…In 循环穷举出来，那么 propertyIsEnumerable 属性返回 true。如果 object 不具有所指定的属性或者所指定的属性不是可列举的，那么 propertyIsEnumerable 属性返回 false。
- propertyIsEnumerable 属性不考虑原型链中的对象。

```javascript
var a = new Array("apple", "banana", "cactus");
document.write(a.propertyIsEnumerable(1));
```

** 方法四之 最简单的方法  **

```javascript
function isArray(o) {
    return Object.prototype.toString.call(o) === ‘[object Array]‘;
}
```

> Reference

- http://blog.csdn.net/zhangw428/article/details/4171630
- http://my.oschina.net/sfm/blog/33197
- http://openxtiger.iteye.com/blog/1893378
- http://www.2fz1.com/?p=277
- http://msdn.microsoft.com/zh-tw/library/adebfyya.aspx
- http://blog.sina.com.cn/s/blog_532751d90100iv1r.html
