Directive|function|Examples
---|---|---
Attribute Directive| interact with the element to which they are applied to| ngClass, ngStyle
Structural Directive| interact with the current view container and change the struture of DOM | `*ngIf`, `*ngFor`

**！！注意： Directive don't have property or Event bindings!**

```shell
#use Angular CLI创建工程和Directives
ng new directives --directory 02-directives --prefix dir
# ng new componentName --directory projectName
ng g d highlight  #create directive "highlight"
```

##3 Built-In Directives

- directive class(NgFor): Capitalise the name
- lowercase first letter(ngFor): an instance of a directive or the attribute use to associate a directive to an element

###3.1 NgFor

```java
@Component({
  selector: 'ngfor-example',
  template: `
  <h4>NgFor (grouped)</h4>    //grouped
  <ul *ngFor="let group of peopleByCountry">
    <li>{{ group.country }} </li>
    <ul>
      <li *ngFor="let person of group.people; let i=index">{{i+1}} - {{ person.name }} </li>   //index
    </ul>
  </ul>
`
})
```

Angular 1:

- ng-repeat
- $index

###3.2 NgIf & NgSwitch

```html
<ul *ngFor="let person of people; let i=index"> <!-- index -->
    <li *ngIf="person.age>30">{{i+1}} - {{ person.name }} ({{ person.age }})</li>
</ul>
<ul *ngFor="let person of people; let i=index" [ngSwitch]="person.country">
    <li *ngSwitchCase="'UK'" class="text-success">{{ person.name }} ({{ person.country }})</li>
    <li *ngSwitchCase="'USA'" class="text-primary">{{ person.name }} ({{ person.country }})</li>
		<li *ngSwitchDefault class="text-warning">{{ person.name }} ({{ person.country }})</li>
</ul>
```
- `*ngIf='false'` : actually removes the element completely from the DOM
- `[hidden]='false'` : 

###3.3 NgStyle & NgClass

- NgStyle: can set individual styles for a given DOM one style at a time
- NgClass: can bundle styles into a CSS calss and conditionally set the class on a DOM

```html
<!-- 1) ngClass Directive -->
<div [ngClass]="{border: false, background: true}"></div>
<!-- or -->
<div [class.border]="true"></div>
<!-- in css file -->
.border{ border: 3px solid blue; }
.background { background-color: green; }
<!-- 2) ngStyle Directive -->
<div [ngStyle]="{'background-color':'red'}"></div>
<!-- 3) 使用变量 -->
<div [ngStyle]="{'background-color':person.country === 'UK' ? 'green' : 'red' }"></div>
<!-- or  -->
<li [ngStyle]="{'font-size.px':24}" [style.color]="getColor(person.country)"> {{ person.name }} ({{ person.country }})</li>
<!-- ngClass  -->
<li [ngClass]="{
	'text-success':person.country === 'UK',
	'text-primary':person.country === 'USA',
	'text-danger':person.country === 'HK'}">
		{{ person.name }} ({{ person.country }})
</li>
<!-- or  -->
<li [class.text-success]="person.country === 'UK'"
		[class.text-primary]="person.country === 'USA'"
		[class.text-danger]="person.country === 'HK'">
			{{ person.name }} ({{ person.country }})
</li>
```

###3.4 ngNonBindable

not to compile, or bind a particular section of template(keep original)

```html
<div>To render the name variable we use this syntax<pre ngNonBindable>{{ name }}</pre></div>
```

###3.5 Structural Directives

- Structural directives are directives which change the structure of DOM by adding and removing elements. There are 3 Built-In Structural directives: NgIf, NgFor, NgSwitch
- Syntax sugar * : shortcut写法, 可省略不写template

```html
<template [ngIf]="!data.hide">
	<p class="card-text">{{ data.punchline }}</p>
</template>
<!-- 使用 * -->
<p class="card-text" *ngIf="!data.hide"> {{ data.punchline }} </p>
<template ngFor
					let-j
					[ngForOf]="jokes">
	<joke [joke]="j"></joke>
</template>
<!-- 使用 * -->
<joke *ngFor="let j of jokes" [joke]="j"></joke>
```

##4 Custom Directives

- components are Directives, components have all the features of directives but also have a view
- Single HTML element can only have a single component, but can have multiple directives
- Directive类型
	- 组件： 拥有模板的指令 
	- 结构型指令： 通过添加和移除DOM元素来改变DOM结构的指令。例如：NgFor, NgIf … 
	- 属性型指令： 改变元素显示和行为的指令。例如：NgStyle …
- `@Directive`装饰器
- ElementRef: inject into the Directive class
- `@HostListener`装饰器: listen to output events from host element
- `@HostBinding`装饰器: bind to input properties on host element
- Configurable Directive(reusable)

```javascript
@Directive({     // declare a custom Directive 1
  selector: '[ccCardHover]'
})
class CardHoverDirective { // declare a custom Directive 2
  @HostBinding('class.card-outline-primary') private ishovering: boolean;  //listen to output event
  @Input('ccCardHover') config: Object = {   //Configurable Directive
    querySelector: '.card-text'
  }
  constructor(private el: ElementRef, private renderer: Renderer){   // inject into Directive(ElementRef, renderer)
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }
  @HostListener('mouseover') onMouseOver(){  // bind mouseover event on host element
    //window.alert("hover");
    let part = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setElementStyle(part, 'display','block');
    this.ishovering = true;
  }
  @HostListener('mouseout') onMouseOut(){ // bind mouseout event on host element
    let part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setElementStyle(part, 'display','none');
    this.ishovering = false;
  }
}
```
