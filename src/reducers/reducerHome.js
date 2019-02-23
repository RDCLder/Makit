
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
                    action.ingredient,
                    ...state.ingredients,
                ]
            };
        case "DELETE_INGREDIENT":
            let index = state.ingredients.indexOf(action.ingredient);
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.splice(index, 1)
                ]
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