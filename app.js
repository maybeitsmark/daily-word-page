const express = require('express');
const path = require('path');
const createError = require('http-errors');
var cors = require('cors');

var request = require('request');
var cheerio = require('cheerio');

const app = express();

app.use(cors());

// Set local
app.use(express.static(path.join(__dirname, 'public')));

// 

app.get('/daily-word', function(req, res) {
  const url = 'https://www.dictionary.com/e/word-of-the-day'
  request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          var word = $('h1');
          var definition = $('.wotd-item__definition__text');
          console.log(word.first().text());
          console.log(definition.first().text());
          word = word.first().text();
          definition = definition.first().text();

          // Format to JSOn
          var object = {
            word: word,
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
