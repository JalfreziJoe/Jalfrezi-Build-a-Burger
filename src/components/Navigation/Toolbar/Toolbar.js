import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Nav from '../NavItems/NavItems';
import HamburgerToggle from '../SideDrawer/HamburgerToggle/HamburgerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerToggle clicked={props.menuClick}/>
        
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Nav isAuth={props.isAuth} />
        </nav>
    </header>
);


export default toolbar;