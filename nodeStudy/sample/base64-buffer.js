// 将图片改为base64编码格式
var fs = require('fs');

fs.readFile('logo.png',function(err, origin_buffer) {
  console.log(Buffer.isBuffer(origin_buffer));
  fs.writeFile('logo-buffer.png',origin_buffer, function(err) {
    if(err) console.log(err);
  })
  var base64Image = origin_buffer.toString('base64');
  console.log(base64Image);
  
  var decodedImage = new Buffer(base64Image, 'base64')
  console.log(Buffer.compare(origin_buffer, decodedImage));
  
  fs.writeFile('logo-decoded.png', decodedImage,function(err){
    if(err) console.log(err);
  });
});
