import React,{ Component } from "react";
import Aux from '../../hoc/Auxillery/Auxillery';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/ui/Spinner/Spinner';
import axios from '../../axios-orders';



const INGREDIENT_COSTS = {
    salad: .5,
    bacon: .99,
    cheese: .5,
    patty: 1.99
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 2,
        readyToOrder: false,
        moveToOrder: false,
        loading:false,
        error:false
    }

    componentDidMount() {
        axios.get('https://jalfrezi-build-a-burger.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data});
            })
            .catch(error => {
                this.setState({error:true})
            });
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
        this.setState({loading:true});
        //console.log('purchase continue');
        const thisOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // not a setup on a production app. Price should be totalled on the backend
            customer: {
                name: 'Mr Hot Spicy',
                address: {
                    address1:'20 Test Street',
                    address2:'Test Village',
                    town: 'Testy Test',
                    county: 'Sussex',
                    postcode: 'TE1 2ST'
                },
                    email: 'test@test.com'
                },
                delivery: 'asap'

            }
        
        axios.post('/orders.json', thisOrder) // the .json is just for firebase DB only
            .then(response =>  {
                this.setState({loading:false, moveToOrder:false})
            })
            .catch(error => {
                this.setState({loading:false, moveToOrder:false})
            });
    }       

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burgerIngredients = this.state.error? <p>ingredients can't be loaded</p>:<Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purschaseContinueHandler}
                price={this.state.totalPrice} />;
            burgerIngredients = (
                <Aux>
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
        if (this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);