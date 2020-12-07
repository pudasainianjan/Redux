import {combineReducers} from 'redux';
import postReducer from './postReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    // replaceMe: () => 'hi there'     //just to get rid of error at first as this must contain function and return value, this does nothing 
    posts:postReducer,
    users: usersReducer
});