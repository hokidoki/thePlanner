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
        instanceWithCredential.get(`http://${request}/signUp/verify/${email}?secretcode=${secretCode}`).then((validationResult)=>{
            if(validationResult.data.success === true){
                instanceWithCredential.put(`http://${request}/signUp/verify/${email}`).then((authReqResult)=>{

                }).catch((err)=>{
                    
                })
            }else{
                
            }
        });

    }

    render() {
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
