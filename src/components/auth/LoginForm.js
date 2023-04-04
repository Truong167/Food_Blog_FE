import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import './login.css'
import useAuth from "../../hooks/useAuth"

const LoginForm = () => {
  // Context 
  const { loginUser } = useAuth()
  const [accountName, setAccountName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const loginForm = {accountName, password}
  const login = async event => {
    event.preventDefault()
    try {
      const loginData = await loginUser(loginForm)
      if(loginData.success) {
        alert(loginData.message)
      } else {
        alert(loginData.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword)
    // alert('lalal')
  }

  // const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})
  const onChangeAccountName = event => setAccountName(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)


  return (
    <>
    <Form className="my-4" onSubmit={login}>
      <Form.Group className="mb-3">
        <Form.Control
              type='text'
              placeholder='Tên đăng nhập'
              name='accountName'
              required
              value={accountName}
              onChange={onChangeAccountName}
          />
      </Form.Group>
      <Form.Group className="mb-3 password-input">
        <Form.Control
              type={showPassword ? 'password' : 'text'}
              placeholder='Mật khẩu'
              name='password'
              required
              value={password}
              onChange={onChangePassword}
          />
        <span onClick={handleShowHidePassword} className={password.length > 0 ? "block" : "hide"}>

          <FontAwesomeIcon icon={faEye} className="icon"/>  
          {showPassword ? <FontAwesomeIcon icon={faEye} className="icon"/> : <FontAwesomeIcon icon={faEyeSlash} className="icon"/>}

        </span>
      </Form.Group>
      <Button variant='success' type='submit'>
					Đăng nhập
				</Button>
    </Form>
    <p style={{color: "white"}}>
    Bạn chưa có tài khoản? 
    <Link to='/register'>
      <Button variant='info' size='sm' style={{marginLeft: "10px"}}>
        Đăng ký
      </Button>
    </Link>
  </p>
    </>
  )
}

export default LoginForm