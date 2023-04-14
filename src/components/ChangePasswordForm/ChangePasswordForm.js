import React, { useState } from 'react'

import classes from './ChangePasswordForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const ChangePasswordForm = ({infor, handleChange}) => {
  const [showPassword, setShowPassword] = useState(true)
  const [showPassword1, setShowPassword1] = useState(true)

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword)
        // alert('lalal')
    }
    const handleShowHidePassword1 = () => {
        setShowPassword1(!showPassword1)
        // alert('lalal')
    }
  return (
    <div className={classes.wrapper}>
        <h4 style={{marginBottom: 10, color: '#606060'}}>Đổi mật khẩu</h4>
            <div className={classes.container}>
                <div className={classes.infor}>
                    <label>Tài khoản</label>
                    <input className={classes.input1} value={infor.accountName} onChange={handleChange} type='text' name='accountName'/>
                </div>
                <div className={classes.infor}>
                    <label>Mật khẩu mới</label>
                    <div className={classes.custom}>
                        <input  className={classes.input1} value={infor.newPassword} onChange={handleChange} type={showPassword ? 'password' : 'text'}  name='newPassword'/>
                        <span onClick={handleShowHidePassword} className={infor.newPassword.length > 0 ? "block" : "hide"}>
                            <FontAwesomeIcon icon={faEye} className="icon"/>  
                            {showPassword ? <FontAwesomeIcon icon={faEye} className="icon"/> : <FontAwesomeIcon icon={faEyeSlash} className="icon"/>}
                        </span>
                    </div>
                </div>
                <div className={classes.infor}>
                    <label>Xác nhận mật khẩu</label>
                    <div className={classes.custom}>
                        <input className={classes.input1} value={infor.checkPassword} onChange={handleChange} type={showPassword1 ? 'password' : 'text'}  name='checkPassword'/>
                        <span onClick={handleShowHidePassword1} className={infor.checkPassword.length > 0 ? "block" : "hide"}>
                            <FontAwesomeIcon icon={faEye} className="icon"/>  
                            {showPassword1 ? <FontAwesomeIcon icon={faEye} className="icon"/> : <FontAwesomeIcon icon={faEyeSlash} className="icon"/>}
                        </span>
                    </div>
                </div>
                {infor.showOtp && 
                    <div className={classes.infor}>
                        <label>OTP</label>
                        <input className={classes.input1} value={infor.otp} onChange={handleChange} type='text' name='otp'/>
                    </div>
                }
            </div>
    </div>
  )
}

export default ChangePasswordForm
