const request = require('request');
const cheerio = require('cheerio');


// Grab site HTML
request('https://www.dictionary.com/e/word-of-the-day', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const word = $('h1');
        const definition = $('.wotd-item__definition__text');
        console.log(word.first().text());
        console.log(definition.first().text());

        
    }
});