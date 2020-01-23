import { combineReducers } from 'redux';
import signUp from './signUp';
import user from './user';

export default combineReducers({
    signUp,
    user
})