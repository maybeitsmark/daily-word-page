const express = require('express');
const router = express.Router();
const getWordDefinition = require('../scrape');

// Home page
router.get('/', function(req, res) {
    const results = getWordDefinition();
    res.render('index', results);
});

modeul.exports = router;