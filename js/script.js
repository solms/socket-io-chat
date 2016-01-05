var socket = io();

$('#input-area').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('get username', function(){
  $('#connecting').fadeOut();
  $('#get-username').show();
})

$('#get-username').submit(function(){
  socket.emit('get username', $('#username').val());
  $('#get-username').fadeOut();
  $('#chat').show();
  return false;
})

socket.on('chat message', function(id, msg){
  $('#messages').append($('<li>').html(id+':&emsp;'+msg));
});
