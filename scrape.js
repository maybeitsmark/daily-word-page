var axios = require('axios');
var cheerio = require('cheerio');
// Scrape here

const url = 'https://www.dictionary.com/e/word-of-the-day';

const fetchData = async () => {
    const result = await axios.get(url);
    return cheerio.load(result.data);
};

const getResults = async () => {
    const $ = await fetchData();

    const word = $('h1');
    const definition = $('.wotd-item__definition__text');
    console.log(word.first().text());
    console.log(definition.first().text());
   

    return {
        words : word,
        definitions : definition  
    };
};
 
fetchData();
getResults();
module.exports = getResults;


