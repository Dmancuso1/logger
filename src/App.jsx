import React from 'react';
import NavTop from './components/nav-top';
import Home from './components/home.jsx';
import LoginPage from './components/login-page';
import Register from './components/register';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const isLoggedIn = true

function App() {
  return (
    <>
      <Router>
        <NavTop user={isLoggedIn} />
        <Switch>
          <Route exact path="/login" component={() => (<LoginPage user={isLoggedIn} />)}></Route>
          <Route exact path="/register" component={() => (<Register user={isLoggedIn} />)}></Route>
          <Route exact path="/" component={() => (<Home user={isLoggedIn} />)}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
