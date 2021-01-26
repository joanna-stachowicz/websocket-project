const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = (event) => {
  event.preventDefault();
  if (userNameInput.value == '') {
    alert('Username cannot be empty.');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
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
  div.innerHTML = content;

  message.insertAdjacentElement('beforeend', header);
  message.insertAdjacentElement('beforeend', div);
  messagesList.insertAdjacentElement('beforeend', message);
};

const sendMessage = (event) => {
  event.preventDefault();
  if (messageContentInput.value === '') {
    alert('Message cannot be empty.');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

addMessageForm.addEventListener('submit', sendMessage);
