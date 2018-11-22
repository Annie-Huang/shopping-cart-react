import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import Spinner from './components/Common/Spinner/Spinner';
import User from './components/UserList/UserList';
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import * as productActions from './actions/productActions';

export class App extends Component {

    componentDidMount = () => {
        // Need to use loadProducts in App initialization beacause product info is use in
        // both User component's pricing rules list matching as well as Product component.
        this.props.loadProducts();
    };

    render() {
        return (
            <div className='container'>
                <Spinner />
                <User />
                <ProductList />
                <ShoppingCart />
            </div>
        );
    }
}

App.propTypes = {
    loadProducts: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    loadProducts: () => dispatch(productActions.loadProducts())
});

export default connect(null, mapDispatchToProps)(App);
