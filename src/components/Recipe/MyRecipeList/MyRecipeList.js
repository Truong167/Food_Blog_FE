import React, { useEffect, useState } from 'react'
import { useRecipesContext } from '../../../contexts/recipeContext'
import MyRecipe from '../MyRecipe/MyRecipe'
import classes from './MyRecipeList.module.css'
import { useParams } from 'react-router-dom'
import Privacy from '../../UI/Modal/Privacy/Privacy'
import Backdrop from '../../UI/Modal/BackDrop'
import { ToastContainer, toast } from 'react-toastify'
import Dialog from '../../UI/Modal/Dialog/Dialog'

const MyRecipeList = ({type='myRecipe'}) => {
    const { myRecipe, recipeOfUser, fetchMyRecipe, fetchRecipeByUserId, deleteRecipe } = useRecipesContext()
    const [isOpen, setIsOpen] = useState(false)
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [recipeId, setRecipeId] = useState()
    const [status, setStatus] = useState()
    const {id} = useParams()

    const onCloseBackDrop = () => {
      if(isOpen) setIsOpen(false)
    }

    const onCloseBackDropDialog = () => {
      if(dialogIsOpen) setDialogIsOpen(false)
    }

    const onCloseDialog = () => {
      setDialogIsOpen(false)
    }

    const onClose = () => {
      setIsOpen(false)
    }

    useEffect(() => {
      fetchMyRecipe()
    }, [])

    useEffect(() => {
      fetchRecipeByUserId(id)
    }, [id])

    const handleOpenDialog = (e) => {
      console.log(e.target.id)
      setRecipeId(e.target.id)
      setDialogIsOpen(true)
    }

    const handleOpenModal = (e) => {
      setRecipeId(e.target.parentElement.parentElement.id)
      setStatus(e.target.parentElement.parentElement.value)
      setIsOpen(true)
    }

    const onChangeStatus = e => {
      setStatus(e.target.value)
    }

    const handleSubmitDelete = async () => {
      const result = await deleteRecipe(recipeId)
      console.log(result)
      if(result.success){
          toast.success('Xóa công thức thành công', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true
          })
          setDialogIsOpen(false)
      } else {
          if(result.status === 500){
              toast.warning('Lỗi không xác định', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
              })
          }
      }
    }

    
  return (
    <div className={classes.wrapper}>
      {dialogIsOpen && (
        <Dialog
          header="Xác nhận xóa"
          content={`Bạn có chắc chắn muốn xóa công thức ?`}
          onClose={onCloseDialog}
          onSubmit={handleSubmitDelete}
          yes="Có"
          no="Không"
        />
      ) 
    }
      {dialogIsOpen && <Backdrop onClose={onCloseBackDropDialog}/>}

      <Privacy className={isOpen ? "open" : ""} status={status} recipeId={recipeId} onClose={onClose} onChangeStatus={onChangeStatus}/>
      {isOpen && <Backdrop onClose={onCloseBackDrop}/>}
      {type === 'myRecipe' ? 
       (
        myRecipe.length > 0 ?
        myRecipe.map(item => (
            <MyRecipe {...item} key={item.recipeId} type={type} handleOpenDialog={handleOpenDialog} handleOpenModal={handleOpenModal} setStatus={setStatus} setRecipeId={setRecipeId}/>
        ))
        :
        <span>Không có công thức</span>
       )
      :
        (
        recipeOfUser.length > 0 ?
        recipeOfUser.map(item => (
            <MyRecipe {...item} key={item.recipeId} type={type} userId={id}/>
        ))
        :
        <span>Không có công thức</span>
        )
      }
      <ToastContainer/>
    </div>
  )
}

export default MyRecipeList
