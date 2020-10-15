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

  useEffect(() => {
    //can set userId, cookie etc..
    const localToken = localStorage.getItem("accessToken");
    if (localToken) {
      setToken(localToken);
      // also can set more state like user email etc..
    }
  }, [])

  return (
    <>
      <Router>
        <NavTop user={token} />
        <Switch>
          <Route exact path="/login" component={() => (<LoginPage setToken={setToken} />)}></Route>
          <Route exact path="/register" component={() => (<Register setToken={setToken} />)}></Route>
          <Route exact path="/dashboard" component={() => (<Dashboard setToken={token} />)}></Route>
          <Route exact path="/" component={() => (<Home setToken={setToken} />)}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
