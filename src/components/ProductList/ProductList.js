import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as shoppingCartActions from '../../actions/shoppingCartActions';

export class ProductList extends Component {
    updateItemInCart = data => {
        this.props.updateItemInCart(data);
    };

    render() {
        const children = this.props.products.map(product =>
            <div className="card" key={product.id}>
                <div className="card-header text-center text-white bg-primary">
                    <h4 className="card-title">{product.name}</h4>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-3'>Price:</div>
                        <div className='col-md-7'>${product.price}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="button"
                            className="btn btn-primary"
                            onClick={()=>this.updateItemInCart({product, quantity: 1})}
                    >
                        Add 1 item
                    </button>
                    &nbsp;&nbsp;
                    {product.productInCart &&
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => this.updateItemInCart({product, quantity: -1})}
                        >
                            Remove 1 item
                        </button>
                    }
                </div>
            </div>
        );

        return (
            this.props.showProductList &&
            <React.Fragment>
                <div className="card-deck">
                    {children}
                </div>
                <br/>
            </React.Fragment>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    showProductList: PropTypes.bool.isRequired,
    updateItemInCart: PropTypes.func.isRequired
};

export const updateProductsWithInCartInfo = (products, cartItems) => {
    const updatedProducts = [];
    products.forEach(product => {
        const matchCartItem = cartItems.find((cartItem) => cartItem.product.id === product.id);
        updatedProducts.push({...product, productInCart: !!matchCartItem});
    });

    return updatedProducts;
};

const mapStateToProps = (state) => ({
    products: updateProductsWithInCartInfo(state.products, state.cartItems),
    showProductList: !!state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
    updateItemInCart: data => dispatch(shoppingCartActions.updateItemInCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
