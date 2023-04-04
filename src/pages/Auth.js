import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import { Navigate, useLocation } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import useAuth from "../hooks/useAuth"


const Auth = ({ authRoute }) => {
  const { authState } = useAuth()
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  let type = authRoute === 'login' ? "Đăng nhập" : 'Đăng ký'
	let body
	if (authState.authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (authState.isAuthenticated) {
    return <Navigate to={from} replace/>
  } 
  else {
    body = (
      <>
          {authRoute === 'login' && <LoginForm/>}
          {authRoute === 'register' && <RegisterForm/>}
  
      </>
    )
  }


  return (
      <div className='landing'>
        <div className='landing-inner'>
          <h2 style={{color: "white"}}>{type}</h2>
          <h5 style={{color: "white"}}>Để khám phá nhiều công thức mới</h5>
          {body}
        </div>
      </div>
  )
}

export default Auth