[Spreadsheet - Functional programminng with ES6](#top)

- [Arrow Functions(Fat Arrows)](#arrow-function)
- [Function Delegates](#function-delegates)
- [Expressions Instead of Statements](#expressions-instead-of-statements)
- [Higher Order Functions](#higher-order-functions)
- [Currying](#currying)
- [Array Manipulation Functions](#array-manipulation-functions)
- [Pipelines](#pipelines)

### Arrow Functions

```javascript
const multiply = (x,y) => { return x*y };
console.log(multiply(5,10));     //50
```

### Function Delegates

Function delegates encapsulate a method allowing functions to be composed or passed as data

```javascript
const isZero = n => n===0;
const a = [0,1,0,2,3,4,0];
console.log(a.filter(isZero).length);    //3
```

[back to top](#top)

### Expressions Instead of Statements

Statements define an action and are executed for their side effect. Expressions produce a result without mutating state.

```javascript
//statement
const getSalutation = function(hour){
	var salutation;
	if(hour<12){
		salutation = "Good Morning";
	}else {
		salutation = "Good Afternoon";
	}
	return salutation;      //mutated value
}
//expression
const getSalutation = (hour) => hour<12 ? "Good Morning" : "Good Afternoon";
console.log(getSalutation(10));    //Good Morning
```

[back to top](#top)

### Higher Order Functions

A function that accepts another function as a parameter, or returns another function.

```javascript
function mapConsecutive(values, fn){
	let result = [];
	for(let i=0;i<values.length; i++){
		result.push(fn(values[i], values[i++]));
	}
	return result;
}
const letters = ['a','b','c','d','e','f','g'];
let twoByTwo = mapConsecutive(letters, (x,y) => [x,y]);
console.log(twoByTwo);
// [[a,b], [b,c], [c,d], [d,e], [e,f], [f,g]]
```

[back to top](#top)

### Currying

Currying allows a function with multiple arguments to be translated into a sequence of functions. Curried functions can be tailored to match the signature of another function.

```javascript
const converUnits = (toUnit, factor, offset=0) => input => ((offset+input)*factor).toFixed(2).concat(toUnit);
const milesToKm = convertUnits('km', 1.60936, 0);
const poundsToKg = convertUnits('kg', 0.45460, 0);
const farenheittoCelsius = converUnits('degrees C', 0.5556, -32);
milesToKm(10); //"16.09 km"
poundsToKg(2.5); //"1.14 kg"
farenheitToCelsius(98); //"36.67 degrees C"
const weightsInPounds = [5,15.4,9.8, 110];
//without currying
const weightsInKgs = weightsInPounds.map(x => converUnits('kg', 0.45460, 0)(x));
//with Currying
const weightsInKgs = weightsInPounds.map(poundsToKg);  // 2.27kg, 7.00kg, 4.46kg, 50.01kg
```

[back to top](#top)

### Array Manipulation Functions

| Function ||
| :------------- | :------------- |
|`[].every(fn)` |Checks if all elements in an array pass a test|
|`[].some(fn)`,`[].includes(fn)`|Checks if any of the elements in an array pass a test|
|`[].find(fn)`|Returns the value of the first element in the array that passes a test|
|`[].filter(fn)`|Creates an array filled with only the array elements that pass a test|
|`[].map(fn)`|Creates a **new** array with the results of a function applied to every element in the array|
|`[].reduce(fn(accumulator, currentValue))`|Executes a provided function for each value of the array (from left-to-right). **Returns a single value**, the accumulator|
|`[].sort(fn(a,b))` warning, mutates state!|Modifies an array by sorting the items within an array. An optional compare function can be used to customize sort behavior. Use the spread operator to avoid mutation. `[...arr].sort()`|
|`[].reverse()` warning, mutates state | Reverses the order of the elements in an array. Use the spread operator to avoid mutation. `[...arr].reverse()`|

**Array Function can be chaining**

```javascript
let cart = [
	{name: "Drink", price: 3.12},
  {name: "Steak", price: 45.15},
  {name: "Drink", price: 11.01},
	{name: "Drink", price: 4.00},
	{name: "Steak", price: 5.15}
];
let drinkTotal = cart.filter(x => x.name === "Drink")
										 .map(x => x.price)
										 .reduce((t,v) => t +=v)
										 .toFixed(2);
console.log(Total Drink Cost $${drinkTotal}); // Total Drink Cost $18.13
```

[back to top](#top)

### Pipelines

A pipeline allows for easy function composition when performing multiple operations on a variable. Since JavaScript lacks a Pipeline operator, a design pattern can be used to accomplish the task.

```javascript
const pipe = functions => data => {
	return functions.reduce((value, func) => func(value), data);
};
const addSalesTax = (total, taxRate) => (total * taxRate) + total;
const tally = orders => pipe([
	x=> x.reduce((total, val) => total+val),   // sum the order
	x=> addSalesTax(x, 0.09),
	x=> `Order Total = ${x.toFixed(2)}`        // convert to text
])(orders); 

let cart = [3.12, 45.15, 11.01];
console.log(tally(cart));   // Order Total = 64.62
```

[back to top](#top)
