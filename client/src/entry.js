// import React from "react";
// import openSocket from 'socket.io-client';
// //enter the location of the server with port
// // import components 5
// import styled from 'styled-components';
// import App from './utils/App';
// import API from './utils/API';
// import { CLIENT_RENEG_WINDOW } from 'tls';

// //TODO:swith the address on deployment
// const  socket = openSocket('http://localhost:3001');
// // require icons from react icons (no loader needed)
// // var little = "large";
// // function fight () { return little="small" }
// // const Button = styled.button`
// // background: red;
// // border-radius: 8px;
// // color: white;
// // height: ${props => props.small ? 40 : 60}px;
// // width: ${props => props.small ? 60 : 120}px;
// // `;

// // API.changeBgc((err, theColor) => {
// //     var theColorr = theColor.theColor.toLowerCase();
// //    style.backgroundColor=theColorr
    
// //    });

// class About extends React.Component {
//     constructor(props){
//         super(props)
//         API.changeBgc((err, theColor)=> this.setState({ 
//             bgColor:theColor.theColor.toLowerCase()
             
//           }));
//     }

//     state = {
//         bgColor:"black"
//     }  
        
         
//         }
      
//         render () {
//           return (
//             <div>
//               <li style={{background: this.state.bgColor}} onClick={() => {this.toggle(0)}}>one</li>
//               <li style={{background: this.myColor(1)}} onClick={() => {this.toggle(1)}}>two</li>
//               <li style={{background: this.myColor(2)}} onClick={() => {this.toggle(2)}}>three</li>
//             </div>
//           );
//         }
      
// }

// export default About