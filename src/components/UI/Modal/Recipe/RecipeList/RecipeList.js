import React, { useEffect, useState } from 'react'
import RecipeItem from '../RecipeItem/RecipeItem'
import axios from 'axios'
import { apiUrl } from '../../../../../utils/constant'
import { useRecipesContext } from '../../../../../contexts/recipeContext'

const RecipeList = ({recipeListId}) => {
  const {fetchDataRecipeList, recipeList} = useRecipesContext()
    useEffect(() => {
      fetchDataRecipeList(recipeListId)
    }, [recipeListId])
    console.log(recipeListId)
  return (
    <div>
      {recipeList.length > 0 ? recipeList.map(item => (
        <RecipeItem key={item.recipeId} recipe={item} recipeListId={recipeListId}/>
      )):
        <span>Không có công thức nào</span>
      }
    </div>
  )
}

export default RecipeList
