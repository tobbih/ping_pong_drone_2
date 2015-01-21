// drone_collision.js
var event = require( './event' );
var drone = require('./drone_controls.js');

var collisionVel = 50;
var activeAxisX = '';
var activeAxisY = '';

module.exports = {
	CheckX: function() {
    event.on('data_change', function(data) {
      if (data.velX > collisionVel && (activeAxisX == 'front' || activeAxisX == '')) {
        activeAxisX = 'back';
        event.emit('collision', 'back'); 
      }
      else if (data.velX < -collisionVel && (activeAxisX == 'back' || activeAxisX == '')) {
        activeAxisX = 'front';
        event.emit('collision', 'front');
      }
    });
	},

	CheckY: function() {
		event.on('data_change', function(data) {
      if (data.velY > collisionVel && (activeAxisY == 'left' || activeAxisX == '')) {
        activeAxisY = 'right';
        event.emit('collision', 'right'); 
      }
      else if (data.velY < -collisionVel && (activeAxisY == 'right' || activeAxisX == '')) {
        activeAxisY = 'left';
        event.emit('collision', 'left'); 
      }
    });
	}
}