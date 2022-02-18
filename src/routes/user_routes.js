const  createUser = require("D:/Documentos_D/UFCG/2021.1e/Projeto em Computação I/Projeto - AnimeTags/projeto1-backend/src/controller/user.js");
const express = require("express");
const { user } = require("../models/user");
const router = express.Router(); // COmponente para criar rotas em arquivos separados;



router.get("/home", (req, res) => {
    res.send("Página inicial do usuário.");
});

router.post("/create_user", (req, res) => {
    data = req.body
    const user = createUser(data.name, data.email, data.password)
    res.send("Usuário "+user.name+" cadastrado.");
});

module.exports = router // É preciso exportar o router para fora;