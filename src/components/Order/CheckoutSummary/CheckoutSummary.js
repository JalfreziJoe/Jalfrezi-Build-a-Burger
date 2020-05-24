import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../ui/Button/Button';

import classes from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Your custom burger</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger'
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType='Success'
                clicked={props.checkoutContinue}>Confirm</Button>
            
        </div>
    )
}

export default checkoutSummary;