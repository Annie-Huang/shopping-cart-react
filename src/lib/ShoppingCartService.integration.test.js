import ShoppingCartService from './ShoppingCartService';

declare var require: any;

describe('PriceCalculator', () => {
    const products = require('../resources/fixtures/products.json');
    const userDefault = require('../resources/fixtures/user-default.json');
    const userUnilever = require('../resources/fixtures/user-unilever.json');
    const userApple = require('../resources/fixtures/user-apple.json');
    const userNike = require('../resources/fixtures/user-nike.json');
    const cartItemClassic = {
        product: products[0]
    };
    const cartItemStandout = {
        product: products[1]
    };
    const cartItemPremium = {
        product: products[2]
    };
    /**
     * Below is for test against the requirement specification.
     */

    /**
     * Customer: default
     * ID added: `classic`, `standout`, `premium`
     * Total expected: $987.97
     */
    it('Test 1: #calculateCart should calculate cart.total for customer default who does not have special pricing rules', () => {
        const cartItems = [];
        cartItemClassic.quantity = 1;
        cartItemStandout.quantity = 1;
        cartItemPremium.quantity = 1;
        cartItems.push(cartItemClassic);
        cartItems.push(cartItemStandout);
        cartItems.push(cartItemPremium);

        const output = ShoppingCartService.calculateCart(cartItems, userDefault.pricingRules);
        expect(output.total).toBe(987.97);
    });

    /**
     * Customer: Unilever
     * ID added: `classic`, `classic`, `classic`, `premium`
     * Total expected: $934.97
     */
    it('Test 2: #calculateCart should calculate cart.total for customer Unilever who have the buyXQtyForYQtyPrice pricing rule', () => {
        const cartItems = [];
        cartItemClassic.quantity = 3;
        cartItemPremium.quantity = 1;
        cartItems.push(cartItemClassic);
        cartItems.push(cartItemPremium);

        const output = ShoppingCartService.calculateCart(cartItems, userUnilever.pricingRules);
        expect(output.total).toBe(934.97);
    });

    /**
     * Customer: Apple
     * ID added: `standout`, `standout`, `standout`, `premium`
     * Total expected: $1294.96
     */
    it('Test 3: #calculateCart should calculate cart.total for customer Apple who have the newUnitPrice pricing rule', () => {
        const cartItems = [];
        cartItemStandout.quantity = 3;
        cartItemPremium.quantity = 1;
        cartItems.push(cartItemStandout);
        cartItems.push(cartItemPremium);

        const output = ShoppingCartService.calculateCart(cartItems, userApple.pricingRules);
        expect(output.total).toBe(1294.96);
    });

    /**
     * Customer: Nike
     * ID added: `premium`, `premium`, `premium`, `premium`
     * Total expected: $1519.96
     */
    it('Test 4: #calculateCart should calculate cart.total for customer Nike who have the newUnitPriceWithMinQty pricing rule', () => {
        const cartItems = [];
        cartItemPremium.quantity = 4;
        cartItems.push(cartItemPremium);

        const output = ShoppingCartService.calculateCart(cartItems, userNike.pricingRules);
        expect(output.total).toBe(1519.96);
    });
});
