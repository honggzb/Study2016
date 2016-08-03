拖放（Drag 和 drop）是 HTML5 标准的组成部分

**浏览器支持**

Internet Explorer 9、Firefox、Opera 12、Chrome 以及 Safari 5

**被拖元素，dragElement**

1. 添加事件：ondragstart, ondrag, ondragend
2. 添加属性：dragable
3. html中必须添加draggable 属性：就是标签元素要设置`draggable=true`，否则不会有效果，例如：
  - true：表示此元素可拖拽
  - false：表示此元素不可拖拽
  - auto：除img和带href的标签a标签表示可拖拽外，其它标签均表示不可拖拽。其它任何值：表示不可拖拽

```html
<div title="拖拽我" draggable="true">列表1</div>
```


**放置元素，dropElement**

- 添加事件：ondargenter , ondragover , ondragleave , ondragend ,ondrop
- dropzone属性
  - copy:表示将允许的元素放到该元素上时，会将拖拽数据复制到目标元素上
  - link:表示将允许的元素放到该元素上时，将链接数据到目标元素上
  - move:表示将允许的元素放到该元素上时，会将数据移动到目标元素上
  - 以string:开头的字符串，长度不能小于8个字符:表示能接受DataTransferItem.kind值为string的data对象
  - 以file:开头的字符串，长度不能小于6个字符:表示能接受DataTransferItem.kind值为file且DataTransferItem.type的值匹配file:之后的字符的DataTransferItem的对象

拖放事件

事件|产生事件的元素|描述
---|---|---
dragstart|被拖放的元素|开始拖放
drag|被拖放的元素|拖放过程中
dragenter|拖放过程中鼠标经过的元素|被拖放的元素开始进入本元素的范围内
dragover|拖放过程中鼠标经过的元素|拖放正在本元素范围内移动
dragleave|拖放过程中鼠标经过的元素|拖放离开元素的范围
drop|拖放的目标元素|在其他元素被拖放到了本元素中
dragend|拖放的对象元素|拖放操作结束


**说明**

- 在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发（drop事件的默认行为是以链接形式打开，所以也需要阻止其默认行为）。
- 另外，如果是从其他应用软件或是文件中拖东西进来，尤其是图片的时候，默认的动作是显示这个图片或是相关信息，并不是真的执行drop。此时需要用用document的ondragover事件把它直接干掉
- getData,setData，clearData就是清除设置的数据。
- 值得注意的是files，当把操作系统中选择的一个或多个文件拖入该div中，files中会存储拖入文件的信息，然后我们通过file可以得到文件的类型，长度，内容然后实现上传
- setDragImage(image, x, y)用于设置鼠标移动过程中随鼠标一起移动的效果图。必须在dragstart中设置
  - x、y参数用于指定图像相对于鼠标指针的位置
  - image参数用于指定图像元素，若是一个img元素，则显示图像元素，否则将给定的元素转换成一张图像并显示
- Event.effectAllowed和Event.dropEffect属性：拖拽过程中鼠标显示的样式，受浏览器和操作系统的影响，鼠标显示的图标并不一致
  - effectAllowed表示此次拖拽允许显示的鼠标样式。只能在dragstart事件中更改此值。
  - dropEffect表示此次拖拽过程中显示的样式。在具体的拖拽过程中，还受effectAllowed值限定

** 使用DataTransfer对象传递数据**

使用一般为Event.dataTransfer,  保存拖放时候所需要携带的数据， 如`var file = ev.dataTransfer.files[0]`来引用被拖放的文件

- types: 返回数据的格式
- getData(<format>)：返回指定格式数据
- setData(<format>,<data>)：设置指定格式的数据
- clearData(<format>):
- files: 返回已经投放的文件的信息数据
  - type：文件类型
  - size：文件大小
  - name： 文件名

  ```javascript
  addEvent(el,'dragstart',function(ev){
    dragSrcEl = this;
    ev.dataTransfer.effectAllowed = "all";
    ev.dataTransfer.setData('text/html',this.innerHTML); //将节点内容传入dataTransfer对象
    this.style.border = '1px dotted #bbbbbb';     //为被拖动对象添加边框
    ev.dataTransfer.setDragImage(dragIcon,-10,-10);  //设置拖动图片
  });
  addEvent(el,'drop',function(ev){
    if(ev.stopPropagation) { ev.stopPropagation(); };
    if(ev.preventDefault) { ev.preventDefault(); }
    if(dragSrcEl!=this){
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getDate('text/html');   //从dataTransfer对象中读出数据
    }
    return false;
  });
  ```

** HTML5 drag & drop asynchronously **

- 异步ajax

```javascript
var xml = new XMLHttpRequest();
xml.open("post","1.php");
xml.send(formData);
```

- 表单数据

```javascript
var formData = new FormData();
formData.append("aa",DataTransferObj);
```
