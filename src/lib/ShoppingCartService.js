import sumby from 'lodash.sumby';
import PriceCalculator from './PriceCalculator';

class ShoppingCartService {
    static calculateCart = (cartItems, rules) => {
        cartItems.forEach(cartItem => {
            const rule = rules ?
                rules.find((pricingRule) => pricingRule.productId === cartItem.product.id) : null;
            PriceCalculator.calculateCartItemPrice(cartItem, rule);
        });

        return {
            cartItems,
            total: Number(sumby(cartItems, 'subTotal').toFixed(2))
        }
    };
}

export default ShoppingCartService;
