## css3的flex布局 - 'display: flex;'

**注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效**

### 一：容器样式说明

**排列方向和换行**

`flex-direction: column-reverse | row | row-reverse | wrap | column wrap; `

- column-reverse:   从下往上排列，并且子元素的高度会自动伸缩铺满整个容器的高度 
- row:              从左到右排列，并且子元素的宽度会自动伸缩铺满整个容器的宽度 
- row-reverse:      从右到左排列，并且子元素的宽度会自动伸缩铺满整个容器的宽度 
- wrap:             支持换行，当元素的总宽度超过了容器的宽度，会换行显示，可以和`flex-flow:column wrap`写在一起
- column wrap:      纵向排列，并且支持换行 
 
**对齐方式**

`justify-content: flex-start | flex-end | center | space-between | space-around;        /*左右的对齐方式*/`

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

`align-items: flex-start | flex-end | center | baseline | stretch;     /*上下的对齐方式*/`

- flex-start：纵轴的起点对齐
- flex-end：纵轴的终点对齐
- center：纵轴的中点对齐
- baseline: 项目的第一行文字的基线对齐
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

基于纵横轴的对其方式，align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
`align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

- flex-start：与纵轴的起点对齐
- flex-end：  与纵轴轴的终点对齐
- center：    与纵轴轴的中点对齐
- space-between：   与纵轴轴两端对齐，轴线之间的间隔平均分布
- space-around：    每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
- stretch（默认值）：轴线占满整个交叉轴

### 二：元素样式说明

**1、order样式**

设置元素的排列顺序：  `.item { order: <integer>; }`

**2、flex-grow样式**

设置元素的放大比例，如果为0表示不放大。如果所有元素的flex-grow都为1，则平分剩余大小（不是大小相同，是平分剩余的大小）：

`.item {flex-grow: <number>; /* default 0 */ }`

**3、flex-shrink样式**

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

`.item {flex-shrink: <number>; /* default 1 */}`

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小

**4、flex-basis样式**

flex-basis属性定义了在分配多余空间之前，项目占据的大小（纵向排列时是height，横向排列时是width）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

`.item {flex-basis: <length> | auto; /* default auto */}`
  
**5、flex样式**

flex属性是flex-grow, flex-shrink和flex-basis的简写，默认值为`0 1 auto`。后两个属性可选。

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

`.item {flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]}`

**6、align-self样式**

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

`.item {align-self: auto | flex-start | flex-end | center | baseline | stretch; }  /*该属性可能取6个值，除了auto，其他都与align-items属性完全一致。*/`

- flex-start：纵轴的起点对齐
- flex-end：纵轴的终点对齐
- center：纵轴的中点对齐
- baseline: 项目的第一行文字的基线对齐
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

> Reference

- http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool
- http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
- [css3的flex布局](http://www.cnblogs.com/lxiang/p/4766813.html)
