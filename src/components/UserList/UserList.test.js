import {shallow} from 'enzyme/build';
import {UserList} from "./UserList";
import React from "react";

describe('UserList presentation', () => {
    const loadUser = jest.fn();
    const resetUser = jest.fn();
    const emptyItemInCart = jest.fn();
    const products = require('../../resources/fixtures/products');
    const user = {};
    const buttonDisable = false;
    const props = {
        loadUser,
        resetUser,
        emptyItemInCart,
        products,
        user,
        buttonDisable
    };

    it('should render UserList component when no user selected', () => {
        expect(shallow(<UserList {...props} />)).toMatchSnapshot();
    });

    it('should render UserList component when a user selected', () => {
        const appleUser =  require('../../resources/fixtures/user-apple');
        const newProps = {
            loadUser,
            resetUser,
            emptyItemInCart,
            products,
            user: appleUser,
            buttonDisable: true
        };
        expect(shallow(<UserList {...newProps} />)).toMatchSnapshot();
    });

    it('#selectUser -- called directly', () => {
        const wrapper = shallow(<UserList {...props} />).instance();
        const event = {
            target: {
                value: 'Apple'
            }
        };
        wrapper.selectUser(event);

        expect(loadUser).toBeCalledWith('Apple');
    });

    it('#reset -- called directly', () => {
        const wrapper = shallow(<UserList {...props} />).instance();
        wrapper.reset();

        expect(resetUser).toHaveBeenCalled();
        expect(emptyItemInCart).toHaveBeenCalled();
    });

    it('#reset should be called when clicking reset button', () => {
        const wrapper = shallow(<UserList {...props} />);

        const buttons = wrapper.find('button');
        const resetButton =  buttons.at(5);
        expect(resetButton.text()).toBe('Reset');
        resetButton.simulate('click');

        expect(resetUser).toHaveBeenCalled();
        expect(emptyItemInCart).toHaveBeenCalled();
    });
});
