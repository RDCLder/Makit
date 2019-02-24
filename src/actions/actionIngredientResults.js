const actionIngredientResults = (source, ingredients) => {
    return {
        type: "INGREDIENT_RESULTS",
        source: source,
        ingredients: ingredients
    };
};

export default actionIngredientResults;