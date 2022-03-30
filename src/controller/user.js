const User = require("../models/user");
const bcrypt = require('bcryptjs');
const user = require("../models/user");

exports.createUser = (name, email, password, img) => {
    //Create a new user
    const user = new User({
        name: name,
        email: email,
        password: password,
        img: img
    })
    return user;
}

exports.getAll = async (req, res) => {
    const users = await user.find()
    if(!users) {
         return res.status(400).send('Not users found.');
    }
    res.send(users);
};

exports.getById = async (req, res) => {
    const userExists = await user.findOne({_id: req.params.id}); 
    if(!userExists) {
        return res.status(500).send('User not found');
    }
    res.send(userExists);
};

exports.update = async (req, res) => {
    const query = { _id: req.params.id };
    const userExists = await user.findOne(query); 
    if(!userExists) {
        return res.status(500).send('User not found');
    }
    const userResult = await user.findByIdAndUpdate(query, {$set:req.body});
    res.send({ userResult });

}







