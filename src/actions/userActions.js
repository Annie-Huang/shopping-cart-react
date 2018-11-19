import * as types from './actionTypes';
import UserApi from '../api/mockUserApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadUser = (userId) => {
    return dispatch => {
        dispatch(beginAjaxCall());
        return UserApi.loadUser(userId).then(user => {
            dispatch(loadUserSuccess(user));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
};

export const loadUserSuccess = (user) => ({
    type: types.LOAD_USER_SUCCESS,
    user: user
});
