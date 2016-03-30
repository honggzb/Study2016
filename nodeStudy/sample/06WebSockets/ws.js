var WebSocketServer = require('ws').Server;
//create WebSocket Server -- wss
var wss = new WebSocketServer({port: 3000});

wss.on("connection", (ws) =>{   //ws is WebSocket client
  ws.on("message",(message)=>{
    if(message === 'exit'){
      ws.close();
    }else{
      //broadcast
      wss.clients.forEach((client)=>{
        client.send(message);
      });
    }
  });
  ws.send("Welcome to cyber chat");
});
