window.socket_1 = new WebSocket("ws://10.4.1.28:4001");

var playfield = require('./playfield.js');
playfield.init(socket_1);