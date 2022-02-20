const User = require("../models/user");
const bcrypt = require('bcryptjs');

module.exports = function createUser(name, email, password, img) {
    //Create a new user
    const user = new User({
        name: name,
        email: email,
        password: password,
        img: img
    })
    return user;
}







