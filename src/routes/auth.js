const router = require('express').Router();
const User = require('../models/User');
const InvalidToken = require('../models/InvalidToken');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../util/validation');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
 
router.post('/register', async (req, res) => {
    //Lets validate the data before we a user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    //Checking if the user is already in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email já cadastrado');
 
    //Criptografar o password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        img: req.body.img
    })
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});
 
 
//Lógica de login
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
        res.header('auth-token', token).send(token);
});
 
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
