var log = function() { console.log(arguments); }

var socket = io.connect('http://localhost')

socket.on('connect', function() {
  var data = {a: {b: {c: 'e'}}};
  socket.json.emit('msg send', data);
  socket.on('msg push', function(msg) {
    console.log(msg.a.b.c);
  });
});
