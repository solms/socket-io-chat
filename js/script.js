var socket = io();

$('#get-username').hide();
$('#chat').hide();

$('#input-area').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('get username', function(){
  $('#connecting').fadeOut(function(){
      $('#get-username').fadeIn();
  });

})

$('#get-username').submit(function(){
  socket.emit('get username', $('#username').val());
  $('#get-username').fadeOut(function(){
      $('#chat').fadeIn();
  });
  return false;
})

socket.on('chat message', function(id, msg){
  $('#messages').append($('<li>').html(id+':&emsp;'+msg));
});
