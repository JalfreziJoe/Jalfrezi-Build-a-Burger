import React,{ Component } from "react";
import Aux from '../../hoc/Auxillery';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            patty: 1
        }
    }
    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Tools</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;