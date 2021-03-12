import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Home from './Home'
  import Login from './Login'
  import Register from './Register'


const Navbar = () => {
    return (
        <Router>
        <nav class="navbar navbar-expand-lg bg-dark navbar-fixed-top">
        <Link to="/" class="navbar-brand" href="/">MTG</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/login" class="nav-link">Login</Link>
            </li>
            <li class="nav-item">
              <Link to="/register" class="nav-link">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route> 
        <Route exact path="/login">
            <Login />
        </Route> 
        <Route exact path="/register">
            <Register />
        </Route>
      </Switch>
      </Router>
    );
}

export default Navbar;