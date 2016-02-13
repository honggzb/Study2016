##SVG icon sprite

###1. SVG Sprite与symbol元素

可以把`SVG`元素看成一个舞台，而`symbol`则是舞台上一个一个组装好的元件，这这些一个一个的元件就是我们即将使用的一个一个`SVG`图标。
```html
	<svg>
	    <symbol>
	        <!-- 第1个图标路径形状之类代码 -->
	    </symbol>
	    <symbol>
	        <!-- 第2个图标路径形状之类代码 -->
	    </symbol>
	    <symbol>
	        <!-- 第3个图标路径形状之类代码 -->
	    </symbol>
	</svg>
```
###2. SVG中的use元素

- 可重复调用
```html
    	<svg>
    		 <defs>
	    		<g id="shape">
	    		<rect x="0" y="0" width="50" height="50" />
	    		<circle cx="0" cy="0" r="50" />
	    		</g>
    		 </defs>
    		 <use xlink:href="#shape" x="50" y="50" />
    		 <use xlink:href="#shape" x="200" y="50" />
    	</svg>
```
`use`元素是通过`xlink:href`属性，寻找要使用的元素的。`#shape`对应的就是`id`为`shape`的元素。`use`元素可以有自己的坐标，以及支持`transform`变换，甚至可以`use`其他`use`元素。

这里，两个`use`元素使用的是同一个g元素（组合），从而实现了图形的重复调用功能。

- 跨SVG调用

	    <svg class="size">
	    	<use xlink:href="#shape" />
	    </svg>

图标尺寸`CSS`控制，里面只有一个仅有`xlink:href`属性的`use`元素，Done! 完成！

[SVG Sprite使用示意demo](http://www.zhangxinxu.com/study/201407/svg-sprite.php)
```html
	<!doctype html>
	<html>
	<head>
	<meta charset="utf-8">
	<title>SVG Sprite使用</title>
	<style>
		li { font-size: 14px; margin-top: 5px; color: #369; }
		.webicon { width: 16px; height: 16px; margin-right: 5px; vertical-align: -2px; fill: #369; }
	</style>
	</head>
	<body>
	<div style="display: none;">
	<svg>
		<symbol id="liwu" viewBox="-80 -72.013 160 144.025"><path d="M-71.949-16.039h55.974v-55.974h-55.974V-16.039z M16.102-16.039h55.975v-55.974H16.102V-16.039z M-80,32.013h64.025v-40H-80V32.013z M80,32.013v-40H16.102v40H80z M-7.923,32.013H8.051V-72.013H-7.923V32.013z M16.102,39.936 h-32.077v24.025h32.077V39.936z M64.025,39.936h-40l15.719,32.077h24.281V39.936z M-23.898,39.936h-40v32.077H-40L-23.898,39.936z" transform="matrix(1 0 0 -1 0 0)"></path></symbol>
		<symbol id="qianbi" viewBox="-79.5 -79.5 159 159"><path d="M79.5,32.802l-93.538-93.538l-46.699,46.699L32.802,79.5L79.5,32.802z M-79.5-32.802L-32.802-79.5H-79.5 V-32.802z" transform="matrix(1 0 0 -1 0 0)"></path></symbol>
		<symbol id="shangchuan" viewBox="-73.623 -78.055 147.245 156.11"><path d="M0.069,32.482L64.48-32.205H36.915v-45.85h-73.83l-0.139,45.85h-27.15L0.069,32.482z M73.623,78.055V59.632 H-73.623v18.423H73.623z" transform="matrix(1 0 0 -1 0 0)"></path></symbol>
	</svg>
	</div>
	<h3>SVG Sprite使用示意</h3>
	<ul>
		<li><svg class="webicon"><use xlink:href="#qianbi"/></svg>编辑信息</li>
	    <li><svg class="webicon"><use xlink:href="#liwu"/></svg>兑换礼物</li>
	    <li><svg class="webicon"><use xlink:href="#shangchuan"/></svg>上传文件</li>
	</ul>
	</body>
	</html>
```
在HTML层面，图标使用的代码成本，跟传统的CSS Sprite或者流行的font-face几乎无异，代码简洁，而且很好维护。所有的SVG图标都在一个SVG源上。retina良好，尺寸可任意拉伸，且颜色可控，真乃Web图标的未来之星。

总结下就是：**symbol + use => SVG Sprite**

### 补充

- CSS Sprite在`CSS`中使用`background-position`定位
- SVG Sprite技术是支持外链SVG文件的

		<svg viewBox="0 0 100 100"> 
			<use xlink:href="defs.svg#icon-1"></use> 
		</svg>

	所有的IE浏览器(包括IE11)还不支持获得外链SVG文件某个元件。Chrome/FireFox/Safari/Opera等浏览器都是OK的。

- SVG Sprite技术是支持直接Ajax请求SVG文件字符串，对于不支持外链的IE9+浏览器
```javascript
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "../201407/mytest.svg", true);
	ajax.onload = function(e) {
	    document.body.insertAdjacentHTML("afterBegin", '<div style="display:none;">' + ajax.responseText + '</div>');
	}
	ajax.send();
```
[Ajax请求SVG文件实现Sprites效果Demo](http://www.zhangxinxu.com/study/201503/svg-sprite-ajax.html)

---

##SVG Sprite实际应用

**1. SVG图标从何而来？**  
-- download， 如 **[icomoon](https://icomoon.io/)**

**2. SVG图标如何变成symbol并整合在一起？**

目前辅助生成 SVG Sprites 的工具有 [grunt-iconizr](https://github.com/jkphl/grunt-iconizr)、 [gulp-svg-sprites](https://github.com/shakyShane/gulp-svg-sprites)等。 使用这两个工具，只需将用到的 SVG 放到某个文件夹中就可以自动被拼合成 Sprite 并输出对应 CSS。 两个工具都支持生成 PNG 格式的位图作为 Fallback，缺点是生成位图要依赖[phantomjs](http://phantomjs.org/)这个重量级 JS 库。

[svgstore](https://github.com/FWeinb/grunt-svgstore)是另一个合并工具——Merge svgs from a folder，其gulp地址为 [https://www.npmjs.com/package/gulp-svgstore](https://www.npmjs.com/package/gulp-svgstore)
```javascript
	grunt.initConfig({
	  svgstore: {
	    options: {
	      includedemo: true
	      }
	    },
	    files: {
	      'tmp/mytest.svg': ['mytest/*.svg']
	    },
	  },
	});
	//......
	grunt.loadNpmTasks('grunt-svgstore');
```
`mytest`文件夹下的所有`SVG`合并成一个名为`mytest.svg`的`SVG`文件，并放在`tmp`文件夹下

 **还有一种方法就是直接使用illustrator来合并SVG**

- 打开软件，新建一个文件，然后另存为SVG格式
- 从标尺中拉出一些参考线，搞些正方形格子，如160*160
- 把下载的SVG图形拖到这些格子中，缩放到合适大小
- 这一步很关键。打开Symbols面板，在Window菜单栏中，或Shift+Ctrl+F11启用。然后，拖动格子中的SVG图形到这个面板中，就会触发新建“元件”的行为，会打开类似下面的面板：

![](http://i.imgur.com/cq6lIcI.png)

其中，name就是SVG中对应的symbol元素的id，因此，最好使用英文，最好易识别。下面的type你随意，这个只要在SVG导入到Flash中使用时候才有用的，这里，我们不和Flash打交道。然后，OK, 这个图标就“元件”化了，按照同样的步骤，让3个图标都变成元件（以后可重复使用），Symbols面板会类似下面这样：

![](http://i.imgur.com/4aY4FpL.png)

Ctrl+S保存，合并好的SVG即出炉

在线工具：[illustrator生成SVG转换成web可用SVG Sprite](http://www.zhangxinxu.com/sp/svg.html)

***

> References

- [未来必热：SVG Sprite技术介绍--](http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)
- [Icon System with SVG Sprites --CSS-Trick](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)
- [gulp-svgstore](https://www.npmjs.com/package/gulp-svgstore)
- [Web 设计新趋势: 使用 SVG 代替 Web Icon Font](http://www.io-meter.com/2014/07/20/replace-icon-fonts-with-svg/)
