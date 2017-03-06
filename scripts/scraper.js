/*
Movie
  1) Movie w/ review
    exists
    doesn't exist
  2) Movie original
    exists
    doesn't exist

Check movie reviews to see if they are good
  Use movie meta data to filter out keywords

Add imdb id to get related movies meta data and save
  Movie already exists in array, skip

When finished, sort and export JSON
*/

var _ = require('lodash');
var request = require('request');
var readline = require('readline');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class Scraper {
  /* object to scrape movie details (needs json to be loaded in memory) */

  constructor(json) {
    this.movies = json.movies;
    this.reviews = json.reviews;
    this.game_map = json.game_map;
  }

  add_movie(imdb_id, need_review) {

    // CHECK for movie in json
    var result = _.find(this.movies, (mov) => mov.id === imdb_id);
    var movie_obj = {};
    var keywords = {};

    // GET movie metadata (if needed)
    if (result === undefined) {
      console.log('Movie not found in JSON, getting metadata ...');
      var omdb_url = `http://www.omdbapi.com/?i=${imdb_id}&r=json`;

      request(omdb_url, (err, resp, body) => {
        if (err) { console.log(err); }
        else {
          console.log(`${body.Title} data in memory`);
          movie_obj.id = body.imdbID;
          movie_obj.title = body.Title;
          movie_obj.rated = body.Rated;
          movie_obj.runtime = body.Runtime;
          movie_obj.plot = body.Plot;
          movie_obj.img = body.Poster;
          keywords.title = body.Title;
          keywords.actors = body.Actors;
          keywords.director = body.Director;

          this.movies.push(movie_obj);
          console.log(`${movie_obj.title} added to JSON`);
        }
      })

    // GET review data (if needed)
    if (need_review === true) {
      rt_url = encodeURI(`http://www.rottentomatoes.com/m/${movie_obj.title}/reviews/?type=top_critics`);
      console.log('Getting reviews from RT');

      // Prompt for rotten tomatoes name for movie title.
      // GET top 3 reviews in memory.
      // Filter out data
    }

    } else {
      console.log('Movie already exists')
    }

  }

  check_reviews() {
    var metadata = { title: '' };
    var rt_url = 'http://www.rottentomatoes.com/m/'+ metadata.title + '/reviews/?type=top_critics';
  }

  create_map() {

  }

  create_json() {
    console.log('creating JSON...');
    var json_final = {
      "movies": _.sortBy(this.movies, "id"),
      "reviews": _.sortBy(this.reviews, "mov_id"),
      "game_map": this.game_map
    }
    console.log('Sorted JSON ready');
  }

}

// let scraper = new Scraper(400, 400);
// scraper.sayName();
