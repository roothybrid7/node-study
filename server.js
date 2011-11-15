var http = require('http'), fs = require('fs');

var server = http.createServer(function(req, res) {
  var read = fs.createReadStream('/tmp/helloworld.html');
  var head = true;
  read.on('error', function() {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('IO Error\n');
    res.end();
  });
  read.on('data', function(data) {
    if (head) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      head = false;
    }
    res.write(data);
  });
  read.on('end', function(data) {
    res.end();
  });
}).listen(3000);
