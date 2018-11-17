import initialState from "./initialState";
import * as types from '../actions/actionTypes';

const courseReducer = (state=initialState.user, action) => {
    switch (action.type) {
        case types.LOAD_USER_SUCCESS:
            return action.user;

        default:
            return state;
    }
};

export default courseReducer;
