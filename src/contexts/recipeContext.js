import axios from "axios"
import {recipeReducer} from '../reducers/recipeReducer'
import { createContext, useContext, useEffect, useReducer } from "react"
import { apiUrl } from "../utils/constant"
import { useIngredientsContext } from "./ingredientContext"


const initialState = {
    recipesIngre: [],
    recipeIngreLoading: false,
    recipesPopular: [],
    recipePopularLoading: false,
    recipesFollow: [],
    recipeFollowLoading: false,
    singleRecipe: {},
    singleRecipeLoading: true,
}

const RecipeContext = createContext()
const RecipeContextProvider = ({children}) => {
    const {ingredientState: {name, ingredientLoading}} = useIngredientsContext()
    const [recipeState, dispatch] = useReducer(recipeReducer, initialState)
    const fetchRecipesIngre = async (name) => {
        try {
            if(!ingredientLoading) {
                const result = await axios.get(`${apiUrl}/recipe/getRecipeByIngredient/${name}`)
                dispatch({
                    type: 'GET_RECIPE_BY_INGREDIENT',
                    payload: {recipesIngre: result.data.data}
                })
            }
          } catch (error) {
            dispatch({
                type: 'GET_RECIPE_BY_INGREDIENT',
                payload: {recipesIngre: []}
            })   
          }
    }

    const fetchRecipePopular = async () => {
        try {
            const result = await axios.get(`${apiUrl}/recipe/getPopularRecipe`)
            if(result.data.success){
              dispatch({
                type: 'GET_RECIPE_POPULAR',
                payload: {recipesPopular: result.data.data}
              })
            }
          } catch (error) {
              dispatch({
                type: 'GET_RECIPE_POPULAR',
                payload: {recipesPopular: []}
              })    
          }
    }

    const fetchRecipeFollow = async () => {
        try {
            const result = await axios.get(`${apiUrl}/recipe/getRecipeFromFollowers`)
            if(result.data.success){
              dispatch({
                type: 'GET_RECIPE_FOLLOW',
                payload: {recipesFollow: result.data.data}
              })
            }
          } catch (error) {
                dispatch({
                    type: 'GET_RECIPE_FOLLOW',
                    payload: {recipesFollow: []}
                })   
          }
    }

    const fetchSingleRecipe = async (id) => {
        try {
            const result = await axios.get(`${apiUrl}/recipe/getRecipe/${id}`)
            if(result.data.success){
              dispatch({
                type: 'GET_SINGLE_RECIPE',
                payload: {singleRecipe: result.data.data}
              })
            }
          } catch (error) {
            dispatch({
                type: 'GET_SINGLE_RECIPE',
                payload: {singleRecipe: {}}
              })   
          }
    }

    const createRecipe = async data => {
      console.log(data)
      try {
        const result = await axios.post(`${apiUrl}/recipe/createRecipe1`, data)
        if(result.data.success){
          alert('Thêm công thức thành công')
          return true
        }
      } catch (error) {
        alert(`Thêm công thức thất bại: ${error.response.data.message}`)
        console.log(error)
      }
    }

    useEffect(() => {
        fetchRecipePopular()
        fetchRecipeFollow()
    }, [])

    useEffect(() => {
        fetchRecipesIngre(name)
    }, [name])


    const recipeContextData = { ...recipeState, fetchSingleRecipe, createRecipe }

    return (
        <RecipeContext.Provider value={recipeContextData}>
            {children}
        </RecipeContext.Provider>
    )
}

export default RecipeContextProvider

export const useRecipesContext = () => {
    return useContext(RecipeContext)
}