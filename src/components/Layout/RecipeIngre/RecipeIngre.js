import IngredientList from '../../Ingredient/IngredientList'
import RecipeList from '../../Recipe/RecipeList'
import RecipeBlock from '../../UI/RecipeBlock'
import { useIngredientsContext } from '../../../contexts/ingredientContext'
import { useRecipesContext } from '../../../contexts/recipeContext'

const RecipeIngre = ({setIsOpen}) => {
    const {ingredientState : {ingredients, name}} = useIngredientsContext()
    const {recipesIngre} = useRecipesContext()
  return (
    <RecipeBlock>
          <div>
            <h4>Các nguyên liệu đang trong mùa</h4>
            <IngredientList ingredient={ingredients} isActive={name}/>
            <RecipeList recipes={recipesIngre} setIsOpen={setIsOpen}/>
          </div>
    </RecipeBlock>
  )
}

export default RecipeIngre
