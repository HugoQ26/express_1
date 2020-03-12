const express = require('express');
const app = express();
const path = require('path');
let isLogin = () => false;

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
  res.show = file => res.sendFile(path.join(__dirname, `views/${file}.html`));
  next();
});

app.use('/user', (req, res, next) => {
  if (isLogin()) {
    next();
  }
  res.send('Access denied. Please login first');
});

app.get('/', (req, res) => {
  res.show('home');
});

app.get('/home', (req, res) => {
  res.show('home');
});

app.get('/about', (req, res) => {
  res.show('about');
});

app.use((req, res) => {
  res.show('404');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
