1. [平滑滚动至页面顶部+平滑滚动到锚点](#back-to-page-top)
2. [保持始终处于顶部](#stick-to-page-top)
3. [检测屏幕宽度](#check-window-width)
4. [自动修复损坏图片](#repare-image)
5. [检测复制、粘贴与剪切操作](#copy-paste-cut)
6. [自动为外部链接添加target=“blank”属性](#add-blank-for-link)
7. [禁用文本/密码输入中的空格](#forbid-blank-input)
8. [访问IFrame里的元素](#enter-iframe)
9. [反序访问JQuery对象里的元素](#reverse-object)
10. [管理搜索框的值](#manage-default-value-input)
11. [部分页面加载更新](#partly-refresh)
12. [采配置JQuery与其它库的兼容性](#jquery-compatible)
13. [克隆table header到表格的最下面](#clone-table-to-bottom)
14. [根据视窗(viewport)创建一个全屏宽度和高度(width/height)的div](#create-div-fullscreen)
15. [测试密码的强度](#strong-password)
16. [使用JQuery重绘图片的大小(缩放图片)](#repaint-image-size)
17. [滚动时动态加载页面内容](#rolling-lazy-loading)
18. [均衡元素的高度](#even-height)
19. [修复 IE6 PNG 问题](#fixed-png-ie6)
20. [预加载图片](#preloading-image)
21. [让整个Div可点击](#parent-div-clickable)
22. [修改jQuery默认编码（例如默认UTF-8改成改GB2312）](#modify-default-GBK)

<h3 id="back-to-page-top">1. 平滑滚动至页面顶部</h3>

点击一条链接以平滑滚动至页面顶部

```javascript
$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
//平滑滚动到锚点
// HTML:
// <h1 id="anchor">Lorem Ipsum</h1>
// <p><a href="#anchor" class="topLink">Back to Top</a></p>
$(document).ready(function() {
    $("a.topLink").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
});
```

<h3 id="stick-to-page-top">2. 保持始终处于顶部</h3>

```javascript
$(function(){
  var $win = $(window);
  var $nav = $('.mytoolbar');
  var navTop = $('.mytoolbar').length && $('.mytoolbar').offset().top;
  var isFixed=0;
  processScroll();
  $win.on('scroll', processScroll)
    function processScroll() {
    var i, scrollTop = $win.scrollTop();
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1;
      $nav.addClass('subnav-fixed')
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0;
      $nav.removeClass('subnav-fixed');
    }
}
```

<h3 id="check-window-width">3. 检测屏幕宽度</h3>

```javascript
var responsive_viewport = $(window).width();
/* if is below 481px */
if (responsive_viewport < 481) {
    alert('Viewport is smaller than 481px.');
} /* end smallest screen */
```

<h3 id="repare-image">4. 自动修复损坏图片</h3>

如果大家的站点非常庞大而且已经上线数年，那么其中或多或少会出现图片损坏的情况。这项功能可以检测损坏图片并根据我们的选择加以替换

```javascript
$('img').error(function(){
  $(this).attr('src', 'img/broken.png');
});
```

<h3 id="copy-paste-cut">5. 检测复制、粘贴与剪切操作</h3>

利用jQuery，大家可以非常轻松地检测到选定元素的复制、粘贴与剪切操作

```javascript
$("#textA").bind('copy', function() {
    $('span').text('copy behaviour detected!')
});
$("#textA").bind('paste', function() {
    $('span').text('paste behaviour detected!')
});
$("#textA").bind('cut', function() {
    $('span').text('cut behaviour detected!')
});
```

<h3 id="add-blank-for-link">6. 自动为外部链接添加target=“blank”属性</h3>

在链接至外部站点时，大家可能希望使用target="blank"属性以确保在新的选项卡中打开页面。问题在于，target="blank"属性并未经过W3C认证。jQuery能够帮上大忙：以下片段能够检测当前链接是否指向外部，如果是则自动为其添加target="blank"属性。

```javascript
var root = location.protocol + '//' + location.host;
$('a').not(':contains(root)').click(function(){
    this.target = "_blank";
});
```

<h3 id="forbid-blank-input">7. 禁用文本/密码输入中的空格</h3>

```javascript
$('input.nospace').keydown(function(e) {
  if (e.keyCode == 32) {
    return false;
  }
});
```

<h3 id="enter-iframe">8. 访问IFrame里的元素</h3>

在大多数情况下，IFrame并不是好的解决方案，但由于各种原因，项目中确实用到了IFrame,所以你需要知道怎么去访问IFrame里的元素

```javascript
var iFrameDOM = $("iframe#someID").contents();
//然后，就可以通过find方法来遍历获取iFrame中的元素了
iFrameDOM.find(".message").slideUp();
```

<h3 id="reverse-object">9. 反序访问JQuery对象里的元素</h3>

```javascript
//要掌握JQuery对象的get方法 以及数组的reverse方法即可
var arr = $('#nav').find('li').get().reverse();
$.each(arr,function(index,ele){
 .... ...
 });
```

<h3 id="manage-default-value-input">10. 管理搜索框的值</h3>

搜索框通常都有默认值，当输入框获取焦点时，默认值消失。而一旦输入框失去焦点，而输入框里又没有输入新的值，输入框里的值又会恢复成默认值，如果往输入框里输入了新值，则输入框的值为新输入的值

```javascript
$("#searchbox")
 .focus(function(){$(this).val('')})
 .blur(function(){
 var $this = $(this);
 // '请搜索...'为搜索框默认值
 ($this.val() === '')? $this.val('请搜索...') : null;
 });
```

<h3 id="partly-refresh">11. 部分页面加载更新</h3>

为了提高web性能，有更新时我们通常不会加载整个页面，而只是仅仅更新部分页面内容，如图片的延迟加载等。

```javascript
setInterval(function() { //每隔5秒钟刷新页面内容
 //获取的内容将增加到 id为content的元素后
 $("#content").load(url);
 }, 5000);
```

<h3 id="jquery-compatible">12. 采配置JQuery与其它库的兼容性</h3>

如果在项目中使用JQuery，$ 是最常用的变量名，但JQuery并不是唯一一个使用$作为变量名的库，为了避免命名冲突，你可以按照下面方式来组织你的代码：

```javascript
//方法一： 为JQuery重新命名为 $j
var $j = jQuery.noConflict();
$j('#id')....
//方法二： 推荐使用的方式
(function($){
 $(document).ready(function(){
 //这儿，你可以正常的使用JQuery语法
 });
})(jQuery);
```

<h3 id="clone-table-to-bottom">13. 克隆table header到表格的最下面</h3>

为了让table具有更好的可读性，我们可以将表格的header信息克隆一份到表格的底部

```javascript
var $tfoot = $('<tfoot></tfoot>');
$($('thead').clone(true, true).children().get().reverse()).each(function(){
 $tfoot.append($(this));
});
$tfoot.insertAfter('table thead');
```

<h3 id="create-div-fullscreen">14. 根据视窗(viewport)创建一个全屏宽度和高度(width/height)的div</h3>

```javascript
$('#content').css({
 'width': $(window).width(),
 'height': $(window).height(),
});
// make sure div stays full width/height on resize
$(window).resize(function(){
 var $w = $(window);
 $('#content').css({
 'width': $w.width(),
 'height': $w.height(),
 });
});
```

<h3 id="strong-password">15. 测试密码的强度</h3>

在某些网站注册时常常会要求设置密码，网站也会根据输入密码的字符特点给出相应的提示，如密码过短、强度差、强度中等、强度强等

```javascript
<input type="password" name="pass" id="pass" />
<span id="passstrength"></span>
//下面的正则表达式建议各位收藏哦，项目上有可能会用得着
$('#pass').keyup(function(e) {
 //密码为八位及以上并且字母数字特殊字符三项都包括
 var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
 //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
 var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
 var enoughRegex = new RegExp("(?=.{6,}).*", "g");
 if (false == enoughRegex.test($(this).val())) {
  $('#passstrength').html('More Characters');
 } else if (strongRegex.test($(this).val())) {
  $('#passstrength').className = 'ok';
  $('#passstrength').html('Strong!');
 } else if (mediumRegex.test($(this).val())) {
  $('#passstrength').className = 'alert';
  $('#passstrength').html('Medium!');
 } else {
  $('#passstrength').className = 'error';
  $('#passstrength').html('Weak!');
 }
 return true;
});
```

<h3 id="repaint-image-size">16. 使用JQuery重绘图片的大小(缩放图片)</h3>

关于图片大小的重绘，你可以在服务端来实现，也可以通过JQuery在客户端实现。

```javascript
$(window).bind("load", function() {
 // IMAGE RESIZE
 $('#product_cat_list img').each(function() {
  var maxWidth = 120;
  var maxHeight = 120;
  var ratio = 0;
  var width = $(this).width();
  var height = $(this).height();
  if(width > maxWidth){
    ratio = maxWidth / width;
    $(this).css("width", maxWidth);
    $(this).css("height", height * ratio);
    height = height * ratio;
  }
  var width = $(this).width();
  var height = $(this).height();
  if(height > maxHeight){
    ratio = maxHeight / height;
    $(this).css("height", maxHeight);
    $(this).css("width", width * ratio);
    width = width * ratio;
  }
 });
 //$("#contentpage img").show();
 // IMAGE RESIZE
});
```

<h3 id="rolling-lazy-loading">17. 滚动时动态加载页面内容</h3>

```javascript
var loading = false;
$(window).scroll(function(){
 if((($(window).scrollTop()+$(window).height())+250)>=$(document).height()){
 if(loading == false){
  loading = true;
  $('#loadingbar').css("display","block");
  $.get("load.php?start="+$('#loaded_max').val(), function(loaded){
  $('body').append(loaded);
  $('#loaded_max').val(parseInt($('#loaded_max').val())+50);
  $('#loadingbar').css("display","none");
  loading = false;
  });
 }
 }
});

$(document).ready(function() {
 $('#loaded_max').val(50);
});
```

<h3 id="even-height">18. 均衡元素的高度</h3>

使用纯 CSS代码实现均衡元素的高度比较困难，而下面这段 jQuery 代码会根据最高的元素来均衡所有的 Div 元素

```javascript
var maxHeight = 0;
$("div").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});
$("div").height(maxHeight);
```

<h3 id="fixed-png-ie6">19. 修复 IE6 PNG 问题</h3>

至今，IE6 在国内仍然占据了大量的份额，因此在 Web 开发中仍然需要考虑 IE6 的兼容问题。比较常用的 IE6 PNG 图片问题，下面这段代码可以方便的修复

```javascript
$('.pngfix').each( function() {
   $(this).attr('writing-mode', 'tb-rl');
   $(this).css('background-image', 'none');
   $(this).css( 'filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="path/to/image.png",sizingMethod="scale")');
});
```

<h3 id="preloading-image">20. 预加载图片</h3>

 facebook 相册的图片加载速度特别快？那是因为在你看到这些图片之前已经预加载到你的浏览器缓存中了

```javascript
var nextimage = "/images/some-image.jpg";
$(document).ready(function(){
    window.setTimeout(function(){
        var img = $("<img>").attr("src", nextimage).load(function(){
            //all done
        });
    }, 100);
});
```

<h3 id="parent-div-clickable">21. 让整个Div可点击</h3>

 实现链接的父 Div 也能够点击的简单方法

```javascript
//<div class="myBox">
//     blah blah blah.
//    <a href="http://google.com">link</a>
//</div>
$(".myBox").click(function(){
     window.location=$(this).find("a").attr("href");
     return false;
});
```

<h3 id="modify-default-GBK">22. 修改jQuery默认编码（例如默认UTF-8改成改GB2312）</h3>

```javascript
$.ajaxSetup({
	ajaxSettings:{ contentType:"application/x-www-form-urlencoded;chartset=GB2312"} 
});
```

<h3 id="modify-default-GBK">23. 修改jQuery默认编码（例如默认UTF-8改成改GB2312）</h3>

```javascript
$.ajaxSetup({
	ajaxSettings:{ contentType:"application/x-www-form-urlencoded;chartset=GB2312"} 
});
```

> Reference

- http://www.tuicool.com/articles/nANNrq6
- http://www.jb51.net/article/74208.htm
- http://www.baidu.com/link?url=QdG_4iWphssUzKmQVlB4Mp5zJQQk4AeFqRUIJdLUqjQGCqgK4lB6qsOmYHds48z_l0QclNaVTILLXfJyTRET_dXcCQLaGxRmrn0EZsRg8m_&wd=&eqid=b11ecf560004720a000000045714fa20
- [50个必备的实用jQuery代码段](http://www.open-open.com/solution/view/1319168320749)
