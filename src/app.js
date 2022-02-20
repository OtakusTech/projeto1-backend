const express = require('express');
const app = express();
const dotenv = require('dotenv');
var cors = require('cors');
const bodyParser = require('body-parser');
const user_route = require('./routes/user');
const auth_route = require('./routes/auth'); //O erro inicia aqui
const mongoose = require('mongoose');

// Configurações:
    // BodyParser:
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
// Rotas:
    app.use("/user_route", user_route);
    app.use("/auth_route", auth_route)
    app.use(cors()); //Faz o que?

// Conectar ao mongoDB:
dotenv.config();
app.use(cors());
 
//conecta ao dbzinho
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("Conectado ao BD."));
// Middlewares
    app.use(express.json());
 
// Routes Middlewares


// Conectando a API:
    const PORT = 5000;
    app.listen(PORT, () => console.log("API conectada na porta "+ PORT));



