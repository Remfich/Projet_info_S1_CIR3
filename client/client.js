var socket = io();
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    socket.emit('chat message', document.querySelector('#m').value);
    document.querySelector('#m').value = '';
    return false;
});
socket.on('chat message', function(msg){
  console.log(msg);
  var item = document.createElement('li');
  item.textContent = msg;
  document.querySelector('#messages').appendChild(item);
});