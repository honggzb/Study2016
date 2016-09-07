## Web Component简介

- 检测是否支持模版特性

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web Component : template support</title>
</head>
<body>
  <h1 id="message"></h1>
  <script>
    var isTemplateSupported = function(){
      var template = document.createElement('template');
      return "content" in template;
    };
    var isSupported = isTemplateSupported(), message=document.getElementById("message");
    if(isSupported){
      message.innerHTML="Template element is supported by the browser.";
    } else{
      message.innerHTML="Template element is not supported by the browser.";
    }
  </script>
</body>
</html>
```

- 延迟加载的模版

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web Component : A inert template content example.</title>
</head>
<body>
  <div id="message"></div>
  <template id="aTemplate">
    <img src="http://www.tutorialsavvy.com/wp-content/uploads/2014/11/ReactJS-830-8301-300x300.png"  id="profileImage">
    <script>
      alert("this is a script");
    </script>
  </template>
  <script>
     (function(){
       var imageElement=document.getElementById("profileImage"),
           messageElement=document.getElementById("message");
           messageElement.innerHTML="IMG element "+imageElement;
     })();
  </script>
</body>
</html>
```

## 开发X-Tag自定义元素

X-Tag是一个对浏览器默认的HTML元素外观进行重写的UI框架

```javascript
xtag.register('<element-name>', {  
  lifecycle: {   //通过实现created、removed和attributeChanged状态，可在lifecycle中定义元素在生命周期不同阶段的表现
    created: function(){  
    // 元素被创建时  
    },  
    inserted: function(){  
    // 插入DOM时  
    },  
    removed: function(){  
    // 元素被移除时  
    },  
    attributeChanged: function(){  
    // 元素的属性发生改变时  
    }  
  },  
  accessors: {    //如果有属性需要定义自己的getter和setter方法
    <property name> : {  
    attribute: {  
      // 属性类型和属性值  
      }  
    }  
  },  
  methods: {      //公共API
    <method name> : function() {  
    // 方法  
    }  
  },  
  events: {     //自定义元素的监听事件，定义了当用户做出动作时元素要如何响应
    '<event type>:delegate(<element>)': function(e) {  
    // 处理事件  
    }  
  }  
}); 
```

**sample - italic-string的自定义元素**  

- 获取到自定义标签的innerHTML 内容，并将内容放到`<i>`中，这样显示出来的就会是斜体的样式了
- 这个自定义元素有一个textColor属性，可以改变`<i>`标签中文本的颜色。textColor是在accessors属性中创建的，accessors 可以定义italicstring元素中需要配置的所有属性。
- 通过events 属性，我们创建了一个事件监听器。在上述代码中，我们监听了`<i>`的单击事件，当该元素被单击了，控制台中就会输出信息
- 通过methods 属性我们可以定义元素的方法。在代码中有一个叫作changed-ToRed()的回调，外部代码可以通过这个方法将自定义元素的文本的颜色变成红色。方法中通过`document.getElementById()`找到带有id 是iStringComponent的自定义元素（也就是italic-string 组件），然后改变元素的样式。在按钮上添加了onclick方法调用doColorRed()，在doColorRed 方法中，changedToRed()会被调用

```html
<!DOCTYPE html> 
<html> 
<head lang="en"> 
<meta charset="UTF-8"> 
<title>Web Component: xTag custom element support</title> 
<script src="x-tag-components.js"></script> 
<script> 
(function(){
  xtag.register('italic-string', {  
    lifecycle: {  
      created: function(){  
        this.innerHTML = "<i style='color:" + this.textColor +"'>" + this.innerHTML + "</i>";  
      }  
    },  
    accessors: {  
      textColor: {  
        attribute: {object: this.textColor}  
      }  
    },  
    methods: {  
      changeToRed: function(){  
        var italicElement = this.querySelector("i");  
        italicElement.style.color = "red";  
      }  
    },  
    events: {  
      'click:delegate(i)': function(e){  
        console.log("click event is fired.");  
      }  
    }  
  });  
})();  
</script> 
</head> 
<body> 
<italic-string id="iStringComponent" textColor="blue">Click Me</italic-string><br> 
<button onclick="doColorRed()">Make Red</button> 
<script> 
var doColorRed = function() {  
  var italicStringElement = document.getElementById("iStringComponent");  
  italicStringElement.changeToRed();  
}  
</script> 
</body> 
</html> 
```

浏览器还没有完全实现Web Component规范。不过现在已经有很多Web Component的polyfill 

**Polymer**

由谷歌牵头的Polymer 允许web 开发者编写CSS、HTML 和JavaScript 来构建功能强大、内容丰富、可用性还很高的Web Component。在第2 章中我们会详细介绍一下Polymer，在第3 章中你将有机会用Polymer 开发Web Component，希望到时候你能了解到更多。更多关于Polymer，请访问https://www.polymer-project.org。

**Mozilla Brick**

由Mozilla 维护的Mozilla Brick 是另一个Web Component 库。这个库提供了大量能够在web 应用中复用的UI 组件，目前版本号的2.0。在第5 章中我们将会使用它构建WebComponent。更多关于Mozilla Brick 库，请参阅http://brick.readme.io/v2.0。

**ReactJS**

Facebook 也有自己的Web Component 库：ReactJS。使用ReactJS 开发web 应用肯定会给你带来与众不同的体验。在第6 章中，你就能感受到了。更多关于ReactJS 库，请参阅http://facebook.github.io/react。

**Bosonic**

Bosonic 的核心代码使用了一些PolymerJS。在第4 章中，我们将会谈到这个库。更多关于Bosonic 库，请参阅http://bosonic.github.io/index.html

### 3. Shadow DOM

- Shadow DOM允许在文档（document）渲染时插入一棵DOM元素子树，但是这棵子树不在主DOM树中
- Shadow DOM是一个HTML的新规范，允许开发者封装自己的HTML标签、CSS样式和JavaScript代码

** Chrome Development Tool **

- 打开Chrome 的开发者工具，点击右上角的“Settings”按钮
- 勾选“Show user agent shadow DOM”

** 术语 **

术语 | 名称 | 说明
---|---|---
shadow trees|寄生树|特指存在于 shadow DOM 中的节点结构
shadow host|宿主|特指 shadow DOM 所寄生的宿主，是存在于原生 DOM 中的节点
shadow root|寄生根|指 shadow DOM 的根节点
content|内容|指宿主中的 DOM 结构
insertion point|插入点|指 shadow DOM 中的 <content> 标签
greedy insertion point|贪心插入点|指使用通配符选择器进行匹配的插入点

#### 3.1 host和root

```html
<div class="widget">Hello, world!</div>   <!-- shadow host -->
<script>
  var host = document.querySelector('.widget');
  var root = host.createShadowRoot();
  var header = document.createElement('h1');
  header.textContent = 'A Wild Shadow Header Appeared!';
  var paragraph = document.createElement('p');
  paragraph.textContent = 'Some sneaky shadow text';
  root.appendChild(header);
  root.appendChild(paragraph);
</script>
```

#### 3.2 content标签

引用影子宿主里面的内容，需要采用一个新的标签`<content>`, 使用`<content>`标签，创建了一个插入点（insertion point），其将 `.pokemon div`中的文本投射出来，使之得以在影子节点`<h1>`中展示。

```html
<div class="pokemon">胖丁</div>
<template class="pokemon-template">
  <h1>一只野生的 <content></content> 出现了！</h1>
</template>
<script>
  var host = document.querySelector('.pokemon');
  var root = host.createShadowRoot();
  var template = document.querySelector('.pokemon-template');
  root.appendChild(document.importNode(template.content, true));
</script>
```

注意已经使用了一个模板标签而不是整个用`JavaScript`来构建`shadow DOM`
插入点十分强大，它允许在不改变源代码的情况下改变渲染顺序，这也意味着可以对要呈现的内容进行选择。

```html
<div class="bio">
  <span class="first-name">劳勃</span>
  <span class="last-name">多德森</span>
</div>
<template class="bio-template">
  <dl>
    <dt>名字</dt>
    <dd><content select=".last-name"></content></dd>
    <dt>姓氏</dt>
    <dd><content select=".first-name"></content></dd>
  </dl>
  <p><content select=""></content></p>
</template>
<script>
  var host = document.querySelector('.bio');
  var root = host.createShadowRoot();
  var template = document.querySelector('.bio-template');
  root.appendChild(template.content);
</script>
```

####3.3 贪心插入点（Greedy Insertion Points）[Shadow DOM Visualizer](https://www.youtube.com/watch?v=qnJ_s58ubxg)

`<p><content select=""></content></p>` , 这种被称作通配符选择器（wildcard selection），其可以抓取影子宿主中所剩余的全部内容。以下三种选择器是完全相等的：

```html
<content></content>  
<conent select=""></conent>  
<content select="*"></content>  
```

#### 3.4 样式封装

- 影子边界（shadow boundary）: 表示分离常规 DOM（与影子DOM相对立的“光明” DOM）与shadow DOM的壁障。影子边界的主要好处就是防止主DOM中的样式泄露到shadow DOM中
- 宿主样式`:host`选择器

```html
<p>我的段落</p>
<div>我的 Div</div>
<button>我的按钮</button>
<!-- Our template -->
<template class="shadow-template">
  <style>
  :host(p) {color: blue;}
  :host(div) {color: green;}
  :host(button) {color: red;}
  :host(*) {font-size: 24px;}
  </style>
  <content select=""></content>
</template>
<script>
  // 给每一个元素创建一个影子根
  var root1 = document.querySelector('p').createShadowRoot();
  var root2 = document.querySelector('div').createShadowRoot();
  var root3 = document.querySelector('button').createShadowRoot();
  // 对于每一个影子根使用同一个模板
  var template = document.querySelector('.shadow-template');
  // 把每一个模板嵌入影子根中，注意一下不同的 :host 样式对显示效果的影响
  root1.appendChild(document.importNode(template.content, true));
  root2.appendChild(document.importNode(template.content, true));
  root3.appendChild(document.importNode(template.content, true));
</script>
```

基于宿主元素的父元素对它构建不同的主题

```html
<div class="serious">
  <p class="serious-widget">大家好我十分的严肃</p>
</div>
<div class="playful">
  <p class="playful-widget">漂亮的小云彩效果……</p>
</div>
<template class="widget-template">
  <style>
  :host-context(.serious) {
    width: 250px;
    height: 50px;
    padding: 50px;
    font-family: '微软雅黑';
    font-weight: bold;
    font-size: 24px;
    color: black;
    background: tomato;
  }

  :host-context(.playful) {
    width: 250px;
    height: 50px;
    padding: 50px;
    font-family: '华文行楷';
    font-size: 24px;
    color: white;
    background: deepskyblue;
  }
  </style>
  <content></content>
</template>
<script>
  var root1 = document.querySelector('.serious-widget').createShadowRoot();
  var root2 = document.querySelector('.playful-widget').createShadowRoot();
  var template = document.querySelector('.widget-template');
  root1.appendChild(document.importNode(template.content, true));
  root2.appendChild(document.importNode(template.content, true));
</script>
```

#### 3.4 Shadow DOM样式

- 分布节点（distributed nodes）- 来自页面并通过`<content>`标签添加到`shadow DOM`的内容被称为分布节点
- 分布节点的样式渲染需要用到`:content`伪类选择器

```html
<div class="widget"><button>分布节点碉堡啦！</button></div>
<template class="widget-template">
    <style>
      ::content > button {
        font-size: 18px;
        color: white;
        background: tomato;
        border-radius: 10px;
        border: none;
        padding: 10px;
      }
    </style>
    <content select=""></content>
  </template>
  <script>
    var host = document.querySelector('.widget');
    var root = host.createShadowRoot();
    var template = document.querySelector('.widget-template');
    root.appendChild(document.importNode(template.content, true));
  </script>
```

`::shadow`伪类选择器可以打破影子边界的壁垒

```html
<style>
  .sign-up::shadow #username,.sign-up::shadow #password {font-size: 18px; border: 1px solid red;}
  .sign-up::shadow #btn {  font-size: 18px; }
</style>
<div class="sign-up"></div>
<template class="sign-up-template">
  <style>
    #username,#password {font-size: 10px;}
  </style>
  <div><input type="text" id="username" placeholder="用户名"></div>
  <div><input type="password" id="password" placeholder="密码"></div>
  <button id="btn">注册</button>
</template>
<script>
  var host = document.querySelector('.sign-up');
  var root = host.createShadowRoot();
  var template = document.querySelector('.sign-up-template');
  root.appendChild(document.importNode(template.content, true));
</script>
```

`::shadow`选择器的一个缺陷是只能穿透一层影子边界。如果在一个影子树中嵌套了多个影子树，使用`/deep/`组合符

```html
<head>  
  <style>
    #foo /deep/ button {color: red;}
  </style>
</head>  
<body>  
  <div id="foo"></div>
  <template><div id="bar"></div></template>
  <script>
    var host1 = document.querySelector('#foo');
    var root1 = host1.createShadowRoot();
    var template = document.querySelector('template');
    root1.appendChild(document.importNode(template.content, true));
    var host2 = root1.querySelector('#bar');
    var root2 = host2.createShadowRoot();
    root2.innerHTML = '<button>点我点我</button>';
  </script>
</body>  
```

####3.5 Shadow DOM的JavaScript

Shadow DOM里的JS与传统的JS一个真正不同的点在于事件调度（event dispatching）。要记住的一点是：原来绑定在shadow DOM节点中的事件被重定向了，所以他们看起来像绑定在影子宿主上一样。

> Reference

- [Polymer - 通往新世界的大门](http://www.ituring.com.cn/article/179915)
- [Polymer - 通往新世界的大门](http://www.tuicool.com/articles/ye6Nvy)
- [Shadow DOM](http://robdodson.me/shadow-dom-the-basics/)
- [Shadow DOM v1: self-contained web components](https://developers.google.com/web/fundamentals/primers/shadowdom/?utm_source=html5weekly&utm_medium=email)
