
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var log = console.log;

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
  log('connected');
  socket.on('msg send', function(msg, fn) {
    fn(msg + ' was successfully sent');
    socket.emit('msg push', msg, function(data) {
      log(data);
    });
    socket.broadcast.emit('msg push', msg, function(data) {
      log(data);
    });
  });
  socket.on('disconnect', function() {
    log('disconnected');
  });
});

var chat = io
  .of('/chat')
  .on('connection', function(socket) {
    log('chat connected');
    socket.on('msg send', function(msg) {
      chat.emit('msg push', msg + ' from chat');
    });
  });

var news = io
  .of('/news')
  .on('connection', function(socket) {
    log('news connected');
    socket.on('msg send', function(msg) {
      news.emit('msg push', msg + ' from news');
    });
  });
