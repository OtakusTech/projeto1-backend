const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/user");
const User = require("../models/user")
const {registerValidation} = require('../util/validation');
const bcrypt = require('bcryptjs');
const userController = require('./../controller/user');


router.get("/get", userController.getAll);

router.get("/get/:id", userController.getById);

router.post("/register", async (req, res) => {
    data = req.body;
    // Validando os dados recebidos:
    const {error} = registerValidation(data);
    if (error) return res.status(400).send(error.details[0].message);

    // Verificando se o usuário já existe:
    const emailExist = await User.findOne({email: data.email});
    if(emailExist) return res.status(400).send('E-mail já cadastrado');
    
    // Criptografar o password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    
    // Criando o objeto usuário e salvando no BD:
    const user = createUser(data.name, data.email, hashedPassword, '');
    try{
        const savedUser = await user.save();
        res.send("Usuário "+ savedUser.name+" cadastrado.");
    }catch(err){
        res.status(400).send(err);
    }
});

router.put("/update/:id", userController.update);

module.exports = router // É preciso exportar o router para fora;