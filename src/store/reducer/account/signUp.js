import { handleActions } from 'redux-actions';
import * as type from '../../action/actionType';

const initialState = {
    modal : false,
    isLoading : false,
    error : {
        status : false,
        reson : {
            id : {
                valid : null,
            },
            email :{
                valid : null,
            }
        }
    },
}

export default handleActions({
    [type.SIGN_UP_REQUEST] : (state) => Object.assign({},state,{isLoading : true, error : state.error}),
    [type.SIGN_UP_SUCCESS] : (state) => Object.assign({},state,{ modal : true, isLoading : false, error : {
        status : false,
        reson : {
            id : {
                valid : null,
            },
            email :{
                valid : null,
            }
        }
    }}),
    [type.SIGN_UP_FAILED] : (state,action) => Object.assign({},state,{isLoading : false, error : { 
        reson : state.error.reson,
        status : true,
        fatalError : action.payload,
    }}),
    [type.SIGN_UP_VALID_FAILED] : (state,action) => Object.assign({},state,{isLoading : false, error : { 
        reson : action.payload,
        status : true,
    }}),
    [type.SIGN_UP_MODAL_CLOSE] : (state) => Object.assign({},state,{ modal : false})
}, initialState)