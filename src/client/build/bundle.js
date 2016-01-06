/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	window.socket_1 = new WebSocket("ws://10.4.1.28:4001");

	var playfield = __webpack_require__(2);
	playfield.init(socket_1);

/***/ },
/* 2 */
/***/ function(module, exports) {

	window.requestAnimationFrame(loop);
	window.isStarted = false;

	var red_pos = [0,0],
		velocity = [0,0];

	function loop(){
		if (window.isStarted) {
			red_pos[0] += acc.offset.x.toFixed(1) * 0.5;
			red_pos[1] += acc.offset.y.toFixed(1) * -0.5;
			if (red_pos[0] <= 0) red_pos[0] = 0;
			if (red_pos[0] >= 190) red_pos[0] = 190;
			if (red_pos[1] >= 190) red_pos[1] = 190;
			if (red_pos[1] <= 0) red_pos[1] = 0;
		}
		var canvas = document.getElementById("playfield"), 
			ctx = canvas.getContext("2d");

		ctx.fillStyle = "red"; 
		ctx.fillRect(red_pos[0], red_pos[1], 10, 10);
		//ctx.translate(100,100);

		console.log('step');
	  	window.requestAnimationFrame(loop);
	}
	var log_div = document.getElementById('app');
	var acc = {
		absolute: {
			x:0,y:0,z:0
		},
		calibrated: {
			x:0,y:0,z:0
		},
		offset: {
			x:0,y:0,z:0
		}
	}
	var el_x = document.getElementById('x');
	var el_y = document.getElementById('y');
	var el_z = document.getElementById('z');

	function log(text){
		log_div.appendChild(document.createTextNode(text));
	}
	function callibrate(){
		acc.calibrated.x = acc.absolute.x;
		acc.calibrated.y = acc.absolute.y;
		acc.calibrated.z = acc.absolute.z;
		window.isStarted = true;
	}
	function reset(){
		var canvas = document.getElementById("playfield"), 
			ctx = canvas.getContext("2d");

		ctx.clearRect(0,0,200,200);
	}
	function handleMotionEvent(event) {
	    var _x = event.accelerationIncludingGravity.x;
	    var _y = event.accelerationIncludingGravity.y;
	    var _z = event.accelerationIncludingGravity.z;

	    acc.absolute.x = _x;
	    acc.absolute.y = _y;
	    acc.absolute.z = _z;

	    acc.offset.x = acc.absolute.x - acc.calibrated.x;
	    acc.offset.y = acc.absolute.y - acc.calibrated.y;
	    acc.offset.z = acc.absolute.z - acc.calibrated.z;

	    el_x.innerHTML = acc.absolute.x - acc.calibrated.x;
	    el_y.innerHTML = acc.absolute.y - acc.calibrated.y;
	    el_z.innerHTML = acc.absolute.z - acc.calibrated.z;	  
	}

	window.addEventListener("devicemotion", handleMotionEvent, true);

/***/ }
/******/ ]);