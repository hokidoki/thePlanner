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
        let checker = "";
        let checkerValue = false;

        if(e.target.name === "email" && e.target.value.length > 6){
            checker = "emailChecker";
            checkerValue = "이메일 양식에 맞게 작성해주세요";
            if(this.emailChecker(e.target.value)){
                checkerValue = true;
            };
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

        if(e.target.name === "nickname"){
            checker ="nicknameChecker";
            if(e.target.value.length > 2){
                checkerValue = true;
            }else{
                checkerValue = "별명은 두 글자 이상입니다.";
            }
        }

        if(e.target.name === "password" || e.target.name === "password_v"){
            const name = e.target.name;
            checker ="passwordChecker";
            checkerValue = "비밀번호가 일치하지 않습니다.";

            if(name === "password" && e.target.value === this.state.password_v){
                checkerValue = true;
            }else if(name === "password_v" && e.target.value === this.state.password){
                checkerValue = true;
            }
        }

        this.setState({
            [e.target.name] : e.target.value,
            [checker] : checkerValue
        })
        
        
        
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
        console.log(this.state);
        const {idChecker, passwordChecker, nicknameChecker, emailChecker} = this.state;
        return (
            <div className="SignUpPage">
                <label id="signUpGobackLabel" onClick={this.goBack}>닫기</label>
                <div className="accountForm">
                    <h3 className="accountH3">회원 가입</h3>
                    <i className="fa fa-user accIcon"></i>
                    <input className="accountInput" name="nickname" onChange={this.onChange} placeholder="별명"></input>
                    { nicknameChecker === true || nicknameChecker === false ? null : <label className="accWarning">{nicknameChecker}</label>}
                    <i className="fa fa-user accIcon"></i>
                    <input className="accountInput" name="id" onChange={this.onChange} placeholder="아이디"></input>
                    {idChecker === true || idChecker === false ? null : <label className="accWarning">{idChecker}</label>}
                    <i className="fa fa-key accIcon"></i>
                    <input className="accountInput" name="password" onChange={this.onChange} placeholder="비밀번호"></input>
                    <i className="fa fa-key accIcon"></i>
                    <input className="accountInput" name="password_v" onChange={this.onChange} placeholder="비밀번호 재확인"></input>
                    {passwordChecker === true || passwordChecker === false ? null : <label className="accWarning">{passwordChecker}</label>}
                    <i className="fa fa-envelope accIcon"></i>
                    <input className="accountInput" name="email" onChange={this.onChange} placeholder="이메일"></input>
                    {emailChecker === true || emailChecker === false ? null : <label className="accWarning">{emailChecker}</label>}
                    <TermsPage termsAgreeAll={this.termsAgreeAll}></TermsPage>
                    <div class="col" onClick={this.signUp}>
			            <a href="#" class="btn btn-dark-blue" >회원 가입</a>		
		            </div>
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
