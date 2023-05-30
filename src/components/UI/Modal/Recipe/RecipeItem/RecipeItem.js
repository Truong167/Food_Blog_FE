import React from 'react'

import classes from './RecipeItem.module.css'
import { imageUrl } from '../../../../../utils/constant'
import { Link } from 'react-router-dom'
import { useRecipesContext } from '../../../../../contexts/recipeContext'

const RecipeItem = ({recipe, recipeListId}) => {
  const {deleteRecipeList} = useRecipesContext()
  const handleDeleteRecipe = (e) => {
    deleteRecipeList(recipeListId, e.target.id)
  }
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
        <button id={recipe.recipeId} onClick={handleDeleteRecipe}>Xóa công thức</button>
      </div>
    </div>
  )
}

export default RecipeItem
