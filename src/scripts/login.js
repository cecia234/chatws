const socket = io();

const form = (document.getElementByClassName('login-form'))[0];
const input = document.getElementById('input');

socket.emit('connection')

socket.on('user-connected', (msg) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(msg));
    ul.appendChild(li);
})

socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(msg));
    ul.appendChild(li);
})

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = '';
  }
});