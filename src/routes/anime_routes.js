const express = require('express');
const animeController = require('../controller/anime.controller');
const router = express.Router();



const animeService = require('../services/anime.service');
router.post('/animetag', animeController.createOrAddAnimeTagAndVote); 

router.put('/animetag/vote', animeController.addTagAndVote);


router.get('/animes', animeController.getAll);
router.get('/all', animeController.getAll);

router.get('/:id', animeController.getById);

router.delete('/delete/:id', animeController.deleteAnime);

router.post('/new', animeController.registerNewAnime);

router.put('/update/:id', animeController.updateAnime);

router.delete('/animetag', animeController.removeAnimetag);

module.exports = router;