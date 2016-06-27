### console

snippet| code | sample
---|---|---
cd|console.dir|console.dir(obj});
ce|console.error|console.error(obj});
ci|	console.info|	console.info(obj});
cl|	console.log|	console.log(obj});
cw|	console.warn|	console.warn(obj});
de|	debugger|	debugger;

### DOM

snippet| code | sample
---|---|---
ae|addEventListener|`document.addEventListener('event', function(e) {// body...});`
ac|	appendChild|	document.appendChild(elem);
rc|	removeChild|	document.removeChild(elem);
ce|	createElement|	document.createElement(elem);
cdf|	createDocumentFragment|	document.createDocumentFragment();
ca|  classList.add|	document.classList.add('class');
ct|	classList.toggle|	document.classList.toggle('class');
cr|	classList.remove|	document.classList.remove('class');
gi|	getElementById|	document.getElementById('id');
gc|	getElementsByClassName|	document.getElementsByClassName('class');
gt|	getElementsByTagName|	document.getElementsByTagName('tag');
ga|	getAttribute| 	document.getAttribute('attr');
sa|	setAttribute|	document.setAttribute('attr', value);
ra|	removeAttribute|	document.removeAttribute('attr}');
ih|	innerHTML|	document.innerHTML = 'elem';
tc|	textContent|	document.textContent = 'content';
gs|	querySelector|	document.querySelector('selector');
gsa	querySelectorAll|	document.querySelectorAll('selector');

### Loop

```javascript
//fe - forEach
forEach	myArray.forEach(function(elem) {
  // body...
});
//fi - for in
for in	for (prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    // body...
  }
}
```
