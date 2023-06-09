export const recipeReducer = (state, action) => {
    const {type, payload: {recipesIngre, recipesPopular, recipesFollow, singleRecipe, myRecipe, recipeOfUser, recipeId, recipeList}} = action
    switch(type){
        case 'GET_RECIPE_BY_INGREDIENT':
            return {
                ...state,
                recipeIngreLoading: false,
                recipesIngre,
            }
        case 'GET_RECIPE_POPULAR':
            return {
                ...state,
                recipePopularLoading: false,
                recipesPopular,
            }
        case 'GET_RECIPE_FOLLOW':
            return {
                ...state,
                recipeFollowLoading: false,
                recipesFollow,
            }
        case 'GET_SINGLE_RECIPE':
            return {
                ...state,
                singleRecipeLoading: false,
                singleRecipe,
            }
        case 'GET_MY_RECIPE':
            return {
                ...state,
                myRecipeLoading: false,
                myRecipe,
            }
        case 'GET_RECIPE_BY_USERID':
            return {
                ...state,
                recipeOfUserLoading: false,
                recipeOfUser,
            }
        case 'SET_RECIPE_ID':
            return {
                ...state,
                recipeId
            }
        case 'GET_MY_RECIPE_LIST':
            return {
                ...state,
                recipeList
            }
        default:
            return state
    }
}