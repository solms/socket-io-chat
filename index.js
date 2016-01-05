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
var usernames = [];
io.on('connection', function(socket){
  console.log('Client with ID=' + socket.id + ' has connected.');
  // Ask client to choose a username
  socket.emit('get username');
  socket.on('get username', function(username){
    console.log('User responded with: ' + username);
    clients.push(socket);
    usernames.push(username);
  })
  socket.on('disconnect', function(){
    var index = clients.indexOf(socket);
    if(index != -1){
      clients.splice(index, 1);
      console.log('Client with ID=' + socket.id + ' has disconnected.');
    }
  })
  socket.on('chat message', function(msg){
    io.emit('chat message', usernames[clients.indexOf(socket)], msg);
  });
});
