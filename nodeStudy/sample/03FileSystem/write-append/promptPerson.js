var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var fs = require('fs');

var realPerson = {
  name: '',
  sayings: []
};

rl.question("what is the name of a real person? ",function (answer) {
  realPerson.name = answer;
  //
  // TODO: create a new Markdown File
  //
  fs.writeFileSync(realPerson.name+".md", `${realPerson.name}\n=====================\n\n`);

  rl.setPrompt(`What would ${realPerson.name} say? `);
  //console.log(answer);
  rl.prompt();
  rl.on('line',function(saying){
    realPerson.sayings.push(saying.trim());
    //
    // TODO: append sayings to that Markdown file
    //
    fs.appendFile(realPerson.name+".md", `* ${saying.trim()} \n`)

    if(saying.toLowerCase().trim() === 'exit'){
      rl.close();
    }else {
      rl.setPrompt(`what else would ${realPerson.name} say? ('exit' to leave) `);
      //console.log(saying.trim());
      rl.prompt();
    }
  });
});


rl.on('close',function () {
  console.log("%s is a real person that says %j", realPerson.name,realPerson.sayings);
  process.exit();
});
