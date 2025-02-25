import React from 'react';
import './SecondaryButton.css'

const SecondaryButton = ({ children, classes }) => {
    return (
        <button className={`buttonsecondary ${classes}`}>
            {children}
        </button>
    );
};

export default SecondaryButton;