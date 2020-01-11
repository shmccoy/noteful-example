import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button(props) {
    const {button, className, children, ...otherProps} = props;
    return React.createElement(
        props.button,
        {
            className: ['button', props.className].join(' '),
            ...otherProps
        },
        props.children
    )
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};