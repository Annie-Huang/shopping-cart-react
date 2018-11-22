import * as types from './actionTypes';
import * as shoppingCartActions from './shoppingCartActions';

// Test a sync action
describe('shoppingCartActions', () => {
    it('updateItemInCart should create a UPDATE_ITEM_IN_CART action', () => {
        const data = {};
        const expectedAction = {
            type: types.UPDATE_ITEM_IN_CART,
            data: data
        };

        const action = shoppingCartActions.updateItemInCart(data);
        expect(action).toEqual(expectedAction);
    });

    it('emptyItemInCart should create a EMPTY_ITEM_IN_CART action', () => {
        const expectedAction = {
            type: types.EMPTY_ITEM_IN_CART,
        };

        const action = shoppingCartActions.emptyItemInCart();
        expect(action).toEqual(expectedAction);
    });
});
