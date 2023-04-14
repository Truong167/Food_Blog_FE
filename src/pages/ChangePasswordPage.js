import React, { useState } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm'
import useAuth from '../hooks/useAuth'

const ChangePasswordPage = () => {
    const {sendOtp, changePassword} = useAuth()
    const [step, setStep] = useState(0)
    const [infor, setInfor] = useState({accountName: '', newPassword: '', checkPassword: '', otp: '', showOtp: false})
    const handleChange = (e) => {
        setInfor({...infor, [e.target.name]: e.target.value})
    }
    const handleSubmit = e => {
        e.preventDefault()
        if(step === 0) {
            if(sendOtp({accountName: infor.accountName, subject: 'Xác thực đổi mật khẩu'})) {
                setStep(1)
                setInfor({...infor, showOtp: true})
            }
        } else if(step === 1){
            if(changePassword({accountName: infor.accountName, newPassword: infor.newPassword, checkPassword: infor.checkPassword, otp: infor.otp})) {
                setStep(0)
                setInfor({...infor, accountName: '', newPassword: '', checkPassword: '', otp: '', showOtp: false})
            }
        }

    }
  return (
    <DefaultLayout type='myRecipe' width='480px' text='Cập nhật' form="change-password" handleSubmit={handleSubmit}>
        <form id='change-password'>
            <ChangePasswordForm infor={infor} handleChange={handleChange}/> 
        </form>
    </DefaultLayout>
  )
}

export default ChangePasswordPage
