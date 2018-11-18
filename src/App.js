import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import User from './components/user/user';
import * as productActions from './actions/productActions';

class App extends Component {

    componentDidMount = () => {
        this.props.loadProducts();
    };

    render() {
        return (
            <div className='container'>
                <User />
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
