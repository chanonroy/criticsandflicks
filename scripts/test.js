var request = require('request');
var cheerio = require('cheerio');

// urls and titles
var title = 'Rise of the Cobra';
var url = encodeURI(`http://www.rottentomatoes.com/m/${title}/reviews/?type=top_critics`);
var search = encodeURI(`https://www.rottentomatoes.com/search/?search=${title}`);

request(search, (err, resp, body) => {
  if (err) { console.log(err); }
  else {
    $ = cheerio.load(body);
    var result = $('#original_rt_logo').attr('src');
    console.log(result);
  }
});
