import React from 'react';
import {shallow, mount} from 'enzyme';
import {ProductList, updateProductsWithInCartInfo} from './ProductList';

describe('ProductList presentation', () => {
    const updateItemInCart = jest.fn();
    const products = require('../../resources/fixtures/products.json');
    products[0].productInCart = true;
    products[1].productInCart = false;
    products[2].productInCart = true;
    const showProductList = true;
    const props = {
        updateItemInCart,
        products,
        showProductList
    };

    it('should render ProductList component', () => {
        expect(shallow(<ProductList {...props} />)).toMatchSnapshot();
    });

    it('#updateItemInCart -- called directly', () => {
        const wrapper = shallow(<ProductList {...props} />).instance();
        const data = {
            product: products[0],
            quantity: 1
        };
        wrapper.updateItemInCart(data);

        expect(updateItemInCart).toBeCalledWith(data);
    });

    it('#updateItemInCart should be called when clicking Add 1 item button', () => {
        const wrapper = shallow(<ProductList {...props} />);

        const buttons = wrapper.find('button');
        const addButton =  buttons.first();
        expect(addButton.text()).toBe('Add 1 item');

        addButton.simulate('click');
        const data = {
            product: products[0],
            quantity: 1
        };
        expect(updateItemInCart).toBeCalledWith(data);
    });

    it('#updateItemInCart should be called when clicking Remove item button', () => {
        const wrapper = shallow(<ProductList {...props} />);

        const buttons = wrapper.find('button');
        const removeButton =  buttons.at(1);
        expect(removeButton.text()).toBe('Remove 1 item');
        removeButton.simulate('click');

        const data = {
            product: products[0],
            quantity: -1
        };
        expect(updateItemInCart).toBeCalledWith(data);
    });

    it('#updateProductsWithInCartInfo should be productInCart property into each product', () => {
        const originalProducts = require('../../resources/fixtures/products.json');
        const cartItems = require('../../resources/fixtures/cart-items.json');

        const updatedProducts = updateProductsWithInCartInfo(originalProducts, cartItems);
        expect(updatedProducts[0].productInCart).toBe(true);
        expect(updatedProducts[1].productInCart).toBe(true);
        expect(updatedProducts[2].productInCart).toBe(false);
    });

});
