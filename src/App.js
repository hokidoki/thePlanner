import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import LoginPage from './page/loginPage';
import SignUpPage from './page/signUpPage';
import './style/App.css';

export default class App extends Component {
  render() {
    return (
      <div className="backgroundDiv">
        <Switch>
          <Route path="/" exact component={LoginPage}/>          
          <Route path="/signUp" exact component={SignUpPage}/>
        </Switch>
      </div>
    )
  }
}
