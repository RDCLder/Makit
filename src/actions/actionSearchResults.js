const actionSearchResults = (source, ingredients) => {
    return {
        type: "SEARCH_RESULTS",
        source: source,
        ingredients: ingredients
    };
};

export default actionSearchResults;