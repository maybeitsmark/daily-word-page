const express = require('express');
const router = express.Router();
const getWordDefinition = require('../scrape').default;

// Home page
router.get('/', async function(req, res, next) {
    const results = await getWordDefinition();
    res.render('index', results);
});

module.exports = router;