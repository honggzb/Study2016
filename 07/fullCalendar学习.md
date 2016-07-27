
## fullcalendar日历控件知识点集合

- 同时可支持动态Ajax加载日程安排JSON数据，具体可查看实例源代码，如下：
events直接调用PHP文件获取JSON数据，同时实现eventDrop和加载loading事件
- 可实现Google日历扩展，events调用$.fullCalendar.gcalFeed()方法获取google日历数据，同时实现eventClick和加载loading事件

### 1、基本语法：

- 第一种和日历本身无关，仅仅是利用fullcalendar提供的方法来进行字符串和日期间的转换, `$.fullCalendar.formatDate();`
- 第二种则是与和配置fullcalendar实例相关的，这最终会影响到fullcalendar在浏览器里的渲染，`$(‘#someId’) .fullCalendar(content);`

**Content有三种形式**

- 为属性赋值 {key:value,…}

```javascript
$('#calendar').fullCalendar({
  weekends: false // will hide Saturdays and Sundays
});
```

这里即得到一个fullcalendar实例，其中weekends属性为false,即月日历不会显示周末。

- 方法调用'methodName','para'

`$('#calendar').fullCalendar('next')`

 这里会调用fullcalendar实例的next方法，其结果是浏览器的日历向后翻一月(日)

- 为方法回调赋值

```javascript
$('#calendar').fullCalendar({
  dayClick: function() { alert('a day has been clicked!'); }
});
```

### 2、知识点概要

**日历部分**

name | description
---|---
[视图](http://blog.csdn.net/francislaw/article/details/7740630#_4.1%E3%80%81%E5%90%88%E6%B3%95%E7%9A%84%E8%A7%86%E5%9B%BE)|日历的不同的展现模式。当前共有5中视图
[视图的通用配置](http://blog.csdn.net/francislaw/article/details/7740630#_4.2%E3%80%81%E8%A7%86%E5%9B%BE%E7%9A%84%E9%80%9A%E7%94%A8%E9%85%8D%E7%BD%AE)|这一部分的配置通常可以对5中视图均有效。
[视图对象](http://blog.csdn.net/francislaw/article/details/7740630#_4.3%E3%80%81%E8%A7%86%E5%9B%BE%E5%AF%B9%E8%B1%A1viewObject)|fullcalendar的视图Module
[获取视图对象以及跳转到指定视图的方法](http://blog.csdn.net/francislaw/article/details/7740630#_4.4%E3%80%81%E8%8E%B7%E5%8F%96%E8%A7%86%E5%9B%BE%E5%AF%B9%E8%B1%A1)|
[议程相关](http://blog.csdn.net/francislaw/article/details/7740630#_4.5%E3%80%81%E6%97%A5%E7%A8%8B%E7%9B%B8%E5%85%B3%E2%80%94%E2%80%94%E6%8E%A7%E5%88%B6%E6%97%A5%E7%A8%8B%E7%9B%B8%E5%85%B3%E7%9A%84%E8%A7%86%E5%9B%BE%E7%9A%84%E6%98%BE%E7%A4%BA%E4%BF%A1%E6%81%AF)|即对议程视图模式下，相关细节的配置
[日期相关](http://blog.csdn.net/francislaw/article/details/7740630#_4.6%E3%80%81%E6%97%A5%E6%9C%9F%E7%9B%B8%E5%85%B3)|涉及到日历系统里日期的显示格式，日历加载的日期，以及获取相关日期或者日历改变日期的相关方法
[时间和文本的自定义设置](http://blog.csdn.net/francislaw/article/details/7740630#_4.7%E3%80%81%E6%97%B6%E9%97%B4%E5%92%8C%E6%96%87%E6%9C%AC%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89)|涉及到自定义或者本地化的相关配置大多在这里完成
[鼠标的相关事件捕获](http://blog.csdn.net/francislaw/article/details/7740630#_4.9%E3%80%81%E9%80%89%E4%B8%AD%E7%9B%B8%E5%85%B3%EF%BC%9A%E5%BD%93%E7%82%B9%E5%87%BB%E6%88%96%E8%80%85%E6%8B%96%E6%8B%BD%E5%88%B0%E7%9B%B8%E5%85%B3%E4%BD%8D%E7%BD%AE%E6%97%B6%EF%BC%8C%E9%9D%9E%E5%90%A6%E9%80%89%E4%B8%AD%E5%AF%B9%E5%BA%94%E5%85%83%E7%B4%A0)|比如鼠标单击到某个特殊地方（日历中的某一天等）等触发的方法在这里配置
[选中元素的配置](http://blog.csdn.net/francislaw/article/details/7740630#_4.9%E3%80%81%E9%80%89%E4%B8%AD%E7%9B%B8%E5%85%B3%EF%BC%9A%E5%BD%93%E7%82%B9%E5%87%BB%E6%88%96%E8%80%85%E6%8B%96%E6%8B%BD%E5%88%B0%E7%9B%B8%E5%85%B3%E4%BD%8D%E7%BD%AE%E6%97%B6%EF%BC%8C%E9%9D%9E%E5%90%A6%E9%80%89%E4%B8%AD%E5%AF%B9%E5%BA%94%E5%85%83%E7%B4%A0)|这一部分是来配置当鼠标点击某一日历元素时，是否选中该元素以及与此相关的事件

**事件部分**

name | description
---|---
[事件Module包含的信息](http://blog.csdn.net/francislaw/article/details/7740630#_4.10%E3%80%81Event%E7%9B%B8%E5%85%B3)|
[事件的产生](http://blog.csdn.net/francislaw/article/details/7740630#_4.10%E3%80%81Event%E7%9B%B8%E5%85%B3)|包括事件源的管理和事件的管理
[事件的描绘](http://blog.csdn.net/francislaw/article/details/7740630#_4.11%E3%80%81%E4%BA%8B%E4%BB%B6%E6%8F%8F%E7%BB%98%EF%BC%88%E5%AF%B9%E5%BA%94%E4%BA%8E%E6%95%B4%E4%B8%AAcallendar%E9%87%8C%E7%9A%84%E4%BA%8B%E4%BB%B6%EF%BC%89)|把一个事件描绘到浏览器的整个过程包含在这里
[拖拽事件](http://blog.csdn.net/francislaw/article/details/7740630#_4.12%E3%80%81%E6%8B%96%E6%8B%BD%E4%BA%8B%E4%BB%B6)|用鼠标拖拽以移动某个时间，这需要其他JQUERY ui插件的支持
[从日历外拖拽事件到日历内以添加事件](http://blog.csdn.net/francislaw/article/details/7740630#_4.13%E3%80%81%E4%BB%8E%E6%97%A5%E5%8E%86%E5%A4%96%E6%8B%96%E6%8B%BD%E4%BA%8B%E4%BB%B6%E5%88%B0%E6%97%A5%E5%8E%86%E4%B8%AD)|对日历内拖拽事件的扩展

### 3、详细知识点

#### 3.1、合法的视图

- month - [see example](http://arshaw.com/fullcalendar/views/month/) 月视图
- basicWeek - see example 周视图（一周内事件和日期的集合）
- basicDay - see example (一日内事件和日期的集合)
- agendaWeek - see example (周日程表)
- agendaDay - see example (日日程表)


#### 3.2、视图的通用配置

- [header](http://arshaw.com/fullcalendar/docs/display/header/)

头部显示的信息，分left , center, right三个部位

合法的属性值：title,prev,next,prevYear,nextYear,today, avaibleViewName

```javascript
header: {
    left: 'title',
    center: 'prevYear,nextYear',
    right: 'prev,today,next,agendaDay,month'
}
```
 
- [theme](http://arshaw.com/fullcalendar/docs/display/theme/)

当为true时，可以配合JQUERY-UI，配置日历的皮肤

[buttonIcons](http://arshaw.com/fullcalendar/docs/display/buttonIcons/)：http://jqueryui.com/themeroller/

```javascript
buttonIcons: {
    prev: 'circle-triangle-w',
    next: 'circle-triangle-e'
}
//注意去掉.ui-icon-
```

name | description|Other
---|---|---
firstDay|每周开始的日期：0为周日|
isRTL|是否从右至左组织日历|
weekends|是否显示周末|
weekMode|周的显示模式|
|fixed|每月始终显示6周
|liquid|周数不定，每周的高度可变，整个日历高度不变
|variable|周数不定，每周的高度固定，整个日历的高度可变
height整|个日历的高度（包括header和content）|
contentHeight|内容高度|
aspectRatio|宽和高的比例|`$('#calendar').fullCalendar('option','aspectRatio', 1.8);` 可以动态设置
viewDisplay(callback)函数回调|每次view显示时均会调用|
windowResize (callback)函数回调|每次窗口大小改变时调用|
render (method)|立刻显示view|
destroy (method)|释放calendar，包括相关数据|
defaultView|日历初始化时的视图，默认为month|

#### 3.3、视图对象viewObject

name | description
---|---
name|可用的5个视图名之一
title|视图部分的title 2012.9.1
start|当天view开始的第一天
end|
visStart|Visible Start Day
visEnd|

在相关方法回调中均会有次对象

#### 3.4、获取视图对象

- 获取视图: `.fullCalendar( 'getView' )` 
- 切换视图: `.fullCalendar( 'changeView', viewName )`

#### 3.5、议程相关——控制日程相关的视图的显示信息

name | description
---|---
allDaySlot|是否显示全天日程
allDayText|显示的文字
axisFormat|日期显示的格式
slotMinutes|间隔时间
defaultEventMinutes|默认的事件持续事件
firstHour|在日程view里可见的起始时间，可通过滚动条滚动到在此时间之前的时间
minTime|整日日程的起始时间
maxTime|整日日程的结束时间

#### 3.6、日期相关

name | description
---|---
year|日历加载时的年份
month|日历加载时的月份（从0开始）
date|日历加载时在月份的天数（对周视图和日视图有效）
prev (method)|日历跳转到前一天
next (method)|日历跳转到后一天
prevYear (method)|日历跳转到前一年
nextYear (method)|日历跳转到后一年
today (method)|日历跳转到当前日期
gotoDate (method)|日历跳转到指定日期
incrementDate (method)|日历向前（向后）跳转一段时间
getDate (method)|获取日历的当前日期 Date类型

#### 3.7、时间和文本的自定义

- timeFormat每个事件默认显示的时间格式
- columnFormat每个视图列名显示的格式、

```javascript
{ 
  month: 'ddd', // Mon
  week: 'ddd M/d', // Mon9/7
  day: 'dddd M/d' // Monday9/7 
}
```
 
- titleFormat每个视图里title显示的格式

```javascript
{ 
  month: 'MMMM yyyy', // September 2009
  week: "MMM d[ yyyy]{'&#8212;'[ MMM] d yyyy}", // Sep 7 - 13 2009
  day: 'dddd, MMM d, yyyy'// Tuesday, Sep 8, 2009 
   }
```

- buttonText视图里每个button显示的文字

```javascript
{ 
  prev: '&nbsp;&#9668;&nbsp;', // left triangle
  next:'&nbsp;&#9658;&nbsp;', // right triangle
  prevYear:'&nbsp;&lt;&lt;&nbsp;', // <<
  nextYear:'&nbsp;&gt;&gt;&nbsp;', // >>
  today: 'today',
  month: 'month',
  week: 'week',
  day: 'day' 
}
```

- monthNames月的全称
- monthNamesShort月的简称
- dayNames星期的全称
- dayNamesShort星期的简称

#### 3.8、相关点击事件

name | description|other
---|---|---
`dayClick:function( date, allDay, jsEvent, view ) { }`|当某天被点击时触发|
|date|当前点击到的日期 
|allDay|是否是全天性的
|jsEvent|底层的JS事件
|view|当前的view对象
|this关键字|指代为`<td>`
`eventClick:function( event, jsEvent, view ) { }`|当一个事件给点击时触发|
|event|当前的event对象
|jsEvent|底层的JS事件
|view|当前的view
|this|指代的`<td>`里的`<div>`元素
eventMouseover (callback)|鼠标滑动到事件上触发，同eventClick类似|
eventMouseout (callback)|鼠标离开到事件上触发，同eventClick类似|

#### 3.9、选中相关：当点击或者拖拽到相关位置时，非否选中对应元素

name | description
---|---
selectable|是否选中对应元素
selectHelper|在日程表相关的view里，当选中对应时刻时，是否显示相关信息
unselectAuto|当点击页面日历以外的位置时，是否自动取消当前的选中
unselectCancel|指定哪些元素不会清空当前的选中，以JQUERY选择器的方式指定 '#someId'
`select:function( startDate, endDate, allDay, jsEvent, view )`|被选中时的函数回调
unselect (callback)|选中被取消时的回调
select (method),`.fullCalendar( 'select', startDate, endDate, allDay )`|选中某个时间
unselect (method), `.fullCalendar( 'unselect' )`|取消选中

#### 3.10、Event相关

[EventObject](http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)事件对象

name | description
---|---
id|可选，事件唯一标识，重复的事件具有相同的
title|必须，事件在日历上显示的title
allDay|可选，是否是整日事件
start|必须，事件的开始时间
end|可选，结束时间
url|可选，当指定后，事件被点击将打开对应url
className|指定事件的样式
editable|是否可拖拽
source|指向次event的eventsource对象
color|背景和边框颜色
backgroundColor|背景颜色
borderColor|边框颜色
textColor|文本颜色

[EventSource Object](http://arshaw.com/fullcalendar/docs/event_data/Event_Source_Object/)

EVENTS:在日历界面里，参数event的对象：分array，json feed，function三种类型

Eventsource:

```javascript
{
  events: [
    { title: 'Event1',start: '2011-04-04' },
    { title: 'Event2',start: '2011-05-05' } // etc... 
  ],
  color: 'yellow', // anoption!
  textColor: 'black' // an option!
}
```

eventsource可选的配置选项

name | description
---|---
className|指定事件的样式
editable|是否可拖拽
source|指向次event的eventsource对象
color|背景和边框颜色
backgroundColor|背景颜色
borderColor|边框颜色
textColor|文本颜色

[events](http://arshaw.com/fullcalendar/docs/event_data/events_array/) (asan array)数组形式组织的事件集

```javascript
$('#calendar').fullCalendar({
    events: [
        {
            title  : 'event1',
            start  : '2010-01-01'
        },
        {
            title : 'event2',
            start  : '2010-01-05',
            end    : '2010-01-07'
        },
        {
            title  : 'event3',
            start  : '2010-01-09 12:30:00',
            allDay : false //will make the time show
        }
    ]
});
```

[events](http://arshaw.com/fullcalendar/docs/event_data/events_json_feed/) (asa json feed)JSON源方式获取的events

每次当view的时间改变时，均会获取json。其中start和end为对应view的start和end，插入_是默认不访问浏览器缓存。可通过cache:true来默认读取浏览器缓存

```javascript
$('#calendar').fullCalendar({
    events: '/myfeed.php'
});
```

会被转换为如下url请求: `/myfeed.php?start=1262332800&end=1265011200&_=1263178646`

[events](http://arshaw.com/fullcalendar/docs/event_data/events_function/) (asa function)

作为方法的形式获得event

```javascript
$('#calendar').fullCalendar({
    events: function(start,end, callback) {
        $.ajax({
            url:'myxmlfeed.php',
            dataType: 'xml',
            data: {
                // ourhypothetical feed requires UNIX timestamps
                start:Math.round(start.getTime() / 1000),
                end: Math.round(end.getTime()/ 1000)
            },
            success:function(doc) {
              var events =[];
              $(doc).find('event').each(function() {
                   events.push({
                        title:$(this).attr('title'),
                        start:$(this).attr('start') // will be parsed
                    });
                });
               callback(events);
            }
        });
    }
});
```

- start和end同之前开始和结束时间（默认为-1970的毫秒）
- callback为当获取到event后，会调用的改回调函数，把数据放入fullcalendar里的events里。

[eventSources](http://arshaw.com/fullcalendar/docs/event_data/eventSources/)

可以放置多个eventSource（events）

```javascript
$('#calendar').fullCalendar({
    eventSources: [
        '/feed1.php',
        '/feed2.php'
    ]
});
```

name | description
---|---
allDayDefault|当event object里的allDay为指定时，其默认值
ignoreTimezone|忽略timeZone, 2008-11-05T08:15:30-05:00 
startParam|传递给服务器的start参数名
endParam|同上
lazyFetching|当view改变时，是否从缓存信息获取event。比如从月视图切换到周视图，默认为是
`loading : function( isLoading, view )`|当调用ajax获取event是触发。
updateEvent (method)|在客户端更新event并在页面上重新描绘
clientEvents (method)|获取客户端保存的所有events对象, `.fullCalendar( 'clientEvents' [, idOrFilter ]) -> Array `
removeEvents (method)|删除event并重新描绘
refetchEvents (method)|重新获取events并重新描绘
addEventSource (method)|添加eventSource，并立刻在页面上描绘,`.fullCalendar( 'addEventSource', source ) `
removeEventSource (method)|同上

#### 3.11、事件描绘（对应于整个callendar里的事件）

name | description
---|---
[eventColor](http://arshaw.com/fullcalendar/docs/event_rendering/eventColor/)|
eventBackgroundColor|
eventBorderColor|
eventTextColor|
eventRender:function( event, element, view ) { }|当描绘事件时触发
e, event为改事件，element为用来渲染改事件的div元素
eventAfterRender (callback)|同上
renderEvent (method)|`.fullCalendar( 'renderEvent', event [, stick ] )`
rerenderEvents (method)|`.fullCalendar( 'rerenderEvents' ) `, 同refetchEvents 

#### 3.12、拖拽事件

需要添加JQUERY UIDraggable  插件，并把editable设置为true。相关属性和方法同事件类似

name | description
---|---
editable|Determines whether the events on the calendar can be modified.
disableDragging|Disables all event dragging, even when events are editable.
disableResizing|Disables all event resizing, even when events are editable.
dragRevertDuration|Time it takes for an event to revert to its original position afteran unsuccessful drag.
dragOpacity|The opacity of an event while it is being dragged.
eventDragStart (callback)|Triggered when event dragging begins.
eventDragStop (callback)|Triggered when event dragging stops.
eventDrop (callback)|Triggered when dragging stops and the event has moved to a differentday/time.
eventResizeStart (callback)|Triggered when event resizing begins.
eventResizeStop (callback)|Triggered when event resizing stops.
eventResize (callback)|Triggered when resizing stops and the event has changed in duration.
 
#### 3.13、从日历外拖拽事件到日历中

额外需求：

- 需要jquery-ui相关控件的支持jquery-ui-1.8.17.custom.min.js
- 日历的dropple属性需设置为true

基本思路

- 在日历胖构建好用来拖拽的元素<div>
- 设置相应div的drop操作

```javascript
$('#external-events div.external-event').each(function() {
  // create an Event Object 
  // it doesn't need to have a start or end
  var eventObject = {
    title: $.trim($(this).text()) // use the element's text as the eventtitle
  };
  // store the Event Object in the DOM element so we can get to itlater
  $(this).data('eventObject', eventObject);
  // make the event draggable using jQuery UI
  $(this).draggable({
    zIndex: 999,
    revert: true,      // willcause the event to go back to its
    revertDuration: 0  //  original position after the drag
  });
});
```

- 在日历中的drop回调中进行构造event并描绘

```javascript
drop: function(date, allDay) { // this function is called whensomething is dropped
  // retrieve the dropped element's stored Event Object
  var originalEventObject = $(this).data('eventObject');
  // we need to copy it, so that multiple events don't have areference to the same object
  var copiedEventObject = $.extend({}, originalEventObject);
  // assign it the date that was reported
  copiedEventObject.start = date;
  copiedEventObject.allDay = allDay;
  // render the event on the calendar
  // the last `true` argument determines if the event"sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
  $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
  // is the "remove after drop" checkbox checked?
  if ($('#drop-remove').is(':checked')) {
    // if so, remove the element from the "Draggable Events"list
    $(this).remove();
  }
} 
```

#### 3.14、日期转换工具

name | description
---|---
formatDate (function)|Formats a Date object into a string.
formatDates (function)|Formats a date range (two Date objects)into a string.
parseDate (function)|Parses a string into a Date object.
parseISO8601 (function)|Parses an ISO8601 string into a Dateobject.

> references

- [FullCalendar热门博客列表 - ITeye博客频道 - ITeye.com](http://www.iteye.com/blogs/tag/FullCalendar)
- [jQuery插件实战之fullcalendar（日历插件） - 使用fullcalendar开发一个功能完整的富客户端会议室预定系统](http://www.gbin1.com/technology/jquery/devappwithfullcanlendar/index.html)
- [jquery.fullCalendar官方文档翻译(一款小巧好用的日程管理日历, 可集成Google Calendar)](http://pjzz6666.iteye.com/blog/1746412)
