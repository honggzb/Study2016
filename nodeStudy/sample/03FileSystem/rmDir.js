var fs = require('fs');

// fs.rmdir("./assets",function (err) {
//   if(err){
//     throw err;
//   }
//   console.log("Assets Directory Removed");
// });

//Directory cannot remove if it is not empty, so should remove file firstly
// fs.readdir("./logs").forEach(function(filename) {
//   fs.unlinkSync("./logs/"+filename);
// });
//
// fs.readdir("../logs",function(err, files) {
//   //console.log(files);
//   if(err){
//       console.log("logs Directory donnot exist!");
//   }
//   if(files && files.length){
//     files.forEach(function (filename) {
//       console.log(filename);
//       fs.unlink("../logs/"+ filename);
//     });
//   }
//   fs.rmdir("../logs",function (err) {
//     if(err){
//       throw err;
//     }
//     console.log("Logs Directory Removed");
//   });
// });
//使用递归
deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                console.log(curPath+" files Removed");
            }
        });
        fs.rmdirSync(path);
        console.log("Logs Directory Removed");
    }else{
      console.log("Logs Directory not exist!");
    }
};

deleteFolderRecursive("../logs");

//使用系统的命令
// var exec = require('child_process').exec,child;
// child = exec('rm -rf ../logs',function(err,out) {
//   console.log(out); err && console.log(err);
// });
