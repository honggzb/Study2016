var fs = require('fs');
//read all file
// fs.readFile('chat.log','UTF-8',function (err,chatlog) {
//   console.log(`File Read ${chatlog.length}`);
// });
// console.log("Reading files");
//
//read file and receive chunk by chunk each time
var stream = fs.createReadStream("chat.log",'UTF-8');
var data = "";

stream.once("data",() => {
    console.log("\n\n");
    console.log("Starting Reading File");
    console.log("\n\n");
});

stream.on("data",(chunk) => {
  process.stdout.write(`chunk: ${chunk.length} | `);
  data += chunk;
});

stream.on("end",()=>{
  console.log("\n\n");
  console.log(`Finished Reading File ${data.length}`);
  console.log("\n\n");
});
