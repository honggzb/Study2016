lazy initialization就是在使用的时候才进行初始化，与之对应的是在类加载的时候就初始化（即时加载）

```javaScript
var Fruit = (function() {
  var types = {};
  function Fruit() {};
  // count own properties in object
  function count(obj) {
    return Object.keys(obj).length;
  }
  var _static = {
    getFruit: function(type) {
      if (typeof types[type] == 'undefined') {
        types[type] = new Fruit;
      }
      return types[type];
    },
    printCurrentTypes: function () {
      console.log('Number of instances made: ' + count(types));
      for (var type in types) {
        console.log(type);
      }
    }
  };
  return _static;
})();
Fruit.getFruit('Apple');
Fruit.printCurrentTypes();     //Number of instances made: 1 // Apple
Fruit.getFruit('Banana');
Fruit.printCurrentTypes();    //Number of instances made: 1 // Banana
Fruit.getFruit('Apple');
Fruit.printCurrentTypes();
/*
Number of instances made: 2
Apple
Banana
*/
```
