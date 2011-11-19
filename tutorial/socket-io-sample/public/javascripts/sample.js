var log = function() { console.log(arguments); }

var socket = io.connect('http://localhost')

socket.on('connect', function() {
  socket.send('data');
  socket.on('message', function(msg) {
    log(msg);
  });
});
