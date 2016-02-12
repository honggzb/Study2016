##BAT及各大互联网公司2014前端笔试面试题：HTML/CSS篇

###Html篇：

**1. 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?**

	 |IE|trident内核|
	 |Firefox|gecko内核|
	 |Safari|webkit内核|
	 |Opera|以前是presto内核，Opera现已改用Google Chrome的Blink内核|
	 |Chrome|Blink(基于webkit，Google与Opera Software共同开发)| 

**2. 每个HTML文件里开头都有个很重要的东西，Doctype，知道这是干什么的吗？**

<!DOCTYPE> 声明位于文档中的最前面的位置，处于 <html> 标签之前。此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范。（重点：告诉浏览器按照何种规范解析页面）

**3.Quirks模式是什么？它和Standards模式有什么区别**

　　从IE6开始，引入了Standards模式，标准模式中，浏览器尝试给符合标准的文档在规范上的正确处理达到在指定浏览器中的程度。

　　在IE6之前CSS还不够成熟，所以IE5等之前的浏览器对CSS的支持很差， IE6将对CSS提供更好的支持，然而这时的问题就来了，因为有很多页面是基于旧的布局方式写的，而如果IE6 支持CSS则将令这些页面显示不正常，如何在即保证不破坏现有页面，又提供新的渲染机制呢？

　　在写程序时我们也会经常遇到这样的问题，如何保证原来的接口不变，又提供更强大的功能，尤其是新功能不兼容旧功能时。遇到这种问题时的一个常见做法是增加参数和分支，即当某个参数为真时，我们就使用新功能，而如果这个参数 不为真时，就使用旧功能，这样就能不破坏原有的程序，又提供新功能。IE6也是类似这样做的，它将DTD当成了这个“参数”，因为以前的页面大家都不会去写DTD，所以IE6就假定 如果写了DTD，就意味着这个页面将采用对CSS支持更好的布局，而如果没有，则采用兼容之前的布局方式。这就是Quirks模式（怪癖模式，诡异模式，怪异模式）。

>　**区别：**

　　总体会有布局、样式解析和脚本执行三个方面的区别。

- **盒模型**：在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在Quirks 模式下，IE的宽度和高度还包含了padding和border。
- **设置行内元素的高宽**：在Standards模式下，给<span>等行内元素设置wdith和height都不会生效，而在quirks模式下，则会生效。
- **设置百分比的高度**：在standards模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置百分比的高度，子元素设置一个百分比的高度是无效的用margin:0 auto设置水平居中：使用margin:0 auto在standards模式下可以使元素水平居中，但在quirks模式下却会失效。

（还有很多，答出什么不重要，关键是看他答出的这些是不是自己经验遇到的，还是说都是看文章看的，甚至完全不知道。）

**4.你能描述一下渐进增强和优雅降级之间的不同吗?**

- 渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
 
**区别：**优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。　

　　**“优雅降级”观点**

　　“优雅降级”观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。

　　在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。你可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。

　　**“渐进增强”观点**

　　“渐进增强”观点则认为应关注于内容本身。

　　内容是我们建立网站的诱因。有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo! 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。


　　那么问题了。现在产品经理看到IE6,7,8网页效果相对高版本现代浏览器少了很多圆角，阴影（CSS3），要求兼容（使用图片背景，放弃CSS3），你会如何说服他？

　　（自由发挥）

**5.为什么利用多个域名来存储网站资源会更有效？**

- CDN缓存更方便 
- 突破浏览器并发限制 
- 节约cookie带宽 
- 节约主域名的连接数，优化页面响应速度 
- 防止不必要的安全问题

**6.请描述一下cookies，sessionStorage和localStorage的区别？**　

　　sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

　　**web storage和cookie的区别**

　　Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。

　　除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生。
 
**7.简述一下src与href的区别。**

- src用于替换当前元素
- href用于在当前文档和引用资源之间确立联系。

　　**src**是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。

　　`<script src ="js.js"></script>`

　　当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。

　　**href**是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加

　　`<link href="common.css" rel="stylesheet"/>`

　　那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式。

**8.在css/js代码上线之后开发人员经常会优化性能**，从用户刷新网页开始，一次js请求一般情况下有哪些地方会有缓存处理？

　　答案：dns缓存，cdn缓存，浏览器缓存，服务器缓存。

**9.一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优化这些图片的加载，给用户更好的体验。**

- 图片懒加载，在页面上的未可视区域可以添加一个滚动条事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。
- 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。
- 如果图片为css图片，可以使用CSSsprite，SVGsprite，Iconfont、Base64等技术。
- 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。
- 如果图片展示区域小于图片的真实大小，则因在服务器端根据业务需要先行进行图片压缩，图片压缩后大小与展示一致。 

　　
**10.你如何理解HTML结构的语义化？**　　

- 屏幕阅读器（如果访客有视障）会完全根据你的标记来“读”你的网页.

　　例如,如果你使用的含语义的标记,屏幕阅读器就会“逐个拼出”你的单词,而不是试着去对它完整发音.

- 搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重

　　页面是否对爬虫容易理解非常重要,因为爬虫很大程度上会忽略用于表现的标记,而只注重语义标记.

　　因此,如果页面文件的标题被标记,而不是,那么这个页面在搜索结果的位置可能会比较靠后.除了提升易用性外,语义标记有利于正确使用CSS和JavaScript,因为其本身提供了许多“钩钩”来应用页面的样式与行为.

- SEO主要还是靠你网站的内容和外部链接的。

- 便于团队开发和维护
　　W3C给我们定了一个很好的标准，在团队中大家都遵循这个标准，可以减少很多差异化的东西，方便开发和维护，提高开发效率，甚至实现模块化开发。

**11.谈谈以前端角度出发做好SEO需要考虑什么？**

- 了解搜索引擎如何抓取网页和如何索引网页

　　你需要知道一些搜索引擎的基本工作原理，各个搜索引擎之间的区别，搜索机器人（SE robot 或叫 web crawler）如何进行工作，搜索引擎如何对搜索结果进行排序等等。
- Meta标签优化

　　主要包括主题（Title)，网站描述(Description)，和关键词（Keywords）。还有一些其它的隐藏文字比如Author（作者），Category（目录），Language（编码语种）等。
- 如何选取关键词并在网页中放置关键词

　　搜索就得用关键词。关键词分析和选择是SEO最重要的工作之一。首先要给网站确定主关键词（一般在5个上下），然后针对这些关键词进行优化，包括关键词密度（Density），相关度（Relavancy），突出性（Prominency）等等。

- 了解主要的搜索引擎

　　虽然搜索引擎有很多，但是对网站流量起决定作用的就那么几个。比如英文的主要有Google，Yahoo，Bing等；中文的有百度，搜狗，有道等。不同的搜索引擎对页面的抓取和索引、排序的规则都不一样。还要了解各搜索门户和搜索引擎之间的关系，比如AOL网页搜索用的是Google的搜索技术，MSN用的是Bing的技术。

- 主要的互联网目录

　　Open Directory自身不是搜索引擎，而是一个大型的网站目录，他和搜索引擎的主要区别是网站内容的收集方式不同。目录是人工编辑的，主要收录网站主页；搜索引擎是自动收集的，除了主页外还抓取大量的内容页面。

- 按点击付费的搜索引擎

　　搜索引擎也需要生存，随着互联网商务的越来越成熟，收费的搜索引擎也开始大行其道。最典型的有Overture和百度，当然也包括Google的广告项目Google Adwords。越来越多的人通过搜索引擎的点击广告来定位商业网站，这里面也大有优化和排名的学问，你得学会用最少的广告投入获得最多的点击。

- 搜索引擎登录

　　网站做完了以后，别躺在那里等着客人从天而降。要让别人找到你，最简单的办法就是将网站提交（submit）到搜索引擎。如果你的是商业网站，主要的搜索引擎和目录都会要求你付费来获得收录（比如Yahoo要299美元），但是好消息是（至少到目前为止）最大的搜索引擎Google目前还是免费，而且它主宰着60％以上的搜索市场。

- 链接交换和链接广泛度（Link Popularity）

　　网页内容都是以超文本（Hypertext）的方式来互相链接的，网站之间也是如此。除了搜索引擎以外，人们也每天通过不同网站之间的链接来Surfing（“冲浪”）。其它网站到你的网站的链接越多，你也就会获得更多的访问量。更重要的是，你的网站的外部链接数越多，会被搜索引擎认为它的重要性越大，从而给你更高的排名。

- 合理的标签使用 

---
 
###Css篇：

**1. 有哪项方式可以对一个DOM设置它的CSS样式？**　　

- 外部样式表，引入一个外部css文件
- 内部样式表，将css代码放在 <head> 标签内部
- 内联样式，将css样式直接定义在 HTML 元素内部　

**2.CSS都有哪些选择器？**

- 派生选择器（用HTML标签申明）
- id选择器（用DOM的ID申明）
- 类选择器（用一个样式类名申明）
- 属性选择器（用DOM的属性申明，属于CSS2，IE6不支持，不常用，不知道就算了）
- 除了前3种基本选择器，还有一些扩展选择器，包括
	- 后代选择器（利用空格间隔，比如div .a{  }）
	- 群组选择器（利用逗号间隔，比如p,div,#a{  }）　

　　那么问题来了，CSS选择器的优先级是怎么样定义的？

　　**基本原则：**

　　一般而言，选择器越特殊，它的优先级越高。也就是选择器指向的越准确，它的优先级就越高。

　　**复杂的计算方法：**

- 用1表示派生选择器的优先级
- 用10表示类选择器的优先级
- 用100标示ID选择器的优先级

		div.test1 .span var 优先级 1+10 +10 +1  
		span#xxx .songs li  优先级 1+100 + 10 + 1  
		#xxx li 优先级 100 +1 

　　那么问题来了，看下列代码，<p>标签内的文字是什么颜色的？。

	 <style>
	  	.classA{ color:blue;}
	  	.classB{ color:red;}
	  </style>
	  <body> 
	  	<p class='classB classA'> 123 </p>
	 </body>

　　答案：red。与样式定义在文件中的先后顺序有关，即是后面的覆盖前面的，与在<p class='classB classA'>中的先后关系无关。 


**3.超链接访问过后hover样式就不出现的问题是什么？如何解决？**

被点击访问过的超链接样式不在具有hover和active了,解决方法是改变CSS属性的排列顺序: `L-V-H-A（link,visited,hover,active）`

**4.什么是Css Hack？ie6,7,8的hack分别是什么？**

　　针对不同的浏览器写不同的CSS code的过程，就是CSS hack。


		   background-color:blue;  /*firefox*/
		   background-color:red\9;  /*all ie*/
		   background-color:yellow\0;/*ie8*/
		   +background-color:pink;/*ie7*/
		   _background-color:orange;   /*ie6*/}  
		  :root #test { background-color:purple\9; }  /*ie9*/
		  @media all and (min-width:0px){ #test {background-color:black\0;} }  /*opera*/
		  @media screen and (-webkit-min-device-pixel-ratio:0){ #test {background-color:gray;} }   /*chrome and safari*/

**5.请用Css写一个简单的幻灯片效果页面**

用css3。使用animation动画实现一个简单的幻灯片效果。

	 /**HTML**/
	 div.ani
	 /**css**/
	 .ani{
		 width:480px;
		 height:320px;
		 margin:50px auto;
		 overflow: hidden;
		 box-shadow:0 0 5px rgba(0,0,0,1);
		 background-size: cover;
		 background-position: center;
		 -webkit-animation-name: "loops";
		 -webkit-animation-duration: 20s;
		 -webkit-animation-iteration-count: infinite;
	}
	@-webkit-keyframes "loops" {
	    0% {background:url(http://d.hiphotos.baidu.com/image/w%3D400/sign=c01e6adca964034f0fcdc3069fc27980/e824b899a9014c08e5e38ca4087b02087af4f4d3.jpg) no-repeat;}
		25% { background:url(http://b.hiphotos.baidu.com/image/w%3D400/sign=edee1572e9f81a4c2632edc9e72b6029/30adcbef76094b364d72bceba1cc7cd98c109dd0.jpg) no-repeat;}
		50% {background:url(http://b.hiphotos.baidu.com/image/w%3D400/sign=937dace2552c11dfded1be2353266255/d8f9d72a6059252d258e7605369b033b5bb5b912.jpg) no-repeat;}
		75% {background:url(http://g.hiphotos.baidu.com/image/w%3D400/sign=7d37500b8544ebf86d71653fe9f9d736/0df431adcbef76095d61f0972cdda3cc7cd99e4b.jpg) no-repeat;}
		100% {background:url(http://c.hiphotos.baidu.com/image/w%3D400/sign=cfb239ceb0fb43161a1f7b7a10a54642/3b87e950352ac65ce2e73f76f9f2b21192138ad1.jpg) no-repeat;}
	}


**6.行内元素和块级元素的具体区别是什么？行内元素的padding和margin可设置吗？**

- 块级元素(block)特性：总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示; 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;
 
- 内联元素(inline)特性：和相邻的内联元素在同一行; 宽度(width)、高度(height)、内边距的top/bottom(padding-top/padding-bottom)和外边距的top/bottom(margin-top/margin-bottom)都不可改变（也就是padding和margin的left和right是可以设置的），就是里面文字或图片的大小。

那么问题来了，浏览器还有默认的天生inline-block元素（拥有内在尺寸，可设置高宽，但不会自动换行），有哪些？

答案：`<input> 、<img> 、<button> 、<textarea> 、<label>`。

**7.什么是外边距重叠？重叠的结果是什么？**

　　外边距重叠就是margin-collapse。

　　在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

　　折叠结果遵循下列计算规则：

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
两个外边距一正一负时，折叠结果是两者的相加的和。
　　
**8.rgba()和opacity的透明效果有什么不同？**

　　rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度，

　　而rgba()只作用于元素的颜色或其背景色。（设置rgba透明的元素的子元素不会继承透明效果！）

**9.css中可以让文字在垂直和水平方向上重叠的两个属性是什么？**

- 垂直方向：line-height
- 水平方向：letter-spacing

　　那么问题来了，关于letter-spacing的妙用知道有哪些么？

　　**答案:**可以用于消除inline-block元素间的换行符空格间隙问题。

**10.如何垂直居中一个浮动元素？**

方法一：已知元素的高宽

	 #div1{
	      background-color:#6699FF;
	      width:200px;
	      height:200px;
	      position: absolute;        //父元素需要相对定位
	      top: 50%;
	     left: 50%;
	     margin-top:-100px ;   //二分之一的height，width
	     margin-left: -100px;
	 }

方法二:未知元素的高宽

	  #div1{
	     width: 200px;
	     height: 200px;
	     background-color: #6699FF;
	     margin:auto;
	     position: absolute;        //父元素需要相对定位
	     left: 0;
	     top: 0;
	     right: 0;
	     bottom: 0;
	  }

 　　那么问题来了，如何垂直居中一个<img>?（用更简便的方法。）

	#container{     //<img>的容器设置如下
	    display:table-cell;
	    text-align:center;
	    vertical-align:middle;
	 }

**13.描述一个"reset"的CSS文件并如何使用它。知道normalize.css吗？你了解他们的不同之处？**

　　重置样式非常多，凡是一个前端开发人员肯定有一个常用的重置CSS文件并知道如何使用它们。他们是盲目的在做还是知道为什么这么做呢？原因是不同的浏览器对一些元素有不同的默认样式，如果你不处理，在不同的浏览器下会存在必要的风险，或者更有戏剧性的性发生。

　　你可能会用Normalize来代替你的重置样式文件。它没有重置所有的样式风格，但仅提供了一套合理的默认样式值。既能让众多浏览器达到一致和合理，但又不扰乱其他的东西（如粗体的标题）。

　　在这一方面，无法做每一个复位重置。它也确实有些超过一个重置，它处理了你永远都不用考虑的怪癖，像HTML的audio元素不一致或line-height不一致。

**14.Sass、LESS是什么？大家为什么要使用他们**

　　CSS预处理器。他是CSS上的一种抽象层。是一种特殊的语法/语言编译成CSS。

　　例如Less是一种动态样式语言. 将CSS赋予了动态语言的特性，如变量，继承，运算， 函数. LESS 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可一在服务端运行 (借助 Node.js)。

　　为什么要使用它们？

- 结构清晰，便于扩展。
- 可以方便地屏蔽浏览器私有语法差异。这个不用多说，封装对浏览器语法差异的重复处理，减少无意义的机械劳动。
- 可以轻松实现多重继承。
- 完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译。
　　

**15.display:none与visibility:hidden的区别是什么？**

- display : 隐藏对应的元素但不挤占该元素原来的空间。
- visibility: 隐藏对应的元素并且挤占该元素原来的空间。

 　　即是，使用CSS display:none属性后，HTML元素（对象）的宽度、高度等各种属性值都将“丢失”;而使用visibility:hidden属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。

**16.知道css有个content属性吗？有什么作用？有什么应用？**

　　知道。css的content属性专门应用在 before/after 伪元素上，用于来插入生成内容。

　　最常见的应用是利用伪类清除浮动。

	  //一种常见利用伪类清除浮动的代码
	   .clearfix:after {
	      content:".";       //这里利用到了content属性
	      display:block; 
	      height:0;
	      visibility:hidden; 
	      clear:both; } 
	  .clearfix { 
	     *zoom:1; 
	  }

　　after伪元素通过 content 在元素的后面生成了内容为一个点的块级元素，再利用clear:both清除浮动。

　　那么问题继续还有，知道css计数器（序列数字字符自动递增）吗？如何通过css content属性实现css计数器？

　　答案：css计数器是通过设置counter-reset 、counter-increment 两个属性 、及 counter()/counters()一个方法配合after / before 伪类实现。 

　　具体实现方案：请戳张鑫旭大大的博文CSS计数器([序列数字字符自动递增](http://www.zhangxinxu.com/wordpress/?p=4303))详解 。
