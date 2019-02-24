const actionRecipeResults = (ingredient, recipes) => {
    return {
        type: "RECIPE_RESULTS",
        data: {
            ingredient: ingredient,
            recipes: recipes
        }
    };
};

export default actionRecipeResults;