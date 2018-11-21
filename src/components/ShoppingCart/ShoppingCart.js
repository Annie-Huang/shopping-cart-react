import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ShoppingCart extends Component {

    render() {
        const children = this.props.cartItems.map((cartItem, index) =>
            <div className='row' key={index}>
                <div className='col-md-7'>
                    <div className="d-flex flex-row justify-content-between my-flex-container">
                        <div>{cartItem.product.name}</div>
                        <div>Unit Price: ${cartItem.product.price}</div>
                        <div>Quantity: {cartItem.quantity}</div>
                        <div>Subtotal: $269.99</div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="card">
                <div className="card-header bg-info text-white">
                    <h3 className="card-title">Your Basket:</h3>
                </div>
                <div className="card-body">
                    {children}
                    <br/>
                    <div className='row'>
                        <div className='col-md-12'>
                        <h3 className="card-title">Total: $269.99</h3>
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
    cartItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    cartItems: state.cartItems,
});

export default connect(mapStateToProps, null)(ShoppingCart);
