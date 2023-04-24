import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

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
        toast.success('Đăng nhập thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      } else {
        if(loginData.status === 418) {
          toast.warning('Vui lòng nhập đầy đủ thông tin', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        } else if(loginData.status === 424) {
          toast.warning('Tài khoản không tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        } else if(loginData.status === 425) {
          toast.warning('Sai mật khẩu', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        }

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
              value={accountName}
              onChange={onChangeAccountName}
          />
      </Form.Group>
      <Form.Group className="mb-3 password-input">
        <Form.Control
              type={showPassword ? 'password' : 'text'}
              placeholder='Mật khẩu'
              name='password'
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
  <ToastContainer/>
    </>
  )
}

export default LoginForm