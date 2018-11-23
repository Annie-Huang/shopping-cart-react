import {shallow} from "enzyme/build";
import {PriceRuleList} from "./PriceRuleList";
import React from "react";


describe('Spinner', () => {
    it('should render Spinner component when loading', () => {
        const fordUser =  require('../../../../resources/fixtures/user-ford.json');
        const products =  require('../../../../resources/fixtures/products.json');
        const props = {
            rules: fordUser.pricingRules,
            products: products
        };
        expect(shallow(<PriceRuleList {...props} />)).toMatchSnapshot();
    });

});
