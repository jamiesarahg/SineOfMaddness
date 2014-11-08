var express = require('express');
var bodyParser = require('body-parser')


var SerialPort = require("serialport");
var serialPort = new SerialPort("COM9", {baudrate: 9600});

var server = express();
server.use(bodyParser.urlencoded({ extended: true }))

// server.use(express.static(__dirname + '/public'));

// Add headers
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://138.110.171.153:8000/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
 
server.get('/', function (req, res) {
  res.send('Hello World!')
});

var port = 8008;
server.listen(port, function() {
    console.log('server listening on port ', port);
});

serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function(data) {
        console.log('data received: ' + data);
    });
    serialPort.write("ls\n", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
});

server.post('/arduino', function(req, res) {
	out = req.body.out;
	console.log('out: '+out);
	
	serialPort.open();
    serialPort.write(out);
    serialPort.close();
    res.send({ status: 'SUCCESS' });
})