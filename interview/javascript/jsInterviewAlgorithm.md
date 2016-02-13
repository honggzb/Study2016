**1. 用js实现随机选取10–100之间的10个数字，存入一个数组，并排序**

```javascript
function getRandowm(istart, iend){
	var iChoice = Math.abs(istart-iend+1);
	return Math.floor(Math.random() * iChoice + istart);
}
var iArray = [];
for(var i=0;i<10;i++){
	iArray.push(getRandowm(10,100));
}
iArray.sort();
```

**2. 把两个数组合并，并删除第二个元素。**

```javascript
var cArray = array1.concat(bArray);
cArray.splice(1,1);
```

**3. 怎样添加、移除、移动、复制、创建和查找节点**

	1) 创建新节点

```javascript
createDocumentFragment() //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```

	2) 添加、移除、替换、插入
```javascript
appendChild()      //添加
removeChild()      //移除
replaceChild()      //替换
insertBefore()      //插入
```
	3）查找
```javascript
getElementsByTagName()    //通过标签名称
getElementsByName()     //通过元素的Name属性的值
getElementById()        //通过元素Id，唯一性
```

**4. 典型的斐波那契数列**

如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？
```javascript
	var result=[];
	function fn(n){  
		if(n==1){ return 1;} 
		if(n==2){ return 1;}		
		result[n]=fn(n-1)+fn(n-2);
		//result[n]=arguments.callee(n-1)+arguments.callee(n-2);
		return result[n];
	}
	console.log(fn(8));
```
**5. 如何消除一个数组里面重复的元素？**
```javascript
	var arr=[1,2,3,3,4,4,5,5,6,1,9,3,25,4];
	function deRepeat(){
		var newArr=[],obj={};
		var index=0, len=arr.length;
		for(var i=0;i<len;i++){
			if(obj[arr[i]]==undefined){
				obj[arr[i]]=1;
				newArr[index++]=arr[i];
			}
		}
		return newArr;
	}
	console.log(deRepeat(arr)); 
```
jQuery
```javascript
	var arr=[1,2,3,3,4,4,5,5,6,1,9,3,25,4];
	function isRepeat(arr) {
	   var newArr=[], hash = {};
	   for(var i in arr) {
	       if(hash[arr[i]]){
	           hash[arr[i] = true;
			   newArr[index++]=arr[i];
	       }  
	    }
	   return newArr;
	}
```

**6. 下面这个ul，如何点击每一列的时候alert其index?（闭包）**
```html
	<ul id=”test”>
		<li>这是第一条</li>
		<li>这是第二条</li>
		<li>这是第三条</li>
	</ul>
```
> 方法一：
```javascript
	var lis=document.getElementById('test').getElementsByTagName('li');
	for(var i=0;i<3;i++){
	    lis[i].index=i;
	    lis[i].onclick=function(){
	        alert(this.index);
	    };
	}
 ```
> 方法二：```javascript
```javascript
	var lis=document.getElementById('test').getElementsByTagName('li');
	for(var i=0;i<3;i++){
	    lis[i].index=i;
	    lis[i].onclick=(function(a){
	        return function() {
	            alert(a);
	        }
	    })(i);
	}
```
**7. 原生JS的window.onload与Jquery的$(document).ready(function(){})有什么不同？如何用原生JS实现Jq的ready方法？**

- window.onload()方法是必须等到页面内包括图片的所有元素加载完毕后才能执
- $(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕

**8.（设计题）想实现一个对页面某个节点的拖曳？如何做？（使用原生JS）**

回答出概念即可，下面是几个要点

- 给需要拖拽的节点绑定mousedown, mousemove, mouseup事件
- mousedown事件触发后，开始拖拽
- mousemove时，需要通过event.clientX和clientY获取拖拽位置，并实时更新位置
- mouseup时，拖拽结束
- 需要注意浏览器边界的情况

