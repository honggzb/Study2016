### 1. basic

- .select/selectAll：从当前文档中选择元素
- .data(dataset)：此语法将数据集绑定到对象上
- .enter()：此语法将数据集输入对象并为Select到的集合添加缺失元素
- .append("rect")：创建并添加新元素到选定元素后, 添加元素后，赋予属性值
- .attr("width", 500)：设置属性
- .update(): 更新属性值
- .exit()

1.1 选择、插入、删除元素

```javascript
.select/selectAll("htmltagname/.classname/#idname")
.append("htmltagname/svgName")：在选择集末尾插入元素
.insert("htmltagname/svgName")：在选择集前面插入元素
.remove("htmltagname/svgName"): 删除
```

### 2. Scale -比例尺

- 概念： 将某一区域的值映射到另一区域，其大小关系不变
- domain定义域：
- range值域：开发者需要指定 domain 和 range 的范围，如此即可得到一个计算关系。

2.1 linear Scale -线性比例尺

```javascript
var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
var min = d3.min(dataset);   //d3求最小值函数
var max = d3.max(dataset);   //d3求最大值函数
var linear = d3.scale.linear()   //linear
                      .domain([min, max])
                      .range([0, 300]);     
//linear(0.9)=0, linear(2.3)=175，linear(3.3)=300
//d3.scale.linear()可以单独当做函数来使用
```

2.2 Ordinal Scale -序数比例尺

定义域和值域不一定是连续的

```javascript
var index = [0, 1, 2, 3, 4];
var color = ["red", "blue", "green", "yellow", "black"];
var ordinal = d3.scale.ordinal()   //ordinal
                      .domain(index)
                      .range(color);
// ordinal(0)= red, ordinal(2)= green, ordinal(4)= black
```

### 2. animation

- transition()   //启动过渡效果
- duration("milliseconds")
- ease("format")
  - linear：普通的线性变化
  - circle：慢慢地到达变换的最终状态
  - elastic：带有弹跳的到达最终状态
  - bounce：在最终状态处弹跳几次
- delay("milliseconds")

### 3. interaction

```javascript
var circle = svg.append("circle");
circle.on("click", function(){
    //在这里添加交互内容
});
```

鼠标常用的事件有：

- click：鼠标单击某元素时，相当于 mousedown 和 mouseup 组合在一起。
- mouseover：光标放在某元素上。
- mouseout：光标从某元素上移出来时。
- mousemove：鼠标被移动的时候。
- mousedown：鼠标按钮被按下。
- mouseup：鼠标按钮被松开。
- dblclick：鼠标双击。

键盘常用的事件有三个：

- keydown：当用户按下任意键时触发，按住不放会重复触发此事件。该事件不会区分字母的大小写，例如“A”和“a”被视为一致。
- keypress：当用户按下字符键（大小写字母、数字、加号、等号、回车等）时触发，按住不放会重复触发此事件。该事件区分字母的大小写。
- keyup：当用户释放键时触发，不区分字母的大小写。

触屏常用的事件有三个：

- touchstart：当触摸点被放在触摸屏上时。
- touchmove：当触摸点在触摸屏上移动时。
- touchend：当触摸点从触摸屏上拿开时。

### 4. Column Chart with Scale

```javascript
 var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
 var linear = d3.scale.linear()
                      .domain([0, d3.max(dataset)])
                      .range([0, 250]);
var rectHeight = 25;   //每个矩形所占的像素高度(包括空白)
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x",20)
    .attr("y",function(d,i){ return i * rectHeight; })
    .attr("width",function(d){ return linear(d); })   //在这里用比例尺
    .attr("height",rectHeight-2)
    .attr("fill","steelblue");  
//比例尺
var axis = d3.svg.axis()
                 .scale(linear)      //指定比例尺
                 .orient("bottom")   //指定刻度的方向
                 .ticks(7);          //指定刻度的数量
svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(20,130)")   //坐标轴的位置，通过transform属性来设定
		.call(axis);   //使用call在SVG中添加坐标轴
```

```css
<!-- 坐标轴的自定义样式-->
.axis path,.axis line{
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}
.axis text {
    font-family: sans-serif;
    font-size: 11px;
}
```

### 5. 布局

D3-https://github.com/mbostock/d3/wiki/Layouts-总共提供了 12 个布局：饼状图（Pie）、力导向图（Force）、弦图（Chord）、树状图（Tree）、集群图（Cluster）、捆图（Bundle）、打包图（Pack）、直方图（Histogram）、分区图（Partition）、堆栈图（Stack）、矩阵树图（Treemap）、层级图（Hierarchy）。

12 个布局中，层级图（Hierarchy）不能直接使用。集群图、打包图、分区图、树状图、矩阵树图是由层级图扩展来的。如此一来，能够使用的布局是 11 个（有 5 个是由层级图扩展而来）。这些布局的作用都是将某种数据转换成另一种数据，而转换后的数据是利于可视化的。

#### 5.1 饼状图(Pie)

```javascript
    var width = 400,height = 400;
		var dataset = [ 30 , 10 , 43 , 55 , 13 ];

		var svg = d3.select("body")
					.append("svg")
					.attr("width", width)
					.attr("height", height);

		var pie = d3.layout.pie();   //
		var piedata = pie(dataset);  //数据转换,转换为Pie图的数据格式
    /*
    每个整数转换成了一个对象（Object），每个对象都有data(原数据),startAngle,endAngle，padAngle, value属性
    */
		var outerRadius = 150;	//外半径
		var innerRadius = 10;	//内半径，为0则中间没有空白
		var arc = d3.svg.arc()	//弧生成器
          					.innerRadius(innerRadius)	//设置内半径
          					.outerRadius(outerRadius);	//设置外半径		
		var color = d3.scale.category10();		
		var arcs = svg.selectAll("g")
      					  .data(piedata)
      					  .enter()
      					  .append("g")
      					  .attr("transform","translate("+ (width/2) +","+ (width/2) +")");			  
		arcs.append("path")
			.attr("fill",function(d,i){
				return color(i);
			})
			.attr("d",function(d){
				return arc(d);
			});		
		arcs.append("text")
			.attr("transform",function(d){
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("text-anchor","middle")
			.text(function(d){
				return d.data;
			});
```

#### 5.2 力学图- Force-Directed Graph

力学图（也称为导向图，也有叫网络拓补图的，是通过排斥得到关系远近的结构）在社交网络研究、信息传播途径等群体关系研究中应用非常广泛，它可以直观地反映群体与群体之间联系的渠道、交集多少，群体内部成员的联系强度等。D3中的力学图布局是使用[韦尔莱积分法](http://zh.wikipedia.org/wiki/%E9%9F%A6%E5%B0%94%E8%8E%B1%E7%A7%AF%E5%88%86%E6%B3%95)计算的，这是一种用于求解牛顿运动方程的数值方法，被广泛应用于分子动力学模拟以及视频游戏中。

在二维或三维空间里配置节点，节点之间用线连接，称为连线。各连线的长度几乎相等，且尽可能不相交。节点和连线都被施加了力的作用，力是根据节点和连线的相对位置计算的。根据力的作用，来计算节点和连线的运动轨迹，并不断降低它们的能量，最终达到一种能量很低的安定状态。

力导向图能表示节点之间的多对多的关系。

一个基本的力学图有三个要素：力学结构,节点标记和节点连线。力学结构规范节点的行为，连线和节点显示节点信息和关系。

D3中提供了17个函数用于设定其参数和事件，

- d3.layout.force() -节点（node）基于物理模拟的位置连接。
- force.on() - 监听布局位置的变化。(仅支持"start","step","end"三种事件)
- force.nodes() - 获得或设置布局中的节点（node）阵列组。
- force.links() - 获得或设置布局中节点间的连接（Link）阵列组。.
- force.size() - 获取或设置布局的宽和高的大小, `force.size([x,y])`, 如果不指定，默认为 `[1 , 1]`
  - 重力的重心位置为 `( x/2 , y/2 )`
  - 所有节点的初始位置限定为 `[0, x]` 和 `[0, y ]`之间（但并非之后也是如此）
- force.linkDistance() - 获取或设置节点间的连接线距离, 默认为20。如果距离是一个常数，那么各连接线的长度总是固定的；如果是一个函数，那么这个函数是作用于各连接线（source , target）的
- force.linkStrength() - 获取或设置节点间的连接强度, 值的范围为`[0, 1]`，值越大越坚硬。其直观感受是：
  - 值为1，则拖动一个顶点A，与之相连的顶点会与A保持linkDistance设定的距离运动
  - 值为0，则拖动一个顶点A，与之相连的顶点不会运动，连接线会被拉长
- force.friction() - 获取或设置摩擦系数, 值的范围为`[ 0 , 1 ]`，默认为0.9。但是这个值其实并非物理意义上的摩擦，其实其意义更接近速度随时间产生的损耗，这个损耗是针对每一个顶点的
  - 值为1，则没有速度的损耗
  - 值为0，则速度的损耗最大
- force.charge() - 获取或设置节点的电荷数.(电荷数决定结点是互相排斥还是吸引), 默认值为-30
  - 值为+，则相互吸引，绝对值越大吸引力越大
  - 值为-，则相互排斥，绝对值越大排斥力越大
- force.chargeDistance() - 设定引力的作用距离，超过这个距离，则没有引力的作用。默认值为无穷大。
- force.gravity() - 以 `size` 函数设定的中心产生重力，各顶点都会向中心运动，默认值为0.1。也可以设定为0，则没有重力的作用
- force.theta() - 获取或设置电荷间互相作用的强度, 顶点数如果过多，计算的时间就会加大`（O(n log n)）`。theta 就是为了限制这个计算而存在的，默认值为0.8。这个值越小，就能把计算限制得越紧。
- force.start() - 开启或恢复结点间的位置影响.
- force.resume() - 设置冷却系数为0.1,并重新调用start()函数.
- force.stop() - 立刻终止结点间的位置影响.(等同于将冷却系数设置为0)
- force.alpha() - 获取或设置布局的冷却系数.(冷却系数为0时,节点间不再互相影响), 动画运动的时间，超过时间后运动就会停止。其实
  - force.start() 即 alpha(0.1)
  - force.stop() 即 alpha(0)
- force.tick() - 让布局运行到下一步.
- force.drag() - 获取当前布局的拖拽对象实例以便进一步绑定处理函数.

5.2.1 布局（数据转换）

```javascript
var force = d3.layout.force()
              .nodes(nodes)          //指定节点数组
              .links(edges)          //指定连线数组
              .size([width,height])  //指定作用域范围
              .linkDistance(150)     //指定连线长度
              .charge([-400]);       //相互之间的作用力
```

nodes点对象里多了一些变量。其意义如下：

- index：节点的索引号
- px, py：节点上一个时刻的坐标
- x, y：节点的当前坐标
- weight：节点的权重

5.2.2 有了转换后的数据，就可以作图了。分别绘制三种图形元素：

- line，线段，表示连线
- circle，圆，表示节点
- text，文字，描述节点

5.2.3 布局的事件

调用 call( force.drag ) 后节点可被拖动。force.drag() 是一个函数，将其作为 call() 的参数，相当于将当前选择的元素传到 force.drag() 函数中。

力学图布局 force 本身的事件，D3 提供了3个，分别为 start ，end，tick

- start: 力学图运动开始时
- end:  力学图运动结束时
- tick: 力学图每一帧(力学图运动进行时)  由于力导向图是不断运动的，每一时刻都在发生更新，因此，必须不断更新节点和连线的位置

```javascript
force.on("start/end/tick", function(){
  ...
});
```

5.2.4 拖拽的事件

D3 中提供了3种拖拽事件：dragstart、dragend、drag

```javascript
var drag = force.drag()  
            .on("dragstart",function(d,i){  
                console.log("拖拽状态：开始");  
            })  
            .on("dragend",function(d,i){  
                console.log("拖拽状态：结束");  
            })  
            .on("drag",function(d,i){  
                console.log("拖拽状态：进行中");  
            });  
//use
.call(drag)
```

5.2.5 顶点的固定

使用布局转换数据之后，顶点有一个属性 fixed 。当这个值为 true 时，顶点就是固定不动的；为 false 时，它就是运动的。默认是 false 的。

```javascript
// 当拖拽开始时，被拖拽顶点设定为固定的
var drag = force.drag()  
            .on("dragstart",function(d,i){  
                d.fixed = true;    //拖拽开始后设定被拖拽对象为固定  
                label_text_2.text("拖拽状态：开始");  
            })  
//当鼠标双击顶点时，对顶点解锁
nodes_img.on("dblclick",function(d,i){  d.fixed = false;  })  
```

#### 5.3 弦图 -Chord

数据说明：

  | 北京  |  上海
--|------|--
北京 | 1000  | 3045
上海 | 3214  | 2000

- 左边第一列是被统计人口的城市，上边第一行是被统计的来源城市，即：
- 北京市的人口有 1000 个人来自本地，有 3045 人是来自上海的移民，总人口为 1000 + 3045。
- 上海市的人口有 2000 个人来自本地，有 3214 人是来自北京的移民，总人口为 3214 + 2000。

```javascript
var city_name = [ "北京" , "上海" , "广州" , "深圳" , "香港"  ];
var population = [
   [ 1000,  3045　 , 4567　, 1234 , 3714 ],
   [ 3214,  2000　 , 2060　, 124  , 3234 ],
   [ 8761,  6545　 , 3000　, 8045 , 647  ],
   [ 3211,  1067  , 3214 , 4000  , 1006 ],
   [ 2146,  1034　 , 6745 , 4764  , 5000 ]
 ];
```

#### 5.4 集群图 -Cluster

#### 5.5 树图 -Tree

#### 5.6 打包图 -Package

#### 5.7 地图 -Map

5.7.1 地图的源数据

- [世界地图和主要国家的 JSON 文件](http://www.ourd3js.com/wordpress/?p=668)
- https://github.com/clemsos/d3-china-map
- [中国各省市级 JSON 文件](http://www.ourd3js.com/wordpress/?p=638)
- 下载之后，自行在 http://mapshaper.org/ 按需简化文件

5.7.2 投影函数

```javascript
var projection = d3.geo.mercator()
                        .center([107, 31])   // 设定地图的中心位置，[107,31] 指的是经度和纬度
                        .scale(850)          //设定放大的比例
                        .translate([width/2, height/2]);    //设定平移
```

由于 GeoJSON 文件中的地图数据，都是经度和纬度的信息。它们都是三维的，而要在网页上显示的是二维的，所以要设定一个投影函数来转换经度纬度。如上所示，使用 d3.geo.mercator() 的投影方式。各种投影的函数，可以参考： https://github.com/mbostock/d3/wiki/Geo-Projections

5.7.3 地理路径生成器  - 根据地图的地理数据生成 SVG 中 path 元素的路径值, `d3.geo.path()`

`var path = d3.geo.path().projection(projection);`

5.7.4 绘制地图

> references

- [d3 gallery](http://christopheviau.com/d3list/gallery.html)
- [OUR D3.JS, 数据可视化专题站](http://www.ourd3js.com/wordpress/)
- http://drops.wooyun.org/tips/823
- [大量 D3.js 示例](http://www.baidu.com/link?url=S0MXFCAsO1NU8EFbUCriE2s-705id8Hf5gyC8Ssljlf1TDt-XXTLJSfPvn7Nkz551F2H2vDKUMONqUqUeYIaMHMebKS3S5c-cL9IESsjsu3&wd=&eqid=d438f7300001eb030000000456f005de)
- [D3.js学习笔记](http://www.daliane.com/?s=D3.js%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0)
- [D3 数据可视化 - 入门系列](http://blog.csdn.net/column/details/d3-data-visualizatio.html)
- [D3 数据可视化 - 进阶系列](http://blog.csdn.net/column/details/d3-medium.html)
- [D3 数据可视化 - 高级系列](http://blog.csdn.net/column/details/d3-senior.html)
