var http = require('http');

var server = http.createServer(function(req, res) {
  if (req.method == 'POST') {
    res.writeHead(200, {'Content-Type': req.headers['content-type']});
    req.on('data', function(data) {
      res.write(data);
    });
    req.on('end', function() {
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World\n');
    res.end();
  }
}).listen(3000);
