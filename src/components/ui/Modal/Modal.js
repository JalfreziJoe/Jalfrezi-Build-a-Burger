import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillery';

const modal = (props) => (
    <Aux>
        <Backdrop visible={props.visible} clicked={props.modalClosed} />
        <div className={classes.Modal}
        style={{
            transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.visible ? '1':'0'
        }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;