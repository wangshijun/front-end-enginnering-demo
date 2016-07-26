
var http = require('http');
var server = http.createServer(function (req, res) {
	res.write('hello world\n');
	res.write(JSON.stringify(req.headers));
	res.end();
});

server.listen(3000);