import React, { useEffect, useState } from 'react'
import classes from './SearchResult.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../../../contexts/constant'
import RecipeItem from '../../Recipe/RecipeItem/RecipeItem'

const SearchResult = () => {
    const [recipes, setRecipes] = useState([])
    const {recipeName} = useParams()
    const getRecipe = async (recipeName) => {
        try {
            const result = await axios.get(`${apiUrl}/recipe/getRecipeByName/${recipeName}`)
            if(result.data.success){
                setRecipes(result.data.data)
                console.log(result.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRecipe(recipeName)
    }, [recipeName])
  return (
    <div className={classes.wrapper}>
        <h3>{`Kết quả tìm kiếm với "${recipeName}"`}</h3>
        <div className={classes.container}>
            {recipes && recipes.map(item => {
                return (
                    <RecipeItem {...item} key={item.recipeId}/>
                )
            })}
        </div>
    </div>
  )
}

export default SearchResult
