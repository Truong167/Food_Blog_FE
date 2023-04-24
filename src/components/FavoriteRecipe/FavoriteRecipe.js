import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../utils/constant'
import RecipeItem from '../Recipe/RecipeItem/RecipeItem'

import classes from './FavoriteRecipe.module.css'

const FavoriteRecipe = () => {
    const [recipes, setRecipes] = useState([])
    const fetchData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/recipe/getRecipeFavorite`)
            if(result.data.success){
                setRecipes(result.data.data)
            }
        } catch (error) {
            console.log(error)
            setRecipes([])
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(recipes)
  return (
    <div className={classes.wrapper}>
      {recipes.map(item => (
          <RecipeItem isLiked={true} {...item} key={item.recipeId}/>
        ))}
    </div>
  )
}

export default FavoriteRecipe
