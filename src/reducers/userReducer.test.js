import userReducer from './userReducer';
import * as types from "../actions/actionTypes";

describe('userReducer', () => {
    it('should set user when passed LOAD_USER_SUCCESS', () => {
        // arrange
        const initialState = {};
        const user = require('../resources/fixtures/user-apple.json');
        const action = {
            type: types.LOAD_USER_SUCCESS,
            user: user
        };

        // act
        const newState = userReducer(initialState, action);

        // assert
        expect(newState.id).toBe('Apple');
        expect(newState.name).toBe('Apple');
        expect(newState.pricingRules.length).toEqual(1);
    });

    it('should reset user when passed RESET_USER', () => {
        // arrange
        const initialState = {};
        const action = {
            type: types.RESET_USER,
        };

        // act
        const newState = userReducer(initialState, action);

        // assert
        expect(newState.id).toBeUndefined();
        expect(newState.name).toBeUndefined();
        expect(newState.pricingRules).toBeUndefined();
    });

    it('when no matching action type should return existing state', () => {
        // arrange
        const initialState = {};
        const user = require('../resources/fixtures/user-apple.json');
        const action = {
            type: 'non existing action type',
            user: user
        };

        // assert
        expect(userReducer(initialState, action)).toBe(initialState);
    });
});
