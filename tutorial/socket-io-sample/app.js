
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

function find_by_cookie(cookie, callback) {
  var user = {
    name: 'Jxck',
    cookie: cookie
  }
  if (cookie) return callback(null, user);
}

io.configure(function() {
  io.set('authorization', function(handshakeData, callback) {
    var cookie = handshakeData.headers.cookie;
    find_by_cookie(cookie, function(err, user) {
      if (err) return callback(err);
      if (!user) return callback(null, false);

      handshakeData.user = user;
      callback(null, true);
    });
  });
});

io.sockets.on('connection', function(socket) {
  log('connected');
  socket.on('message', function(msg) {
    socket.send(socket.handshake.user.name);
    socket.broadcast.send(msg);
  });
});
