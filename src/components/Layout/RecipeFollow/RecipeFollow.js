import RecipeList from '../../Recipe/RecipeList'
import RecipeBlock from '../../UI/RecipeBlock'
import { useRecipesContext } from '../../../contexts/recipeContext'

const RecipeFollow = () => {
  const { recipesFollow } = useRecipesContext()
  return (
    <RecipeBlock>
          <div>
            <h4>Công thức từ người mà bạn theo dõi</h4>
            <RecipeList recipes={recipesFollow}/>
          </div>
    </RecipeBlock>
  )
}

export default RecipeFollow
