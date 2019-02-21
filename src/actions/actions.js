const actionAddImage = () => {
    return {
        type: "ADD_IMAGE",
    };
}

const actionAddVideo = () => {
    return {
        type: "ADD_VIDEO",
    };
}

const actionAddIngredient = (ingredientName) => {
    return {
        type: "ADD_INGREDIENT",
        ingredientName: ingredientName
    };
}

const actionDeleteIngredient = (ingredientName) => {
    return {
        type: "DELETE_INGREDIENT",
        ingredientName: ingredientName
    };
}

const actionReset = () => {
    return {
        type: "RESET"
    };
}

export {
    actionAddImage,
    actionAddVideo,
    actionAddIngredient,
    actionDeleteIngredient,
    actionReset
};