import React, { Component } from 'react';
import SignUpForm from '../component/signUpForm';
import SignUpModal from '../component/signUpModal';
import { signUpModalClose } from '../store/action/account';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import "../style/SignUp.css";

class SignUpPage extends Component {

    goToMain = () =>{
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <SignUpForm></SignUpForm>
                {this.props.modal === true ? <SignUpModal closeModal={this.props.closeModal} goToMain={this.goToMain}></SignUpModal> : null }
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        modal : state.account.signUp.modal  
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        closeModal : ()=>{ dispatch(signUpModalClose())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUpPage))