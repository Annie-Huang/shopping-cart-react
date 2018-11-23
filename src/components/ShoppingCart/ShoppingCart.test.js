import {shallow} from "enzyme/build";
import {ShoppingCart} from "./ShoppingCart";
import React from "react";


describe('ShoppingCart presentation', () => {
    const cartItems = require('../../resources/fixtures/cart-items.json');
    cartItems[0].subTotal = 269.99;
    cartItems[0].discount = 0;
    cartItems[1].subTotal = 619.98;
    cartItems[1].discount = 26;

    const basket = {
        cartItems: cartItems,
        total: 889.97
    };
    const showBasket = true;
    const props = {
        basket,
        showBasket
    };

    it('should render ShoppingCart component when no user selected', () => {
        expect(shallow(<ShoppingCart {...props} />)).toMatchSnapshot();
    });

});
