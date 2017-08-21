[目录](#top)

- [const - lesson1](#lesson1)
- [解构赋值 - lesson2](#lesson2)
- [正则扩展 - lesson3](#lesson3)
- [字符串扩展 - lesson4](#lesson4)
- [数值扩展 - lesson5](#lesson5)
- [数组扩展 - lesson6](#lesson6)
- [函数新增特征 - lesson7](#lesson7)
- [对象扩展 - lesson4](#lesson8)
- [Symbol数据类型-ES6新增类型 - lesson9](#lesson9)
- [Set和Map - lesson10](#lesson10)
- [Proxy和Reflect - lesson11](#lesson11)
- [Class类 - lesson12](#lesson12)
- [Promise异步操作 - lesson13](#lesson13)
- [Iterator和for..of循环 - lesson14](#lesson14)
- [Generator函数 - lesson15](#lesson15)
- [修饰器Decorator - lesson16](#lesson16)
- [ES6模块化 - lesson17](#ES6模块化)

<h2 id="#lesson1">const - lesson1</h2>

- const第一次定义的时候必须赋值
- const定义后不能改变
- 如定义一个const对象是引用类型，可以定义后修改对象的元素

```javascript
function last(){
  const PI;
  PI = 8;    //出错 unexpected token
  const k = {
    a: 1
  }
  k.a = 3;
  console.log(k.a);
}
```

[back to top](#top)

<h2 id="#lesson2">解构赋值 - lesson2</h2>

- 数组解构赋值
- 对象解构赋值
- 字符串解构赋值
- 布尔值解构赋值
- 函数参数解构赋值
- 数值解构赋值

[back to top](#top)

<h2 id="#lesson3">正则扩展 - lesson3</h2>

- 构造函数的变化
- 正则方法的扩展
- u，y，s修饰符

[back to top](#top)

<h2 id="#lesson4">字符串扩展 - lesson4</h2>

- Unicode表示法
- 遍历接口
- 模板字符串
- 标签模板- [ES6 标签模板](http://www.cnblogs.com/sminocence/p/6832331.html)
  - 过滤HTML字符串，防止用户输入恶意内容
  - 多语言转换（国际化处理）
- 新增方法（10种）

`npm install babel-polyfill -s`, 用来支持ES7的兼容库

[back to top](#top)

<h2 id="#lesson5">数值扩展 - lesson5</h2>

- 新增方法
- 方法调整

<h2 id="#lesson6">数组扩展 - lesson6</h2>

- 新增特性- Array.from, Array.of, copyWithin, find\findNext, fill, entries\keys\values, includes
- 方法调整

[back to top](#top)

<h2 id="#lesson7">函数新增特征 - lesson7</h2>

- 参数默认值
- rest参数
- 扩展运算符
- 箭头函数- ES5中this指向函数被调用时候的指向，箭头函数中的this指向函数定义时候的指向
- this绑定
- 尾调用

[back to top](#top)

<h2 id="#lesson8">对象扩展 - lesson8</h2>

- 简介表示法
- 属性表达式
- 扩展运算符
- Object新增方法

[back to top](#top)

<h2 id="#lesson9">Symbol数据类型-ES6新增类型 - lesson9</h2>

ES5（javascript）基本数据类型有6种：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。

- Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象
- Symbol值不能与其他类型的值进行运算
- Symbol值作为对象属性名时，不能用点运算符
- Symbol有11个方法，具体可以查看http://es6.ruanyifeng.com/#docs/symbol

[back to top](#top)

<h2 id="#lesson10">Set和Map - lesson10</h2>

|说明| Set | Map|
| :-------------| :------------- | :------------- |
| 实例属性|size |size|
| 操作方法|add()<br/>delete()<br/>has()<br/>clear() |set()<br/>get()<br/>delete()<br/>has()<br/>clear()|
| 遍历方法|`set.forEach(f)`<br/>`set.keys()`、`set.values()`和`set.entries()`<br/> `set[Symbol.iterator]()`|`map.keys()`、`map.values()`和`map.entries()`<br/>`map[Symbol.iterator]()`<br/>map.forEach(f)|

- Set成员的值都是唯一的，没有重复的值，Map成员的值可重复
- Object中key只能是数值，Set和Map的key可以是任何数据类型
- Set四个操作方法：
  - set.add(value)：添加某个值，返回Set结构本身
  - set.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
  - set.has(value)：返回一个布尔值，表示该值是否为Set的成员
  - set.clear()：清除所有成员，没有返回值
- Map四个操作方法
  - map.set(key, value)：添加一对新的键值对，如果键名已存在就覆盖
  - map.get(key)：返回一个键名对应的值，若键名不存在则返回undefined，类似obj[key]
  - map.delete(key)：按键名删除一项，类似delete obj[key]
  - map.has(key)：测试一个键名是否存在，类似key in obj
  - map.clear()：清除所有成员，没有返回值
- WeakMap和WeakSet
  - WeakSet的值和WeakMap的键必须是对象，而不能是其他类型的值
  - WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此**WeakSet和WeakMap是不可遍历的**
  - WeakSet/WeakMap的一些属性和方法
    - WeakMap只支持new、has、get、set 和delete。
    - WeakSet只支持new、has、add和delete

**数据结构横向对比- Map和Array的对比/Set和Array的对比**

| 数据结构横向对比|Array|Object|Map |Set|
| :---|:---|:---|:---|:---|
| 增加|`arr.push({t:1});`|`obj['t'] = 1`|`map.set('t',1);`|`set.add({t:1});`|
| 查找|`arr.find(item => item.t); `|`let obj_exist = 't' in obj;`|`map.has('t');`|`let setitem={t:1};`<br/>`set.has(setitem);`|
| 修改|`arr.forEach(item => item.t ? item.t=2: '');`|`obj['t']=2`|`map.set('t',2);`|`set.forEach(item => item.t ? item.t = 2: '');`|
| 删除|`let index = arr.findIndex(item => item.t);`<br/>`arr.splice(index,1);`|`delete obj['t'];`|`map.delete('t');`|`let setitem={t:1};`<br/>`set.delete(setitem);`|

> 使用原则：
- 优先使用Map，如要求唯一性使用Set
- 放弃Object和Array作为存储

[back to top](#top)

<h2 id="#lesson11">Proxy和Reflect - lesson11</h2>

ES6代理的目的是要做一种类似的模拟，它包含一个包装类（A）和一个其他类（B）去拦截/控制访问它（A）。

当用代理模式时，可能会想要：

- 拦截或控制访问一个对象或者其属性上调用的许多的方法, 最常见的就是get,set,apply(针对函数)以及construct 
- 简化模糊的规则或辅助逻辑方法/类的复杂性
- 没有验证/准备之前，防止重-资源动作

Proxy构造器在整个全局对象上都可以被访问

`var proxy = new Proxy(target, handler);`

- target：  target指的是代理所代表的对象。它就是那个你想要节制对其访问的对象。它总是被作为Proxy构造器的第一个参数传入，并且也会被传入每个trap中
- handler： handler是一个对象，包含了你想要拦截和处理的操作。它被作为Proxy构造器的第二个参数传入。它实现了Proxy API(例如：get, set, apply 等等)
- trap：    trap是指代handler中处理特定方法的一个方法项。因此如果你要拦截对get方法的调用，就要定义一个get的trap，诸如此类, 常用的trap方法如下表

Proxy Trap|Overrides the Behavior Of|Default Behavior
:---|:---|:---
get|Reading a property value-拦截某个属性的读取操作|Reflect.get()
set|Writing to a property -拦截某个属性的赋值操作|Reflect.set()
has|The in operator-拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效|Reflect.has()
deleteProperty|The delete operator-拦截delete操作|Reflect.deleteProperty()
getPrototypeOf|Object.getPrototypeOf()|Reflect.getPrototypeOf()
setPrototypeOf|Object.setPrototypeOf()|Reflect.setPrototypeOf()
isExtensible|Object.isExtensible()-拦截Object.isExtensible操作|Reflect.isExtensible()
preventExtensions|Object.preventExtensions()|Reflect.preventExtensions()
getOwnPropertyDescriptor|Object.getOwnPropertyDescriptor()-拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined|Reflect.getOwnPropertyDescriptor()
defineProperty|Object.defineProperty()-拦截了Object.defineProperty操作|Reflect.defineProperty
ownKeys|Object.keys, Object.getOwnPropertyNames(), Object.getOwnPropertySymbols()-拦截对象自身属性的读取操作|Reflect.ownKeys()
apply|Calling a function-拦截函数的调用、call和apply操作,<br/>apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组|Reflect.apply()
construct|Calling a function with new-拦截new命令<br>construct方法可以接受两个参数: target(目标对象),args(构建函数的参数对象)|Reflect.construct()

**ES6 Proxy 的使用场景**

1. 抽离验证类的代码
2. 在 JavaScript中实现真正的私有
3. 静默地对象访问日志
4. 提供警告信息或者阻止特定操作的执行
6. 即时撤销对敏感数据的访问

> reference
- [6个ES6代理使用案例](https://www.oschina.net/translate/use-cases-for-es6-proxies)
- [Nicholas Zakas《理解ES6》](https://leanpub.com/understandinges6/read#leanpub-auto-proxies-and-the-reflection-api)
- [ECMAScript 6 入门-Proxy](http://es6.ruanyifeng.com/#docs/proxy)

[back to top](#top)

<h2 id="#lesson12">Class类 - lesson12</h2>

- Class的定义和构造函数
- Class的继承
- getter/setter
- 静态方法、静态属性

[back to top](#top)

<h2 id="#lesson13">Promise异步操作 - lesson13</h2>

- Promise的作用
- Promise的基本用法

[back to top](#top)

<h2 id="#lesson14">Iterator和for..of循环 - lesson14</h2>

- 不同的“集合”的数据结构的统一的读取接口
  - 原生具备Iterator接口的数据结构： Array,Object, Map, Set, String, TypedArray, 函数的arguments对象，NodeList对象
- Iterator 的作用有三个：
  - 一是为各种数据结构，提供一个统一的、简便的访问接口
  - 二是使得数据结构的成员能够按某种次序排列
  - 三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费
- ES6的有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被for...of循环遍历。原因在于，这些数据结构原生部署了Symbol.iterator属性，另外一些数据结构没有（比如对象）。凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象
- 调用 Iterator 接口的场合
  - 解构赋值
  - 扩展运算符
  - yield*

[back to top](#top)

<h2 id="#lesson15">Generator函数 - lesson15</h2>

- Generator函数是ES6提供的一种异步编程解决方案
- 从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态
- 执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态
- 调 Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象
  - value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值
  - done属性是一个布尔值，表示是否遍历结束
- 与Iterator接口的关系

[back to top](#top)

<h2 id="#lesson16">修饰器Decorator - lesson16</h2>

- Decorator是一个函数
- Decorator是一个修改类的行为, 即，修饰器只能用于类和类的方法，不能用于函数和属性
- `npm i --save-dev babel-plugin-transform-decorators-legacy`
- adding `"plugins":["transform-decorators-legacy"]` in `.babelrc`
- 第三方修饰器的js库： core-decorators, `npm install core-decorators --save`
  - @autobind: 使得方法中的this对象，绑定原始对象检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错
  - @readonly: 属性或方法不可写
  - @override: 检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错
  - @deprecate (别名@deprecated): 在控制台显示一条警告，表示该方法将废除
  - @suppressWarnings: 抑制deprecated修饰器导致的console.warn()调用
  
  [back to top](#top)
  
<h2 id="#lesson17">ES6模块化 - lesson17</h2>

- 模块的引入： import
- 模块的导出： export
- 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性: `<script type="module" src="foo.js"></script>`, 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性
- ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致

```javascript
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

**Node 加载**

Node有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的

```javascript
//如果不指定绝对路径，Node 加载 ES6 模块会依次寻找以下脚本，与require()的规则一致
import './foo';
// 依次寻找
//   ./foo.js
//   ./foo/package.json
//   ./foo/index.js
import 'baz';
// 依次寻找
//   ./node_modules/baz.js
//   ./node_modules/baz/package.json
//   ./node_modules/baz/index.js
// 寻找上一级目录
//   ../node_modules/baz.js
//   ../node_modules/baz/package.json
//   ../node_modules/baz/index.js
// 再上一级目录
```

ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异

[back to top](#top)

> References
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
