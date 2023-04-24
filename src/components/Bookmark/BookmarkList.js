import React, { useState } from 'react'
import BookmarkItem from './BookmarkItem/BookmarkItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import classes from './BookmarkList.module.css'
import ModalRecipeList from '../UI/Modal/Recipe'
import AddRecipeList from '../UI/Modal/AddRecipeList/AddRecipeList'
import { ToastContainer } from 'react-toastify'
import Backdrop from '../UI/Modal/BackDrop'

const BookmarkList = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [recipeListId, setRecipeListId] = useState()
  const closeBackdrop = () => {
    if(isOpen) setIsOpen(false)
  }

  const closeBackdrop1 = () => {
    if(isOpen) setIsOpen(false)
  }
  const onClose = () => {
    setIsOpen(false)
  }
  const handleClick = (e) => {
    setRecipeListId(e.target.id)
    setIsOpen(true)
  }
  const onCloseAdd = () => {
    setIsOpenAdd(false)
  }


  return (
    <div className={classes.wrapper}>
      <ModalRecipeList className={isOpen ? "open" : ""} onClose={onClose} recipeListId={recipeListId}/>
      {isOpen && <Backdrop onClose={closeBackdrop} />}
      <AddRecipeList className={isOpenAdd ? "open" : ""} onClose={onCloseAdd}/>
      {isOpenAdd && <Backdrop onClose={closeBackdrop1} />}
      <div className={classes.add} onClick={() => setIsOpenAdd(true)}>
        <span>Thêm danh sách công thức</span>
        <FontAwesomeIcon icon={faPlus}/>
      </div>
      <BookmarkItem handleClick={handleClick}/>
      <ToastContainer/>
    </div>
  )
}

export default BookmarkList
