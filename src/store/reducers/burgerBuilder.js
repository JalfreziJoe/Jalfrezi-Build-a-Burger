import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
};

const INGREDIENT_COSTS = {
    salad: .5,
    bacon: .99,
    cheese: .5,
    patty: 1.99
};

const updateIngredient = (state, action, ingredientAdd=true) => {
    let updatedIngredient, updatePrice;
    if (ingredientAdd) {
        updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]+1};
        updatePrice = state.totalPrice + INGREDIENT_COSTS[action.ingredientName];
    }
    else {
        updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]-1};
        updatePrice = state.totalPrice - INGREDIENT_COSTS[action.ingredientName];
    }

    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: updatePrice,
        building: true
    }
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice:2,
        building:false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return updateIngredient(state, action, true);
        case actionTypes.REMOVE_INGREDIENTS: return updateIngredient(state, action, false);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default reducer;