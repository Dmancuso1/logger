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
  const [localUser, setLocalUser] = useState({});

  useEffect(() => {
    //can set userId, cookie etc..
    const localToken = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("localUser"));
    if (localToken && userInfo) {
      setToken(localToken);
      setLocalUser(userInfo);
      // also can set more state like user email etc..
 
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("localUser");
    setToken(null)
    setLocalUser({})
  }


  return (
    <>
      <Router>
        <NavTop logout={logout} token={token} localUser={localUser} />
        <Switch>
          <Route exact path="/login" component={() => (<LoginPage setToken={setToken} setLocalUser={setLocalUser} />)}></Route>
          <Route exact path="/register" component={() => (<Register setToken={setToken} setLocalUser={setLocalUser} />)}></Route>
          <Route exact path="/dashboard" component={() => (<Dashboard token={token} localUser={localUser} />)}></Route>
          <Route exact path="/" component={() => (<Home token={token} localUser={localUser} />)}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
