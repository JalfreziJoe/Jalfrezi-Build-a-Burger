import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillery/Auxillery';

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.visible !== this.props.visible;
    }

    componentDidUpdate( ){
        console.log('[Modal] didupdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop visible={this.props.visible} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                style={{
                    transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.visible ? '1':'0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;