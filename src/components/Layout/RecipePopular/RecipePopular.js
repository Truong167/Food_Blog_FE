import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../utils/constant'
import RecipeList from '../../Recipe/RecipeList'
import RecipeBlock from '../../UI/RecipeBlock'
import { useRecipesContext } from '../../../contexts/recipeContext'

const RecipePopular = () => {
  const { recipesPopular } = useRecipesContext()
  return (
    <RecipeBlock>
          <div style={{marginBottom: 10}}>
            <h4>Công thức phổ biến trong tuần</h4>
            <RecipeList recipes={recipesPopular}/>
          </div>
    </RecipeBlock>
  )
}

export default RecipePopular
