import React, { Component } from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';

import ApplyLeave from './components/ApplyLeave';
import AppliedLeaves from './components/AppliedLeaves';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
        <div >
        <h1>Leave Application</h1>
        <hr/>
        <Switch>
            <Route exact path="/login"  component={Login}/>
            <Route exact path="/appliedLeaves" component={AppliedLeaves}/>
            <Route component={ApplyLeave}/>
        </Switch>
      </div>
    )
  }
}

export default App;
