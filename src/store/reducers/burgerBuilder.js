import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 3.5,
    error: false
};

const INGREDIENT_PRICES = { 
    salad: 1,
    cheese: 1,
    bacon: 1,
    meat: 1
};

// const PRICE_BASE = 3.5;


const reducer = ( state = initialState, action ) => {
    // console.log( state, action );
    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[ action.ingredientName ]
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;