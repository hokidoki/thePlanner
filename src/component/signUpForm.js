import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TermsPage from '../page/termsPage';
import { withRouter } from 'react-router-dom';


class signUpForm extends Component {
    
    state = {
        id : "",
        idChecker : false,
        password : "",
        password_v : "",
        passwordChecker : false,
        nickname : "",
        nicknameChecker : false,
        email : "",
        emailChecker : false,
        termsAgreeAll : false,
    }
    termsAgreeAll = ()=>{
        this.setState({
            termsAgreeAll : !this.state.termsAgreeAll,
        })
    }


    emailChecker = (email) =>{
    const regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email !== '' && email !== 'undefined' && regex.test(email));
    }
    

    onChange = (e)=>{
        if(e.target.name === "email" && e.target.value.length > 6){
            let checker = "이메일 양식에 맞게 작성해주세요";
            if(this.emailChecker(e.target.value)){
                checker = true;
            };

            this.setState({
                [e.target.name] : e.target.value,
                emailChecker : checker
            })
        }

        if(e.target.name === 'id' && e.target.value.length > 4){
            const {name, value} = e.target;
            axios.post(`${this.props.request}/signup/idcheck`,{
                id : e.target.value
            }).then((result)=>{
                let checker = true;
                if(result.data.valid === 1){
                    checker = "중복된 아이디 입니다.";
                }
                this.setState({
                    [name] : value,
                    idChecker : checker
                })
            })
            return;
        }

        this.setState({
            [e.target.name] : e.target.value
        })

        if(e.target.name === "password" || e.target.name === "password_v"){
            if(this.state.password === this.state.password_v){
                this.setState({
                    passwordChecker : true,
                })
            }else{
                this.setState({
                    passwordChecker : "비밀번호가 일치하지 않습니다."
                })
            }
        }
        
    }

    goBack = () =>{
        const { history } = this.props;
        history.goBack();
    }

    signUp = ()=>{
        const { id, password, password_v, nickname, email, termsAgreeAll} = this.state;
        let {idChecker, passwordChecker, nicknameChecker, emailChecker} = this.state;
        
        if(id.length > 4){
            idChecker = "아이디는 영어 소문자 5글자 이상 입니다."
        }else if(idChecker !== true){
            idChecker = "아이디 중복확인을 해주세요";
        }

        if(passwordChecker !== true){
            passwordChecker = "비밀번호를 확인해주세요"
        }

        if(nickname.length < 2){
            nicknameChecker = "별명은 두글자 이상입니다."
        }else{
            nicknameChecker = true;
        }

        if(emailChecker !== true){
            emailChecker ="이메일 양식에 맞게 작성해주세요."
        }


        if(idChecker === true && passwordChecker === true && nicknameChecker === true && emailChecker === true && termsAgreeAll === true){
            alert("회원가입 승인");
        }else{
            this.setState({
                idChecker : idChecker,
                passwordChecker : passwordChecker,
                nicknameChecker : nicknameChecker,
                emailChecker : emailChecker
            })
        }
    }


    render() {
        return (
            <div className="SignUpPage">
                <label id="signUpGobackLabel" onClick={this.goBack}>닫기</label>
                <div className="accountForm">
                    <h3 className="accountH3">회원 가입</h3>
                    <i className="fa fa-user accIcon"></i>
                    <input className="accountInput" name="nickname" onChange={this.onChange} placeholder="별명"></input>
                    <i className="fa fa-user accIcon"></i>
                    <input className="accountInput" name="id" onChange={this.onChange} placeholder="아이디"></input>
                    <i className="fa fa-key accIcon"></i>
                    <input className="accountInput" name="password" onChange={this.onChange} placeholder="비밀번호"></input>
                    <i className="fa fa-key accIcon"></i>
                    <input className="accountInput" name="password_v" onChange={this.onChange} placeholder="비밀번호 재확인"></input>
                    <i className="fa fa-envelope accIcon"></i>
                    <input className="accountInput" name="email" onChange={this.onChange} placeholder="이메일"></input>
                    <TermsPage termsAgreeAll={this.termsAgreeAll}></TermsPage>
                <button>회원가입</button>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state)=>{
    return {
        request : state.pub.requestDomain
    }
}
export default connect(mapStateToProps, null)(withRouter(signUpForm))
