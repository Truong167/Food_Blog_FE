export const ingredientReducer = (state, action) => {
    const { type, payload: {name, ingredients, searchResult} } = action
    switch(type) {
        case 'GET_INGREDIENT':
            return {
                ...state,
                ingredientLoading: false,
                name,
                ingredients
            }
        case 'SET_NAME_INGREDIENT':
            return {
                ...state,
                ingredientLoading: false,
                name,
            }
        case 'SEARCH_INGREDIENT':
            return {
                ...state,
                searchLoading: false,
                searchResult,
            }
        default:
            return state
    }
}