import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../contexts/constant'
import RecipeList from '../../Recipe/RecipeList'
import RecipeBlock from '../../UI/RecipeBlock'

const RecipeFollow = () => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        const fetchApi1 = async () => {
            try {
              const result = await axios.get(`${apiUrl}/recipe/getRecipeFromFollowers`)
              if(result.data.success){
                setRecipes(result.data.data)
              }
            } catch (error) {
                setRecipes([])
              console.log(error)    
            }
          }
          fetchApi1()
    }, [])
  return (
    <RecipeBlock>
          <div>
            <h4>Công thức từ người mà bạn theo dõi</h4>
            <RecipeList recipes={recipes}/>
          </div>
    </RecipeBlock>
  )
}

export default RecipeFollow
