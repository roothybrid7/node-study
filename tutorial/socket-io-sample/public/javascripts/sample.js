var log = function() { console.log(arguments); }

var socket = io.connect('http://localhost')
  , chat = io.connect('http://localhost/chat')
  , news = io.connect('http://localhost/news');

socket.on('connect', function() {
  log('connected');
  socket.emit('msg send', 'data', function(data){
    log(data);
  });
  socket.on('msg push', function(msg, fn) {
    fn(msg + ' was successfully pushed');
    log(msg);
  });
});

chat.on('connect', function() {
  chat.emit('msg send', 'chat');
  chat.on('msg push', function(msg) {
    log(msg);
  });
});

news.on('connect', function() {
  news.emit('msg push', 'news');
  news.on('msg push', function(msg) {
    log(msg);
  });
});
