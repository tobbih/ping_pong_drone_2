// drone_controls.js

var Q = require('q');

var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var event = require( './event' );

var velocityX = 0;
var velocityY = 0;

module.exports = {
	Init: function(data) {
		var defer = Q.defer();
		velocityX = data.velocityX;
		velocityY = data.velocityY;
    
    dataEvents(data.dataEventTimeout);
		
    client.config('control:altitude_max', data.maxHeight, function(){
			console.log('Initialized');
			defer.resolve(true);
		});
		
		return defer.promise;
	},
  
	TakeOff: function() {
		var defer = Q.defer();
		client.takeoff(function(){
			console.log('Taken off');
			defer.resolve(true);
		});
		
		return defer.promise;
	},
	
	Land: function(timeout) {
		var defer = Q.defer();
		client.after(timeout, function() {
			this.land(function() {
				console.log('Landed');
				defer.resolve(true); 
			});
		});
		
		return defer.promise;
	},
	
	GetData: function(type) {
		var defer = Q.defer();
		
		client.on('navdata', function(data) {
			if(data.demo) {
				if (type == 'battery')
					defer.resolve(data.demo.batteryPercentage);
				if (type == 'velX')
          defer.resolve(data.demo.velocity.x);
				if (type == 'velY')
					defer.resolve(data.demo.velocity.y);
			}
		});

		return defer.promise;
	},

	Calibrate: function(timeout) {
		var defer = Q.defer();
		client
			.after(0, function() {
				console.log('Calibrating');
				this.calibrate(0);
			})
			.after(10000, function() {
				console.log('Calibration done');
				defer.resolve(true);
			});
		
		return defer.promise;
	},
	
	Move: function(direction, velocity) {
		if (velocity) {
			velocityX = velocity
			velocityY = velocity
		}

		if (direction == 'front')
			client.front(velocityX);
		else if (direction == 'back')
			client.back(velocityX);
		else if (direction == 'left')
			client.left(velocityY);
		else if (direction == 'right')
			client.right(velocityY);
	}
	
}

function dataEvents(timeout){
  var counter = 0;
  client.on('navdata', function(data) {
    counter = counter + 1;
    if(counter >= timeout && data.demo) {
      counter = 0;

      event.emit('data_change', {
        'velX': data.demo.velocity.x,
        'velY': data.demo.velocity.y
      });
    }
  });
}