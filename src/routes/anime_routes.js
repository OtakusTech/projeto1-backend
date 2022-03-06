const express = require('express');
const animeController = require('../controller/anime.controller');
const router = express.Router();



const animeService = require('../services/anime.service');

router.get('/animetag', animeService.getAnimeById);



router.get('/animes', animeController.getAll);

router.get('/animes/:title', animeController.getByTitle);

router.delete('/animes/:title', animeController.deleteAnime);

router.post('/animes', animeController.registerNewAnime);

router.put('/animetag', animeController.createAndAddAnimetag);

router.delete('/animetag', animeController.removeAnimetag);

module.exports = router;