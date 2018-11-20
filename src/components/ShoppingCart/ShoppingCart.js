import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ShoppingCart extends Component {

    render() {
        const cartItems = [1,2,3].map((index) =>
            <div className='row' key={index}>
                <div className='col-md-7'>
                    <div className="d-flex flex-row justify-content-between my-flex-container">
                        <div>Classic Ad</div>
                        <div>Unit Price: $269.99</div>
                        <div>Quantity: 1</div>
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
                    {cartItems}
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
};

export default ShoppingCart;
