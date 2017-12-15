const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var watson = require('watson-developer-cloud');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var axios = require('axios');
var morgan = require('morgan');
const routes = require("./routes");
var config = require("./twitconfig");
var Twit = require('twit');
// var Twitter = require('twitter');
var T = new Twit(config);
// var client = new Twitter(config);

require('dotenv').config();
app.use(morgan('dev'));

// ────────────────────────────────────────────────────────────────────────────────

// const io = require('socket.io')();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/scraperdb",
  {
    useMongoClient: true
  }
);


// ──────────GOOOGLE TRANSLATER AND ──────────────────────────────────────────────

//TODO:view google translate documentation in the following link.
//https://googlecloudplatform.github.io/google-cloud-node/#/docs/translate/1.0.0/translate

var textToFront;
var supplyText;
var sayHello;

const Translate = require('@google-cloud/translate');
// Your Google Cloud Platform project ID
const projectId = 'celtic-client-183119';
// Instantiates a client
const translateClient = Translate({
    projectId: projectId,

});

function translateIt(wasSaid,data) {
    // The text to translate
    let text = wasSaid;
    // The target language
    const target = 'en';



// ───────DETECTS LANGUAGE SPOKEN─────────────────────────────────────────
    // const translate = Translate();
    // translate.detect(text)
    //   .then((results) => {
    //     let detections = results[0];
    //     detections = Array.isArray(detections) ? detections : [detections];
    
    //     console.log('Detections:');
    //     detections.forEach((detection) => {
    //       console.log(`${detection.input} => ${detection.language}`);
    //     });
    //   })
    //   .catch((err) => {
    //     console.error('ERROR:', err);
    // });


// ────────TRANSLATES TEXT─────────────────────────────────────────────────
    translateClient.translate(text, target)
        .then((results) => {
            const translation = results[0];
            // console.log(`Text: ${text}`);
            // console.log(`Translation: ${translation}`);
            sayHello(translation,data);
            console.log(data);  
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
}



  // ────Global Variables────────────────────────────────────────────────────────────────────────────

//set up global variables
// this global takes in every watson message  
var sentQuestions = "";
// this object is updated in the function setQuestion and passed to a socket
var newData = {}
// this is the function that emits the socket message
var runIo;

var theInfo = "";
var reRun = false;
var myQuestion = "";
var collectedValues = [];
var passNewMessage;


var io;
var userData;


// when watson sents back a response the question object is updated by this function
// then unIo takes the data and sends it back throuh a socket
function setQuestion(sentQuestions1) {
  sentQuestions = sentQuestions1;
  newData = { message: sentQuestions };
  runIo();
}





// ──────Socket Configuration────────────────────────────────────

// Start the API server
var server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// var io = socket(server);
var io = require('socket.io')(server);
// We  are passing the io to routes so that we can emit messages from routes
app.set('socketio', io);
// var routes = require("./routes/controller.js")
app.use("/", routes);
// finds the ajaxcontroller and sends app and io to emit socket in order to emit messages
 var axioLIsterner = require("./controllers/ajaxController")
 axioLIsterner.axioRequests(app,io);
// ────────────────────────────────────────────────────────────────────────────────


io.on('connection', (socket) => {
  //   client.on("chatMessage",(date)=>{
  //     console.log(date);
  //     client.emit("chatBack",{message1:"I got your message"})
  //   })

    socket.on("test",function(data,callback){
      console.log(data.message);
      callback()
      reRun = true;
      passNewMessage(data.message);
      console.log("-------------");
      console.log(data.message)
      console.log("-------------");
   })


 
  // });

  // ────────────────────────────────────────────────────────────────────────────────
  socket.on('Wakeup', () => {
    socket.emit('stop2', newData.message);
      console.log(newData.message);
  
  });



  socket.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
  // ────────────────────────────────────────────────────────────────────────────────


  var x = 1
  
    // This emit is used only for watson's first message
    // socket.on('start', function (data) {
    // })
    // do { socket.emit('start', newData); } while (x == 2)
    // socket.on('chat', function (data) {
    //   reRun = true;
    //   passNewMessage(data.message);
    //   console.log("-------------");
    //   console.log(data.message)
    //   console.log("-------------");
    // });
  // ────────────────────────────────────────────────────────────────────────────────
  
      socket.on('voicechat', function (data) {
          translateIt(data.message,data)
          sayHello = function(translation,data){
   var passBack = {
              chatData: data,
              transText:translation
       }
         io.sockets.emit('voicechat', passBack);
               console.log(`Translation: ${translation}`);
              console.log("hello");
          }
      })
  });
  
  // module.parent.exports.server
  // this function sends back watson's response through a channel
  runIo = function () { io.sockets.emit('stop2', newData.message); }






// ────────────WATSON CONVO────────────────────────────────────────────────────────────────────
// Set up Conversation service.
var conversation = new ConversationV1({
  username: 'f55b9412-ae70-4d7f-aa15-65108e3cab1c', // replace with username from service key
  password: 'rNtonaEkcb6b', // replace with password from service key
  path: { workspace_id: '65572c75-f41d-4a25-b257-50ab9aaca64c' }, // replace with workspace ID
  version_date: '2016-07-11'
});

// Start conversation with empty message.
conversation.message({}, processResponse);

// Process the conversation response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }
  var endConversation = false;
  // Check for action flags.
  if (response.output.action === 'display_time') {
    // User asked what time it is, so we output the local system time.
    console.log('The current time is ' + new Date().toLocaleTimeString());
  } else if (response.output.action === 'end_conversation') {
    // User said goodbye, so we're done.
    console.log(response.output.text[0]);
    endConversation = true;
  } else {
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
      // makes sure values for questions are set
      sentQuestions = response.output.text[0];
      setQuestion(sentQuestions);

// ──────────GET DATE SOLD───────────────────────────────────────────────

      //Here I collect all values for information on a house
      if (response.context.address && response.context.city && response.context.state && response.context.dateSold == true) {
        collectedValues.push(response.context.address);
        collectedValues.push(response.context.city);
        collectedValues.push(response.context.state);
        collectedValues.push(response.context.dateSold);
        userData = collectedValues;
        console.log(userData);
        // var routes = require("./routes/controller.js")      

        // "/api/books"
        // axios.post('http://localhost:3001/made', {
          axios.post('http://localhost:3001/ajax/ajaxcalls/datesold', {
          responseData: userData
        })
        .then(function (response) {
         console.log("im getting the call here");
        })
        .catch(function (error) {
          console.log(error);
        });
      }
// ───────────Twitter Post─────────────────────────────────────────────────


      //Here I collect all values for information on a house
      if (response.context.twitContent && response.context.twitStatus == true) {
        var theString3 = response.context.twitContent;
        var fixedString = require("./scripts/twitstringfix");
        fixedString(theString3);
        }
// ───────────Change Background─────────────────────────────────────────────────


      //Here I collect all values for information on a house
      if (response.context.backgroundColor && response.context.selectedElement && response.context.changeBackground == true) {
        var theColor = response.context.backgroundColor;
        var theElement = response.context.selectedElement;
        console.log(theColor);
        console.log(theElement);
        io.sockets.emit('changeBgc1', {
          theColor:theColor,
          theElement:theElement
        });
        } 
        
// ───────────Insert Elements─────────────────────────────────────────────────


      //Here I collect all values for information on a house
      if (response.context.theImage  && response.context.imageDisplay == true) {
        var theImage = response.context.theImage;
        console.log(theImage);
        io.sockets.emit('images', {theImage});
        }  
        
        



// ─────────────────────────GET Sold Price──────────────────────────────────
    //Here I collect all values for information on a house
    if (response.context.address && response.context.city && response.context.state && response.context.soldPrice == true) {
      collectedValues.push(response.context.address);
      collectedValues.push(response.context.city);
      collectedValues.push(response.context.state);
      collectedValues.push(response.context.dateSold);
      userData = collectedValues;
      console.log(userData);
      // var routes = require("./routes/controller.js")      

      // "/api/books"
      // axios.post('http://localhost:3001/made', {
        axios.post('http://localhost:3001/ajax2/ajaxcalls/soldprice', {
        responseData: userData
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

// ───────────────SEND Email─────────────────────────────────────────────
    //Here I collect all values for information on a house
    if (response.context.person && response.context.theMessage) {
      collectedValues.push(response.context.person);
      // call a script to fix the string
      var fixedString = require("./scripts/emailfixer")
      var theMessage = fixedString(response.context.theMessage);
      collectedValues.push(theMessage);
      userData = collectedValues;
      console.log(userData);
      // var routes = require("./routes/controller.js")      

      // "/api/books"
      //TODO:change this on deploy
      // axios.post('http://localhost:3001/made', {
        axios.post('http://localhost:3001/emailer/nodemailer', {
        responseData: userData
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


// ─────────────────────────────────────────────────────────────────────

      // here I collect all values to finding an apartment
      if (response.context.location && response.context.rooms && response.context.houseorapp && response.context.currency && response.context.residencetype) {
        collectedValues.push(response.context.location);
        collectedValues.push(response.context.houseorapp);
        collectedValues.push(response.context.residencetype);
        collectedValues.push(response.context.rooms);
        collectedValues.push(response.context.currency);
        console.log("these are collected values", collectedValues);
        userData = collectedValues;
        require("./routes/ajaxRoutes")(app, userData);
      }
    }
  }


  // If we're not done, prompt for the next round of input.
  passNewMessage = function (theInfo) {
      console.log("from watson");
      console.log(theInfo);
    if ((!endConversation) && reRun) {
      conversation.message({
        input: { text: theInfo },
        // Send back the context to maintain state.
        context: response.context,
      }, processResponse);
    }
  }
}

