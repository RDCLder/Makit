
const reducerHome = (state, action) => {

    if (state === undefined) {
        return {
            source: {
                type: "",
                link: ""
            },
            ingredients: [],
            recipes: [],
            locations: []
        };
    }

    switch (action.type) {
        case "SEARCH_RESULTS":
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
                    ...state.ingredients,
                    action.ingredient
                ]
            };
        case "DELETE_INGREDIENT":
            let newIngredients = [...state.ingredients];
            let index = newIngredients.indexOf(action.ingredient);
            // newIngredients.splice(index, 1);
            return {
                ...state,
                ingredients: newIngredients
            };
        case "RESET":
            return {
                source: {
                    type: "",
                    link: ""
                },
                ingredients: [],
                recipes: [],
                locations: []
            };
        default:
            return state;
    }

}

export default reducerHome;