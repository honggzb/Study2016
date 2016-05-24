// var Readable = require('stream').Readable;
// var Writable = require('stream').Writable;
// 
// var readStream = new Readable();
// var writeStream = new Writable();
// 
// readStream.push('I');
// readStream.push('Love');
// readStream.push('Imooc\n');
// readStream.push(null);
// 
// writeStream._write = function(chunk, encode, cb){
//   console.log(chunk.toString());
//   cb();
// };
// 
// readStream.pipe(writeStream);
// 
// 
//自定义可读流，可写流
var stream = require('stream');
var util = require('util');
//定义可读流
function ReadStream() {
  stream.Readable.call(this);
}
//继承可读流的原型
util.inherits(ReadStream,stream.Readable);
//重写可读流方法
ReadStream.prototype._read = function() {
  this.push('I');
  this.push('Love');
  this.push('Imooc\n');
  this.push(null);
}
//定义可写流
function WriteStream(){
  stream.Writable.call(this);
  this._cached = new Buffer('');
}
util.inherits(WriteStream,stream.Writable);  //继承
WriteStream.prototype._write = function(chunk, encode, cb){  //重写
  console.log(chunk.toString());
  cb();
};
//定义转换流
function TransformStream() {
  stream.Transform.call(this);
}
util.inherits(TransformStream, stream.Transform);
//重写方法, 两个
TransformStream.prototype._transform = function(chunk, encode, cb){  //重写
  this.push(chunk);
  cb();
};
TransformStream.prototype._flush = function(cb){  //额外定制的内容
  this.push('Oh, Yeah!');
  cb();
};
//生成实例
var rs = new ReadStream();
var ws = new WriteStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws); 

//
// var stream = require('stream');
// var util = require('util');
// var fs =require('fs');
// 
// function Love() {
//   stream.Readable.call(this);
//   this._max = 5;
//   this._index = 0;
// }
// util.inherits(Love, stream.Readable);
// 
// Love.prototype._read = function() {
//   var i = this._index++;
//   if (i > this._max) {
//     this.push('beautiful');
//     this.push(null);
//   }
//   else {
//     var str = '' + i;
//     var buf = new Buffer(str, 'utf8');
//     this.push(buf);
//   }
// };
// 
// function Story() {
//   stream.Writable.call(this);
//   this._storage = new Buffer('');
// }
// util.inherits(Story, stream.Writable);
// 
// Story.prototype._write = function(chunk, encoding, callback) {
//   this._storage = Buffer.concat([this._storage, chunk]);
//   callback();
// };
// 
// function Knight() {
//   stream.Transform.call(this);
// }
// util.inherits(Knight, stream.Transform);
// 
// Knight.prototype._transform = function(chunk, encoding, callback) {
//   this.push(chunk);
//   callback();
// };
// 
// Knight.prototype._flush = function(callback) {
//   this.push('dark knight');
//   callback();
// };
// 
// var reader = new Love();
// var writer = new Story();
// var transform = new Knight();
// 
// writer.on('finish', function() {
//   fs.writeFileSync('./output.txt', this._storage);
// });
// 
// reader.pipe(transform).pipe(writer);