import { AuthContext } from "../contexts/authContext"
import { useContext } from "react"

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth