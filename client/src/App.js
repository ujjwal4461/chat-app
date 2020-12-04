import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Join from './component/join/Join';
import Chat from './component/chat/Chat';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route path="/" exact component={Join}></Route>
        <Route path="/chat" component={Chat}></Route>
      </Router>
    </React.Fragment>
  );
}

export default App;
