var _ = require('lodash');
var fs = require('fs');
var chalk = require('chalk');
var cheerio = require('cheerio');
var request = require('request');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Load JSON into memory ('movies', 'reviews', 'game_map')
var json = require('../src/json/model.json');

rl.question('Begin JSON process?' + chalk.grey(' (y/n) '), (resp) => {
  if (resp.toLowerCase() === 'y') {

    json.movies = _.sortBy(json.movies, "id");
    console.log(JSON.stringify(json.movies));

    // ----- MOVIE RETRIEVAL ----------

    rl.close()
  } else {
    console.log('Process terminated\n')
    rl.close()
  }
});

var omdb = 'http://www.omdbapi.com/?' // i=imdb_id,

// Request object

  // Add movie method

  // Add review_movie (filter movie stuff out)

  // Save to memory

// Prepare JSON (movies sorted)
