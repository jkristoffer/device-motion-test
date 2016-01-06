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