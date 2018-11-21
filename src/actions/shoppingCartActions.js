import * as types from './actionTypes';

export const addProductIntoCart = (product) => ({
    type: types.ADD_PRODUCT_INTO_CART,
    product: product
});

export const removeProductFromCart = (product) => ({
    type: types.REMOVE_PRODUCT_FROM_CART,
    product: product
});
