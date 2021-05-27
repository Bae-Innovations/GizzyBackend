const logger = require('./logger/logger');
const jwt = require('jsonwebtoken');
const UserSchema = require('./models/User')

// incomplete middleware to get the user
async function authenticateToken (req, res, next) {
    let accessToken = req.headers['accessToken'];
    if (accessToken == null) return res.sendStatus(403);
  
    // try decoding the jwt to get the payload
    try {
      let decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch(err){
      logger.error(err);
      res.send({message:err})
    }
  
    // get publicAddress from payload
    let publicAddress = accessToken.publicAddress;
    
    // get the user document
    try{
        const user = await UserSchema.findOne({publicAddress:publicAddress});
    }catch(err){
        logger.error(err);
        res.json({message:err});
    }
  
    next()
  }

module.exports = authenticateToken;