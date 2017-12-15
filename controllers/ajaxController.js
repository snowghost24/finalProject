var parseString = require('xml2js').parseString;
var axios = require('axios');
var count = 2;
var lastSold = "";
var pass1;
var app;
var io;

var axioRequests =  function(appp,ioo) {
   app = appp;
   io = ioo;
}

      
// Defining methods for the booksController
var funcOperation = {
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  dateSold: function(req, res) {
      console.log(req.body.responseData[0])
      var street = encodeURIComponent(req.body.responseData[0]);
      var city = encodeURIComponent(req.body.responseData[1]+" "+req.body.responseData[2]);
      
      axios.post(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&address=${street}&citystatezip=${city}`)
      .then(function (response) {
      //   console.log(response.data);
        var theData = response.data;
        parseString(theData, {trim: true}, function (err, result) {
              var theZpid = result['SearchResults:searchresults'].response[0].results[0].result[0].zpid[0];
              nextCall(theZpid);
      });
      })
      .catch(function (error) {
        console.log(error);
      });
      
      function nextCall(theZpid){
            axios.post(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&zpid=${theZpid}&address=${street}&citystatezip=${city}`)
            .then(function (response) {
            //   console.log(response.data);
              var theData = response.data;
              // console.log(theData);
          parseString(theData, {trim: true}, function (err, result) {  
                    lastSold = result["SearchResults:searchresults"].response[0].results[0].result[0].lastSoldDate[0];
            console.log(lastSold);
            // console.log(res);
            var passBack= lastSold
            // var passBack= {hbData:lastSold}
            console.log("Emmiting Back from second function");
            io.sockets.emit('retreivedData', passBack);
            
            // pass1(lastSold);
           }); 
            })
            .catch(function (error) {
              console.log(error);
            });  
      }       
},soldPrice: function(req, res) {
   console.log(req.body.responseData[0])
   var street = encodeURIComponent(req.body.responseData[0]);
   var city = encodeURIComponent(req.body.responseData[1]+" "+req.body.responseData[2]);
   
   axios.post(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&address=${street}&citystatezip=${city}`)
   .then(function (response) {
   //   console.log(response.data);
     var theData = response.data;
     parseString(theData, {trim: true}, function (err, result) {
           var theZpid = result['SearchResults:searchresults'].response[0].results[0].result[0].zpid[0];
           nextCall(theZpid);
   });
   })
   .catch(function (error) {
     console.log(error);
   });
   
   function nextCall(theZpid){
         axios.post(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&zpid=${theZpid}&address=${street}&citystatezip=${city}`)
         .then(function (response) {
         //   console.log(response.data);
           var theData = response.data;
           // console.log(theData);
       parseString(theData, {trim: true}, function (err, result) {  
                 lastSold = result["SearchResults:searchresults"].response[0].results[0].result[0].lastSoldPrice[0];
         console.log(lastSold._);
         // console.log(res);
         var passBack= lastSold._
         // var passBack= {hbData:lastSold}
         console.log("I'm in sold price");
         io.sockets.emit('retreivedData', passBack);
         
         // pass1(lastSold);
        }); 
         })
         .catch(function (error) {
           console.log(error);
         });  
   }       
},
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

module.exports = {
   axioRequests : axioRequests,
   myFunc :funcOperation
}