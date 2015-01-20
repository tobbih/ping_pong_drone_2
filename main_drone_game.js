// main_drone_game.js
var event = require( './event' );
var drone = require('./drone_controls.js');
var collision = require('./drone_collision.js');
var audio = require('./drone_audio.js');

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
  if (type == 'front') {
    console.log('Front Collision');
    audio.PlayPong();
    drone.Move('front');
  }
  else if (type == 'back') {
    console.log('Back Collision');
    audio.PlayPing();
    drone.Move('back');
  }
      
  if (type == 'left') {
    console.log('Left Collision');
    audio.PlayPong();
    drone.Move('right');
  }
  else if (type == 'right') {
    console.log('Right Collision');
    audio.PlayPing();
    drone.Move('left');
  }
});