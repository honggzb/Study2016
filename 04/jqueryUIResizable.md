官方示例地址：http://jqueryui.com/demos/resizable/ ,API:  http://api.jqueryui.com/resizable/

所有的事件回调函数都有两个参数：
- event  - 浏览器自有event对象
- ui  - 和经过封装的ui对象

## 1. Options

|name  |  功能 |  
|------|-------|
|ui.helper  | 表示当前被改变尺寸的元素的JQuery对象|
|ui.originalPosition  | 表示未改变尺寸之前元素的位置{top,left}  |
|ui.originalSize      | 表示未改变尺寸之前元素的大小{width,height}|
|ui.position          | 表示当前被改变尺寸的元素的坐标值对象{top,left}|

- alsoResize : Selector, jQuery, ElementDefault : false  

当调整元素大小时，同步改变另一个（或一组）元素的大小。  

```javascript
$('.selector').resizable({ alsoResize: '.other' });                  //初始
var alsoResize = $('.selector').resizable('option', 'alsoResize');   //获取
$('.selector').resizable('option', 'alsoResize', '.other');          //设置
```

- animate : Boolean : false  

在调整元素大小结束之后是否显示动画

```javascript
$('.selector').resizable({ animate: true });                  //初始
var animate = $('.selector').resizable('option', 'animate');  //获取
$('.selector').resizable('option', 'animate', true);          //设置
```

-  animateDuration : Integer, String : 'slow'  

动画效果的持续时间。（单位：毫秒）可选值：'slow', 'normal', 'fast'  

```javascript
$('.selector').resizable({ animateDuration: 500 });                            //初始
var animateDuration = $('.selector').resizable('option', 'animateDuration');   //获取
$('.selector').resizable('option', 'animateDuration', 500);                    //设置
```

- animateEasing : String : 'swing'   选择何种动画效果

```javascript
$('.selector').resizable({ animateEasing: 'swing' });                     //初始
var animateEasing = $('.selector').resizable('option', 'animateEasing');  //获取
$('.selector').resizable('option', 'animateEasing', 'swing');             //设置
```

- aspectRatio : Boolean, Float : false  

如果设置为true，则元素的可调整尺寸受原来大小的限制。例如：9 / 16, or 0.5  

```javascript
$('.selector').resizable({ aspectRatio: .75 });                      //初始
var aspectRatio = $('.selector').resizable('option', 'aspectRatio'); //获取
$('.selector').resizable('option', 'aspectRatio', .75);              //设置
```

- autoHide : Boolean : false  

如果设置为true，则默认隐藏掉可调整大小的手柄，除非鼠标移至元素上  

```javascript
$('.selector').resizable({ autoHide: true });  
var autoHide = $('.selector').resizable('option', 'autoHide');  
$('.selector').resizable('option', 'autoHide', true);
```

- cancel : Selector : ':input,option'  

阻止resizable插件加载在与你匹配的元素上。

```javascript
$('.selector').resizable({ cancel: ':input,option' });  
var cancel = $('.selector').resizable('option', 'cancel');  
$('.selector').resizable('option', 'cancel', ':input,option');
```

- containment : String, Element, Selector : false  

控制元素只能在某一个元素的大小之内改变。允许值：'parent', 'document', DOM元素, 或一个选择器.  

```javascript
$('.selector').resizable({ containment: 'parent' });  
var containment = $('.selector').resizable('option', 'containment');  
$('.selector').resizable('option', 'containment', 'parent');
```

- delay : Integer : 0  

以毫秒为单位，当发生鼠标点击手柄改变大小，延迟多少毫秒后才激活事件。  

```javascript
$('.selector').resizable({ delay: 20 });  
var delay = $('.selector').resizable('option', 'delay');  
$('.selector').resizable('option', 'delay', 20);
```

- distance : Integer : 1  

以像素为单位，当发生鼠标点击手柄改变大小，延迟多少像素后才激活事件。

```javascript
$('.selector').resizable({ distance: 20 });  
var distance = $('.selector').resizable('option', 'distance');  
$('.selector').resizable('option', 'distance', 20);
```

- ghost : Boolean : false  

如果设置为true，则在调整元素大小时，有一个半透明的辅助对象显示。

```javascript
$('.selector').resizable({ ghost: true });  
var grid = $('.selector').resizable('option', 'ghost');  
$('.selector').resizable('option', 'ghost', true);
```

- grid : Array : false  

设置元素调整的大小随网格变化，允许的数据为：{x,y}  

```javascript
$('.selector').resizable({ grid: [50, 50] });  
var grid = $('.selector').resizable('option', 'grid');  
$('.selector').resizable('option', 'grid', [50, 50]);
```

- handles : String, Object : 'e, s, se'  

设置resizable插件允许生成在元素的哪个边上，可选值：n, e, s, w, ne, se, sw, nw, all  

```javascript
$('.selector').resizable({ handles: 'n, e, s, w' });  
var handles = $('.selector').resizable('option', 'handles');  
$('.selector').resizable('option', 'handles', 'n, e, s, w');
```

- helper : String : false  

一个CSS类，当调整元素大小时，将被添加到辅助元素中，一但调整结束则恢复正常。

```javascript
$('.selector').resizable({ helper: 'ui-state-highlight' });
var helper = $('.selector').resizable('option', 'helper');   
$('.selector').resizable('option', 'helper', 'ui-state-highlight');
```

- maxHeight : Integer : null  

设置允许元素调整的最大高度。

```javascript
$('.selector').resizable({ maxHeight: 300 });  
var maxHeight = $('.selector').resizable('option', 'maxHeight');  
$('.selector').resizable('option', 'maxHeight', 300);
```

- maxWidth : Integer : null  

设置允许元素调整的最大宽度。

```javascript
$('.selector').resizable({ maxWidth: 250 });  
var maxWidth = $('.selector').resizable('option', 'maxWidth');  
$('.selector').resizable('option', 'maxWidth', 250);
```

- minHeight : Integer : 10  设置允许元素调整的最小高度。  
- minWidth : Integer : 10  


## 2. 事件

- start  当元素调整动作开始时触发。  

```javascript
$('.selector').resizable({ start: function(event, ui) { ... } });  //初始
$('.selector').bind('resizestart', function(event, ui) { ... });   //绑定
```

- resize  当元素调整动作过程中触发。  

```javascript
$('.selector').resizable({ resize: function(event, ui) { ... } });  
$('.selector').bind('resize', function(event, ui) { ... });
```

- stop  当元素调整动作结束时触发。  

```javascript
$('.selector').resizable({ stop: function(event, ui) { ... } });  
$('.selector').bind('resizestop', function(event, ui) { ... });
```

## 3. 方法

方法 |  用法   
---- |---
destory  从元素中移除拖拽功能  |.droppable( 'destroy' )
disable  禁用元素的拖拽功能    |.droppable( 'disable' )
enable  启用元素的拖拽功能     |.droppable( 'enable' )
option  获取或设置元素的参数   |.droppable( 'option' , optionName , [value] )

## 4. Others

### 4.1 FullScreen button for Dialog

**[solution 1](http://mabp.kiev.ua/2010/12/15/jquery-ui-fullscreen-button-for-dialog/)**

```css
.ui-dialog .ui-dialog-titlebar-fullscreen {
    position: absolute;
    right: 2em;
    top: 50%;
    width: 20px;
    margin: -10px 0 0 0;
    padding: 1px;
    height: 20px;
}
```

```javascript
(function ($) {
    $.ui.dialog.prototype.fullscreen = false;
    var old = $.ui.dialog.prototype._createTitlebar;
    
    $.ui.dialog.prototype._createTitlebar = function () {
        old.call(this);
        var oldHeight = this.options.height,
            oldWidth = this.options.width;

        this.uiDialogTitlebarFullScreen = $("<button type='button'></button>")
            .button({
                label: this.options.fullScreenText,
                icons: {
                    primary: "ui-icon-newwin"
                },
                text: false
            })
            .addClass("ui-dialog-titlebar-fullscreen")
            .appendTo(this.uiDialogTitlebar);

        this._on(this.uiDialogTitlebarFullScreen, {
            click: function (event) {
                event.preventDefault();
                if (this.fullscreen) {
                    this._setOptions({
                        height: oldHeight,
                        width: oldWidth
                    });
                } else {
                    this._setOptions({
                        height: window.innerHeight - 30,
                        width: window.innerWidth - 30
                    });
                }
                this.fullscreen = !this.fullscreen;
                this._position("center");
            }
        });
    };
})(jQuery);
```

**[solution 2](http://stackoverflow.com/questions/16855636/how-to-make-jquery-ui-dialog-occupy-full-window-and-dynamically-adjust-to-window)**

http://jsfiddle.net/NnsN2/1/

```javascript
$(window).resize(function () {
   $('.ui-dialog').css({
        'width': $(window).width(),
        'height': $(window).height(),
        'left': '0px',
        'top':'0px'
   });
}).resize(); //<---- resizes on page ready
```

**[solution 3](http://stackoverflow.com/questions/16855636/how-to-make-jquery-ui-dialog-occupy-full-window-and-dynamically-adjust-to-window)**

`$("#DlgID").parent().css('height', $(window).height());`

The actual height is dictated by the parent of your <div> containing the dialogue content, hence the reference. You can also use this method to control other properties of the parent.

