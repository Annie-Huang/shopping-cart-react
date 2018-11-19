import {combineReducers} from 'redux';
import products from './productReducer';
import user from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    products,
    user,
    ajaxCallsInProgress,
});

export default rootReducer;
