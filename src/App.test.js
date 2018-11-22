import React from 'react';
import App from './App';
import {configure as EnzymeConfig, shallow} from "enzyme/build";
import {createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import initialState from "./reducers/initialState";

EnzymeConfig({disableLifecycleMethods: true});

describe('App presentation', () => {
    const loadProducts = jest.fn();
    const props = {
        loadProducts,
    };
    const store = createStore(rootReducer, initialState);

    it('should render App component', () => {
        expect(shallow(<App {...props} />, { context: { store }})).toMatchSnapshot();
    });
});
