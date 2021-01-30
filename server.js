const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

app.use(express.static(path.join(__dirname, '/client')));

let messages = [];
let users = [];

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('join', (join) => {
    console.log('User ' + join.name + ' has joined. Its id is ' + socket.id);
    join.id = socket.id;
    users.push(join);
    socket.broadcast.emit('newUser', join);
  });

  socket.on('disconnect', () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == socket.id) {
        users.splice(i, 1);
        socket.broadcast.emit('removeUser', users[i]);
        break;
      }
    }
    console.log('Oh, socket ' + socket.id + ' has left')
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});