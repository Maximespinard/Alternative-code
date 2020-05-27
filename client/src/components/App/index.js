import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Signup from "../Signup";
import Login from "../Login";
import Welcome from "../Welcome";
import Demo from "../Demo";
import Profile from "../Profile";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/demo/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default App;
