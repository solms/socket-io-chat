var express = require('express');
var app = express();

app.use('/css', express.static('css'));
app.use('/js',  express.static('js'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port = 3000;
var server = app.listen(port, function(){
  console.log('Listening on port ' + port + '.');
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('A user connected.');
  socket.on('disconnect', function(){
   console.log('user disconnected');
  });
});
