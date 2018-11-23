import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as userActions from './userActions'
import * as types from './actionTypes';

// Test a sync action
describe('userActions', () => {
    it('loadUserSuccess should create a LOAD_USER_SUCCESS action', () => {
        const user = require('../resources/fixtures/user-apple.json');
        const expectedAction = {
            type: types.LOAD_USER_SUCCESS,
            user: user
        };

        const action = userActions.loadUserSuccess(user);
        expect(action).toEqual(expectedAction);
    });
});


// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('userActions Thunk', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_USER_SUCCESS when loading a Apple user', (done) => {

        // This test takes a bit longer because of the delay set in \shopping-cart-react\src\api\delay.js
        // But I will keep the delay because it will make running the app more real.
        const store = mockStore({user: {}});
        store.dispatch(userActions.loadUser('Apple')).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_USER_SUCCESS);
            done();
        });
    });

    it('should create BEGIN_AJAX_CALL and LOAD_USER_SUCCESS when loading a Default user', (done) => {

        // This test takes a bit longer because of the delay set in \shopping-cart-react\src\api\delay.js
        // But I will keep the delay because it will make running the app more real.
        const store = mockStore({user: {}});
        store.dispatch(userActions.loadUser('Default')).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_USER_SUCCESS);
            done();
        });
    });
});
