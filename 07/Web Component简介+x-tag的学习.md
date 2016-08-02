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

- 获取到自定义标签的innerHTML 内容，并将内容放到<i>中，这样显示出来的就会是斜体的样式了
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


