import React, { useState, useEffect }  from 'react';
import NavTop from './components/nav-top';
import Home from './components/home.jsx';
import LoginPage from './components/login-page';
import Register from './components/register';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //can set userId, cookie etc..
    setCurrentUser("email@email.com")
  }, [])

  return (
    <>
      <Router>
        <NavTop user={currentUser} />
        <Switch>
          {/* Public Routes */}
          <Route exact path="/login" component={() => (<LoginPage user={currentUser} />)}></Route>
          <Route exact path="/register" component={() => (<Register user={currentUser} />)}></Route>
          <Route exact path="/" component={() => (<Home user={currentUser} />)}></Route>
          {/* User Routes */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
