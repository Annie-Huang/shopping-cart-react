import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as shoppingCartActions from '../../actions/shoppingCartActions';

class ProductList extends Component {
    addItem = product => {
        this.props.addProductIntoCart(product);
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
                            onClick={()=>this.addItem(product)}
                    >
                        Add 1 item
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-secondary">Remove 1 item</button>
                </div>
            </div>
        );

        // (this.props.showProductList &&
        return (
            (true &&
                <React.Fragment>
                    <div className="card-deck">
                        {children}
                    </div>
                    <br/>
                </React.Fragment>
            )
        )
    }
}
ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    showProductList: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.products,
    showProductList: !!state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
    addProductIntoCart: product => dispatch(shoppingCartActions.addProductIntoCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
