import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import * as productActions from '../actions/productActions';
import * as userActions from '../actions/userActions';
import * as shoppingCartActions from '../actions/shoppingCartActions';

// This is to test Action, Store, and Reducers together...
describe('Store', () => {
    it('Should handle load user', () => {
        // arrange
        const store = createStore(rootReducer, initialState);
        const products = require('../resources/fixtures/products');
        const user = require('../resources/fixtures/user-apple');
        const data1 = {
            "product": {
                "id": "classic",
                "name": "Classic Ad",
                "price": 269.99
            },
            "quantity": 1
        };
        const data2 = {
            "product": {
                "id": "classic",
                "name": "Classic Ad",
                "price": 269.99
            },
            "quantity": -1
        };

        // Now we could even go further with this and create an array of actions up here
        // and then assert that the final result was what we expected.

        // Test 1:
        // act
        // Could dispatch multiple actions here and assert on result
        let action = productActions.loadProductsSuccess(products);
        store.dispatch(action);

        // assert
        let actual = store.getState().products;
        let expected = products;
        expect(actual).toEqual(expected);


        // Test 2:
        // act
        // Could dispatch multiple actions here and assert on result
        action = userActions.loadUserSuccess(user);
        store.dispatch(action);

        // assert
        actual = store.getState().user;
        expected = user;
        expect(actual).toEqual(expected);


        // Test 3:
        // act
        // Could dispatch multiple actions here and assert on result
        action = shoppingCartActions.updateItemInCart(data1);
        store.dispatch(action);

        // assert
        actual = store.getState().cartItems;
        expected = data1;
        expect(actual.length).toEqual(1);
        expect(actual[0]).toEqual(expected);


        // Test 3:
        // act
        // Could dispatch multiple actions here and assert on result
        action = shoppingCartActions.updateItemInCart(data2);
        store.dispatch(action);

        // assert
        actual = store.getState().cartItems;
        expect(actual.length).toEqual(0);
    });
});
