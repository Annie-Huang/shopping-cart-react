import * as types from './actionTypes';
import ProductApi from '../api/mockProductApi';


export const loadProducts = () => {
    return dispatch => {
        return ProductApi.loadProducts().then(products => {
            dispatch(loadProductsSuccess(products));
        }).catch(error => {
            throw(error);
        });
    };
};

export const loadProductsSuccess = (products) => ({
    type: types.LOAD_PRODUCTS_SUCCESS,
    products: products
});
