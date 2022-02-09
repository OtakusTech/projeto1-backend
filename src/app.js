const express = require('express');
const app = express();
const mongodb = require('mongodb');
require('dotenv').config();
const ObjectId = mongodb.ObjectId;

(async () => {

 
const dbname = process.env.DB_NAME;
const dbhost = process.env.DB_HOST;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
    
const connectionString = `mongodb+srv://${dbuser}:${dbpassword}@${dbhost}/${dbname}?retryWrites=true&w=majority`;
const port = process.env.PORT || 3001;

const options = {
    useUnifiedTopology: true
};

console.info('Conectando ao banco de dados ...');
const client = await mongodb.MongoClient.connect(connectionString, options);


// exemplos conectando ao banco e recuperando uma collection:
const db = client.db(dbname);
const tags = db.collection('tags');
const animes = db.collection('animes');


// exemplo de operações:
// GET all - async () => await tags.find({}).toArray();
// GET one - async () => await tags.findOne({_id: ObjectId(id)});
         


app.get('/', (req, res) => {
    res.send('Teste');
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