var log = function() { console.log(arguments); }

var socket = io.connect('http://localhost')

socket.on('connect', function() {
  socket.emit('set nickname', 'Jxck');
  socket.on('ready', function(msg) {
    socket.emit('get nickname');
  });

  socket.on('name', function(name) {
    log('name is', name);
  });
});
