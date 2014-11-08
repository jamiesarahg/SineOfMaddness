var express = require('express');
 
var server = express();
server.use(express.static(__dirname + '/public'));
 
var port = 1337;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});