import React, { Component } from 'react';
import LoginContainer from './containers/LoginContainer';
import BookingsContainer from './containers/BookingsContainer';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={LoginContainer} />
        <Route path="/login" exact component={LoginContainer} />
        <Route path="/bookings" component={BookingsContainer} />
      </Router>);
  }
}

export default App;
