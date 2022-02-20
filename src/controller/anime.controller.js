const Anime = require('../models/Anime');

exports.getAll = async (req, res) => {
    const animes  = await Anime.find()
    if(!animes) {
         return res.status(400).send('No animes found.');
    }
    res.send(animes);
};

exports.getByTitle = async (req, res) => {
    // const animeId = req.params.title;
    const animeExists = await Anime.findOne({title: req.params.title}); 
    if(!animeExists) {
        return res.status(400).send('Anime não encontrado');
    }
    res.send(animeExists);
};

exports.registerNewAnime = async (req, res) => {
    const animeExists = await Anime.findOne({title: req.body.title});
    if(animeExists) {
        return res.status(400).send('Anime ja cadastrado');
    }
    const newAnime = new Anime({
        title: req.body.title,
        creator: req.body.creator,
        year: req.body.year,
        synopsis: req.body.synopsis,
        tags: req.body.tags,
        img: req.body.img
    });

    try{
        const savedAnime = await newAnime.save(newAnime);
        res.send({anime:newAnime._id});
    }catch(err){
        res.status(400).send(err);
    }
};

exports.deleteAnime = async (req, res) => {
    const animeExists = await Anime.findOne({title: req.params.title});
    if(!animeExists){
        return res.status(400).send('Anime não encontrado');
    }
    try{
        await Anime.deleteOne({title: req.params.title});
        res.send('Anime deletado com sucesso.')

    }catch(error){
        res.send(error);
    }
};