import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { ToastContainer, toast } from "react-toastify"

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
      if(registerData.success) {
        alert(registerData.message)
        toast.success('Đăng ký thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
        navigate('/')
      } else {
        console.log(registerData)
        if(registerData.status === 418) {
          toast.warning('Vui lòng nhập đầy đủ thông tin', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        } else if(registerData.status === 423) {
          toast.warning('Tài khoản đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        } 
        else if(registerData.status === 421) {
          toast.warning('Email không đúng định dạng', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        }
        else if(registerData.status === 422) {
          toast.warning('Email đã tồn tại', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        }
        else if(registerData.status === 420) {
          toast.warning('Mật khẩu phải ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        }
        else if(registerData.status === 419) {
          toast.warning('Mật khẩu không khớp', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        } 
        
      }
    } catch (error) {
      console.log(error)
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
  <ToastContainer/>

    </>
  )
}

export default RegisterForm