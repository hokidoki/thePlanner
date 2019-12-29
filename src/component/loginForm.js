import React, { Component } from 'react'
import { Button,Form } from 'semantic-ui-react'

export default class loginBox extends Component {
    render() {
        return (
            <div className="mainLoginCompoent">
                <Form>
                    <Form.Field>
                        <label>ID</label>
                        <input placeholder="ID / EMAIL"></input>
                    </Form.Field>
                    <Form.Field>
                        <label>PASSWORD</label>
                        <input placeholder="PASSWORD"></input>
                    </Form.Field>
                    <Button id="loginButton" className="loginComponentButton" type='submit'>로그인</Button>
                </Form>
                <Button className="loginComponentButton" >회원가입</Button>
            </div>
        )
    }
}
