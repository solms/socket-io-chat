var socket = io();

$('#input-area').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(id, msg){
  $('#messages').append($('<li>').text(id+': '+msg));
});
