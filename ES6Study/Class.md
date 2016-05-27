https://github.com/joeeames/webpackfundamentalscourse

ES6 中引入了 class 语法糖，本质上依然是基于原型链实现了继承

一个完整的案例， 实现

- 在给定的Canvas上绘制一个给定圆
- 跟踪记录生成圆的总数
- 跟踪记录给定圆的半径，以及如何使其值成为圆的不变条件
- 计算给定圆的面积

```javascript
class Circle {
    constructor(radius) {
        this.radius = radius;
        Circle.circlesMade++;
    };
    static draw(circle, canvas) {
        // Canvas绘制代码
    };
    static get circlesMade() {
        return !this._count ? 0 : this._count;
    };
    static set circlesMade(val) {
        this._count = val;
    };
    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    };
    get radius() {
        return this._radius;
    };
    set radius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("圆的半径必须为整数。");
        this._radius = radius;
    };
}
var c = new Circle(20.5);
console.log(c.area());
```

### 1 Class基本语法

```javascript
//定义类
class Point {
  constructor(x, y) {    //构造方法
    this.x = x; this.y = y;
  }
  toString() {  //toString方法, Point.prototype 对象上的方法
    return '(' + this.x + ', ' + this.y + ')';  //this则代表实例对象
  }
  toValue(){  }
}
typeof Point // "function"
Point === Point.prototype.constructor // true
// 等同于
Point.prototype = {
  toString(){},
  toValue(){}
};
//调用方法

```

- 定义“类”的方法的时候，前面不需要加上function这个关键字
- ES6 规定 class 中只能包含方法，不能包含属性。尽管如此，prototype 属性仍然是开放的，可以使用 ES5 的方法添加可继承的属性
- constructor 函数可以省略，但如果子类中写了 constructor 就一定要写 super()，否则会提示 this 不存在。super 是个神奇的关键词，它可以执行并创建 this，又可以和 this 一样被 new 改变指向, 更神奇的是，它不能被打印，或被 typeof 检测类型，`console.log(super); // SyntaxError: 'super' keyword unexpected here`
- class 中定义的方法 enumerable 属性的值均为 false

### 2 继承

```javascript
class Person {
    constructor(name) { // Person 函数本身
        this.name = name;
        this.language = ['English', 'Chinese', 'Japanses'];
    };
    sayHi() { // Person.prototype 对象上的方法
        console.log('Hello, ' + this.name + '!');
    };
};
class Student extends Person {
    constructor(name, age) { // Student 函数本身
        super(name); // super 是关键词
        console.log(this.__proto__ === Student.prototype); // true
        console.log(super.__proto__ === Student.prototype); // true
        this.age = age;
    };
    showAge() { // Student.prototype 对象上的方法
        console.log(this.age);
    };
};

var banri = new Student('Banri', 'Always 18');
banri.language.push('Miao Miao Miao');
console.log(banri.language); // [ 'English', 'Chinese', 'Japanses', 'Miao Miao Miao' ]

var kevin = new Student('Kevin', '9');
console.log(kevin.language); // [ 'English', 'Chinese', 'Japanese' ]

banri.sayHi(); // Hello, Banri!
banri.showAge(); // Always 18
console.log(banri instanceof Person); // true
console.log(banri instanceof Student); // true
```

- `extends`关键字后面可以跟多种类型的值
- `Object.getPrototypeOf`方法可以用来从子类上获取父类, 可以使用这个方法判断，一个类是否继承了另一个类, `Object.getPrototypeOf(Student) === Person  //true`
- `super`关键字, 有两种用法，含义不同
  - 作为函数调用时（即super(...args)），super代表父类的构造函数
  - 作为对象调用时（即super.prop或super.method()），super代表父类。注意，此时super即可以引用父类实例的属性和方法，也可以引用父类的静态方法

### 3 类的prototype属性和__proto__属性

大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链, 这两条继承链，可以这样理解：作为一个对象，子类B的原型（`__proto__`属性）是父类A；作为一个构造函数，子类B的原型（`prototype`属性）是父类的实例

1. 子类的__proto__属性，表示构造函数的继承，总是指向父类
2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
3. 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性, 也就是说，子类的原型的原型，是父类的原型

```javascript
Student.__proto__ === Person.__proto__ // false
Student.__proto__.__proto__ === Person.__proto__ // true
```

### 4 Class的取值函数（getter）和存值函数（setter）

在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```javascript
class People {
    constructor(name) { //构造函数
          this.name = name;
    }
    get name() {
        return this._name.toUpperCase();
    }
    set name(name) {
        this._name = name;
    }
    sayName() {
          console.log(this.name);
    }
}
var p = new People("tom");
console.log(p.name);    //TOM
console.log(p._name);   //tom
p.sayName();            //TOM
```

### 5 Class的静态方法

如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()   // TypeError: undefined is not a function
//父类的静态方法，可以被子类继承
class Bar extends Foo {
}
Bar.classMethod(); // 'hello'
```
