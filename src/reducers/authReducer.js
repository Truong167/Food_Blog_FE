export const authReducer = (state, action) => {
    const { type, payload: {isAuthenticated, user, userInfor, userFollowing, userFollow} } = action
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
        case 'GET_USER_FOLLOWING':
            return {
                ...state,
                userFollowingLoading: false,
                userFollowing
            }
        case 'GET_USER_FOLLOW':
            return {
                ...state,
                userFollowLoading: false,
                userFollow
            }
        default:
            return state
    }
}