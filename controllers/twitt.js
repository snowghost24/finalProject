var config = require("./twitconfig");
var Twit = require('twit');
// var Twitter = require('twitter');
var T = new Twit(config);
// var client = new Twitter(config);

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
   console.log(data)
 })