const express = require('express');
const animeController = require('../controller/anime.controller');
const router = express.Router();

router.get('/all', animeController.getAll);

router.get('/:id', animeController.getById);

router.delete('/delete/:id', animeController.deleteAnime);

router.post('/new', animeController.registerNewAnime);

router.put('/update/:id', animeController.updateAnime);

router.put('/animetag', animeController.addAnimetag);

router.delete('/animetag', animeController.removeAnimetag);

module.exports = router;