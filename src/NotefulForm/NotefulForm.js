import React from 'react';
import PropTypes from 'prop-types';
import './NotefulForm.css';

export default function NotefulForm(props) {
    const {className, ...otherProps} = props
    return (
        <form   
            className = {['notefulForm', className].join(' ')}
            action = '#'
            {...otherProps}
        />  
    )
}

NotefulForm.propTypes = {
    className: PropTypes.string.isRequired
};