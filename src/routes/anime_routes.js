const express = require('express');
const animeController = require('../controller/anime.controller');
const router = express.Router();



// const animeService = require('../services/anime.service');
// router.put('/animetag', animeService.addUserVoteToAnimeTag);


router.get('/animes', animeController.getAll);
router.get('/all', animeController.getAll);

router.get('/:id', animeController.getById);

router.delete('/delete/:id', animeController.deleteAnime);

router.post('/new', animeController.registerNewAnime);

router.put('/update/:id', animeController.updateAnime);

router.put('/animetag', animeController.createAndAddAnimetag);

router.delete('/animetag', animeController.removeAnimetag);

module.exports = router;