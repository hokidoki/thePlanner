import {instanceWithCredential } from '../../settingModule/axios';
import { createAction } from 'redux-action'; 
import * as type from './actionType';

import * as callendar from './callendar';

const signInRequest = createAction(type.SIGN_IN_REQUEST);
const signInSuccess = createAction(type.SIGN_IN_SUCCESS);
const signInFailed = createAction(type.SIGN_IN_FAILED);

export const signIn = (id,password) =>{
    return (dispatch,getState) =>{
        dispatch(signInRequest())
        instanceWithCredential.post(`${getState().pub.requestDomain}/signIn`,{
            id : id,
            pw : password
        }).then((result)=>{
            console.log(result)
            dispatch(signInSuccess(result.data));
            dispatch(callendar.getCallendar(id));
        }).catch((err)=>{
            console.log(err);
            dispatch(signInFailed(err))
        })
    }
}

const signUpRequest = createAction(type.SIGN_UP_REQUEST);
const signUpSuccess = createAction(type.SIGN_UP_SUCCESS);
const signUpFailed = createAction(type.SIGN_UP_FAILED);
const signUpValidFailed = createAction(type.SIGN_UP_VALID_FAILED);
export const signUpModalClose = createAction(type.SIGN_UP_MODAL_CLOSE);

export const signUp = (id, password, nickname, email, termsStatus) =>{
    return (dispatch,getState) =>{
        dispatch(signUpRequest());
        instanceWithCredential.post(`${getState().pub.requestDomain}/signup`,{
            id : id,
            password : password,
            nickname : nickname,
            email : email,
            termsStatus : termsStatus
        },{
            headers : {
                cookies : {
                    userToken : localStorage.getItem('userToken')
                }
            }
        }).then((result)=>{
            console.log(result);
            if(result.data.id.valid === false || result.data.email.valid === false){
                dispatch(signUpValidFailed(result.data));
            }else{
                dispatch(signUpSuccess());
            }
        }).catch((err)=>{
            dispatch(signUpFailed(err));
        })
    }
}