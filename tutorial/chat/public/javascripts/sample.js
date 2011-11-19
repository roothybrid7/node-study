var logDiv;
var button;
window.onload = function() {
  logDiv = document.getElementById('log');
  button = document.getElementById('ping');
  button.addEventListener('click', ping, false);
};
var log = function() {
  console.log(arguments);
//  log_div.innerHTML += arguments[0] + '<br/>';
};

var socket = io.connect('http://localhost');

socket.on('connect', function() {
  log('connected');
  socket.emit('msg send', 'data');
  socket.on('msg push', function(msg) {
    log(msg);
    logDiv.innerHTML += msg + '<br/>';
  });
});

function ping() {
  var text = document.getElementById('text').value;
  socket.emit('msg send', text);
}
