import axios from "axios";

//set up a socket connection on the client side
//the install was set on the server side
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');



export default {
  subscribeToTimer: function(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);

  },

  getFirstMessage: function(cb) {
    socket.on('stop2', message => cb(null, message));
    socket.emit('Wakeup');

  },

  getOtherMessage: function(cb) {
    socket.on('chat', message => cb(null, message));
    // socket.emit('Wakeup');

  },


  foundData: function(cb) {
    socket.on('retreivedData', theData => cb(null, theData));
    // socket.emit('Wakeup');
  },
  changeBgc: function(cb) {
    socket.on('changeBgc1', data => cb(null, data));
    // socket.emit('Wakeup');
  }, 
  insertImage: function(cb) {
    socket.on('images', data => cb(null, data));
    // socket.emit('Wakeup');
  }
 


//  subscribeToTimer :function (cb) {
//   // socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('chatMessage', {message:"Hello World We are Here"});
//   socket.on('chatBack', (data)=>{
//     var message = data.message1
//     cb(null,message)
//   } )
// }
//  deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
}





// };


// ───────Template ─────────────────────────────────────────────────────────────────────────

  // // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
 
  // // Saves a book to the database
  // saveBook: function(bookData) {
  
  //   return axios.post("/api/books", bookData);
   
  // }