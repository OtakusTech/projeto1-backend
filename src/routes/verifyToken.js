const jwt = require('jsonwebtoken');
const InvalidToken = require('../models/invalidToken');
 
module.exports = async function (req, res, next){
    const authHeader = req.headers.authorization;
 
    if(!authHeader) return res.status(401).send('Acess Danied');
 
    const [, token] = authHeader.split(' ');
 
    //verifying if the token is valid
    const result = await InvalidToken.findOne({'token': token});
    if (result) return res.status(401).send('Invalid Token Used in Header');
 
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
