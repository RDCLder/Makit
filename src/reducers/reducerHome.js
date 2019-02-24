
const reducerHome = (state, action) => {

    if (state === undefined) {
        return {
            source: {
                type: "",
                link: ""
            },
            ingredients: [],
            recipes: {
                ingredient: "",
                recipes: []
            },
            locations: []
        };
    }

    switch (action.type) {
        case "INGREDIENT_RESULTS":
            return {
                ...state,
                source: {
                    type: action.source.type,
                    link: action.source.link
                },
                ingredients: action.ingredients
            };
        case "ADD_INGREDIENT":
            return {
                ...state,
                ingredients: [
                    action.ingredient,
                    ...state.ingredients
                ]
            };
        case "DELETE_INGREDIENT":
            let newIngredients = state.ingredients.slice();
            let index = newIngredients.indexOf(action.ingredient);
            newIngredients.splice(index, 1);
            return {
                ...state,
                ingredients: newIngredients
                // ingredients: state.ingredients.filter(ingredient => {
                //     return ingredient.id !== action.ingredient.id;
                // })
            };
        case "RECIPE_RESULTS":
            return {
                ...state,
                recipes: action.data
            };
        case "RESET":
            return {
                source: {
                    type: "",
                    link: ""
                },
                ingredients: [],
                recipes: {
                    ingredient: "",
                    recipes: []
                },
                locations: []
            };
        default:
            return state;
    }

}

export default reducerHome;