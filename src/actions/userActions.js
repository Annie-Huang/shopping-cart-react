import * as types from './actionTypes';
import toastr from 'toastr';
import UserApi from '../api/mockUserApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadUser = (userId) => {
    return dispatch => {
        dispatch(beginAjaxCall());

        return UserApi.loadUser(userId).then(user => {
            dispatch(loadUserSuccess(user));

            console.log("Annie:", !!user.name);
            user.name ?
                toastr.success(`User ${user.name} loaded success`) :
                toastr.success(`Default user loaded success`);

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

export const resetUser = () => ({
    type: types.RESET_USER,
});
