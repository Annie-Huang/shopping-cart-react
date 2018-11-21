import {combineReducers} from 'redux';
import products from './productReducer';
import user from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import cartItems from './shoppingCartReducer';

const rootReducer = combineReducers({
    products,
    user,
    ajaxCallsInProgress,
    cartItems,
});

export default rootReducer;
