## css3的flex布局 - 'display: flex;'

**注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效**

![](http://i.imgur.com/agCkd01.png)

### 一：容器的样式

**排列方向和换行**

`flex-direction: column-reverse | row | row-reverse | wrap | column wrap; `  - 主轴的方向（即项目的排列方向）

- column-reverse:   主轴为水平方向，起点在右端
- column:           主轴为垂直方向，起点在上沿，并且支持换行 
- row（默认值）:      主轴为水平方向，起点在左端, 从左到右排列，并且子元素的宽度会自动伸缩铺满整个容器的宽度 
- row-reverse:      主轴为水平方向，起点在右端, 从右到左排列，并且子元素的宽度会自动伸缩铺满整个容器的宽度

`flex-wrap: nowrap | wrap | wrap-reverse;`  - 如果一条轴线排不下，如何换行

- nowrap（默认）：     不换行
- wrap：             换行，第一行在上方
- wrap-reverse：     换行，第一行在下方

`flex-flow: <flex-direction> || <flex-wrap>;`  - flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

**项目在主轴上的对齐方式 - justify-content**

`justify-content: flex-start | flex-end | center | space-between | space-around;        /*左右的对齐方式*/`

- flex-start（默认值）：   左对齐
- flex-end：            右对齐
- center：              居中
- space-between：       两端对齐，项目之间的间隔都相等
- space-around：        每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

![](http://i.imgur.com/mF24DmT.png)

**项目在交叉轴上的对齐方式 - align-items**

`align-items: flex-start | flex-end | center | baseline | stretch;     /*上下的对齐方式*/`

- flex-start：   纵轴的起点对齐
- flex-end：     纵轴的终点对齐
- center：       纵轴的中点对齐
- baseline:     项目的第一行文字的基线对齐
- stretch（默认值）：    如果项目未设置高度或设为auto，将占满整个容器的高度

![](http://i.imgur.com/OqRLFZq.png)

**项目在多根轴线的对齐方式 - align-content**

如果项目只有一根轴线，该属性不起作用

`align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

- flex-start：      与纵轴的起点对齐
- flex-end：        与纵轴轴的终点对齐
- center：          与纵轴轴的中点对齐
- space-between：   与纵轴轴两端对齐，轴线之间的间隔平均分布
- space-around：    每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
- stretch（默认值）： 轴线占满整个交叉轴

![](http://i.imgur.com/Ps37Xq1.png)

### 二：元素样式的属性

**1、order样式** - 元素(项目)的排列顺序。数值越小，排列越靠前，默认为0

`.item { order: <integer>; }`

**2、flex-grow样式** - 元素(项目)的放大比例，如果为0表示不放大。如果所有元素的flex-grow都为1，则平分剩余大小（不是大小相同，是平分剩余的大小）

`.item {flex-grow: <number>; /* default 0 */ }`

![](http://i.imgur.com/lyZohvu.png)

**3、flex-shrink样式** - 元素(项目)的缩小比例，默认为1，即如果空间不足，该项目将缩小

`.item {flex-shrink: <number>; /* default 1 */}`

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小

**4、flex-basis样式**

flex-basis属性定义了在分配多余空间之前，项目占据的大小（纵向排列时是height，横向排列时是width）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

`.item {flex-basis: <length> | auto; /* default auto */}`

可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间
  
**5、flex样式**

flex属性是flex-grow, flex-shrink和flex-basis的简写，默认值为`0 1 auto`。后两个属性可选。

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

`.item {flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]}`

**6、align-self样式**

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

`.item {align-self: auto | flex-start | flex-end | center | baseline | stretch; }  /*该属性可能取6个值，除了auto，其他都与align-items属性完全一致。*/`

- flex-start：   纵轴的起点对齐
- flex-end：     纵轴的终点对齐
- center：       纵轴的中点对齐
- baseline:     项目的第一行文字的基线对齐
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

![](http://i.imgur.com/khmSLzp.png)

> Reference

- http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool
- http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
- [css3的flex布局](http://www.cnblogs.com/lxiang/p/4766813.html)
