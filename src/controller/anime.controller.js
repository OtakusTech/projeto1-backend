const Anime = require('../models/Anime');
const {registerValidation} = require('../util/animeValidation');
const animeService = require('../services/anime.service');
const tagService = require('../services/tag.service');
const tagController = require('../controller/tag.controller')
const {ObjectId} = require('mongodb');

exports.getAll = async (req, res) => {
    const animes = await Anime.find()
    if(!animes) {
         return res.status(400).send('No animes found.');
    }
    res.send(animes);
};

exports.getById = async (req, res) => {
    const animeExists = await Anime.findById(req.params.id); 
    if(!animeExists) {
        return res.status(400).send('Anime não encontrado');
    }
    res.send(animeExists);
};

exports.getAnimesWithTag = async (req, res) => {
    try{
        const tagId = req.params.tagId;
        const tag = await tagService.getTagById(tagId);
        if (!tag) {
            return res.status(204).send([]);
        }
        const animesWithTag = await Anime.find({"tags.tagId": tagId});
    
        if (!animesWithTag) {
            return res.status(204).send([]);
        }
        res.status(200).send(animesWithTag);
    }catch (error) {
        res.status(500).send(`${error}`);
    }
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
        img: req.body.img,
        user: req.body.user
    });

    try{
        const savedAnime = await newAnime.save();
        res.send({anime:newAnime._id});
    }catch(err){
        res.status(400).send(err);
    }
};

exports.deleteAnime = async (req, res) => {
    const animeExists = await Anime.findOne({id: req.params.id});
    if(!animeExists){
        return res.status(400).send('Anime não encontrado');
    }
    try{
        await Anime.deleteOne({id: req.params.id});
        res.send('Anime deletado com sucesso.')

    }catch(error){
        res.send(error);
    }
};

exports.updateAnime = async (req, res) => {
    const { id } = req.params;
    const animeExists = await Anime.findOne({id});
    if (!animeExists) {
        return res.status(500).send('Anime não encontrado');
    }
    try {
        await Anime.findByIdAndUpdate(id, req.body);
        res.send('Anime atualizado com sucesso.')

    } catch (error){
        res.send(error);
    }
}

exports.addTagAndVote = async (req, res) => {
    try {
        const tagId = req.body.tagId;
        const animeId = req.body.animeId;
        const userId = req.body.userId;

        const constainsTag = await animeService.animeContainsTag(animeId, tagId);
        
        let savedAnime;
        if(constainsTag){
            savedAnime = await animeService.addUserVoteToAnimeTag(animeId, tagId, userId)
        }else{
            savedAnime = await animeService.addAnimeTag(animeId, tagId, userId);
        }
        res.status(200).send(savedAnime);
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}


exports.createOrAddAnimeTagAndVote = async (req, res) => {
    try {
        const tagName = req.body.tagName;
        const animeId = req.body.animeId;
        const userId = req.body.userId;

        const tag = await tagService.getTagByName(tagName);
        
        //se a tag não existe
        if(!tag){
            // cria a tag no bd
            const savedTag = await tagService.createTag(tagName);
            
            // adiciona a tag ao anime e o voto do usuario a tag
            const savedAnime = await animeService.addAnimeTag(animeId, savedTag._id, userId);
            res.status(200).send(savedAnime);
        } else{
            //se a tag existe

            // verifica se o anime contém a tag
            const constainsTag = await animeService.animeContainsTag(animeId, tag._id);
            
            let savedAnime;
            if(constainsTag){
                savedAnime = await animeService.addUserVoteToAnimeTag(animeId, tag._id, userId)
            }else{
                savedAnime = await animeService.addAnimeTag(animeId, tag._id, userId);
            }
            res.status(200).send(savedAnime);
        }
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

exports.removeAnimetag = async (req, res) => {
    try {
        const savedAnime = await animeService.removeAnimeTag(req.body.animeId, req.body.tagId);
        res.status(200).send(savedAnime)
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}
