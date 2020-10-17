import React, { useState, useEffect } from 'react';
import NavTop from './components/nav-top';
import Home from './components/home.jsx';
import LoginPage from './components/login-page';
import Register from './components/register';
import Dashboard from './components/dashboard';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  const [token, setToken] = useState(null);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    //can set userId, cookie etc..
    const localToken = localStorage.getItem("accessToken");
    const userEmail = localStorage.getItem("localUser");
    if (localToken) {
      setToken(localToken);
      setLocalUser(userEmail);
      // also can set more state like user email etc..
 
    }
  }, [])

  return (
    <>
      <Router>
        <NavTop token={token} localUser={localUser} />
        <Switch>
          <Route exact path="/login" component={() => (<LoginPage token={setToken} localUser={setLocalUser} />)}></Route>
          <Route exact path="/register" component={() => (<Register token={setToken} localUser={setLocalUser} />)}></Route>
          <Route exact path="/dashboard" component={() => (<Dashboard token={token} localUser={localUser} />)}></Route>
          <Route exact path="/" component={() => (<Home token={setToken} localUser={setLocalUser} />)}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
