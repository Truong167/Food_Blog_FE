import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classes from './RecipeList.module.css'
import axios from 'axios';
import { apiUrl } from '../../../../utils/constant';

const RecipeList = (props) => {
  const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`
  const [recipeList, setRecipeList] = useState([])
  const [bookmarkList, setBookmarkList] = useState([])
  const fetchDataRecipeList = async () => {
    try {
        const result = await axios.get(`${apiUrl}/recipeList/getRecipeList`)
        console.log(result)
        if(result.data.success){
            console.log(result.data.data)
          setRecipeList(result.data.data)
        }
    } catch (error) {
        if(error.response.data) return error.response
        return error.message
    }
  }

  const fetchDataRecipe = async (id) => {
    try {
        const result = await axios.get(`${apiUrl}/recipe/getRecipe/${id}`)
        console.log(result)
        if(result.data.success){
            console.log(result.data.data)
            setBookmarkList(result.data.data.DetailLists)
        }
    } catch (error) {
        if(error.response.data) return error.response
        return error.message
    }
  }

  useEffect(() => {
    fetchDataRecipeList()
  }, [])

  useEffect(() => {
    fetchDataRecipe(props.recipeId)
  }, [props.recipeId])

  console.log(recipeList)
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classesName}>
          <header className={classes.header}>
            <h4>Danh sách công thức</h4>
            <FontAwesomeIcon icon={faXmark} onClick={props.onClose} className={classes.icon}/>
          </header>
          <div className={classes.recipeList}>
            {recipeList.map(item => (
                <div key={item.recipeListId} className={classes.item}>
                    {bookmarkList}
                    <input type="checkbox" id={item.recipeListId} name="vehicle1" value={item.name} className={classes.input}/>
                    <label htmlFor="vehicle1">{item.name}</label><br></br>
                </div>
            )
            )}
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  )
}

export default RecipeList

