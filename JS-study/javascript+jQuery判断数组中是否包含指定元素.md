  ##javascript判断数组中是否包含指定元素

  可以使用数组的indexOf()方法，如果返回值为-1则说明不存在，如果返回值为大于-1的整数，则说明存在。
  
```javascript
a = [1,2,3] ; 
console.log(a.indexOf(3))
// 如果是字符串数组
var arr=["A","B","C"]; 
if(arr.toString().indexOf("B")>-1) 
    return true;//存在
else
    return false; //不存在
//jquery
var arr = [ "xml", "html", "css", "js" ]; 
$.inArray("js", arr);     //返回 3,
```

通过prototype定义数组方法，这样就可以在任意数组调用contains方法

```javascript
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
var x = Array();
if (x.contains('foo')) {
  // do something special
}
```

