import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import API from "./API"
// import openSocket from 'socket.io-client';
// //enter the location of the server with port
// const  socket = openSocket('http://localhost:3001');


// class App extends Component {
//   state = {
//     startMessage:""
//   }

// updateIt (newMessage){
//   this.setState({
//     startMessage:newMessage
//   })

//   this.updateIt = this.updateIt.bind(this)

// }

// Hello (){
//   // socket.on('start',function(data){
//   //   console.log("hello");
//   // }
// }


//   render() {
//     var stateVal = this.state.startMessage
//     socket.on('start',function(data){
//      stateVal = data.message;
//      this.updateIt(updateIt)
     
//    })
//     return (
      
//       <div className="App">

//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//         {/* display new message */}
       
        
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <h1>{console.log(stateVal)}</h1>
//       </div>
//     );
//   }
// }

// const BigCheck = (props)=>(
// // console.log(this.props.check)

// {/* <h1>{this.props.check}</h1> */}
// console.log(object);

// )

//  class ReceiveMsg extends Component {
//    render (){
//     var stateVal = "";
//     socket.on('start',function(data){
//      <BigCheck check={data.message} />
      
//     })
  
//   return (
//     <h1></h1>
//   )
//    }

//  }

//  class App extends Component {
//    render (){

//     return (
      
//         <div className="App">
  
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <h1 className="App-title">Welcome to React</h1>
//           </header>
//           <p className="App-intro">
//           {/* display new message */}
       
        
//             To get started, edit <code>src/App.js</code> and save to reload.
//           </p>
//           <div><ReceiveMsg /></div>

//         </div>
//       );
//    }

//  }


 class App extends Component {
  constructor(props) {
    super(props);
    API.subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
    API.foundData((err, theData) => this.setState({ 
      theData
    }));
  }

  state = {
    timestamp: 'no timestamp yet',
    message:'',
    theData:''
  };

componentDidMount(){
  API.getFirstMessage((err, message) => {
    console.log(message);
    this.setState({ 
    message 
  })});
}


  render() {
    return (
      <div>

        
        <h1>
        {this.state.message}
        </h1>

        <h3>{this.state.theData}</h3>
        {/* <p>{this.props.saidMessage}</p> */}
      </div>
    );
  }


 }







export default App;
