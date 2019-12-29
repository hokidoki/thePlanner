import React, { Component } from 'react'

import LoginPage from './page/loginPage'
import './style/App.css';

export default class App extends Component {
  render() {
    return (
      <div id="backgroundDiv">
        <LoginPage></LoginPage>
      </div>
    )
  }
}
