// main_drone_game.js
var event = require( './event' );
var audio = require('./drone_audio.js');
var drone = require('./drone_controls.js');
var collision = require('./drone_collision.js');

initData = {
	maxHeight: 4000,
	velocityX: 0.2,
	velocityY: 0.2,
  dataEventTimeout: 1
}

drone.Init(initData)
	.then(function(result) {
    return drone.GetData('battery')
	})
	.then(function(value) {
    console.log(value);
		return drone.TakeOff()
	})
	.then (function() {
    collision.CheckX();
    collision.CheckY();
    drone.Land(50000);
	});
  

event.on('collision', function(type) {
  if (type == 'back') {
    console.log('Front Collision');
    audio.PlayPong();
    drone.Move('front');
  }
  else if (type == 'front') {
    console.log('Back Collision');
    audio.PlayPing();
    drone.Move('back');
  }

  if (type == 'right') {
    console.log('Left Collision');
    audio.PlayPong();
    drone.Move('right');
  }
  else if (type == 'left') {
    console.log('Right Collision');
    audio.PlayPing();
    drone.Move('left');
  }
});