import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ProductList extends Component {

    render() {
        const children = this.props.products.map(product =>
            <div className="card">
                <div className="card-header text-xl-center">{product.name}</div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-3'>Price:</div>
                        <div className='col-md-7'>${product.price}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-primary">Add 1 item</button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-secondary">Remove 1 item</button>
                </div>
            </div>
        );

        return (
            (this.props.showProductList &&
                <div className="card-deck">
                    {children}
                </div>
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

export default connect(mapStateToProps, null)(ProductList);
