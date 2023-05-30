import React, { useEffect, useState } from 'react'
import classes from './BookmarkItem.module.css'
import axios from 'axios'
import { apiUrl, imageUrl } from '../../../utils/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Dialog from '../../UI/Modal/Dialog/Dialog'
import Backdrop from '../../UI/Modal/BackDrop'
import { ToastContainer, toast } from 'react-toastify'


const BookmarkItem = ({handleClick}) => {
    const [recipeList, setRecipeList] = useState([])
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [recipeListId, setRecipeListId] = useState()

    const onCloseBackDropDialog = () => {
        if(dialogIsOpen) setDialogIsOpen(false)
      }
  
      const onCloseDialog = () => {
        setDialogIsOpen(false)
      }
    
    const handleOpenDialog = (e) => {
        setDialogIsOpen(true)
        console.log(e.target.parentElement.parentElement)
        setRecipeListId(e.target.parentElement.parentElement.id)
    }
    const fetchData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/recipeList/getRecipeList`)
            if(result.data.success){
                setRecipeList(result.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRecipeList = async (id) => {
        try {
            console.log(id)
            const result = await axios.delete(`${apiUrl}/recipeList/deleteRecipeList/${id}`)
            console.log(result)
            if(result.data.success){
                fetchData()
                toast.success('Xóa công thức thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitDelete = () => {
        deleteRecipeList(recipeListId)
        setDialogIsOpen(false)
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(recipeList)
    return (
        <div className={classes.wrapper}>
            {dialogIsOpen && (
                <Dialog
                header="Xác nhận xóa"
                content={`Bạn có chắc chắn muốn xóa danh sách công thức ?`}
                onClose={onCloseDialog}
                onSubmit={handleSubmitDelete}
                yes="Có"
                no="Không"
                />
            ) 
         }
      {dialogIsOpen && <Backdrop onClose={onCloseBackDropDialog}/>}
            <div className={classes.container}>
            {recipeList.map(item => (
                <div key={item.recipeListId} className={classes.content}>
                    <img src={`${imageUrl + item.image}`} alt={item.name}/>
                    <div id={item.recipeListId} className={classes['over-lay']} onClick={handleClick}>
                    </div>
                    <span>{item.name}</span>
                    <div id={item.recipeListId}>
                        <FontAwesomeIcon icon={faTrashAlt} className={classes.icon} onClick={handleOpenDialog}/>
                    </div>
                </div>
                ))}
            </div>
        <ToastContainer/>
    </div>
  )
}

export default BookmarkItem
