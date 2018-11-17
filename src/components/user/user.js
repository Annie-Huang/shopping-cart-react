import React, {Component} from 'react';
import{connect} from 'react-redux';
import * as userActions from "../../actions/userActions";

class User extends Component {
    state = {
        userId: null,
        buttonDisable: false
    };

    selectUser = (event) => {
        this.setState({
            userId: event.target.value,
            buttonDisable: true
        });
        this.props.loadUser(event.target.value);
    };

    reset = () => {
        this.setState({
            userId: null,
            buttonDisable: false
        })
    };

    render() {
        const children = ['Apple', 'Ford', 'Nike', 'Unilever'].map(userId =>
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

        return (
            <div>
                <h2>Please select a user</h2>
                <div className="d-flex flex-row justify-content-around my-flex-container">
                    {children}
                    <button type="button" className="btn btn-danger" onClick={this.reset}>Reset</button>
                </div>
                <br/>
                {this.props.user.name && <h4>Selected user: {this.props.user.name}</h4>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    buttonDisable: !!state.user.userId
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: userId => dispatch(userActions.loadUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
