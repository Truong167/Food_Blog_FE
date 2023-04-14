import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import RecipeBlock from '../../UI/RecipeBlock'
import useAuth from '../../../hooks/useAuth'

import classes from './UserForm.module.css'
import { imageUrl } from '../../../utils/constant'
import { faCameraRetro, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { formatDate1 } from '../../../utils/formatDate'

const UserForm = ({handleOnChange, infor, handleOnChangeUserImage, handleDeleteUserImage}) => {
    const {authState: {user}} = useAuth()
    const textareaRef = useRef(null)
    const [image, setImage] = useState(`${imageUrl+user.avatar}`)
    const [date, setDate] = useState(formatDate1(user.dateOfBirth))
    console.log(user)
    console.log(date)

    useEffect(() => {
        textareaRef.current.style.height = "38px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [infor.introduce]);

  return (
    <RecipeBlock>
        <h4 style={{marginBottom: 10, color: '#606060'}}>Cập nhật thông tin</h4>
        {infor.avatar  ?
            <div className={classes.preview}>
                <img src={infor.avatar} alt='Upload' className={classes["preview-img"]}/>
                <div className={classes["custom-img"]}>
                    <div className={classes.upload}>
                        <input type='file' accept='image/*' name='user' className={classes.input} onClick={() => setImage('')} onChange={handleOnChangeUserImage}/>
                        <FontAwesomeIcon icon={faCameraRetro} className={classes.icon}/>
                    </div>
                    <div className={classes.delete} onClick={handleDeleteUserImage}>
                        <FontAwesomeIcon icon={faTrashCan} className={classes.icon}/>
                    </div>
                </div>
            </div> :
            <div className={classes.img}>
                <FontAwesomeIcon icon={faCameraRetro} className={classes["camera-icon"]}/>
                <input type='file' accept='image/*' name='user' onChange={handleOnChangeUserImage}/>
            </div>
        }
        <div className={classes.container}>
            <div className={classes.infor}>
                <label>Họ và tên</label>
                <input className={classes.input1} type='text' value={infor.fullName} onChange={handleOnChange} name='fullName'/>
            </div>
            <div className={classes.infor}>
                <label>Giới thiệu bản thân</label>
                <textarea ref={textareaRef} type='text' value={infor.introduce} onChange={handleOnChange} name='introduce'/>
            </div>
            <div className={classes.infor}>
                <label>Ngày sinh</label>
                <input className={classes.input1} type="date" value={date} onChange={handleOnChange} name='dateOfBirth'/>
            </div>
            <div className={classes.infor}>
                <label>Email</label>
                <input className={classes.input1} type='text' value={infor.email} onChange={handleOnChange} name='email'/>
            </div>
            <div className={classes.infor}>
                <label>Địa chỉ</label>
                <input className={classes.input1} type='text' value={infor.address} onChange={handleOnChange} name='address'/>
            </div>
        </div>
    </RecipeBlock>
  )
}

export default UserForm
