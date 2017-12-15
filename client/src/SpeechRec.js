// This component sends voice messages to the server
import logo from './ibmlogo.gif';
import title from './namelogo.png';
import React, { Component } from 'react'
//requires speech recogniion api
import SpeechRecognition from 'react-speech-recognition'
// allows the client side to listen to the socket on the server side
import openSocket from 'socket.io-client';
//enter the location of the server with port
// import components 
import App from './utils/App';
import API from './utils/API';
import { CLIENT_RENEG_WINDOW } from 'tls';
//TODO:swith the address on deployment
// const  socket = openSocket('http://localhost:3001');
const  socket = openSocket("https://personal-voice-assistance.herokuapp.com/");

// require icons from react icons (no loader needed)

var Microphone = require('react-icons/lib/fa/microphone');
var MicrophoneSlash = require('react-icons/lib/fa/microphone-slash');


// open an instance of the speech recognition
class Dictaphone extends Component {
  constructor(props){
    super(props)
    API.changeBgc((err, data)=>this.consoleValue(data));
    API.insertImage((err, data)=>this.changeImage(data));
    API.foundData((err, data)=>this.foundData2(data));
  
}
  state = {
    wasSaid :this.props.finalTranscript,
    bgColor:"orange",
    talkButtonColor:"",
    stopButtonColor:"",
    contentBgColor:"",
    imageContainerBgColor:"",
    logoDisplay:"none",
    titleDisplay:"none",
    theData:""
  }




  foundData2(data){
    console.log(data);
    this.setState({ 
      theData:data
    })
  }
  // image displays
  changeImage(data){
    console.log(data);
    if (data.theImage == "image logo" || data.theImage == "logo image" ){  
      this.setState({ 
      logoDisplay:"flex"
    })}

    if (data.theImage == "image title" || data.theImage == "title image" ){  
      this.setState({ 
        titleDisplay:"flex"
    })}
  }




  //theColor.theColor.toLowerCase()
  consoleValue(data){
    console.log(data.theElement);
    if (data.theElement == "talk button"){  
      console.log("its here");
      this.setState({ 
      talkButtonColor:data.theColor.toLowerCase()
    })}

    if (data.theElement == "stop button"){ 
      if (data.theColor == "read") {
        this.setState({ 
          stopButtonColor:"red"
        })
      } else {
        this.setState({ 
          stopButtonColor:data.theColor.toLowerCase()
        })
      }
      console.log("its here again");
    }

    if (data.theElement == "conversation container"){  
      console.log("its here again");
      this.setState({ 
      contentBgColor:data.theColor.toLowerCase()
    })}

    if (data.theElement == "image container"){  
      console.log("its here again");
      this.setState({ 
      imageContainerBgColor:data.theColor.toLowerCase()
    })}
  
  }


  // if transcript is complete and not empty emit message to watson
  // also send the function this this.props.resetTranscrips to be called from server
componentDidUpdate(){
  if(!this.props.interimTranscript && this.props.transcript !== ""){
    socket.emit('test', {message:this.props.finalTranscript},this.props.resetTranscript);
  }
}

render() {
  const { transcript,startListening, resetTranscript,interimTranscript , browserSupportsSpeechRecognition, stopListening } = this.props
  if (!browserSupportsSpeechRecognition) {
      return null
    }

    const divBgStyle = {
      background:this.state.contentBgColor,
      fontSize:"16px",
      borderRadius:"3px",
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      marginTop:"120px" ,
      flexDirection:"column" 
    }

    const talkButton = {
      fontSize:"25px",
      background:this.state.talkButtonColor
    }

    const pauseButton = {
      background: this.state.stopButtonColor,
      fontSize:"25px",
      margin:"10px"
     
    }
    const letterLogo ={
      height: "250px",
      width: "auto",
      marginTop: "0px",
      display:this.state.titleDisplay
      
    }

    const worldLogo ={
      display:this.state.logoDisplay
    }

    const watsonImgDiv = {
      background:this.state.imageContainerBgColor,
      borderRadius:"3px",
      display:"flex", 
      alignItems: "center",
      justifyContent: "center"
    }

    
    return (
      <div>
        <div style={watsonImgDiv}>
          <img src={title} style={letterLogo}alt="title" />
          <img src={logo} style={worldLogo}alt="logo" />
        </div> 
        <div style={divBgStyle}>
          <App  />
          <div>
            <button style={talkButton} onClick={startListening}><Microphone/></button>
            <button style={pauseButton} onClick={stopListening}><MicrophoneSlash /></button>
          </div>
          
          <span >{interimTranscript}</span> 
          <h3>{this.state.theData}</h3>
        </div>
      </div>
    )
  }
}

// prevents auto listeen when program loads
const options = {
  autoStart: false
}
export default SpeechRecognition(options)(Dictaphone)




// class Dictaphone extends Component {
//   constructor(props){
//     super(props)
//     API.changeBgc((err, data)=> this.setState({ 
//         bgColor:theColor.theColor.toLowerCase() 
//       }));
// }
//   state = {
//     wasSaid :this.props.finalTranscript,
//     bgColor:"orange"
//   }
