const actionDeleteIngredient = (ingredient) => {
    return {
        type: "DELETE_INGREDIENT",
        ingredient: ingredient
    };
}

export default actionDeleteIngredient;