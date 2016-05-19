var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();
life.setMaxListeners(11);

function water(who) {
  console.log('给'+ who +'倒水');
}
// addEventListener
life.on('求安慰', water);   //removeListener不能使用匿名函数
life.on('求安慰',function(who){
  console.log('给'+ who +'揉肩');
});
life.on('求安慰',function(who){
  console.log('给'+ who +'做饭');
});
life.on('求安慰',function(who){
  console.log('给'+ who +'倒水');
});
life.on('求安慰',function(who){
  console.log('给'+ who +'洗衣服');
});
life.on('求安慰',function(who){
  console.log('给'+ who +'...5');
});
life.on('求安慰',function(who){
  console.log('给'+ who +'...6');
});
life.on('求溺爱',function(who){
  console.log('给'+ who +'交工资');
});
life.on('求溺爱',function(who){
  console.log('给'+ who +'买衣服');
});

//removeListener
life.removeListener('求安慰', water);   //removeListener不能使用匿名函数
life.removeAllListeners('求安慰');      //移除所有的event
// emit event
var hasConfortListener = life.emit('求安慰','汉子');
var hasLovedListener = life.emit('求溺爱','妹子');
console.log('hasConfortListener: '+hasConfortListener);
console.log('hasLovedListener: '+hasLovedListener);

// Event length
console.log('求安慰:'+ life.listeners('求安慰').length);
console.log('求安慰:'+ EventEmitter.listenerCount(life,'求安慰'));
console.log('求溺爱: '+ EventEmitter.listenerCount(life,'求溺爱'));
