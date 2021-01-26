const express = require('express');
const path = require('path');
// const hbs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

// app.get('/', (req, res) => {
//   res.render('index');
// });

let messages = [];

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});