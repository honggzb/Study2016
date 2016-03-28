var fs = require('fs');
var path = require('path');
// var contents = fs.readFileSync('../debugNode.md',"UTF-8");
// console.log(contents);

// fs.readFile('../debugNode.md',"UTF-8",function (err,contents) {
//   if(err){ console.log(err); }
//   console.log(contents);
// });

fs.readdir("./02nodeModules",function (err, files) {
  files.forEach(function (fileName) {
    var file = path.join(__dirname, "lib", fileName);
    var stats = fs.statSync(file);
    if(stats.isFile() && fileName !== ".DS_Store"){
      fs.readFile(file,"UTF-8",function (err,contents) {
        if(err){ throw err; }
        console.log(contents);
      });
    }
  })
});
