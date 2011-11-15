var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World\n');
  res.end();
  console.log(req.url + '"' + req.headers['user-agent'] + '"');
}).listen(3000);
