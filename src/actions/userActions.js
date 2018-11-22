import * as types from './actionTypes';
import toastr from 'toastr';
import UserApi from '../api/mockUserApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import {emptyItemInCart} from './shoppingCartActions';

export const loadUser = (userId) => {
    return dispatch => {
        dispatch(beginAjaxCall());

        return UserApi.loadUser(userId).then(user => {
            dispatch(loadUserSuccess(user));

            user.name ?
                toastr.success(`User ${user.name} loaded success`) :
                toastr.success(`User reset success`);

            if (!user.id) {
                dispatch(emptyItemInCart());
            }

        }).catch(error => {
            dispatch(ajaxCallError());
            toastr.error("Unable to load the user");
            throw(error);
        });
    };
};

export const loadUserSuccess = (user) => ({
    type: types.LOAD_USER_SUCCESS,
    user: user
});
