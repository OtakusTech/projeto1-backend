const express = require('express');
const router = express.Router();

router.get('/animes', (req, res, next) => {
    res.send('Página de animes');
});

module.exports = router;