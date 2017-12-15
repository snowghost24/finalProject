import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route } from 'react-router-dom'
// import './index.css';
// import About from './entry'
// import Books from "./pages/Books";
import registerServiceWorker from './registerServiceWorker';
import SpeechRecognition from './SpeechRec'
import About from './entry'

ReactDOM.render(<Router >
   <div>

   <Route exact={true} path="/" component={SpeechRecognition}></Route>
   {/* <Route path="/books" component={Books}></Route> */}
   {/* <Route path="/About" component={About}></Route> */}
   </div>
</Router>, document.getElementById('root'));
registerServiceWorker();
