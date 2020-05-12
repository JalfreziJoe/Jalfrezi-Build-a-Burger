import React from 'react';
import Aux from '../../../hoc/Auxillery';
import Button from '../../ui/Button/Button';


const orderSummary = (props) => {
    const summary = Object.keys(props.ingredients)
        .map( key => {
            return (
                <li key={key}><span style={{textTransform: 'capitalize'}}>{key}:</span> {props.ingredients[key]}</li>
            );
        });
    return (
        <Aux>
            <h3>Your Jalfrezi Burger</h3>
            <p>Added the following ingredients:</p>
            <ul>
                {summary}
            </ul>
            <p>Total cost: <span style={{fontWeight:'bold'}}>{props.price.toFixed(2)}</span></p>
            <p>Happy with your order?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Go back</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Order</Button>
        </Aux>
    )
};

export default orderSummary;