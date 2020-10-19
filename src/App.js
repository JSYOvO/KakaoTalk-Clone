import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Friends from './components/Friends/Friends.js';
import Chats from './components/Chats/Chats.js';
import Options from './components/Options/Options.js';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar/>
        <Switch>
          <Route path="/friends">
            <Friends/>
          </Route>
          <Route path="/chats">
            <Chats/>
          </Route>
          <Route path="/options">
            <Options/>
          </Route>
          <Route path="/">
            <Friends/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
