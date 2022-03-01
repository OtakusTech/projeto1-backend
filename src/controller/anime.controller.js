const Anime = require('../models/Anime');
const {registerValidation} = require('../util/animeValidation');
const animeService = require('../services/anime.service');
const tagService = require('../services/tag.service');
const tagController = require('../controller/tag.controller')

exports.getAll = async (req, res) => {
    const animes = await Anime.find()
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
    const {error} = registerValidation(req.body);
    if ( error) return res.status(400).send(error.details[0].message);

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
        const savedAnime = await newAnime.save();
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

/**exports.addAnimetag = async (req, res) => {
    const myTag = tagService.getTag(red.body.tag)
    const myAnime = animeService.getById(req.body.animeId)
    if(myTag){
        //o que fazer caso a tag exista
        //verificar se a tag já está no anime
    }else{
        //caso a tag não exista
        const tagCreated = tagService.createTag(req.body.tag)
        
    }
}**/

exports.addAnimetag = async (req, res) => {

    const meuResult = animeService.addAnimeTag(req.body.animeid, req.body.tagid, req.body.userid)
    if(meuResult){
        const meuAnime = await Anime.findById(req.body.animeid)
        console.log(meuAnime)
        res.send({'sucess':true, 'object':meuAnime})
    }else{
        res.send("err")
    }
}

exports.removeAnimetag = async (req, res) => {
    const meuResult = animeService.removeAnimetag(req.body.animeid, req.body.tagid)
    if(meuResult){
        const meuAnime = await Anime.findById(req.body.animeid)
        console.log(meuAnime)
        res.send({'sucess':true, 'object':meuAnime})
    }else{
        res.send("err")
    }
}