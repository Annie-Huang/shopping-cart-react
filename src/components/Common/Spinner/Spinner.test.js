import React from "react";
import {shallow} from "enzyme/build";
import {Spinner} from "./Spinner";


describe('Spinner', () => {
    it('should render Spinner component when loading', () => {
        const props = {
            isLoading: true
        };
        expect(shallow(<Spinner {...props} />)).toMatchSnapshot();
    });

    it('should render Spinner component when not loading', () => {
        const props = {
            isLoading: false
        };
        expect(shallow(<Spinner {...props} />)).toMatchSnapshot();
    });
});
