## JQuery UI - draggable参数中文详细说明

所有的事件回调函数都有两个参数：event和ui，浏览器自有event对象，和经过封装的ui对象   

- ui.helper - 表示被拖拽的元素的JQuery对象   
- ui.position - 表示相对当前对象，鼠标的坐标值对象{top,left}   
- ui.offset - 表示相对于当前页面，鼠标的坐标值对象{top,left}   
  
### 参数（参数名 : 参数类型 : 默认值）
   
`addClasses : Boolean : true  `

  如果设置成false，将在加载时阻止ui-draggable样式的加载。当有很多对象要加载draggable()插件的情况下，这将对性能有极大的优化   
  
- 初始: $('.selector').draggable({ addClasses: false });   
- 获取: var addClasses = $('.selector').draggable('option', 'addClasses');   
- 设置: $('.selector').draggable('option', 'addClasses', false);   
  
`appendTo : Element,Selector : 'parent'`  

  The element passed to or selected by the appendTo option will be used as the draggable helper's container during dragging. By default, the helper is appended to the same container as the draggable.  
   
- 初始：$('.selector').draggable({ appendTo: 'body' });   
- 获取：var appendTo = $('.selector').draggable('option', 'appendTo');   
- 设置：$('.selector').draggable('option', 'appendTo', 'body');   
  
`axis : String : false `  - 约束拖动的动作只能在X轴或Y轴上执行，可选值：'x', 'y'
 
- 初始：$('.selector').draggable({ axis: 'x' });   
- 获取：var axis = $('.selector').draggable('option', 'axis');   
- 设置：$('.selector').draggable('option', 'axis', 'x');   
  
`cancel : Selector : ':input,option'`  - 防止在指定的对象上开始拖动

- 初始：$('.selector').draggable({ cancel: 'button' });   
- 获取：var cancel = $('.selector').draggable('option', 'cancel');   
- 设置：$('.selector').draggable('option', 'cancel', 'button');   
  
`connectToSortable : Selector : false`  - 允许draggable被拖拽到指定的sortables中，如果使用此选项helper属性必须设置成clone才能正常工作
 
- 初始：$('.selector').draggable({ connectToSortable: 'ul#myList' });   
- 获取：var connectToSortable = $('.selector').draggable('option', 'connectToSortable');   
- 设置：$('.selector').draggable('option', 'connectToSortable', 'ul#myList');   
  
`containment : Selector,Element,String, Array : false  `  - 强制draggable只允许在指定元素或区域的范围内移动，可选值：`'parent', 'document', 'window', [x1, y1, x2, y2]`

- 初始：$('.selector').draggable({ containment: 'parent' });   
- 获取：var containment = $('.selector').draggable('option', 'containment');   
- 设置：$('.selector').draggable('option', 'containment', 'parent');   
  
`cursor : String : 'auto'`  - 指定在做拖拽动作时，鼠标的CSS样式

- 初始：$('.selector').draggable({ cursor: 'crosshair' });   
- 获取：var cursor = $('.selector').draggable('option', 'cursor');   
- 设置：$('.selector').draggable('option', 'cursor', 'crosshair');   
  
`cursorAt : Object : false ` - 当开始移动时，鼠标定位在的某个位置上（最多两个方向）。可选值：{ top, left, right, bottom }
 
- 初始：$('.selector').draggable({ cursorAt: { left: 5 } });   
- 获取：var cursorAt = $('.selector').draggable('option', 'cursorAt');   
- 设置：$('.selector').draggable('option', 'cursorAt', { left: 5 });   
  
`delay : Integer : 0 `  - 当鼠标点下后，延迟指定时间后才开始激活拖拽动作（单位：毫秒）。此选项可以用来防止不想要的拖累元素时的误点击

- 初始：$('.selector').draggable({ delay: 500 });   
- 获取：var delay = $('.selector').draggable('option', 'delay');   
- 设置：$('.selector').draggable('option', 'delay', 500);   
  
`distance : Integer : 1 `  - 当鼠标点下后，只有移动指定像素后才开始激活拖拽动作

- 初始：$('.selector').draggable({ distance: 30 });   
- 获取：var distance = $('.selector').draggable('option', 'distance');   
- 设置：$('.selector').draggable('option', 'distance', 30);   
  
`grid : Array : false`    - 拖拽元素时，只能以指定大小的方格进行拖动。可选值：`[x,y]`

- 初始：$('.selector').draggable({ grid: [50, 20] });   
- 获取：var grid = $('.selector').draggable('option', 'grid');   
- 设置：$('.selector').draggable('option', 'grid', [50, 20]);   
  
`handle : Element, Selector : false `   - 限制只能在拖拽元素内的指定元素开始拖拽

- 初始：$('.selector').draggable({ handle: 'h2' });   
- 获取：var handle = $('.selector').draggable('option', 'handle');   
- 设置：$('.selector').draggable('option', 'handle', 'h2');   
  
`helper : String, Function : 'original'`  - 拖拽元素时的显示方式。（如果是函数，必须返回值是一个DOM元素）可选值：`'original', 'clone', Function`    

- 初始：$('.selector').draggable({ helper: 'clone' });   
- 获取：var helper = $('.selector').draggable('option', 'helper');   
- 设置：$('.selector').draggable('option', 'helper', 'clone');   
  
`iframeFix : Boolean, Selector : false`  - 可防止当mouseover事件触发拖拽动作时，移动过iframes并捕获到它（内部内容），如果设置成true，则屏蔽层会覆盖页面的iframe。如果设置成对应的选择器，则屏蔽层会覆盖相匹配的iframe

- 初始：$('.selector').draggable({ iframeFix: true });   
- 获取：var iframeFix = $('.selector').draggable('option', 'iframeFix');   
- 设置：$('.selector').draggable('option', 'iframeFix', true);   
  
`opacity : Float : false`  - 当元素开始拖拽时，改变元素的透明度

- 初始：$('.selector').draggable({ opacity: 0.35 });   
- 获取：var opacity = $('.selector').draggable('option', 'opacity');   
- 设置：$('.selector').draggable('option', 'opacity', 0.35);   
  
`refreshPositions : Boolean : false`  - 如果设置成true，所有移动过程中的坐标都会被记录。（注意：此功能将影响性能）

- 初始：$('.selector').draggable({ refreshPositions: true });   
- 获取：var refreshPositions = $('.selector').draggable('option', 'refreshPositions');   
- 设置：$('.selector').draggable('option', 'refreshPositions', true);   
  
`revert : Boolean, String : false ` -  当元素拖拽结束后，元素回到原来的位置

- 初始：$('.selector').draggable({ revert: true });   
- 获取：var revert = $('.selector').draggable('option', 'revert');   
- 设置：$('.selector').draggable('option', 'revert', true);   
  
`revertDuration : Integer : 500 `  - 当元素拖拽结束后，元素回到原来的位置的时间。（单位：毫秒）

- 初始：$('.selector').draggable({ revertDuration: 1000 });   
- 获取：var revertDuration = $('.selector').draggable('option', 'revertDuration');   
- 设置：$('.selector').draggable('option', 'revertDuration', 1000);   
  
`scope : String : 'default'`  - 设置元素只允许拖拽到具有相同scope值的元素

- 初始：$('.selector').draggable({ scope: 'tasks' });   
- 获取：var scope = $('.selector').draggable('option', 'scope');   
- 设置：$('.selector').draggable('option', 'scope', 'tasks');   
  
`scroll : Boolean : true`  - 如果设置为true，元素拖拽至边缘时，父容器将自动滚动

- 初始：$('.selector').draggable({ scroll: false });   
- 获取：var scroll = $('.selector').draggable('option', 'scroll');   
- 设置：$('.selector').draggable('option', 'scroll', false);   
  
`scrollSensitivity : Integer : 20`   - 当元素拖拽至边缘时，父窗口一次滚动的像素

- 初始：$('.selector').draggable({ scrollSensitivity: 40 });   
- 获取：var scrollSensitivity = $('.selector').draggable('option', 'scrollSensitivity');   
- 设置：$('.selector').draggable('option', 'scrollSensitivity', 40);   
  
`scrollSpeed : Integer : 20`   - 当元素拖拽至边缘时，父窗口滚动的速度

- 初始：$('.selector').draggable({ scrollSpeed: 40 });   
- 获取：var scrollSpeed = $('.selector').draggable('option', 'scrollSpeed');   
- 设置：$('.selector').draggable('option', 'scrollSpeed', 40);   
  
`snap : Boolean, Selector : false`  - 当设置为true或元素标签时，元素拖动到其它元素的边缘时，会自动吸附其它元素

- 初始：$('.selector').draggable({ snap: 'span' });   
- 获取：var snap = $('.selector').draggable('option', 'snap');   
- 设置：$('.selector').draggable('option', 'snap', 'span');   
  
`snapMode : String : 'both'`  - 确定拖拽的元素吸附的模式。可选值：'inner', 'outer', 'both'

- 初始：$('.selector').draggable({ snapMode: 'outer' });   
- 获取：var snapMode = $('.selector').draggable('option', 'snapMode');   
- 设置：$('.selector').draggable('option', 'snapMode', 'outer');   
  
`snapTolerance : Integer : 20`   - 确定拖拽的元素移动至其它元素多少像素的距离时，发生吸附的动作 

- 初始：$('.selector').draggable({ snapTolerance: 40 });   
- 获取：var snapTolerance = $('.selector').draggable('option', 'snapTolerance');   
- 设置：$('.selector').draggable('option', 'snapTolerance', 40);   
  
`stack : Object : false`  - Controls the z-Index of the defined group (key 'group' in the hash, accepts jQuery selector) automatically, always brings to front the dragged item. Very useful in things like window managers. Optionally, a 'min' key can be set, so the zIndex cannot go below that value
 
- 初始：$('.selector').draggable({ stack: { group: 'products', min: 50 } });   
- 获取：var stack = $('.selector').draggable('option', 'stack');   
- 设置：$('.selector').draggable('option', 'stack', { group: 'products', min: 50 });   
  
`zIndex : Integer : false`  - 控制当拖拽元素时，改变元素的z-index值

- 初始：$('.selector').draggable({ zIndex: 2700 });   
- 获取：var zIndex = $('.selector').draggable('option', 'zIndex');   
- 设置：$('.selector').draggable('option', 'zIndex', 2700);   
  
  
### 事件   

start  -当鼠标开始拖拽时，触发此事件

- 初始：$('.selector').draggable({ start: function(event, ui){...} });   
- 绑定：$('.selector').bind('dragstart', function(event, ui){...});   
  
drag  - 当鼠标拖拽移动时，触发此事件

- 初始：$('.selector').draggable({ drag: function(event, ui){...} });   
- 绑定：$('.selector').bind('drag', function(event, ui){...});   
  
stop - 当鼠标松开时，触发此事件
  
- 初始：$('.selector').draggable({ stop: function(event, ui){...} });   
- 绑定：$('.selector').bind('dragstop', function(event, ui){...});   
  
### 方法   

| 方法     | 说明     | 用法     |
| :------------- | :------------- |:------------- |
| destory  | 从元素中移除拖拽功能|.draggable( 'destroy' )|
|disable|禁用元素的拖拽功能|.draggable( 'disable' )|
|enable |启用元素的拖拽功能|.draggable( 'enable' )|
|option|获取或设置元素的参数|.draggable( 'option' , optionName , [value] )|  
   
