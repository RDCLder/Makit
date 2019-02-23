const actionAddIngredient = (ingredient) => {
    return {
        type: "ADD_INGREDIENT",
        ingredient: ingredient
    };
}

export default actionAddIngredient;