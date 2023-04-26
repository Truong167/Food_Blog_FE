import React, { useState } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm'
import useAuth from '../hooks/useAuth'
import { ToastContainer, toast } from 'react-toastify'
import { formatTime1 } from '../utils/formatDate'

const ChangePasswordPage = () => {
    const {sendOtp, changePassword} = useAuth()
    const [step, setStep] = useState(0)
    const [infor, setInfor] = useState({accountName: '', newPassword: '', checkPassword: '', otp: '', showOtp: false, minutes: 0, seconds: 0})
    const handleChange = (e) => {
        setInfor({...infor, [e.target.name]: e.target.value})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(step === 0) {
            const otp = await sendOtp({accountName: infor.accountName, subject: 'Xác thực đổi mật khẩu'})
            if(otp.success) {
                toast.success('Đã gửi OTP. Vui lòng check mail để xác thực', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                })
                let {minutes, seconds} = formatTime1(otp.data)
                setStep(1)
                setInfor({...infor, showOtp: true, minutes, seconds})
                // console.log(formatTime1(otp.data))
                // console.log(minutes, seconds)
                // setTime({minutes, seconds})
            } else {
                if(otp.status === 424){
                    toast.warning('Tài khoản không tồn tại', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    })
                }
            }
        } else if(step === 1){
            const result = await changePassword({accountName: infor.accountName, newPassword: infor.newPassword, checkPassword: infor.checkPassword, otp: infor.otp})
            if(result.success) {
                toast.success('Đổi mật khẩu thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                })
                setStep(0)
                setInfor({...infor, accountName: '', newPassword: '', checkPassword: '', otp: '', showOtp: false})
            } else {
                if(result.status === 424){
                    toast.warning('Tài khoản không tồn tại', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    })
                } else if(result.status === 420){
                    toast.warning('Mật khẩu phải ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    })
                } else if(result.status === 419){
                    toast.warning('Mật khẩu không khớp', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    })
                } else if(result.status === 450){
                    toast.warning('OTP không đúng', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    })
                } else if(result.status === 451){
                    toast.warning('OTP đã hết hạn', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    })
                    setInfor({...infor, accountName: '', newPassword: '', checkPassword: '', otp: '', showOtp: false})
                    setStep(0)
                }
            }
        }

    }
  return (
    <DefaultLayout type='myRecipe' className='width2' text='Cập nhật' form="change-password" handleSubmit={handleSubmit}>
        <form id='change-password'>
            <ChangePasswordForm infor={infor} handleChange={handleChange}/> 
        </form>
        <ToastContainer/>
    </DefaultLayout>
  )
}

export default ChangePasswordPage
