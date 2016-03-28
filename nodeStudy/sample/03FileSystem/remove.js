const fs = require('fs');

try{
  fs.unlinkSync("./lib/config.json");
} catch(err){
  console.log(err);
}

fs.unlink("notes.md", (err) => {
  if(err){
    console.log(err);
  }else{
    console.log("notes.md removed.");
  }
});
