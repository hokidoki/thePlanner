import { handleActions } from 'redux-actions';
import * as type from '../../action/actionType';

const initialState = {
    user : null,
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.SIGN_IN_REQUEST] : (state) => Object.assign({},state,{isLoading : true, error : null}),
    [type.SIGN_IN_SUCCESS] : (state,action) => Object.assign({},state,{user : action.payload, isLoading : false, error : null}),
    [type.SIGN_IN_FAILED] : (state,action) => Object.assign({},state,{isLoading : false, error : action.payload}),
}, initialState)