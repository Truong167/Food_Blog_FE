export const authReducer = (state, action) => {
    const { type, payload: {isAuthenticated, user, userInfor} } = action
    switch(type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        case 'GET_INFOR':
            return {
                ...state,
                userInforLoading: false,
                userInfor
            }
        default:
            return state
    }
}