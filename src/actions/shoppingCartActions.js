import * as types from './actionTypes';

export const updateItemInCart = (data) => ({
    type: types.UPDATE_ITEM_IN_CART,
    data: data
});

export const emptyItemInCart = () => ({
    type: types.EMPTY_ITEM_IN_CART,
});
