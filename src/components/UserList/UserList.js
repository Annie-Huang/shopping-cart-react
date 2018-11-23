import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import PriceRuleList from './components/PriceRuleList/PriceRuleList';
import Collapse from '../Common/Collapse/Collapse';

export class UserList extends Component {
    selectUser = (event) => {
        this.props.loadUser(event.target.value);
    };

    reset = () => {
        this.props.loadUser('default');
    };

    render() {
        const userIds = ['Apple', 'Ford', 'Nike', 'Unilever'].map(userId =>
            <button key={userId}
                    value={userId}
                    type="button"
                    className="btn btn-outline-primary"
                    disabled={this.props.buttonDisable}
                    onClick={this.selectUser}
            >
                {userId}
            </button>
        );

        const { name, pricingRules } = this.props.user;
        const { products } = this.props;

        return (
            <div>
                <Collapse expanded={!name}>
                    <h2>Please select a user</h2>
                </Collapse>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className="d-flex flex-row justify-content-between my-flex-container">
                            {userIds}
                            <button type="button" className="btn btn-outline-danger" onClick={this.reset}>Reset</button>
                        </div>
                    </div>
                </div>

                <br/>
                {name &&
                    <div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h2>
                                    Welcome {name}, please pick your Ad from our wonderful selection...
                                </h2>
                            </div>
                        </div>
                        <PriceRuleList products={products} rules={pricingRules}/>
                    </div>
                }
                <br/>
            </div>
        )
    }
}

UserList.propTypes = {
    products: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    buttonDisable: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    products: state.products,
    user: state.user,
    buttonDisable: !!state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: userId => dispatch(userActions.loadUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
