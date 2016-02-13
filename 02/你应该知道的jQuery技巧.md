# jQuery Tips Everyone Should Know

A collection of simple tips to help up your jQuery game.
_<span id="jump">Top</span>_

1. [Checking If jQuery Loaded](#checking-if-jquery-loaded)
1. [Back to Top Button](#back-to-top-button)
1. [Preload Images,  图片预加载](#preload-images)
1. [Checking If Images Are Loaded, 判断图片是否加载完](#checking-if-images-are-loaded)
1. [Fix Broken Images Automatically, 自动修补破损图像](#fix-broken-images-automatically)
1. [Toggle Classes on Hover, Hover切换class类](#toggle-classes-on-hover)
1. [Disabling Input Fields, 禁用输入](#disabling-input-fields)
1. [Stop the Loading of Links, 停止正在加载的链接](#stop-the-loading-of-links)
1. [Cache jQuery Selectors](#cache-jquery-selectors)
1. [Toggle Fade/Slide](#toggle-fadeslide)
1. [Simple Accordion, 简单的手风琴](#simple-accordion)
1. [Make Two Divs the Same Height, 使两个DIV同等高度](#make-two-divs-the-same-height)
1. [Open External Links in New Tab/Window, 在浏览器标签/新窗口打开外部链接](#open-external-links-in-new-tabwindow)
1. [Find Element By Text, 根据文本获取元素](#find-element-by-text)
1. [Trigger on Visibility Change, 可见变化的触发](#trigger-on-visibility-change)
1. [Ajax Call Error Handling, Ajax调用错误处理](#ajax-call-error-handling)
1. [Chain Plugin Calls, 链式操作](#chain-plugin-calls)


<h3 id="checking-if-jquery-loaded">Checking If jQuery Loaded</h3>

Before you can do anything with jQuery you first need to make certain it has loaded:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

<h3 id="back-to-top-button">Back to Top Button</h3>

By using the `animate` and `scrollTop` methods in jQuery you don't need a plugin to create a simple scroll-to-top animation:

```javascript
// Back to top
$('.top').click(function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- Create an anchor tag -->
<a class="top" href="#">Back to top</a>
```

Changing the `scrollTop` value changes where you wants the scrollbar to land. All you're really doing is animating the body of the document throughout the course of 800 milliseconds until it scrolls to the top of the document.

**Note:** Watch for some [buggy behavior](https://github.com/jquery/api.jquery.com/issues/417) with `scrollTop`.


### Preload Images,  图片预加载

If your web page uses a lot of images that aren't visible initially (e.g., on hover) it makes sense to preload them:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```


### Checking If Images Are Loaded,  判断图片是否加载完

Sometimes you might need to check if your images have fully loaded in order to continue on with your scripts:

```javascript
$('img').load(function () {
  console.log('image load successful');
});
```

You can also check if one particular image has loaded by replacing the `<img>` tag with an ID or class.  你还可以检查一个特定的图片是否加载完并且被带有Id或者class的<img>标签代替。


### Fix Broken Images Automatically, 自动修补破损图像

If you happen to find broken image links on your site replacing them one by one can be a pain. This simple piece of code can save a lot of headaches:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Even if you don't have any broken links, adding this won't do any harm.


### Toggle Classes on Hover, Hover切换class类

Let's say you want to change the visual of a clickable element on your page when a user hovers over it. You can add a class to your element when the user is hovering; when the user stops hovering removes the class:

比方说，当用户将鼠标悬停在你页面上的元素时，你想改变其视觉效果。当用户鼠标悬停在元素上，你可以在该元素上添加一个class类，当鼠标停止悬停事件时移除此class类：

```javascript
$('.btn').hover(function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

You just need to add the necessary CSS. If you want an even _simpler_ way use the `toggleClass` method:

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**Note:** CSS may be a faster solution in this case but it's still worthwhile to know this.


### Disabling Input Fields, 禁用输入

At times you may want the submit button of a form or one of its text inputs to be disabled until the user has performed a certain action (e.g., checking the "I've read the terms" checkbox). Add the `disabled` attribute to your input so you can enable it when you want:

有时你可能需要用表单的提交按钮或者某个输入框直到用户执行了某个动作（比如：检查“我已阅读条款”复选框）。在你的输入框上设置disabled属性，然后当你需要的时候启用该属性：

```javascript
$('input[type="submit"]').prop('disabled', true);
```

All you need to do is run the `prop` method again on the input, but set the value of `disabled` to `false`:

你需要做的只是需要在输入框上再次运行prop方法，但设置的被禁用值是false：

```javascript
$('input[type="submit"]').prop('disabled', false);
```


### Stop the Loading of Links, 停止正在加载的链接

Sometimes you don't want links to go to a certain web page nor reload the page; you might want them to do something else like trigger some other script. This will do the trick of preventing the default action:

有时你不想链接到特定的网页或者重新载入页面；你可能想让他们做一些其他事情，如触发一些其他的脚本。这是防止违约行动的技巧：

```javascript
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```


### Cache jQuery Selectors

Think of how many times you write the same selector over and over again in any project. Every `$('.element')` selector has to search the entire DOM each time, regardless if that selector had previously run. Instead, run the selector once and store the results in a variable:

```javascript
var blocks = $('#blocks').find('li');
```

Now you can use the `blocks` variable wherever you want without having to search the DOM every time:

```javascript
$('#hideBlocks').click(function () {
  blocks.fadeOut();
});

$('#showBlocks').click(function () {
  blocks.fadeIn();
});
```

Caching jQuery selectors are an easy performance gain.


### Toggle Fade/Slide

Sliding and fading are something we use plenty in our animations with jQuery. You might just want to show an element when a user clicks something, which makes the `fadeIn` and `slideDown` methods perfect. But if you want that element to appear on the first click and then disappear on the second this will work just fine:

滑动和淡入/淡出 是我们在jQuery中经常大量使用的动画。你可能仅仅想在用户做某些点击事件的时候显示一个元素，这时候需要淡入/淡出或者滑动方法。但是如果你需要那个元素在你第一次点击的时候出现，在第二次点击的时候消失，代码如下：

```javascript
// Fade
$('.btn').click(function () {
  $('.element').fadeToggle('slow');
});

// Toggle
$('.btn').click(function () {
  $('.element').slideToggle('slow');
});
```


### Simple Accordion, 简单的手风琴

This is a simple method for a quick accordion:

```javascript
// Close all panels
$('#accordion').find('.content').hide();

// Accordion
$('#accordion').find('.accordion-header').click(function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```

By adding this script all you really needs to do on your web page is the necessary HTML go get this working.


### Make Two Divs the Same Height, 使两个DIV同等高度

Sometimes you'll want two divs to have the same height no matter what content they have in them:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

This example sets the `min-height` which means that it can be bigger than the main div but never smaller. However, a more flexible method would be to loop over a set of elements and set the height to the height of the tallest element:

这个例子设置了DIV的最小高度，这意味着它的高度只可以比这个设置的高度大而不能小。然而，一个更灵活的方法是循环的一组元素，并设置将最高元素的高度作为高度：

```javascript
var $columns = $('.column');
var height = 0;
$columns.each(function () {
  if ($(this).height() > height) {
    height = $(this).height();
  }
});
$columns.height(height);
```

If you want _all_ columns to have the same height:  如果你想要所有的列有相同的高度：

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```


### Open External Links in New Tab/Window, 在浏览器标签/新窗口打开外部链接

Open external links in a new browser tab or window and ensure links on the same origin open in the same tab or window:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Note:** `window.location.origin` doesn't work in IE10. [This fix](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) takes care of the issue.


### Find Element By Text, 根据文本获取元素

By using the `contains()` selector in jQuery you can find text in content of an element. If text doesn't exists, that element will be hidden:

通过jQuery中的contains()选择器，你能找到一个元素内的文本内容。如果文本不存在，则这个元素将被隐藏：

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

### Trigger on Visibility Change, 可见变化的触发

Trigger JavaScript when the user is no longer focusing on a tab, or refocuses on a tab:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```


### Ajax Call Error Handling, Ajax调用错误处理

When an Ajax call returns a 404 or 500 error the error handler will be executed. If the handler isn't defined, other jQuery code might not work anymore. Define a global Ajax error handler:

```javascript
$(document).ajaxError(function (e, xhr, settings, error) {
  console.log(error);
});
```


### Chain Plugin Calls, 链式操作

jQuery allows for the "chaining" of plugin method calls to mitigate the process of repeatedly querying the DOM and creating multiple jQuery objects.

jQuery允许通过链式操作来减轻反复查询DOM和创建多个jQuery对象的过程。

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

An alternative is to cache the element in a variable (prefixed with `$`):

另一个方法是在一个可变的元素缓存（$作为前置）

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

Both chaining and [caching](#cache-jquery-selectors) methods in jQuery are best practices that lead to shorter and faster code.

链式和jQuery缓存方法是最好的做法，导致更短、更快的代码

[点击跳转](#jump)

---
> Reference

- [https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know)
- [你应该知道的jQuery技巧](http://www.cnblogs.com/whitewolf/p/4982425.html)
