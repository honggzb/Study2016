var spawn = require("child_process").spawn;

var cp = spawn("node",["alwaysTalking"]);

cp.stdout.on("data",function (data) {
  console.log(`STDOUT -> ${data.toString().trim()}`);
});

cp.stdout.on("close",function (data) {
  console.log("Child process has ended.");
  process.exit();
});

setTimeout(function() {
  cp.stdin.write("stop");
}, 4000);
