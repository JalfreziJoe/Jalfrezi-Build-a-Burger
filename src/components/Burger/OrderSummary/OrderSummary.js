import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillery/Auxillery';
import Button from '../../ui/Button/Button';


class OrderSummary extends Component {

    // This component could be a functional.
    componentDidUpdate() {
        console.log('[Order Summary] didupdate');
    }

    render() {
        const summary = Object.keys(this.props.ingredients)
            .map( key => {
                return (
                    <li key={key}><span style={{textTransform: 'capitalize'}}>{key}:</span> {this.props.ingredients[key]}</li>
                );
            });
        return (
            <Aux>
                <h3>Your Jalfrezi Burger</h3>
                <p>Added the following ingredients:</p>
                <ul>
                    {summary}
                </ul>
                <p>Total cost: <span style={{fontWeight:'bold'}}>{this.props.price.toFixed(2)}</span></p>
                <p>Happy with your order?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>Go back</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Order</Button>
            </Aux>
        )
    }
}

export default OrderSummary;