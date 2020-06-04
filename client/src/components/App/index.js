import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Signup from "../Signup";
import Login from "../Login";
import Welcome from "../Welcome";
import Demo from "../Demo";
import Contact from "../Contact";
import Profile from "../Demo/Profile";
import NotFound from "../NotFound";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/demo/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
