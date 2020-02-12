import {instanceWithCredential } from '../../settingModule/axios';
import { createAction } from 'redux-action'; 
import * as type from './actionType';

export const changeCallendarOwner = createAction(type.CHANGE_CALLENDAR_OWNER);
export const getOverViewSuccess = createAction(type.GET_OVERVIEW_SUCCESS);

export const getCallendar = (callendarOwner)=>{
    return (dispatch)=>{
        dispatch(changeCallendarOwner(callendarOwner));

        
    }
}