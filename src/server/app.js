var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4001 })
  , wss_r = new WebSocketServer({ port: 4002 });

wss_r.on('connection', function connection(ws) {
    console.log('wss_r connected');
});

wss_r.broadcast = function broadcast(data){
    wss_r.clients.forEach(function each(client) {
      client.send(data);
    });
}

wss.on('connection', function connection(ws) {
    console.log('wss connected');
    ws.on('message', function incoming(data) {
      console.log(data);
      wss_r.broadcast(data);
    });
});
