import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
  import Home from './Home'
  import Login from './Login'
  import Register from './Register'
  import Collection from './Collection';


const Navbar = () => {

const loggedIn = JSON.parse(window.localStorage.getItem('loggedUser'));


const logOut = () => {
  window.localStorage.clear();
  window.location.href = '/';
}

    return (
        <Router>
        <nav className="navbar navbar-expand-lg bg-dark navbar-fixed-top">
        <Link to="/" className="navbar-brand" href="/">MTG</Link>
        {loggedIn ?  
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/collection" className="nav-link">My Collection</Link>
          </li>
          <li className="nav-item active">
              <Link className="nav-link" onClick={() => logOut()}>Logout</Link>
          </li>
        </ul> :
        <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>}
      </nav>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route> 
        <Route exact path="/login">
            <Login />
        </Route> 
        <Route exact path="/collection">
          <Collection />
        </Route>
        <Route exact path="/register">
            <Register />
        </Route>
      </Switch>
      </Router>
    );
}

export default Navbar;