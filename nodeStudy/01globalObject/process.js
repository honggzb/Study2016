// process.argv.forEach((val, index, array) => {
//   console.log(`${index}: ${val}`);
// });
//console.log("hello!");

function grap(flag){
  var index = process.argv.indexOf(flag);
  return(index === -1)?null:process.argv[index+1];
}

var greeting = grap('--greeting');
var user = grap('--user');
if(!user || !greeting){
  console.log('Your blew it');
}else {
  console.log(`welcome ${user}, ${greeting}`);
}
