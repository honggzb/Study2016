var questions = [
  "what is your name?",
  "what is your fav hobby?",
  "what is your preferred programming language?"
];

var answers = [];

function ask(i){
  process.stdout.write(`\n\n\n ${questions[i]}`);
  process.stdout.write("  >  ");
}

process.stdin.on('data',function(data){
  //process.stdout.write('\n'+data.toString().trim()+'\n');
  answers.push(data.toString().trim());

  if(answers.length < questions.length){
    var j = answers.length;
    ask(j);
  }else {
    process.exit();
  }
});

process.on('exit',function() {
  process.stdout.write("\n\n\n");
  process.stdout.write(`Go ${answers[1]} ${answers[0]} you can finish writing ${answers[2]} later`);
  process.stdout.write("\n\n\n");
})

ask(0);
