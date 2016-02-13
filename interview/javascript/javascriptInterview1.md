###问题1: 作用域
	 (function(){
	    var a = b =5;
	  })();
	  console.log(b);

**答案：**  5

这个问题考查的要点是两个不同的作用域，'a'被var声明成了一个局部变量，但是'b'实际上没有被定义，所以它是一个全局变量。

这个问题还牵扯到另个一个比较重要的问题，就是strict mode，如果你选择了strict mode，上面的代码就会报`Uncaught ReferenceError`，因为b没有被定义，它可以帮你检查出代码的一些问题：

	(function(){
    	'use strict';
    	var a = window.b =5;
    })();
    console.log(b);

###问题2: 创建“native”方法

写一个重复打印字符串对象的方法，输入一个整数，这个整数代表重复打印的字数，比如：

	console.log('hello'.repeatify(3));
	//hellohellohello

**答案：** 

	String.prototype.repeatify =String.prototype.repeatify ||function(times){
    	var str ='';
    	for(var i =0; i < times; i++){
    		str += this;
    	}
    	return str;
    };

这个问题考查的是开发者对JavaScript继承和prototype属性的了解程度。

###问题 3: Hoisting

下面这段代码的输出结果是什么？

	function test(){
	    console.log(a);
	    console.log(foo());
	    var a =1;
	    function foo(){
	    	return 2;
	    }
    }
    test();

**答案：** undefined和2

The reason is that both variables and functions are `hoisted` (moved at the top of the function) but variables don’t retain any assigned value. So, at the time the variable a is printed, it exists in the function (it’s declared) but it’s still undefined. Stated in other words, the code above is equivalent to the following:

###问题4: JavaScript中的this

	var fullname ='John Doe';
    var obj ={
	    fullname:'Colin Ihrig',
	    prop:{
		    fullname:'Aurelio De Rosa',
		    getFullname:function(){
		    	return this.fullname;
	    }
	    }
    };
    console.log(obj.prop.getFullname());
    var test = obj.prop.getFullname;
    console.log(test());

**答案：** Aurelio De Rosa 和John Doe

The reason is that the context of a function, what is referred with the 
**this** keyword, in JavaScript depends on **how a function is invoked**, not how it’s defined.

Javascript中关键字**this**所指代的函数上下文，取决于**函数是怎样被调用的**，而不是怎样被定义的

- In the first `console.log()` call, `getFullname()` is invoked as a function of the `obj.prop object`.  So, the context refers to the latter and the function returns the fullname property of this object. 
- On the contrary, when `getFullname()` is assigned to the test variable, the context refers to the `global object (window)`. This happens because test is implicitly set as a property of the global object. For this reason, the function returns the value of a property called fullname of window, which in this case is the one the code set in the first line of the snippet.

在第一个console.log()，getFullname()被作为obj.prop对象被调用。因此，当前的上下文指代后者，函数返回这个对象的fullname属性。相反，当getFullname()被赋予test变量，当前的上下文指代全局对象window，这是因为test被隐式地作为全局对象的属性。基于这一点，函数返回window的fullname，在本例中即为代码的第一行。

###问题5: call() 和 apply()
解决前面的问题之后让最后一个console.log()输出Aurelio De Rosa.

**答案：**
这个问题在于call()还是apply()。 如果你不知道它们之间的区别，建设你先读一读 [What’s the difference between function.call and function.apply?](http://www.sitepoint.com/whats-the-difference-between-function-call-and-function-apply/) 

- caller是返回一个对函数的引用，该函数调用了当前函数；
- callee是返回正在被执行的function函数，也就是所指定的function对象的正文。

下面这行代码我使用了call()，但是这个情况下apply()也会产生同样的结果：

    console.log(test.call(obj.prop));

###问题6: setTimeout

看下面代码，给出输出结果

	for(var i=1;i<=3;i++){
	  setTimeout(function(){
	      console.log(i);    
	  },0);  
	};

**答案：** 4 4 4

原因：***Javascript事件处理器在线程空闲之前不会运行***。

追问，如何让上述代码输出1 2 3？ >>>> 改成立即执行函数

	for(var i=1;i<=3;i++){
	   setTimeout((function(a){  
	       console.log(a);    
	   })(i),0);  
	};
 
###问题7: Class and Inheritance

小贤是一条可爱的小狗(Dog)，它的叫声很好听(wow)，每次看到主人的时候就会乖乖叫一声(yelp)。对象：

	function Dog(){
		this.wow = function(){
			console.log("wow");
		}
		this.yelp = function(){
			this.wow();
		}
	}

小芒和小贤一样，原来也是一条可爱的小狗，可是突然有一天疯了(MadDog)，一看到人就会每隔半秒叫一声(wow)地不停叫唤(yelp)。请根据描述，按示例的形式用代码来实。

	function MadDog(){
		this.yelp = function(){
			var self = this;
			setInterval(function(){
				self.wow();
			},500);
		}
	}
	MadDog.prototype = new Dog();  //inheritance from Dog
	var dog = new Dog();
	dog.yelp();
	var MadDog = new MadDog();
	madDog.yelp();

### 用面向对象的Javascript来介绍一下自己

**答案：** 对象或者Json都是不错的选择哦（没答案哦亲，自己试试吧）

