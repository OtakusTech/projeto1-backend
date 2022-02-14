// // Carregando módulos:
// const express = require("express");
// let handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
// const bodyParser = require("body-parser");
// const app = express();
// const user_routes = require("./routes/user_routes");
// // Configurações:
//     // BodyParser:
//         app.use(bodyParser.urlencoded({extended: true}));
//         app.use(bodyParser.json());
//     // Handlebars:
//         app.set("view engine", "handlebars");
// // Rotas:
//     app.use("/user_routes", user_routes);

// // Outros:
// const port = 5000;
// app.listen(port, () => {
//     console.log('Back-End iniciado em http://localhost: '+port);
// });

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');
 
//Import routes
const authRoute = require('./routes/auth');
 
dotenv.config();
 
app.use(cors());
 
//conecta ao dbzinho
mongoose.connect(
    process.env.DB_CONNECT,
    {
       
    },
    () => console.log("Conectou, :D"));
//Middlewares
app.use(express.json());
 
//Routes Middlewares
app.use('/api/user', authRoute);
 
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log("O servidor tah rodando"));



