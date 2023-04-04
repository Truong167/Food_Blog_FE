import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../contexts/constant'
import IngredientList from '../../Ingredient/IngredientList'
import RecipeList from '../../Recipe/RecipeList'
import RecipeBlock from '../../UI/RecipeBlock'

const RecipeIngre = () => {
    const [ingredient, setIngredient] = useState([])
    const [recipes, setRecipes] = useState([])
    const [active, setActive] = useState('')
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await axios.get(`${apiUrl}/ingredient/getIngredientBySeason`)
                setActive(result.data.data[0].name)
                setIngredient(result.data.data)
                console.log(result.data.data[0].name)
            } catch (error) {
                console.log(error)    
            }
        }
        fetchApi()
    }, [])
    useEffect(() => {
        const fetchApi1 = async () => {
            try {
              const result = await axios.get(`${apiUrl}/recipe/getRecipeByIngredient/${active}`)
              if(result.data.success){
                setRecipes(result.data.data)
              }
            } catch (error) {
                setRecipes([])
              console.log(error)    
            }
          }
          fetchApi1()
    }, [active])
    const handleClick = (name) => {
        setActive(name)
    }
  return (
    <RecipeBlock>
          <div>
            <h4>Các nguyên liệu đang trong mùa</h4>
            <IngredientList ingredient={ingredient} isActive={active} handleClick={handleClick}/>
            <RecipeList recipes={recipes} ingredient={active}/>
          </div>
    </RecipeBlock>
  )
}

export default RecipeIngre
