import { handleActions } from 'redux-actions';
import * as type from '../../action/actionType';

const initialState = {
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.SIGN_UP_REQUEST] : (state) => Object.assign({},state,{isLoading : true, error : null}),
    [type.SIGN_UP_SUCCESS] : (state) => Object.assign({},state,{ isLoading : false, error : null}),
    [type.SIGN_UP_FAILED] : (state) => Object.assign({},state,{isLoading : false, error : action.payload}),
}, initialState)