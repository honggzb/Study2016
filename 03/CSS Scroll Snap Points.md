## CSS Scroll Snap Points

CSS Scroll Snap Properties

```css
scroll-snap-type: none | mandatory | proximity;
```
- mandatory: that the element must come to rest on a snap point even when there are no active scrolling actions taken. If content is somehow modified or updated, the page finds the snap point again.

- proximity value is close to mandatory, but less strict. If the browser changes in size or content is added, it may or may not find the snap point again, depending on how close to a snap point it is.

From what I’ve seen playing around with this, mandatory is more commonly supported in browsers at this time with more consistent behavior.

```css
scroll-snap-align: [none | start | end | center] [none | start | end | center];
```
This property refers to how an element’s scroll snap margin aligns with its parent scroll container. It uses two values, x and y, and if you only use one value it will be read as shorthand and repeated for both values (sort of like padding where padding: 10px; equals padding: 10px 10px 10px 10px;). This property isn't animatable.

> Reference

[Introducing CSS Scroll Snap Points](https://css-tricks.com/introducing-css-scroll-snap-points/?utm_source=html5weekly&utm_medium=email)
