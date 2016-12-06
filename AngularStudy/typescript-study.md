**support** - [all the ES6 features and current support across a variety of platforms](http://kangax.github.io/compat-table/es6)

### Environment setup

```
npm install -g typescript
tsc -v
tsc hello.ts -w   //-w: watch a typescript file for changes and compile it automatically
tsc -t ES6 -w hello.ts  // -t ES6: typescript to transpile into ES6 instead of the
default ES5
tsc --init   // create a config file(tsconfig.json) with the most common settings
node hello.js   // execute
```

### Basic Grammer

**1. Const - mutable variable( Mutable in this case means can change over time)**

- Variables created by let and var are mutable
- use Object.freeze function can mutate, make chanes to, const

```javascript
const foo = {};
foo = {}; // TypeError: Assignment to constant variable.
foo['prop'] = "Moo"; // This works!
console.log(foo);
//make foo to be immutable Value
const foo = Object.freeze({});
foo.prop = 123;
console.log(foo.prop);  //undefined
```

**2. Template Strings**

- multi-line strings
- Variable Substitution - `${variable_name}`

```javascript
let name = "asim";
let multi = `
            my
            name
            is
            ${name}`;
console.log(multi);
```

**3. Fat Arrow Functions** - whatever the value of this is in the code outside the fat arrow function is the value of this inside the fat arrow function

```javascript
var funcs = [];
for(var i=0;i<5;i+=1){
  let y =i;
  funcs.push(() => { console.log(y); })
}
funcs.forEach(func => { func(); });
// 0,1,2,3,4
let obj = {   // one solution is to use 'self'
  name: "asim",
  sayLater: function () {
    let self = this; // Assign to self
    console.log(self);
    setTimeout(function () {
      console.log(`${self.name}`); // Use self not this
    }, 1000);
  }
};
//or
let obj = {  // another solution is to use Fat Arrow
  name: "asim",
  sayLater: function () {
    console.log(this);    // `this` points to obj
    setTimeout(() => {
      console.log(this);    // `this` points to obj
      console.log(`${this.name}`); // `this` points to obj
    }, 1000);
  }
};
```

**4. Destructuring解构**

Destructuring is a way of extracting values into variables from data stored in objects and arrays

```javascript
//Array Destructuring
const arr = ['a', 'b'];
const [x, y] = arr;    // x=a, y =b
var [,,third] = ["foo", "bar", "baz"];  //在对应位留空来跳过被解构数组中的某些元素
console.log(third);  // "baz"
var [head, ...tail] = [1, 2, 3, 4];    通过“不定参数”模式捕获数组中的所有尾随元素
console.log(tail);    // [2, 3, 4]
// Object Destructuring
const obj = {first: 'Asim', last: 'Hussain', age: 39};
function getObj() {
  return obj;
}
const {first, last, age} = getObj();
var { first, last, age} = { first: 'Asim', bar: 'Hussain', age: 39 };  //简写
//Function parameter Destructuring
function func({x = 1, y=2}) {
  console.log(x+","+y);
}
func({});
```

**5. For-of loop**

```javascript
let array = [10,20,30];
for (var index of array) {
  console.log(typeof(index));    //number, number, number
}
```
- for-in: loop over object properties
- for-of: loop over the values in an array or array-like object
- It avoids all the pitfalls of for–in(the type of index is String, is not Number).
- It works with break, continue, and return

**6. Map && Set**

```javascript
//Creating, getting and setting
let map = new Map();
let map = new Map().set("A",1)  
                   .set("B",2);    // Set use add, let set = new Set().add("A").add("B");
let map = new Map([
            [ "A", 1 ],
            [ "B", 2 ]
          ]);      // let set = new Set(["A", "B"]);
map.get("A");  // 1, Set has not 'get' method
map.has("A");  // true
map.delete("A");  // true
map.size;   //1
map.clear();    //empty an entire Map, map.size=0 after clear
//looping over a Map
for(let key of map.keys()){
  console.log(key);    // A, B
}
for(let value of map.values()){
  console.log(value);   //1,2
}
for (let entry of map.entries()) {
  console.log(entry[0], entry[1]); //"A" 1, "B" 2
}
for (let [key, value] of map.entries()) {
  console.log(key, value); //"A" 1, "B" 2
}
// looping over a Set
let set = new Set(['APPLE', 'ORANGE', 'MANGO']); c 
for (let entry of set) {
  console.log(entry);
}
```

### Class & Interface

- Javascript is a prototype based object oriented programming model. It creates objects using
other objects as blueprints and to implement inheritance it manipulates what’s called a prototype
chain.
- C++/JAVA is a classical object orientated pattern

```javascript
class Person {   //define class
  firstName = "";    //properties
  lastName = "";
  constructor(firstName, lastName){   // this is called when we create an instance of a class with new
    this.firstName = firstName;   
    this.lastName = lastName;
  }
  name(){      // method that we want on our class instance
    return `${this.firstName} ${this.lastName}`;
  }
  whoAreYou(){  // method points to the class instance, the object that is created using this class
    return `Hi I'm ${this.name()}`; 
  }
}
class Student extends Person {   // inheritance
  course;
  constructor(firstName, lastName, course){
    super(firstName, lastName);
    this.course = course;
  }
  whoAreYou(){
    return `${super.whoAreYou()} and I'm studying ${this.course}`; 
  }
}
// class instance
let asim = new Person("Asim","Hussain");
asim.whoAreYou();  // "Hi i'm Asim Hussain"
let bb = new Student("A", "B", "Angualr2"); 
bb.whoAreYou();   // "Hi i'm A B and and I'm studying Angualr2"
```

**Typescript add-on on-top of ES6 classes**

1. three access modifiers
  - public: This is the default and means its visible everywhere.
  - private: Only member functions of the class it’s declared in can see this.
  - protected: Only the class it’s declared in and any class that inherits from that class can see this
2. Constructor shortcut
  ```javascript
  class Person {
    constructor(private firstName, private lastName) {
    }
  }
  ```
3. Interfaces
  ```javascript
  class Person implements Human {
  }
  //equal to 
  interface Human {    // interfaces are all about the public
    firstName: string;
    lastName: string;
  }
  ```

### Decorators - Typescript add-on on-top of ES6

- With decorators we can customise our classes at design time
- Decorators are just functions that add **meta-data** to the thing they are attached to with @function syntax
- https://github.com/jayphelps/core-decorators.js

```javascript
function Student(config) {
  return function(target){
    Object.defineProperty(target.prototype, 'course', {value: () => config.course})
  }
}
@Student({course: "Angular 2"})
class Person {
  firstName;
  lastName;
  constructor(firstName, lastName) {
    this.firstName = firstName;function square(x){
      return Math.pow(x,2);
    }
    function cow(){
      console.log("Moooooooooo!!!!");
    }
    export {square, cow};
    // alternative export syntax
    export function square(x) {
      return Math.pow(x,2)
    }
    this.lastName = lastName;
  }
}
let asim = new Person("Asim", "Hussain");
console.log(asim.course());     // Angular 2
```

### Modules

- TypeScript can use other module loaders, but the default is CommonJS
- In Angular we use the ES6 module loading syntaz but leave it to TypeScript to transpile it into CommonJS syntax

```
tsc utils.ts script.ts
tsc -t ES5 -w utils.ts script.ts
```

```javascript
//script.ts
function square(x){ return Math.pow(x,2); }
function cow(){ console.log("Moooooooooo!!!!"); }
export {square, cow};
// alternative export syntax
export function square(x) {
  return Math.pow(x,2)
}
//hello.ts
//import {square as sqr, cow} from "./script";   // use Aliases 1
import * as utils from "./script";   //use  Aliases 2
console.log(utils.square(2));
utils.cow();
//Default exports
export default function square(x) {
  return Math.pow(x,2)
}
import square from './script';   // no need to use { }
import square, { cow } from './script';  // default export as well as some other exports
```

### Types

```javascript
let decimal: number = 6;
let done: boolean = false;
let color: string = "blue";
let list: number[] = [1, 2, 3];   // let list: Array<number> = [1, 2, 3];
enum Direction { Up, Down, Left, Right }
let go: Direction;
go = Direction.Up;
// function
function returnNumber(): number {   // expected return type of a function
  return 1;
}
//class and Interfacesclass Person {};
class Person {};
let person: Person;
let people: Person[];
// any - doesn’t provide any type
let notsure: any = 1;
notsure = "hello";
// void - void means no type, it’s typically used to indicate that a function will not return anything at all
function returnNothing() : void {
  console.log("Moooooooooo!");
}
```

**Generics** - re-usable bits of code which can still take advantage of typescripts transpiletime
type checking

```javascript
class AudioPost { content: Audio; }
class VideoPost { content: Video; }
class LinkPost { content: Link; }
class TextPost { content: Text; }
class Post<T> {  // <T> is the generic syntax, T is the type variable
  content: T;
}
let videoPost: Post<Video>;
```

**Types for external libraries**

