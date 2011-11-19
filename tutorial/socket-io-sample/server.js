/**
 * server.js - socket.io standalone server.
 */
var io = require('socket.io').listen(8080);
var log = console.log;

io.sockets.on('connection', function(socket) {
  log('connected');
  socket.emit('msg push', 'data');
  socket.on('msg send', function(msg) {
    log(msg);
  });
});
