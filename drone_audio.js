// drone_audio.js
var edge = require('edge');

var createPlayer = edge.func(function() {/*
  async (input) => {
     var player = new System.Media.SoundPlayer((string)input);
    return new {
        start = (Func<object,Task<object>>)(async (i) => {
             player.Play();
            return null;
       }),
        stop = (Func<object,Task<object>>)(async (i) => {
             player.Stop();
           return null;
        })
    };
   }
 */});
  
var playerPing = createPlayer('./audio_files/ping.wav', true);
var playerPong = createPlayer('./audio_files/pong.wav', true);
var playing = false;

module.exports = {
  PlayPing: function(data) {
    if (!playing) {
      playerPing.start(null, function (err) {
          playing = true;
      if (err) throw err;
      });
    }

    setTimeout(function () {
    playerPing.stop(null, function(err) {
         playing = false;
         if (err) throw err;
       });
     }, 2000);
  },
  PlayPong: function(data) {
    if (!playing) {
      playerPong.start(null, function (err) {
          playing = true;
      if (err) throw err;
      });
    }

    setTimeout(function () {
    playerPong.stop(null, function(err) {
         playing = false;
         if (err) throw err;
       });
     }, 2000);
  },
}