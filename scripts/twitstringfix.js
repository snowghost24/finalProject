var postt="post";
var haveItSay="have it say";
var makeItSay="hake it say";
var changeItTo="change it to";
var updateStatusTo="update the status to";
var config = require("../twitconfig");

var Twit = require('twit');
// var Twitter = require('twitter');
var T = new Twit(config);
// var client = new Twitter(config);

function fixedTwitString (theString) {

if (theString.indexOf(haveItSay) != -1){
  theString = theString.slice(theString.indexOf(haveItSay) + haveItSay.length + 1);
  doItNow(theString)
}

if (theString.indexOf(makeItSay) != -1){
   theString = theString.slice(theString.indexOf(makeItSay) + makeItSay.length + 1);
   doItNow(theString)
 }

 if (theString.indexOf(changeItTo) != -1){
   theString = theString.slice(theString.indexOf(changeItTo) + changeItTo.length + 1);
   doItNow(theString)
 }

 if (theString.indexOf(postt) != -1){
   theString = theString.slice(theString.indexOf(postt) + postt.length + 1);
   doItNow(theString)
 }

 if (theString.indexOf(updateStatusTo) != -1){
   theString = theString.slice(theString.indexOf(updateStatusTo) + updateStatusTo.length + 1);
   doItNow(theString)
 }

function doItNow(s){
   theString2 = s[0].toUpperCase() + s.slice(1);
   findHashTag(theString2);
}

// creates hashtag concat and camel case
function findHashTag (s){
   if (s.indexOf("hashtag") != -1){
      var res = s.replace("hashtag", "#");
      var chunks = res.split(/#/);
      var arr = [chunks.shift(), chunks.join('')];
      var myHashtag = arr[1];
      var split = myHashtag.split(' ');
      //iterate through each of the "words" and capitalize them
      for (var i = 0, len = split.length; i < len; i++) {
       split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
      }
      myLabel= split.join(' ');
      var saying = arr[0]+ "#"+myLabel.replace(/\s/g, '');

      T.post('statuses/update', { status:saying}, function(err, data, response) {
         console.log(data)
       })

     
   } else { 
      T.post('statuses/update', { status:s}, function(err, data, response) {
         console.log(data)   })
   }
}
}



module.exports = fixedTwitString


