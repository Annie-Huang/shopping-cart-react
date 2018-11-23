import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ShoppingCartService from '../../lib/ShoppingCartService';

export class ShoppingCart extends Component {

    render() {
        const children = this.props.basket.cartItems.map((cartItem, index) =>
            <div className='row' key={index}>
                <div className='col-md-2'>{cartItem.product.name}</div>
                <div className='col-md-2'>Unit Price: ${cartItem.product.price}</div>
                <div className='col-md-2'>Quantity: {cartItem.quantity}</div>
                <div className='col-md-2'>Subtotal: ${cartItem.subTotal}</div>
                {cartItem.discount !== 0 && <div className='col-md-2 text-danger'>Discount: ${cartItem.discount}</div>}
            </div>
        );

        return (
            this.props.showBasket &&
            <div className="card">
                <div className="card-header bg-info text-white">
                    <h3 className="card-title">Your Basket:</h3>
                </div>
                <div className="card-body">
                    {children}
                    <br/>
                    <div className='row'>
                        <div className='col-md-12'>
                        <h3 className="card-title">Total: ${this.props.basket.total}</h3>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-lg btn-primary">Checkout</button>
                </div>
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    basket: PropTypes.object.isRequired,
    showBasket: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    basket: (state.user.id ?
        ShoppingCartService.calculateCart(state.cartItems, state.user.pricingRules) :
        {cartItems: state.cartItems, total: 0}
    ),
    showBasket: state.cartItems.length > 0
});

export default connect(mapStateToProps, null)(ShoppingCart);
