import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Friends from './components/Friends/Friends.js';
import Chats from './components/Chats/Chats.js';
import Options from './components/Options/Options.js';
import Login from './components/Login/Login.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {

  const user = useSelector(selectUser)
  console.log(user);
  return (
    <Router>
      <div className="app">
        {!user.email ? (<Login/>) : (
          <>
            <Sidebar/>
            <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/friends">
                <Friends/>
              </Route>
              <Route path="/chats">
                <Chats/>
              </Route>
              <Route path="/options">
                <Options/>
              </Route>
              <Route path="/join">
                <Options/>
              </Route>
              <Route path="/">
                <Friends/>
              </Route>
            </Switch>
          </>

        )}
        
      </div>
    </Router>
  );
}

export default App;
