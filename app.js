const express = require('express');
const path = require('path');
var cors = require('cors');
var request = require('request');
var cheerio = require('cheerio');

const app = express();

app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/scrape', (req, res) => {
  // Scrape here
  url = 'https://www.dictionary.com/e/word-of-the-day'
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const word = $('h1');
        const definition = $('.wotd-item__definition__text');
        console.log(word.first().text());
        console.log(definition.first().text());
    }
  })
  console.log("FUCk")
});

app.get

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));