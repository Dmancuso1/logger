import React, { useState, useEffect } from 'react';
import NavTop from './components/nav-top';
import Home from './components/home.jsx';
import LoginPage from './components/login-page';
import Register from './components/register';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    //can set userId, cookie etc..
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, [])

  return (
    <>
      <Router>
        <NavTop user={token} />
        <Switch>
          {/* Public Routes */}
          <Route exact path="/login" component={() => (<LoginPage setToken={setToken} />)}></Route>
          <Route exact path="/register" component={() => (<Register setToken={setToken} />)}></Route>
          <Route exact path="/" component={() => (<Home setToken={setToken} />)}></Route>
          {/* User Routes */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
