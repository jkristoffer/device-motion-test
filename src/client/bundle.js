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

	module.exports = {
		init: function(socket){
			var cycleLimit = 1, cycleCounter = 0;

			var acc = {
					absolute: {
						x:0,y:0,z:0
					},
					calibrated: {
						x:0,y:0,z:0
					},
					offset: {
						x:0,y:0,z:0
					},
					center: {
						x:0,y:0,z:0
					},
					top: {
						x:0,y:0,z:0
					},
					right: {
						x:0,y:0,z:0
					},
					bottom: {
						x:0,y:0,z:0
					},
					left: {
						x:0,y:0,z:0
					}
				},
				el_x = document.getElementById('x'),
				el_y = document.getElementById('y'),
				el_z = document.getElementById('z');
				ctr = 0;

			document.getElementById('callibrate').onclick = function callibrate(){
				if (ctr === 0) {
					acc.center.x = acc.absolute.x;
					acc.center.y = acc.absolute.y;
					acc.center.z = acc.absolute.z;
				} else if (ctr === 1){
					acc.top.x = acc.absolute.x;
					acc.top.y = acc.absolute.y;
					acc.top.z = acc.absolute.z;
				} else if (ctr === 2){
					acc.right.x = acc.absolute.x;
					acc.right.y = acc.absolute.y;
					acc.right.z = acc.absolute.z;
				} else if (ctr === 3){
					acc.bottom.x = acc.absolute.x;
					acc.bottom.y = acc.absolute.y;
					acc.bottom.z = acc.absolute.z;
				} else if (ctr === 4){
					acc.left.x = acc.absolute.x;
					acc.left.y = acc.absolute.y;
					acc.left.z = acc.absolute.z;
				}
				ctr++;
			}

			function handleMotionEvent(event) {
			    var _x = event.accelerationIncludingGravity.x,
			    	_y = event.accelerationIncludingGravity.y,
			    	_z = event.accelerationIncludingGravity.z;
			    acc.absolute.x = _x; acc.absolute.y = _y; acc.absolute.z = _z;

			    acc.offset.x = acc.absolute.x - acc.calibrated.x;
			    acc.offset.y = acc.absolute.y - acc.calibrated.y;
			    acc.offset.z = acc.absolute.z - acc.calibrated.z;

			    el_x.innerHTML = acc.absolute.x - acc.calibrated.x;
			    el_y.innerHTML = acc.absolute.y - acc.calibrated.y;
			    el_z.innerHTML = acc.absolute.z - acc.calibrated.z;

			    cycleCounter = cycleCounter + 1;
			    if (cycleCounter > cycleLimit) {
			    	cycleCounter = 0;
			    	document.getElementById('log').innerHTML = ctr;
			    	socket.send(JSON.stringify(acc));
			    }
			}

			window.addEventListener("devicemotion", handleMotionEvent, true);
		}
	}

/***/ }
/******/ ]);