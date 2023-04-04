import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../contexts/constant'
import RecipeList from '../../Recipe/RecipeList'
import RecipeBlock from '../../UI/RecipeBlock'

const RecipePopular = () => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            try {
              const result = await axios.get(`${apiUrl}/recipe/getPopularRecipe`)
              if(result.data.success){
                setRecipes(result.data.data)
                console.log(recipes)
              }
            } catch (error) {
                setRecipes([])
              console.log(error)    
            }
          }
          fetchApi()
    }, [])
  return (
    <RecipeBlock>
          <div style={{marginBottom: 10}}>
            <h4>Công thức phổ biến trong tuần</h4>
            <RecipeList recipes={recipes}/>
          </div>
    </RecipeBlock>
  )
}

export default RecipePopular
