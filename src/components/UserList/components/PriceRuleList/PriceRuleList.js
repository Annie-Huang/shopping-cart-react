import React from 'react';
import PropTypes from 'prop-types';

export const PriceRuleList = ({rules, products}) => {

    const setPricingRulesForDisplay = (rules, products) => {
        let pricingRules = [];
        if (rules) {
            rules.forEach(rule => {
                let newPrice;
                const productname = products.find((product) => product.id === rule.productId).name;
                if (rule.ruleName === 'buyXQtyForYQtyPrice') {
                    const xQty = rule.attributes.find((attr) => attr.name === 'xQty').value;
                    const yQty = rule.attributes.find((attr) => attr.name === 'yQty').value;
                    pricingRules.push('Gets a **' + xQty + ' for ' + yQty + ' deal on ' + productname + 's**');
                } else if (rule.ruleName === 'newUnitPrice') {
                    newPrice = rule.attributes.find((attr) => attr.name === 'newPrice').value;
                    pricingRules.push('Gets a discount on **' + productname + 's where the price drops to $' + newPrice + ' per ad**');
                } else if (rule.ruleName === 'newUnitPriceWithMinQty') {
                    newPrice = rule.attributes.find((attr) => attr.name === 'newPrice').value;
                    const minQty = rule.attributes.find((attr) => attr.name === 'minQty').value;
                    pricingRules.push('Gets a discount on **' + productname + 's when ' + minQty +
                        ' or more** are purchased. The price drops to **$' + newPrice + ' per ad**');
                }
            });
        }
        return pricingRules;
    };

    const pricingRules = setPricingRulesForDisplay(rules, products).map((rule, index) =>
        <div className='col-md-12' key={index}>{rule}</div>
    );

    return (
        <div className='row'>
            {pricingRules}
        </div>
    );
};

PriceRuleList.propTypes = {
    rules: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
};

export default PriceRuleList;
