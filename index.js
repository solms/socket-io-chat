var express = require('express');
var app = express();

var jquery = require('jquery');
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

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
var clients = [];
io.on('connection', function(socket){
  clients.push(socket);
  console.log('Client with ID=' + socket.id + ' has connected.');
  socket.on('disconnect', function(){
    var index = clients.indexOf(socket);
    if(index != -1){
      clients.splice(index, 1);
      console.log('Client with ID=' + socket.id + ' has disconnected.');
    }
  })
  socket.on('chat message', function(msg){
    io.emit('chat message', socket.id, msg);
  });
});
