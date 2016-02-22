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
			}
			},
			el_x = document.getElementById('x'),
			el_y = document.getElementById('y'),
			el_z = document.getElementById('z');

		function callibrate(){
			acc.calibrated.x = acc.absolute.x;
			acc.calibrated.y = acc.absolute.y;
			acc.calibrated.z = acc.absolute.z;
		}

		function handleMotionEvent(event) {
		    var _x = parseFloat(event.accelerationIncludingGravity.x).toFixed(0),
		    	_y = parseFloat(event.accelerationIncludingGravity.y).toFixed(0),
		    	_z = parseFloat(event.accelerationIncludingGravity.z).toFixed(0);
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
		    	socket.send(JSON.stringify({ player1_v: [el_x.innerHTML, el_y.innerHTML]}));
		    }
		}

		window.addEventListener("devicemotion", handleMotionEvent, true);
	}
}