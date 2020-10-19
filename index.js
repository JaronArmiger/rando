const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', (req, res) => {
  const count = 5;

  const passwords = Array.from(Array(count).keys()).map(i => {
  	return generatePassword(12, false);
  });

  res.json(passwords);

  console.log(`sent ${count} passwords`);
});

// for any request that doesn't match one above
// send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);