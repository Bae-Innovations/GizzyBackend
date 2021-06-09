const logger = require('../logger/logger');
const UserSchema = require('../models/User')

async function onlyAdmin (req, res, next) {
    let bearer = req.headers['authorization'];
    if (bearer == null){
      req.publicAddress = null;
    }

    UserSchema.findOne({bearerToken:bearer}).then((user) => {
      if (user == null || user.isAdmin == false){
        // set user id on req to null
        res.status(403).json({"message":"access denied. you have to be an admin to access this."})
      } else {
        // add the user's publicAddress to the req
        req.publicAddress = user.publicAddress;
      }
    })
    
    next()
}

module.exports = onlyAdmin;