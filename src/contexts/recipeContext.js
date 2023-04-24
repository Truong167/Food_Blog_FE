import axios from "axios"
import {recipeReducer} from '../reducers/recipeReducer'
import { createContext, useContext, useEffect, useReducer } from "react"
import { apiUrl } from "../utils/constant"
import { useIngredientsContext } from "./ingredientContext"
import useAuth from "../hooks/useAuth"


const initialState = {
    recipesIngre: [],
    recipeIngreLoading: false,
    recipesPopular: [],
    recipePopularLoading: false,
    recipesFollow: [],
    recipeFollowLoading: false,
    singleRecipe: {},
    singleRecipeLoading: true,
    myRecipe: [],
    myRecipeLoading: false,
    recipeOfUser: [],
    recipeOfUserLoading: true
}

const RecipeContext = createContext()
const RecipeContextProvider = ({children}) => {
    const {authState, getUser} = useAuth()
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
      console.log(id)
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

    const fetchMyRecipe = async () => {
      try {
          const result = await axios.get(`${apiUrl}/recipe/getRecipeByUserId`)
          console.log(result)
          if(result.data.success){
            dispatch({
              type: 'GET_MY_RECIPE',
              payload: {myRecipe: result.data.data}
            })
          }
        } catch (error) {
          dispatch({
              type: 'GET_MY_RECIPE',
              payload: {myRecipe: []}
            })   
        }
      }

      const fetchRecipeByUserId = async (id) => {
        try {
            const result = await axios.get(`${apiUrl}/recipe/getRecipeByUserId1/${id}`)
            console.log(result)
            if(result.data.success){
              dispatch({
                type: 'GET_RECIPE_BY_USERID',
                payload: {recipeOfUser: result.data.data}
              })
            }
          } catch (error) {
            dispatch({
                type: 'GET_RECIPE_BY_USERID',
                payload: {recipeOfUser: []}
              })   
          }
        }

    const createRecipe = async data => {
      console.log(data)
      try {
        const result = await axios.post(`${apiUrl}/recipe/createRecipe1`, data)
        if(result.data.success){
          return result.data
        }
      } catch (error) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
    }

    const updateRecipe = async (id, data) => {
      console.log(id)
      try {
        const result = await axios.put(`${apiUrl}/recipe/updateRecipe1/${id}`, data)
        if(result.data.success) {
          return result.data
        }
      } catch (error) {
        console.log(error)
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
    }

    const updatePrivacy = async (id, status) => {
      console.log(id, status)
      try {
        const result = await axios.put(`${apiUrl}/recipe/updatePrivacyRecipe/${id}`, {status})
        console.log(result)
        if(result.data.success){
          await fetchMyRecipe()
          return result.data
        }
      } catch (error) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
    }

    const deleteRecipe = async (id) => {
      console.log(id)
      try {
        const result = await axios.delete(`${apiUrl}/recipe/deleteRecipe/${id}`)
        console.log(result)
        if(result.data.success){
          await fetchMyRecipe()
          await getUser(authState.user.userId)
          return result.data
        }
      } catch (error) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
    }

    const handleLike = async (id, type = 'main', userId = '') => {
      console.log(id)
      try {
        const result = await axios.post(`${apiUrl}/favorite/create/${id}`)
        if(result.data.success){
          if(type === 'main') {
            fetchRecipePopular()
            fetchRecipeFollow()
            fetchRecipesIngre(name)
          } else {
            if(userId){
              fetchRecipeByUserId(userId)
            } else {
              fetchMyRecipe()
            }
          }
          return result.data
        }
      } catch (error) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
    }

    const handleDisLike = async (id, type = 'main', userId = '') => {
      console.log(id)
      try {
        const result = await axios.delete(`${apiUrl}/favorite/delete/${id}`)
        if(result.data.success){
          if(type === 'main') {
            fetchRecipePopular()
            fetchRecipeFollow()
            fetchRecipesIngre(name)
          } else {
            if(userId){
              fetchRecipeByUserId(userId)
            } else {
              fetchMyRecipe()
            }
          }
          return result.data
        }
      } catch (error) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
      }
    }

    useEffect(() => {
        fetchRecipePopular()
        fetchRecipeFollow()
    }, [])

    useEffect(() => {
        fetchRecipesIngre(name)
    }, [name])


    const recipeContextData = {
      ...recipeState, 
      fetchSingleRecipe, 
      createRecipe, 
      fetchRecipeByUserId, 
      updatePrivacy, 
      deleteRecipe, 
      handleLike, 
      handleDisLike, 
      fetchMyRecipe,
      updateRecipe
    }

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