const jwt = require('jsonwebtoken');
const secretKey = require('../config');

module.exports = (req,res,next) =>{
    try{
        const token = req.headers['x-access-token'] || req.query.token || req.body.token
        const decoded = jwt.verify(token,secretKey.api_secret_key);
        req.decoded = decoded;
        next()
        
    }catch(err){
        res.json({message:"you can't view this page because you are not logged in.",status:false})
    }
}