import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react'


export class Spinner extends Component{
    render() {
        return (
            this.props.isLoading ?
                <Dimmer active inverted>
                    <Loader size='large' active>Loading</Loader>
                </Dimmer>
                : null
        )
    }
}

Spinner.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isLoading: state.ajaxCallsInProgress > 0
});

export default connect(mapStateToProps, null)(Spinner);
