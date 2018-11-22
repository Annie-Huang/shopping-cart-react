import PriceCalculator from './PriceCalculator';

declare var require: any;

describe('PriceCalculator', () => {
    const products = require('../resources/fixtures/products.json');
    const priceRules = require('../resources/fixtures/pricing-rules.json');
    let product;
    let ruleBuyXQtyForYQtyPrice;
    let ruleNewUnitPrice;
    let ruleNewUnitPriceWithMinQty;

    beforeEach(() => {
        product = products[0];
        ruleBuyXQtyForYQtyPrice = priceRules[0];
        ruleNewUnitPrice = priceRules[1];
        ruleNewUnitPriceWithMinQty = priceRules[2];
    });

    it('#calculateCartItemPrice should do nothing if cartItem is null', () => {
        const cartItem = null;
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPrice);
        expect(cartItem).toBeNull();
    });

    it('#calculateCartItemPrice should do nothing if cartItem is undefined', () => {
        const cartItem = undefined;
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPrice);
        expect(cartItem).not.toBeDefined();
    });

    it('#calculateCartItemPrice should calculate existing unit price * quantity as the subtotal price if pricingRule is null', () => {
        const cartItem = {
            product: product,
            quantity: 2,
        };
        cartItem.product.price = 100;
        PriceCalculator.calculateCartItemPrice(cartItem, null);
        expect(cartItem.subTotal).toBe(200);
        expect(cartItem.discount).toBe(0);
    });

    it('#calculateCartItemPrice should calculate existing unit price * quantity as the subtotal price if pricingRule is undefined', () => {
        const cartItem = {
            product: product,
            quantity: 2,
        };
        cartItem.product.price = 100;
        PriceCalculator.calculateCartItemPrice(cartItem, undefined);
        expect(cartItem.subTotal).toBe(200);
        expect(cartItem.discount).toBe(0);
    });

    it('#calculateCartItemPrice should calculate existing unit price * quantity as the subtotal price if ' +
        'productId in pricingRule does not match cartItem.product.id', () => {
        const cartItem = {
            product: product,
            quantity: 2,
        };
        cartItem.product.price = 100;
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPrice);
        expect(cartItem.subTotal).toBe(200);
        expect(cartItem.discount).toBe(0);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is newUnitPrice', () => {
        const cartItem = {
            product: product,
            quantity: 2,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleNewUnitPrice.productId;
        ruleNewUnitPrice.attributes[0].value = 80;
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPrice);
        expect(cartItem.subTotal).toBe(160);
        expect(cartItem.discount).toBe(40);
    });

    it('#calculateCartItemPrice should calculate the existing unit price * quantity as the subtotal price if ' +
        'pricingRule is ruleNewUnitPriceWithMinQty and cartItem quantity < minQty', () => {
        const cartItem = {
            product: product,
            quantity: 2,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleNewUnitPriceWithMinQty.productId;
        ruleNewUnitPriceWithMinQty.attributes[0].value = 5; // minQty
        ruleNewUnitPriceWithMinQty.attributes[1].value = 80; // newPrice
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPriceWithMinQty);
        expect(cartItem.subTotal).toBe(200);
        expect(cartItem.discount).toBe(0);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is ruleNewUnitPriceWithMinQty and cartItem quantity = minQty', () => {
        const cartItem = {
            product: product,
            quantity: 2,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleNewUnitPriceWithMinQty.productId;
        ruleNewUnitPriceWithMinQty.attributes[0].value = 2; // minQty
        ruleNewUnitPriceWithMinQty.attributes[1].value = 80; // newPrice
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPriceWithMinQty);
        expect(cartItem.subTotal).toBe(160);
        expect(cartItem.discount).toBe(40);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is ruleNewUnitPriceWithMinQty and cartItem quantity > minQty', () => {
        const cartItem = {
            product: product,
            quantity: 3,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleNewUnitPriceWithMinQty.productId;
        ruleNewUnitPriceWithMinQty.attributes[0].value = 2; // minQty
        ruleNewUnitPriceWithMinQty.attributes[1].value = 80; // newPrice
        PriceCalculator.calculateCartItemPrice(cartItem, ruleNewUnitPriceWithMinQty);
        expect(cartItem.subTotal).toBe(240);
        expect(cartItem.discount).toBe(60);
    });

    it('#calculateCartItemPrice should calculate the existing unit price * quantity as the subtotal price if ' +
        'pricingRule is buyXQtyForYQtyPrice and cartItem quantity < xQty', () => {
        const cartItem = {
            product: product,
            quantity: 3,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleBuyXQtyForYQtyPrice.productId;
        ruleBuyXQtyForYQtyPrice.attributes[0].value = 5; // xQty
        ruleBuyXQtyForYQtyPrice.attributes[1].value = 4; // yQty
        PriceCalculator.calculateCartItemPrice(cartItem, ruleBuyXQtyForYQtyPrice);
        expect(cartItem.subTotal).toBe(300);
        expect(cartItem.discount).toBe(0);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is buyXQtyForYQtyPrice and cartItem quantity = xQty', () => {
        const cartItem = {
            product: product,
            quantity: 5,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleBuyXQtyForYQtyPrice.productId;
        ruleBuyXQtyForYQtyPrice.attributes[0].value = 5; // xQty
        ruleBuyXQtyForYQtyPrice.attributes[1].value = 4; // yQty
        PriceCalculator.calculateCartItemPrice(cartItem, ruleBuyXQtyForYQtyPrice);
        expect(cartItem.subTotal).toBe(400);
        expect(cartItem.discount).toBe(100);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is buyXQtyForYQtyPrice and xQty < cartItem quantity > (2 * xQty)', () => {
        const cartItem = {
            product: product,
            quantity: 9,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleBuyXQtyForYQtyPrice.productId;
        ruleBuyXQtyForYQtyPrice.attributes[0].value = 5; // xQty
        ruleBuyXQtyForYQtyPrice.attributes[1].value = 4; // yQty
        PriceCalculator.calculateCartItemPrice(cartItem, ruleBuyXQtyForYQtyPrice);
        expect(cartItem.subTotal).toBe(800);
        expect(cartItem.discount).toBe(100);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is buyXQtyForYQtyPrice and cartItem quantity = (2 * xQty)', () => {
        const cartItem = {
            product: product,
            quantity: 10,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleBuyXQtyForYQtyPrice.productId;
        ruleBuyXQtyForYQtyPrice.attributes[0].value = 5; // xQty
        ruleBuyXQtyForYQtyPrice.attributes[1].value = 4; // yQty
        PriceCalculator.calculateCartItemPrice(cartItem, ruleBuyXQtyForYQtyPrice);
        expect(cartItem.subTotal).toBe(800);
        expect(cartItem.discount).toBe(200);
    });

    it('#calculateCartItemPrice should calculate the new unit price * quantity as the subtotal price if ' +
        'pricingRule is buyXQtyForYQtyPrice and cartItem quantity > (3 * xQty)', () => {
        const cartItem = {
            product: product,
            quantity: 18,
        };
        cartItem.product.price = 100;
        cartItem.product.id = ruleBuyXQtyForYQtyPrice.productId;
        ruleBuyXQtyForYQtyPrice.attributes[0].value = 5; // xQty
        ruleBuyXQtyForYQtyPrice.attributes[1].value = 4; // yQty
        PriceCalculator.calculateCartItemPrice(cartItem, ruleBuyXQtyForYQtyPrice);
        expect(cartItem.subTotal).toBe(1500);
        expect(cartItem.discount).toBe(300);
    });

    it('#calculateCartItemPrice should calculate the existing unit price * quantity as the subtotal price if ' +
        'pricingRule is not recognize in the system', () => {
        const cartItem = {
            product: product,
            quantity: 18,
        };
        cartItem.product.price = 100;
        const unknownRule = priceRules[0];
        unknownRule.ruleName = 'abc';
        cartItem.product.id = ruleBuyXQtyForYQtyPrice.productId;
        PriceCalculator.calculateCartItemPrice(cartItem, unknownRule);
        expect(cartItem.subTotal).toBe(1800);
        expect(cartItem.discount).toBe(0);
    });
});
