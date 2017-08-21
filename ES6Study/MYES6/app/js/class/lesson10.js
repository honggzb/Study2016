/*
Set和Map, WeakSet和WeakMap
 */
/* Set */
{
  let list = new Set();
  list.add(5);
  list.add(7);
  console.log('size',list.size);
}
//定义时候赋值，初始值
{
  let arr = [1,2,3,4,5];
  let list = new Set(arr);
  console.log('size',list.size);
}
{
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);
  console.log('list',list);   //list Set(2) {1, 2}- 如果重复，不会报错，只是不加入set
  //利用该属性去重复
  let a = [1,2,3,1,2,5];
  let list2= new Set(a);
  console.log('list2去重复',list2);   //list2 Set(4) {1, 2, 3, 5}
}
//set的一些方法
{
  let arr=['add','delete','clear','has'];
  let list = new Set(arr);
  console.log('has',list.has('add'));   //has true
  console.log('delete',list.delete('delete'));  //delete true
  list.clear();
  console.log('list=',list);   //list Set(0) {}
}
//set 遍历
{
  let arr=['add','delete','clear','has'];
  let list = new Set(arr);
  for(let key of list.keys()){
    console.log('keys=', key);
  }
  for(let key of list.values()){
    console.log('values=', key);
  }
  for(let [key,value] of list.entries()){
    console.log('keys=', key, ', values=', value);
  }
  list.forEach(function(item){
    console.log(item);
  })
}

/* WeakSet */
{
  let weaklist = new WeakSet();
  let arg = {};
  weaklist.add(arg);
  //weaklist.add(2);    //arg is not defined
  console.log('weaklist',weaklist);
}
/* Map */
{
  let map = new Map();
  let arr = ['123'];
  map.set(arr,456);
  console.log('map', map, map.get(arr));
}
//
{
  let map = new Map([['a',123],['b',456]]);
  console.log('map args',map);
  console.log('map size=', map.size);
  console.log('map delete', map.delete('a'),map);
  console.log('map clear',map.clear(),map);    //map clear undefined
}
//遍历

//WeakMap
{
  let weakmap = new WeakMap();
  let o ={};
  weakmap.set(o,123);
  console.log('weakmap',weakmap.get(o));  //weakmap 123
}

/*
* 数据结构横向对比
* Map和Array的对比\Set和Array的对比
* Map和Object的对比\Set和Object的对比 
 */
{
  //Map和Array的对比
  let map = new Map();
  let arr = [];
  //增加
  map.set('t',1);
  arr.push({t:1});
  console.info('map-array: add',map,arr);
  //查找
  let map_exist = map.has('t');                //true
  let arr_exist = arr.find(item => item.t);    //返回找到的对象
  console.info('map-array: find',map_exist ,arr_exist);
  //修改
  map.set('t',2);
  arr.forEach(item => item.t ? item.t=2: '');
  console.info('map-array: modify',map,arr);
  //删除
  map.delete('t');
  let index = arr.findIndex(item => item.t);
  arr.splice(index,1);
  console.info('map-array: delete',map,arr);
}
{
  //Set和Array的对比
  let set = new Set();
  let arr = [];
  let setitem = {t:1};
  //增加
  set.add(setitem);
  arr.push({t:1});
  console.info('set-array: add',set,arr);
  //查找
  let set_exist = set.has(setitem);                //true
  let arr_exist = arr.find(item => item.t);    //返回找到的对象
  console.info('set-array: find',set_exist ,arr_exist);
  //修改
  set.forEach(item => item.t ? item.t = 2: '');
  arr.forEach(item => item.t ? item.t = 2: '');
  console.info('set-array: modify',set,arr);
  //删除
  set.delete(setitem);
  let index = arr.findIndex(item => item.t);
  arr.splice(index,1);
  console.info('set-array: delete',set,arr);
}
{
  //Map,Set和Object的对比
  let setMapItem = {t:1};
  let map = new Map();
  let set = new Set();
  let obj = {};
  //增加
  map.set('t',1);
  set.add(setMapItem);
  obj['t'] = 1;
  console.info('map-set-object: add',map,set,obj);
  //查找
  let map_exist = map.has('t');                //true
  let set_exist = set.has(setMapItem);
  let obj_exist = 't' in obj;    //返回找到的对象
  console.info('map-set-object: find',map_exist,set_exist, obj_exist);
  //修改
  map.set('t',2);
  set.forEach(item => item.t ? item.t=2: '');
  obj['t']=2;
  console.info('map-set-object: modify',map,set,obj);
  //删除
  map.delete('t');
  set.delete(setMapItem);
  delete obj['t'];
  console.info('map-set-object: delete',map,set,obj);
}
