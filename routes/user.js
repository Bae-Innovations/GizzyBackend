const express = require('express');
//const logger = require('../logger/logger');

const app = express();

// array to hold users
const users = [{ firstName: 'fname1', lastName: 'lname1', userName: 'username1' }];

// request to get all the users
app.get('/users', (req, res) => {
  res.json(users);
});

// request to get all the users by userName
app.get('/users/:userName', (req, res) => {
  const user = users.filter((users) => {
    if (req.params.userName === user.userName) {
      return user;
    }
  });
  res.json(user);
});

// request to post the user
app.post('user', (req, res) => {
  users.push(req.body);
  res.json(users);
});

module.exports = app;
