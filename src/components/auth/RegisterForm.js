import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import useAuth from "../../hooks/useAuth"

const RegisterForm = () => {

  const { registerUser } = useAuth()
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    accountName: '',
    password: '',
    password2: ''
  })

  const navigate = useNavigate()

  const { fullName, email, accountName, password, password2 } = registerForm

  const register = async event => {
    event.preventDefault()
    try {
      const registerData = await registerUser(registerForm)
      console.log(registerData)
      if(registerData.success) {
        alert(registerData.message)
        navigate('/')
      } else {
      }
    } catch (error) {
      console.log(error + 'llalla')
    }
  }

  const onChangeRegiserForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

  return (
    <>
    <Form className="my-4" onSubmit={register}>
      <Form.Group className="mb-3">
        <Form.Control
              type='text'
              placeholder='Họ và tên'
              name='fullName'
              required
              onChange={onChangeRegiserForm}
              value={fullName}
          />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
              type='email'
              placeholder='Email'
              name='email'
              required
              onChange={onChangeRegiserForm}
              value={email}
          />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
              type='text'
              placeholder='Tên đăng nhập'
              name='accountName'
              required
              onChange={onChangeRegiserForm}
              value={accountName}
          />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
              type='password'
              placeholder='Mật khẩu'
              name='password'
              required
              onChange={onChangeRegiserForm}
              value={password}
          />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
              type='password'
              placeholder='Xác nhận mật khẩu'
              name='password2'
              required
              onChange={onChangeRegiserForm}
              value={password2}
          />
      </Form.Group>
      <Button variant='success' type='submit'>
					Đăng ký
				</Button>
    </Form>
    <p style={{color: "white"}}>
    Bạn đã có tài khoản? 
    <Link to='/'>
      <Button variant='info' size='sm' style={{marginLeft: "10px"}}>
        Đăng nhập
      </Button>
    </Link>
  </p>
    </>
  )
}

export default RegisterForm