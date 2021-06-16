const logger = require('../logger/logger');
const UserSchema = require('../models/User');

// incomplete middleware to get the user
async function authenticateToken(req, res, next) {
  console.log(JSON.stringify(req.headers));
  let bearer = req.headers.authorization;
  if (bearer == null) {
    res.publicAddress = null;
    next();
  }

  bearer = bearer.split(' ')[1];

  UserSchema.findOne({ bearerToken: bearer }).then((user) => {
    if (user == null) {
      // set user id on req to null
      res.publicAddress = null;
      next();
    } else {
      console.log('found the user');
      console.log(user.publicAddress);
      // add the user's publicAddress to the req
      res.locals.publicAddress = user.publicAddress;
      next();
    }
  });
}

module.exports = authenticateToken;
