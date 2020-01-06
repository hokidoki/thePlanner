import axios from 'axios';
import { createAction } from 'redux-action'; 

import * as type from './actionType';

const signInRequest = createAction(type.SIGN_IN_REQUEST);
const signInSuccess = createAction(type.SIGN_IN_SUCCESS);
const signInFailed = createAction(type.SIGN_IN_FAILED);

export const signIn = (id,password) =>{
    return (dispatch,getState) =>{
        dispatch(signInRequest())
        axios.post(`${getState().pub.requestDomain}/signIn`,{
            userId : id,
            userPassword : password
        }).then((result)=>{
            dispatch(signInSuccess(result.data))
        }).catch((err)=>{
            console.log(err.response.data);
            dispatch(signInFailed(err))
        })
    }
}