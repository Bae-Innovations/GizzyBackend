const logger = require('../logger/logger');
const UserSchema = require('../models/User')

// incomplete middleware to get the user
async function authenticateToken (req, res, next) {
    let bearer = req.headers['authorization'];
    if (bearer == null){
      req.publicAddress = null;
    }

    UserSchema.findOne({bearerToken:bearer}).then((user) => {
      if (user == null){
        // set user id on req to null
        req.publicAddress = null;
      } else {
        // add the user's publicAddress to the req
        req.publicAddress = user.publicAddress;
      }
    })
    
    next()
}

module.exports = authenticateToken;