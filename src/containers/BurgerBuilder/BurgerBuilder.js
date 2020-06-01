import React,{ Component } from "react";
import Aux from '../../hoc/Auxillery/Auxillery';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/ui/Spinner/Spinner';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';





class BurgerBuilder extends Component {

    state = {

       
        moveToOrder: false,
        
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    readyToOrderState (ingredients) {
        //const ingredients = this.props.ings;
        const sum = Object.keys(ingredients)
            .map (key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //this.setState({readyToOrder: sum >0});
        console.log(sum>0);
        return sum >0;
    }

    
    purchaseHandler = () => {
        this.setState({moveToOrder:true});
    }

    purchaseCancelHandler = () => {
        this.setState({moveToOrder:false});
    }

    purschaseContinueHandler= () => {
        // const ingredientParam = [];
        // for (let i in this.state.ingredients) {
        //     ingredientParam.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.props.ings[i]));
        // }
        // ingredientParam.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice));
        // const ingredientParamString = ingredientParam.join('&');
        // this.props.history.push({pathname:'/checkout', search:'?'+ingredientParamString});
        this.props.onInitPurchase();
         this.props.history.push('/checkout');
    }       

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burgerIngredients = this.props.error? <p>ingredients can't be loaded</p>:<Spinner />;

        if (this.props.ings) {
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purschaseContinueHandler}
                price={this.props.price} />;
            burgerIngredients = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        readyToOrder={!this.readyToOrderState(this.props.ings)}
                        onOrder={this.purchaseHandler}
                    />
                </Aux>
            );
        }
        
        return(
            <Aux>
                <Modal visible={this.state.moveToOrder} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerIngredients}
            </Aux>
        );
    }
}

const mapState = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error,
        price: state.burgerBuilder.totalPrice
    };
};

const mapDispatch = (dispatch) =>{
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseOrderInit())
    }
}

export default connect(mapState, mapDispatch)(withErrorHandler(BurgerBuilder, axios));