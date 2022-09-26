const express = require('express');
const path = require('path');
const createError = require('http-errors');
let cors = require('cors');

let request = require('request');
let cheerio = require('cheerio');

const app = express();

app.use(cors());

// Set local - static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/daily-word', function(req, res) {
  const url = 'https://www.dictionary.com/e/word-of-the-day'
  request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          let word = $('.otd-item-headword__word');
          let pronunciation = $('.otd-item-headword__pronunciation__text');
          let type = $('.otd-item-headword__pos p:nth-child(1)');
          let definition = $('.otd-item-headword__pos p:nth-child(2)');
          word = word.first().text();
          pronunciation = pronunciation.first().text();
          type = type.first().text();
          definition = definition.first().text();

          // Format to JSON
          let object = {
            word: word,
            pronunciation: pronunciation,
            type: type,
            definition: definition
          }
          
          // Send response
          res.json(object)
      };
    });
});

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
