import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constant";
import 'react-toastify/dist/ReactToastify.css'

import setAuthToken from '../utils/setAuthToken'


export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: false,
        isAuthenticated: false,
        user: null,
        userInfor: {},
        userInforLoading: true
    })

    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success){
                dispatch({
                    type: 'SET_AUTH', 
                    payload: {isAuthenticated: true, user: response.data.data}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }
    // authenticated user 
    useEffect(() => {

        loadUser()
    }, [])

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data)
            }
            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response
            return {success: false, message: error.message}
        }
    }

    const logout = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
        })
    }

    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)

            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            return {success: false, message: error.message}
        }
    }

    const editUser = async data => {
        console.log(data)
        try {
          const result = await axios.put(`${apiUrl}/user/update`, data)
          if(result.data.success){
            
            await loadUser()
            return result.data
          }
        } catch (error) {
            if(error.response.data) return error.response
            return {success: false, message: error.message}
        }
    }

    const getUser = async (id) => {
        try {
            const result = await axios.get(`${apiUrl}/user/getUser1/${id}`)
            console.log(result)
            if(result.data.message) {
                dispatch({
                    type: 'GET_INFOR',
                    payload: { userInfor: result.data.data }
                })
            }
        } catch (error) {
            dispatch({
                type: 'GET_INFOR',
                payload: { userInfor: {} }
            })
        }
    }

    const sendOtp = async data => {
        console.log(data)
        try {
          const result = await axios.post(`${apiUrl}/auth/sendOtp`, data)
          if(result.data.success){
            return result.data
          }
        } catch (error) {
            if(error.response.data) return error.response
            return {success: false, message: error.message}
        }
    }

    const changePassword = async data => {
        console.log(data)
        try {
          const result = await axios.put(`${apiUrl}/auth/changePassword`, data)
          if(result.data.success){
            return result.data
          }
        } catch (error) {
            if(error.response.data) return error.response
            return {success: false, message: error.message}
        }
    }
    // context data
    const authContextData = { loginUser, registerUser, authState, editUser, sendOtp, changePassword, logout, getUser } 

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider


