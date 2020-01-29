import React, { Component } from 'react'

export default class SignUpModal extends Component {
    
    close = ()=>{
        this.props.closeModal();
        this.props.goToMain();
    }
    render() {
        console.log(this.props)
        return (
            <div className="modalContainner">
                <div id="signUpModalBox">
                    <h3 className="accountH3">
                        가입완료
                    </h3>
                    <div id="signUpText">
                        가입하신 이메일로 인증 메일을 보내드렸습니다. 이메일 내용을 참고하여
                        가입절차를 완료해주시기 바랍니다.
                    </div>
                    <button onClick={this.close}>
                        메인으로 이동하기
                    </button>
                </div>
            </div>
        )
    }
}
