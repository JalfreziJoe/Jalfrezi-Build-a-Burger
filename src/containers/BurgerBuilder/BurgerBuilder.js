import React,{ Component } from "react";
import Aux from '../../hoc/Auxillery/Auxillery';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_COSTS = {
    salad: .5,
    bacon: .99,
    cheese: .5,
    patty: 1.99
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            patty: 0
        },
        totalPrice: 2,
        readyToOrder: false,
        moveToOrder: false
    }

    readyToOrderState (ingredients) {

        const sum = Object.keys(ingredients)
            .map (key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({readyToOrder: sum >0});
    }

    addedIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const newIngredientCount = oldIngredientCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newIngredientCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + INGREDIENT_COSTS[type];
        this.setState({ingredients:updatedIngredients, totalPrice:newTotalPrice});
        this.readyToOrderState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <= 0)
            return;
        const newIngredientCount = oldIngredientCount -1;
        
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newIngredientCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - INGREDIENT_COSTS[type];
        this.setState({ingredients:updatedIngredients, totalPrice:newTotalPrice});
        this.readyToOrderState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({moveToOrder:true});
    }

    purchaseCancelHandler = () => {
        this.setState({moveToOrder:false});
    }

    purschaseContinueHandler= () => {
        console.log('purchase continue');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal visible={this.state.moveToOrder} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purschaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addedIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    readyToOrder={!this.state.readyToOrder}
                    onOrder={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;