import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        {props.isAuth ?<NavItem link="/orders" >Orders</NavItem>:null}
        {!props.isAuth
        ? <NavItem link="/auth" >Sign up / Login</NavItem>
        : <NavItem link="/logout" >Logout</NavItem>
        }
    </ul>
);

export default navItems;