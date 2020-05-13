import React from 'react';
import classes from './HamburgerToggle.module.css';

const hamburgerToggle = (props) => {

    return (
        <div className={classes.Hamburger} onClick={props.clicked}>
            <div className={classes.Hamburger__middle}></div>
        </div>
    );
};

export default hamburgerToggle;