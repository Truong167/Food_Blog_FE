import React, { useEffect, useState } from 'react'
import RecipeItem from '../RecipeItem/RecipeItem'
import axios from 'axios'
import { apiUrl } from '../../../../../utils/constant'

const RecipeList = ({recipeListId}) => {
    const [recipe, setRecipe] = useState([])
    const fetchData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/recipeList/getRecipe/${recipeListId}`)
            if(result.data.success) {
                setRecipe(result.data.data)
            }
        } catch (error) {
            setRecipe([])
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [recipeListId])
    console.log(recipe)
  return (
    <div>
      {recipe.length > 0 ? recipe.map(item => (
        <RecipeItem key={item.recipeId} recipe={item}/>
      )):
        <span>Không có công thức nào</span>
      }
    </div>
  )
}

export default RecipeList
