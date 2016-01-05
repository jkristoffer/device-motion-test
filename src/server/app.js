var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4001 });

wss.on('connection', function connection(ws) {
    console.log('Client Connected');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    });
});
