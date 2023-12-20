
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const bodyParser = require('body-parser')
app.use(express.json());


/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
    const counter = users.length;
    const newUser = {
      id: counter + 1,
      name: req.body.name,
      occupation: req.body.occupation,
      avatar: req.body.avatar
    };

  users.push(newUser);
  res.json(newUser);
});

app.get('/users/:_id', (req, res) => {
  // console.log('Received request for user ID:', req.params._id);

  const userId = parseInt(req.params._id);
  const user = users.find(u => u._id === userId);

  if (user) {
    // console.log('User found:', user);
    res.json(user);
  } else {
    // console.log('User not found');
    res.status(404).send('User not found');
  }
});

app.put('/users/:_id', (req, res) => {
  const userId = parseInt(req.params._id);
  const userIndex = users.findIndex(u => u._id === userId);

  if (userIndex !== -1) {
    for (const key in req.body) {
      if (key !== '_id') {
        users[userIndex][key] = req.body[key]
      }
    }
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:_id', (req, res) => {
  const userId = parseInt(req.params._id);
  const userIndex = users.findIndex(u => u._id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send('deleted');
  } else {
    res.status(404).send('User not found');
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))