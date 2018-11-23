import React from 'react';
import PropTypes from 'prop-types';

import AnimateHeight from 'react-animate-height';

const Collapse = ({ children, expanded }) => (
    <AnimateHeight duration={400} height={expanded ? 'auto' : 0}>
        {children}
    </AnimateHeight>
);

Collapse.propTypes = {
    children: PropTypes.node.isRequired,
    expanded: PropTypes.bool.isRequired
};

export default Collapse;
