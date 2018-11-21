const BUY_X_QTY_FOR_Y_QTY_PRICE = 'buyXQtyForYQtyPrice';
const NEW_UNIT_PRICE = 'newUnitPrice';
const NEW_UNIT_PRICE_WITH_MIN_QTY = 'newUnitPriceWithMinQty';

class PriceCalculator {
    static calculateCartItemPrice = (cartItem, rule) => {
        if (cartItem === null || cartItem === undefined) {
            return;
        }

        if (rule  === null || rule === undefined || rule.productId !== cartItem.product.id) {
            cartItem.subTotal = PriceCalculator.multiple(cartItem.product.price, cartItem.quantity);
        } else {
            PriceCalculator.calculateCartItemPriceFromPricingRule(rule, cartItem);
        }
        cartItem.subTotal = Number(cartItem.subTotal.toFixed(2));
        cartItem.discount = Number((PriceCalculator.multiple(cartItem.product.price, cartItem.quantity)- cartItem.subTotal).toFixed(2));
    };

    static calculateCartItemPriceFromPricingRule = (rule, cartItem) => {
        let newPrice = 0;

        if (rule.ruleName === NEW_UNIT_PRICE) {
            newPrice = rule.attributes.find((attr) => attr.name === 'newPrice').value;
            cartItem.subTotal = PriceCalculator.multiple(newPrice, cartItem.quantity);

        } else if (rule.ruleName === NEW_UNIT_PRICE_WITH_MIN_QTY) {
            newPrice = rule.attributes.find((attr) => attr.name === 'newPrice').value;
            const minQty = rule.attributes.find((attr) => attr.name === 'minQty').value;

            cartItem.subTotal = PriceCalculator.multiple(
                (cartItem.quantity >= minQty) ? newPrice : cartItem.product.price, cartItem.quantity);

        } else if (rule.ruleName === BUY_X_QTY_FOR_Y_QTY_PRICE) {
            const xQty = rule.attributes.find((attr) => attr.name === 'xQty').value;
            const yQty = rule.attributes.find((attr) => attr.name === 'yQty').value;

            if (cartItem.quantity < xQty) {
                cartItem.subTotal = PriceCalculator.multiple(cartItem.product.price, cartItem.quantity);
            } else {
                const division = Math.trunc( cartItem.quantity / xQty);
                const remainder = cartItem.quantity % xQty;

                cartItem.subTotal = PriceCalculator.multiple(cartItem.product.price, yQty * division) +
                    PriceCalculator.multiple(cartItem.product.price, remainder);
            }

        } else {
            // Case the rule never defined in the front end system.
            cartItem.subTotal = PriceCalculator.multiple(cartItem.product.price, cartItem.quantity);
        }
    };

    static multiple = (unitPrice, qty) => {
        return unitPrice * qty;
    }
}

export default PriceCalculator;
