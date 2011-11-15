var http = require('http');

var server = http.createServer(function(req, res) {
  setTimeout(function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("I'm busy\n");
    res.end();
  }, 1000);
}).listen(3000);
