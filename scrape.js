var request = require('request');
var cheerio = require('cheerio');
 // Scrape here


 function getWordDefinition() {
    url = 'https://www.dictionary.com/e/word-of-the-day'
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const word = $('h1');
            const definition = $('.wotd-item__definition__text');
            console.log(word.first().text());
            console.log(definition.first().text());
     
             // Return word and definition
             return {
                 word, definition,
             };
        };
      });
 };

 console.log("FUCK");
 module.exports = getWordDefinition;


