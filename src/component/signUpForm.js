import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TermsPage from '../page/termsPage';


class signUpForm extends Component {
    
    state = {
        id : "",
        password : "",
        password_v : "",
        nickname : "",
        email : "",
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
        if(e.target.name === "email"){
            this.emailChecker(e.target.value);
        }
        if(e.target.name === 'id' && e.target.value.length > 4){
            const {name, value} = e.target;
            axios.post(`${this.props.request}/signup/idcheck`,{
                id : e.target.value
            }).then((result)=>{
                console.log(result)
                this.setState({
                    [name] : value,
                    idChecker : !result.data.valid
                })
            })
            return;
        }

        this.setState({
            [e.target.name] : e.target.value
        })
        
    }


    render() {
        return (
            <div className="SignUpPage">
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
export default connect(mapStateToProps, null)(signUpForm)
