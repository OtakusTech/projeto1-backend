const express = require("express");
const router = express.Router(); // COmponente para criar rotas em arquivos separados;

router.get("/", (req, res) => {
    res.send("Página inicial do usuário.");
});

module.exports = router // É preciso exportar o router para fora;