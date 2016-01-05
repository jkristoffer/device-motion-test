window.socket_1 = new WebSocket("ws://10.4.1.28:4001");

var ReactDOM = window.ReactDOM = require('react-dom');
var React = window.React = require('react');

var controller = {
	sendHi: function(){
		socket_1.send({ message: 'hi' });
	}
};


window.socket_1.onmessage = function(data){
	console.log(data);
	controller.receiveHi();
};

var Main = require('./components/main.jsx')(controller);
ReactDOM.render(React.createElement(Main, null), document.getElementById('app'));

/** Require Styles */

require('../css/style.css');