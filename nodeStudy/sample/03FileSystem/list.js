//list directory
var fs = require("fs");

// var files = fs.readdirSync('../02nodeModules');  // will block nodeJS
//console.log(files);
//
//asynchronous, reading Files... will exec firstly
fs.readdir('../02nodeModules',function (err, files) {
  if(err) { throw err; }
  console.log(files);
});
console.log("Reading Files...");
