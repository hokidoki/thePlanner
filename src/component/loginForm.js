import React, { Component } from 'react'
import { Button,Form } from 'semantic-ui-react'

import { signIn } from '../store/action/account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class loginBox extends Component {
    state = { 
        id : "",
        password : ""
    }

    onChage = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    signIn = ()=>{
        const {id, password} = this.state;
        if(!id){
            alert("아이디를 입력해주세요");
            return;
        }
        if(!password){
            alert("비밀번호를 입력해주세요");
            return;
        }
        this.props.signIn(id,password);
    }
    render() {
        return (
            <div className="mainLoginCompoent">
                <Form>
                    <Form.Field>
                        <label>ID</label>
                        <input placeholder="ID / EMAIL" name="id" value={this.state.id} onChange={this.onChage}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>PASSWORD</label>
                        <input placeholder="PASSWORD" name="password" value={this.state.password} onChange={this.onChage}></input>
                    </Form.Field>
                    <Button id="loginButton" className="loginComponentButton" type='submit' onClick={this.signIn}>로그인</Button>
                </Form>
                <Button className="loginComponentButton" >회원가입</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signIn : bindActionCreators(signIn,dispatch)
    }
}
export default connect(null, mapDispatchToProps)(loginBox)