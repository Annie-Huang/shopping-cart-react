import initialState from './initialState';
import * as types from '../actions/actionTypes';

const shoppingCartReducer = (state=initialState.cartItems, action) => {
    if(action.type === types.ADD_PRODUCT_INTO_CART) {
        const selectedItem = state.find((cartItem) => cartItem.product.id === action.product.id);

        if (selectedItem === undefined) {
            const newItem = {
                product: action.product,
                quantity: 1,
            };
            return [
                ...state,
                Object.assign({}, newItem)
            ];

        } else {
            const updateItem = Object.assign({}, selectedItem);
            updateItem.quantity += 1;
            return state.map(
                item => item.product.id === action.product.id ? updateItem : item
            );
        }
    }

    return state;

};


export default shoppingCartReducer
