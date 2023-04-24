import React, { Fragment, useState } from 'react'
import ReactDOM from "react-dom"
import classes from './AddRecipeList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { apiUrl } from '../../../../utils/constant'
import { toast } from 'react-toastify'


const AddRecipeList = (props) => {
  const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`
  const [previewImage, setPreviewImage] = useState()
  const [name, setName] = useState('')
  const [image, setImage] = useState()


  const handleOnChangeImage = (e) => {
    setImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleDeleteImage = () => {
    setImage('')
    setPreviewImage('')
  }

  const handleOnChangeName = e => {
    setName(e.target.value)
  }

  const addRecipeList = async (data) => {
    try {
        const result = await axios.post(`${apiUrl}/recipeList/createRecipeList`, data)
        if(result.data.success) {
            return result.data
        }
    } catch (error) {
        if(error.response.data) return error.response
        return {success: false, message: error.message}
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const frmData = new FormData()
    frmData.append('name', name)
    frmData.append('recipeList', image)
    const result = await addRecipeList(frmData)
    if(result.success){
        toast.success('Thêm công thức thành công', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
        props.onClose()
    } else {
        if(result.status === 418){
            toast.warning('Vui lòng nhập đầy đủ thông tin', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true
            })
        } else if(result.status === 440){
            toast.warning('Có lỗi khi tải hình', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true
            })
        } else if(result.status === 500){
            toast.warning('Lỗi không xác định', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true
            })
        }
    }
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classesName}>
          <header className={classes.header}>
            <h4>Thêm danh sách công thức</h4>
            <FontAwesomeIcon icon={faXmark} onClick={props.onClose} className={classes.icon}/>
          </header>
          <div className={classes.form}>
            <form onSubmit={handleSubmit}>
            {previewImage  ?
                <div className={classes.preview}>
                    <img src={previewImage} alt='Upload' className={classes["preview-img"]}/>
                    <div className={classes["custom-img"]}>
                        <div className={classes.upload}>
                            <input type='file' accept='image/*' name='recipeList' className={classes.input} onChange={handleOnChangeImage}/>
                            <FontAwesomeIcon icon={faCameraRetro} className={classes.icon}/>
                        </div>
                        <div className={classes.delete} onClick={handleDeleteImage}>
                            <FontAwesomeIcon icon={faTrashCan} className={classes.icon}/>
                        </div>
                    </div>
                </div> :
                <div className={classes.img}>
                    <FontAwesomeIcon icon={faCameraRetro} className={classes["camera-icon"]}/>
                    <input type='file' accept='image/*' name='recipeList' onChange={handleOnChangeImage}/>
                </div>
                }
                <div className={classes.name}>
                    <label>Tên danh sách</label>
                    <input type='text' name='name' value={name} onChange={handleOnChangeName} placeholder='Tên danh sách'/>
                </div>
                <button className={classes.btn} type='submit'>Thêm</button>
            </form>
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  )
}

export default AddRecipeList
