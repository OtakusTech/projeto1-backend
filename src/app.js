const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const user_route = require('./routes/user');
const auth_route = require('./routes/auth'); //O erro inicia aqui
const anime_route = require('./routes/anime_routes')
const mongoose = require('mongoose');

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({extended: true, limit: '50mb'}));

app.use("/user", user_route);
app.use(auth_route);
app.use("/anime", anime_route);


mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("Conectado ao BD.")
);

module.exports = app;