var request = require('request');
var cheerio = require('cheerio');
 // Scrape here

 
 function getWordDefinition() {
    const url = 'https://www.dictionary.com/e/word-of-the-day'
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            var word = $('h1');
            var definition = $('.wotd-item__definition__text');
            console.log(word.first().text());
            console.log(definition.first().text());
            word = word.first().text();
            definition = definition.first().text()
             // Return word and definition
             return {
                 words: word, 
                 definitions : definition
             };
             
        };
      });
 };


 module.exports = getWordDefinition;

