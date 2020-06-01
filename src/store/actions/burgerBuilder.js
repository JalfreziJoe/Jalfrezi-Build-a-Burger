import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: ingredientName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://jalfrezi-build-a-burger.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};
