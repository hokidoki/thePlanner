import React, { Component } from 'react'

import Clock from '../component/clock';
import LoginForm from '../component/loginForm'

import "../style/Login.css";
export default class LoginPage extends Component {
    render() {
        return (
            <div className="LoginPage">
                <h1 id="loginHeaderTitle">
                    The Planner에 오신것을 환영합니다.
                </h1>
                <Clock></Clock>
                <LoginForm></LoginForm>
            </div>
        )
    }
}
