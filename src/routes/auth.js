const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const InvalidToken = require('../models/InvalidToken');
const verify = require('./verifyToken');
const {loginValidation} = require('../util/validation');

// Lógica de login:
router.post('/login', async (req, res) => {
    //Lets validate the data before we a user
    const {error} = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the email exist
    const user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send('Email não encontrado');
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.send({
        token,
        userId: user._id,
    });

});

// Lógica de logout:
router.post('/logout', verify, async (req, res) => {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
   
    const invalidToken = new InvalidToken( {
        'token':token
    });
 
    try{
        const savedInvalidToken = await invalidToken.save();
        res.send({
            "loggedOut":true
        });
    }catch(err){
        res.status(400).send(err);
    }
});
 
module.exports = router;
