import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxillery/Auxillery';
import Backdrop from '../../ui/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open)
        attachedClasses = [classes.SideDrawer, classes.Open];
    return (
        <Aux>
            <Backdrop visible={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems
                    isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );

};

export default sideDrawer;