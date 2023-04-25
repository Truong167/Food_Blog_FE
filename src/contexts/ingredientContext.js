import { createContext, useContext, useEffect, useReducer } from "react"
import { apiUrl } from "../utils/constant"
import {ingredientReducer} from '../reducers/ingredientReducer'
import axios from "axios"
import useAuth from "../hooks/useAuth"

const intialState = {
    ingredients: [],
    name: '',
    ingredientLoading: true,
    searchLoading: true,
    searchResult: []
}

export const IngredientContext = createContext()


const IngredientContextProvider = ({children}) => {
    const {authState} = useAuth()
    const [ingredientState, dispatch] = useReducer(ingredientReducer, intialState)

    const fetchIngredient = async () => {
        try {
            const result = await axios.get(`${apiUrl}/ingredient/getIngredientBySeason`)
            if(result.data.success){
                dispatch({
                    type: 'GET_INGREDIENT', 
                    payload: {ingredients: result.data.data, name: result.data.data[0].name}
                })

            }
        } catch (error) {
            dispatch({
                type: 'GET_INGREDIENT', 
                payload: {ingredients: []}
            })
        }
    }


    const setName = (name) => {
        dispatch({
            type: 'SET_NAME_INGREDIENT',
            payload: {name: name}
        })
    }

    const searchIngredient = async (name) => {
        try {
            const result = await axios.get(`${apiUrl}/ingredient/search`, {params: {q: name}})
            if(result.data.success){
                console.log(result.data.data)
                dispatch({
                    type: 'SEARCH_INGREDIENT', 
                    payload: {searchResult: result.data.data}
                })
            }
        } catch (error) {
            dispatch({
                type: 'SEARCH_INGREDIENT', 
                payload: {searchResult: []}
            })
        }
      }


    useEffect(() => {
        if(authState.isAuthenticated){
            fetchIngredient()
        }
    }, [authState.isAuthenticated])


    const ingredientContextData = {ingredientState, setName, searchIngredient}

    return (
        <IngredientContext.Provider value={ingredientContextData}>
            {children}
        </IngredientContext.Provider>
    )
}

export default IngredientContextProvider

export const useIngredientsContext = () => {
    return useContext(IngredientContext)
  }