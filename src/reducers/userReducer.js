import initialState from "./initialState";
import * as types from '../actions/actionTypes';

const userReducer = (state=initialState.user, action) => {
    switch (action.type) {
        case types.LOAD_USER_SUCCESS:
            return action.user;

        default:
            return state;
    }
};

export default userReducer;
