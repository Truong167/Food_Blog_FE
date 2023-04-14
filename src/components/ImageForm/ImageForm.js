import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

import classes from './ImageForm.module.css'
import upload from '../../assets/images/upload.png'

const ImageForm = ({image, handleChangeRecipeImage, handleDeleteRecipeImage}) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        setSelectedFile(e.target.files[0])
    }
  return (
    <div className={classes.wrapper}>
      {image  ?
        <div className={classes.preview}>
            <img src={image} alt='Upload' className={classes["preview-img"]}/>
            <div className={classes["custom-img"]}>
                <div className={classes.upload}>
                    <input type='file' accept='image/*' name='recipe' className={classes.input} onChange={e => handleChangeRecipeImage(e)}/>
                    <FontAwesomeIcon icon={faCameraRetro} className={classes.icon}/>
                </div>
                <div className={classes.delete} onClick={handleDeleteRecipeImage}>
                    <FontAwesomeIcon icon={faTrashCan} className={classes.icon}/>
                </div>
            </div>
        </div>
        :
        <>
            <div className={classes.content}>
                <img src={upload} alt='Upload' className={classes.img}/>
                <p className={classes.text}>Bạn đã đăng hình món mình nấu ở đây chưa?</p>
                <p>Chia sẻ với mọi người thành phẩm nấu nướng của bạn nào!</p>
            </div>
            <input type='file' accept='image/*' name='recipe' className={classes.input} onChange={e => handleChangeRecipeImage(e)}/>
        </>

    }
    </div>
  )
}

export default ImageForm
