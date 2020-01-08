import React, { Component } from 'react';
import SignUpForm from '../component/signUpForm';

import "../style/SignUp.css";

export default class SignUpPage extends Component {
    render() {
        return (
            <div>
                <SignUpForm></SignUpForm>
            </div>
        )
    }
}
