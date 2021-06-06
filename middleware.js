const logger = require('./logger/logger');
const jwt = require('jsonwebtoken');
const UserSchema = require('./models/User')

// incomplete middleware to get the user
async function authenticateToken (req, res, next) {
    let bearer = req.headers['authorization'];
    if (bearer == null){
      req.user_id = null;
    }

    UserSchema.findOne({bearerToken:bearer}).then((user) => {
      if (user == null){
        // set user id on req to null
        req.user_id = null;
      } else {
        // add the user's id to the req
        const user_id = user._id;
        req.user_id = user_id;
      }
    })
    
    next()
  }

module.exports = authenticateToken;