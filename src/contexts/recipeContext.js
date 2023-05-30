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
    recipeOfUserLoading: true,
    recipeId: '',
    recipeList: []
}

const RecipeContext = createContext()
const RecipeContextProvider = ({children}) => {
    const {authState, getUser} = useAuth()
    const {ingredientState: {name, ingredientLoading}} = useIngredientsContext()
    const [recipeState, dispatch] = useReducer(recipeReducer, initialState)
    const fetchRecipesIngre = async (name) => {
        try {
          if(name){
            const result = await axios.get(`${apiUrl}/recipe/getRecipeByIngredient/${name}`)
            dispatch({
              type: 'GET_RECIPE_BY_INGREDIENT',
              payload: {recipesIngre: result.data.data}
            })
            console.log(result.data.data)
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
      console.log('lalalal')
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

      const fetchDataRecipeList = async (recipeListId) => {
        try {
          console.log(recipeListId)
            const result = await axios.get(`${apiUrl}/recipeList/getRecipe/${recipeListId}`)
            if(result.data.success) {
              dispatch({
                type: 'GET_MY_RECIPE_LIST',
                payload: {recipeList: result.data.data}
              })
            }
        } catch (error) {
            dispatch({
              type: 'GET_MY_RECIPE_LIST',
              payload: {recipeList: []}
            })  
        }
    }

    const deleteRecipeList = async (recipeListId, recipeId) => {
      try {
        console.log(recipeListId)
          const result = await axios.delete(`${apiUrl}/recipeList/deleteRecipe/${recipeListId}/${recipeId}`)
          console.log(result)
          if(result.data.success) {
            await fetchDataRecipeList(recipeListId)
          }
      } catch (error) {
          console.log(error)
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
      
      const setRecipeId = (id) => {
        dispatch({
          type: 'SET_RECIPE_ID',
          payload: {recipeId: id}
        })
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
            await fetchRecipePopular()
            await fetchRecipeFollow()
            await fetchRecipesIngre(name)
            console.log(name)
          } else {
            if(userId){
              console.log(userId)
              await fetchRecipeByUserId(userId)
            } else {
              console.log(userId)
              await fetchMyRecipe()
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
            await fetchRecipePopular()
            await fetchRecipeFollow()
            await fetchRecipesIngre(name)
            console.log(name)
          } else {
            if(userId){
              console.log(userId)
              await fetchRecipeByUserId(userId)
            } else {
              console.log(userId)
              await fetchMyRecipe()
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
      if(authState.isAuthenticated){
        fetchRecipePopular()
        fetchRecipeFollow()
      }
    }, [authState.isAuthenticated])

    useEffect(() => {
      if(authState.isAuthenticated){
        fetchRecipesIngre(name)
      }
    }, [name, authState.isAuthenticated])


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
      updateRecipe,
      setRecipeId,
      fetchDataRecipeList,
      deleteRecipeList,
      fetchRecipeFollow,
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