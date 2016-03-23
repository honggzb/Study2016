// always talking

var sayings =[
  "what is your name?",
  "what is your fav hobby?",
  "what is your preferred programming language?",
  "You may delay, but time will not.",
  "It is far better to be alone, than to be in bad company."
];

var interval = setInterval( () =>  {
  var i = Math.floor(Math.random()*sayings.length);
  process.stdout.write(`${sayings} \n`);
}, 1000);

process.stdin.on('data', (data) => {
  console.log(`STDIN data received -> ${data.toString().trim()}`);
  clearInterval(interval);
  process.exit();
});
