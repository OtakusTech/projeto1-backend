const express = require('express');
const tagController = require('../controller/tag.controller');
const router = express.Router();

router.get('/tags', tagController.getAll);

router.post('/tags', tagController.createTag);

module.exports = router;