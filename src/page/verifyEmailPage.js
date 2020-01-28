import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import querystring from 'querystring';
import { instanceWithCredential } from '../settingModule/axios';
class VerifyEmailPage extends Component {

    componentDidMount(){
        const { request } = this.props;
        const email = this.props.match.params.email;
        const secretCode = querystring.parse(this.props.location.search.replace('?',""),{ ignoreQueryPrefix: true }).secretcode
        instanceWithCredential.get(`${request}/signUp/verify/${email}?secretcode=${secretCode}`).then((validationResult)=>{
            console.log(validationResult);
            if(validationResult.data.verify === true){
                instanceWithCredential.put(`${request}/signUp/verify`).then((authReqResult)=>{
                    console.log(authReqResult)
                    if(authReqResult.data.autentication === true){
                        this.setState({
                            isLoding : false,
                            successAuthentication: true,
                            alreadyAuthenticatedAccount : false
                        })
                    }
                }).catch((err)=>{
                    //디스패치 fatalError하도록 하자. 
                })
            }else{
                this.setState({
                    isLoding : false,
                    successAuthentication: false,
                    alreadyAuthenticatedAccount : true
                })
            }
        });
    }

    state = {
        isLoding : true,
        successAuthentication: false,
        alreadyAuthenticatedAccount : false
    }

    render() {
        console.log(this.state);
        return (
            <div>
                이메일 페이지
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        request : state.pub.requestDomain
    }
}

// 컴포넌트 마운트 되자마자 . 쿼리 정보와 파람스로 서버로 확인
// 서버 확인 되면 가입 승인, 이미 승인된 것, 잘못된 경로 메세지 컴포넌트 뜨도록 한다. 
export default connect(mapStateToProps, null)(withRouter(VerifyEmailPage))
