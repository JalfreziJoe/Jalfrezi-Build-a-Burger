import React, { Component } from "react";
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad:1,
            cheese:1,
            patty:2,
            bacon:0
        },
        price:0
    }

    componentDidMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let params of query.entries()) {
            if (params[0] === 'price')
                this.setState({price:params[1]});
            else
                ingredients[params[0]] = +params[1];
        }
        //console.log(ingredients);
        this.setState({ingredients:ingredients});
        //console.log(this.state.ingredients);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary
                 ingredients={this.state.ingredients}
                 checkoutCancelled={this.checkoutCancelledHandler}
                 checkoutContinue={this.checkoutContinueHandler} />
                 <Route path={this.props.match.url+'/contact-data'} render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;