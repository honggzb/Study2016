var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app).listen(3000);
var io = require('socket.io')(server);

app.use(express.static("./public"));

io.on("connection", (socket) => {
  socket.on("chat", (message) => {
    socket.broadcast.emit("message", message);
  });
  socket.emit("message","welcome to Cyber chat");
});
console.log("Starting Socket App - http://localhost:3000");
