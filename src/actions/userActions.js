import * as types from './actionTypes';
import UserApi from '../api/mockUserApi';


export const loadUser = (userId) => {
    return dispatch => {
        return UserApi.loadUser(userId).then(user => {
            dispatch(loadUserSuccess(user));
        }).catch(error => {
            throw(error);
        });
    };
};

export const loadUserSuccess = (user) => ({
    type: types.LOAD_USER_SUCCESS,
    user: user
});
