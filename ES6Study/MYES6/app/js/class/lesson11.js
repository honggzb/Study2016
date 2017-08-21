/*
* Proxy和Reflect
*/
/*Proxy*/
{
  let obj = {              //初始对象, 对用户是不可见的
    time: '2017-02-11',
    name: 'net',
    _r: 123
  };
  let monitor = new Proxy(obj, {
    //读取拦截（代理)对象相关的属性
    get(target,key){
      return target[key].replace('2017','2018');
    },
    //设置拦截（代理)对象相关的属性
    set(target,key,value){
      if(key === 'name'){
        return target[key] = value;
      }else{
        return target[key];
      }
    },
    //拦截key in object操作
    has(target,key){
      if(key === 'name'){
        return target[key];
      }else{
        return false;
      }
    },
    //拦截delete
    deleteProperty(target,key){
      if(key.indexOf('_')>-1){   //如果以_开头
        delete target[key];
        return true;
      }else{
        return target[key];
      }
    },
    //
    ownKeys(target){
      return Object.keys(target).filter(item => item!='time');
    }
  });
  console.log('get', monitor.time);                 //get 2018-02-11
  monitor.time = '2018';
  monitor.name = 'mukewang';
  console.log('set', monitor.time, monitor.name);   //set 2018-02-11 mukewang
  console.log('has','name' in monitor, 'time' in monitor);   //has true false
  // delete monitor.time;
  // console.log('delete', monitor);
  // delete monitor._r;
  // console.log('delete', monitor);
  console.log('ownKeys',Object.keys(monitor));    //过滤掉time, 用于保护time属性
}
/*Reflect*/
{
  let obj = {              //初始对象, 对用户是不可见的
    time: '2017-02-11',
    name: 'net',
    _r: 123
  };
  console.log('Reflect get',Reflect.get(obj,'time'));    //Reflect get 2017-02-11
  Reflect.set(obj, 'name', 'mukewang');
  console.log('Reflect set', obj);
  console.log('Reflect has',Reflect.has(obj,'name'));   //Reflect has true
}
// 使用案例- 数据校验解耦模块
{
  function validator(target, validator){
    return new Proxy(target, {
                      _validator: validator,
                      set(target,key,value,receiver){
                        //ignore existing properties so as not to affect them
                        if(target.hasOwnProperty(key)){
                          let va = this._validator[key];
                          if(!!va(value)){
                            // add the property
                            return Reflect.set(target,key,value,receiver);
                          }else{
                            throw Error(`不能设置${key}到${value}`);
                          }
                        }else{
                          // prevent setting a property that isn't explicitly defined in the validator
                          throw Error(`${key} 不存在`);
                        }
                      }
                    });
  }
  
  const personValidators = {
    name(val){
      return typeof val === 'string';
    },
    age(val){
      return typeof val === 'number' && val>18;
    }
  };
  
  class Person{
    constructor(name, age){
      this.name = name;
      this.age = age;
      return validator(this, personValidators);    // 该类返回的是对this的代理
    }
  }
  
  const person = new Person('li', 20);
  console.log(person);    //Proxy {name: "li", age: 20}
  //person.name = 48;    //Uncaught Error: 不能设置name到48
  person.name = "Qian";
  console.log(person);   //Proxy {name: "Qian", age: 20}
  //person.age = 17;
  //console.log(person);   //Uncaught Error: 不能设置age到17
}
//使用案例- 在 JavaScript中实现真正的私有: 只想要它在api对象里面方法被访问到apiKey
{
  var api = {  
    _apiKey: '123abc456def',
    /* mock methods that use this._apiKey */
    getUsers: function(){ }, 
    getUser: function(userId){ }, 
    setUser: function(userId, config){ }
  };
  // Add other restricted properties to this array
  const RESTRICTED = ['_apiKey'];
  api = new Proxy(api, {  
                    get(target, key, proxy) {
                        if(RESTRICTED.indexOf(key) > -1) {
                            throw Error(`${key} is restricted. Please see api documentation for further info.`);
                        }
                        return Reflect.get(target, key, proxy);
                    },
                    set(target, key, value, proxy) {
                        if(RESTRICTED.indexOf(key) > -1) {
                            throw Error(`${key} is restricted. Please see api documentation for further info.`);
                        }
                        return Reflect.get(target, key, value, proxy);
                    }
  });
//  console.log(api._apiKey);
  //api._apiKey = '987654321';   //Uncaught Error: _apiKey is restricted. Please see api documentation for further info.
}
//使用案例- 使用 has这个trap来跳过apiKey, 不让用户在外边使用它
{
  var api = {  
    _apiKey: '123abc456def',
    getUsers: function(){ }, 
    getUser: function(userId){ }, 
    setUser: function(userId, config){ }
  };
  // Add other restricted properties to this array
  const RESTRICTED = ['_apiKey'];
  api = new Proxy(api, {  
                  has(target, key) {
                    return (RESTRICTED.indexOf(key) > -1) ? false : Reflect.has(target, key);
                  }
  });
  // these log false, and `for in` iterators will ignore _apiKey
  console.log("_apiKey" in api);     //false
  for (var key in api) {  
    if (api.hasOwnProperty(key) && key === "_apiKey") {
      console.log("This will never be logged because the proxy obscures _apiKey...")
    }
  }    //This will never be logged because the proxy obscures _apiKey...
}
//使用案例- 静默地对象访问日志
//(对于那些耗费资源密集型、缓慢运行，和/或被大量使用的方法和接口，你可能会想要对它们的使用和/或性能表现进行日志记录。代理可以使其得以在后台悄悄地进行)
{
  let api = {  
    _apiKey: '123abc456def',
    getUsers: function() { /* ... */ },
    getUser: function(userId) { /* ... */ },
    setUser: function(userId, config) {  /* ... */  }
  };
  api = new Proxy(api, {  
    get: function(target, key, proxy) {
      var value = target[key];
      return function(...args) {
        logMethodAsync(new Date(), key);
        //只使用 apply 的 trap 来对方法进行拦截，基本的一点是，任何时候你要调用一个方法，首先都得获得这个方法。所以如果你想要拦截一次方法调用，就需要拦截这个方法的获取过程，然后才能拦截它的使用过程
        return Reflect.apply(value, target, args);    
      };
    }
  });
  // executes apply trap in the background
  api.getUsers();
  function logMethodAsync(timestamp, method) {  
    setTimeout(function() {
      console.log(`${timestamp} - Logging ${method} request asynchronously.`);
    }, 0)
  }
}
//使用案例- 提供警告信息或者阻止特定操作的执行(假设想要阻止任何人删除属性 noDelete, 想要让那些调用 oldMethod 的用户知道它已经被弃用了, 还想要阻止任何人修改 doNotChange 属性)
{
  let dataStore = {  
    noDelete: 1235,
    oldMethod: function() {/*...*/ },
    doNotChange: "tried and true"
  };
  const NODELETE = ['noDelete'];  
  const DEPRECATED = ['oldMethod'];  
  const NOCHANGE = ['doNotChange'];
  dataStore = new Proxy(dataStore, {  
    set(target, key, value, proxy) {
      if (NOCHANGE.includes(key)) {
        throw Error(`Error! ${key} is immutable.`);
      }
      return Reflect.set(target, key, value, proxy);
    },
    deleteProperty(target, key) {
      if (NODELETE.includes(key)) {
        throw Error(`Error! ${key} cannot be deleted.`);
      }
      return Reflect.deleteProperty(target, key);
    },
    get(target, key, proxy) {
      if (DEPRECATED.includes(key)) {
        console.warn(`Warning! ${key} is deprecated.`);
      }
      var val = target[key];
      return typeof val === 'function' ? function(...args) { Reflect.apply(target[key], target, args);} : val;
    }
  });
  //dataStore.doNotChange = "foo";  
  //delete dataStore.noDelete;     //Uncaught Error: Error! doNotChange is immutable.
  dataStore.oldMethod();           //Warning! oldMethod is deprecated.
}
