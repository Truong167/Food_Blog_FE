import React from 'react'

import classes from './RecipeItem.module.css'
import { imageUrl } from '../../../../../utils/constant'
import { Link } from 'react-router-dom'

const RecipeItem = ({recipe}) => {
  return (
    <div className={classes.wrapper}>
        <Link to={`/detail/${recipe.recipeId}`}>
            <img src={`${imageUrl + recipe.image}`}/>
        </Link>
      <div className={classes["right-content"]}>
        <div>
            <Link to={`/user/${recipe.User.userId}`} className={classes.name1}>{recipe.User.fullName}</Link>
            <Link to={`/detail/${recipe.recipeId}`} className={classes.name}>{recipe.recipeName}</Link>
        </div>
        <button>Xóa công thức</button>
      </div>
    </div>
  )
}

export default RecipeItem
