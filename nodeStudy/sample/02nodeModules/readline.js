const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

var realPerson = {
  name: '',
  sayings: []
};

rl.question("what is the name of a real person? ", (answer) => {
  realPerson.name = answer;
  rl.setPrompt(`What would ${realPerson.name} say? `);
  //console.log(answer);
  rl.prompt();
  rl.on('line',(saying) => {
    realPerson.sayings.push(saying.trim());
    if(saying.toLowerCase().trim() === 'exit'){
      rl.close();
    }else {
      rl.setPrompt(`what else would ${realPerson.name} say? ('exit' to leave) `);
      //console.log(saying.trim());
      rl.prompt();
    }
  });
});


rl.on('close', ()  => {
  console.log("%s is a real person that says %j", realPerson.name,realPerson.sayings);
  process.exit();
});
