import DefaultLayout from '../components/Layout/DefaultLayout'
import RecipeFollow from '../components/Layout/RecipeFollow/RecipeFollow'
import RecipeIngre from '../components/Layout/RecipeIngre/RecipeIngre'
import RecipePopular from '../components/Layout/RecipePopular/RecipePopular'
import { useRecipesContext } from '../contexts/recipeContext'

const HomePage = () => {
  const {singleRecipe} = useRecipesContext()
  console.log(singleRecipe)
  return (
    <DefaultLayout>
        <RecipeIngre/>
        <RecipeFollow/>
        <RecipePopular/>
    </DefaultLayout>
  )
}

export default HomePage