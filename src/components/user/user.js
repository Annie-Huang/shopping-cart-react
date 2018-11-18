import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';

class User extends Component {
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
                    className="btn btn-primary"
                    disabled={this.props.buttonDisable}
                    onClick={this.selectUser}
            >
                {userId}
            </button>
        );

        const pricingRules = this.props.pricingRules.map((rule, index) =>
            <span key={index}>{rule}</span>
        );

        return (
            <div>
                {!this.props.user.name && <h2>Please select a user</h2>}
                <div className="d-flex flex-row justify-content-around my-flex-container">
                    {userIds}
                    <button type="button" className="btn btn-danger" onClick={this.reset}>Reset</button>
                </div>

                <br/>
                {this.props.user.name &&
                    <div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h2>
                                    Welcome {this.props.user.name}, please pick your Ad from our wonderful selection...
                                </h2>
                            </div>
                        </div>
                        <div className='row' id="pricingRulesMsg">
                            {pricingRules}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

User.propTypes = {
    products: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    buttonDisable: PropTypes.bool.isRequired,
    pricingRules: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired
};

const setPricingRulesForDisplay = (rules, products) => {
    let pricingRules = [];
    if (rules) {
        rules.forEach(rule => {
            let newPrice;
            const productname = products.find((product) => product.id === rule.productId).name;
            if (rule.ruleName === 'buyXQtyForYQtyPrice') {
                const xQty = rule.attributes.find((attr) => attr.name === 'xQty').value;
                const yQty = rule.attributes.find((attr) => attr.name === 'yQty').value;
                pricingRules.push('Gets a **' + xQty + ' for ' + yQty + ' deal on ' + productname + 's**');
            } else if (rule.ruleName === 'newUnitPrice') {
                newPrice = rule.attributes.find((attr) => attr.name === 'newPrice').value;
                pricingRules.push('Gets a discount on **' + productname + 's where the price drops to $' + newPrice + ' per ad**');
            } else if (rule.ruleName === 'newUnitPriceWithMinQty') {
                newPrice = rule.attributes.find((attr) => attr.name === 'newPrice').value;
                const minQty = rule.attributes.find((attr) => attr.name === 'minQty').value;
                pricingRules.push('Gets a discount on **' + productname + 's when ' + minQty +
                    ' or more** are purchased. The price drops to **$' + newPrice + ' per ad**');
            }
        });
    }
    return pricingRules;
};

const mapStateToProps = (state) => ({
    products: state.products,
    user: state.user,
    buttonDisable: !!state.user.id,
    pricingRules: setPricingRulesForDisplay(state.user.pricingRules, state.products)
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: userId => dispatch(userActions.loadUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
