import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoutes = () => {
    const {
		authState: { isAuthenticated }
	} = useAuth()
    const location = useLocation();
    return (
            !isAuthenticated
            ? <Navigate to={"/login"} state={{ from: location }} replace/>
            : <Outlet/>
    );
}

export default PrivateRoutes
