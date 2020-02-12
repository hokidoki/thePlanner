import { handleActions } from 'redux-actions';
import * as type from '../../action/actionType';

const initialState = {
    callendarOwner : null,
    overView : [],
    overViewLoading : false,
    error : null
}

export default handleActions({
   [type.CHANGE_CALLENDAR_OWNER] : (state,action) => Object.assign({},state,{callendarOwner : action.payload, overViewLoading : true}),
   [type.GET_OVERVIEW_SUCCESS] : (state,action)=>{ Object.assign({},state,{overView : action.payload,overViewLoading : false})}
}, initialState)