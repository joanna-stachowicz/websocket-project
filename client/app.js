const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ name }) => addMessage('Chat Bot', name + ' has joined the conversation!'));
socket.on('removeUser', ({ name }) => addMessage('Chat Bot', name + ' has left the conversation... :('));

let userName = '';

const login = (event) => {
  event.preventDefault();
  if (userNameInput.value == '') {
    alert('Username cannot be empty.');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('join', { name: userName })
  }
};

loginForm.addEventListener('submit', login);

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author == userName) {
    message.classList.add('message--self');
  }

  const header = document.createElement('h3');
  header.classList.add('message__author');
  if (author === userName) {
    header.innerHTML = 'You';
  } else {
    header.innerHTML = author;
  };

  const div = document.createElement('div');
  div.classList.add('message__content');
  if (author === 'Chat Bot') {
    div.classList.add('message__skewed')
  }
  div.innerHTML = content;

  message.insertAdjacentElement('beforeend', header);
  message.insertAdjacentElement('beforeend', div);
  messagesList.insertAdjacentElement('beforeend', message);
};

const sendMessage = (event) => {
  event.preventDefault();

  let messageContent = messageContentInput.value;
  if (!messageContent.length) {
    alert('You have to type something!');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
};

addMessageForm.addEventListener('submit', sendMessage);
