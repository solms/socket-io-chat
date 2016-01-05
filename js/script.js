var socket = io();

$('#input-area').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('get username', function(){
  $('#connecting').attr('hidden', true);
  $('#get-username').attr('hidden', false);
})

$('#get-username').submit(function(){
  socket.emit('get username', $('#username').val());
  $('#get-username').attr('hidden', true);
  $('#chat').attr('hidden', false);
  return false;
})

socket.on('chat message', function(id, msg){
  $('#messages').append($('<li>').html(id+':&emsp;'+msg));
});
