// Carregando módulos:
const express = require("express");
let handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const bodyParser = require("body-parser");
const app = express();
const user_routes = require("./routes/user_routes");
// Configurações:
    // BodyParser:
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    // Handlebars:
        app.set("view engine", "handlebars");
// Rotas:
    app.use("/user_routes", user_routes);

// Outros:
const port = 5000;
app.listen(port, () => {
    console.log('Back-End iniciado em http://localhost: '+port);
});






 /*       
app.get('/', (req, res) => {
    res.send('Hello world');
});

// rota de teste do banco de dados
app.get('/tags', async (req, res) => {
    res.send(await tags.find({}).toArray());
});

// rota de teste do banco de dados
app.get('/animes', async (req, res) => {
    res.send(await animes.find({}).toArray());
});

app.listen(port);
})();
*/