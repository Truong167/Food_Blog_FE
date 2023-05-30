import { useState } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import RecipeFollow from '../components/Layout/RecipeFollow/RecipeFollow'
import RecipeIngre from '../components/Layout/RecipeIngre/RecipeIngre'
import RecipePopular from '../components/Layout/RecipePopular/RecipePopular'
import RecipeList from '../components/UI/Modal/RecipeList/RecipeList'
import { useRecipesContext } from '../contexts/recipeContext'
import Backdrop from '../components/UI/Modal/BackDrop'

const HomePage = () => {
  const {singleRecipe, recipeId} = useRecipesContext()
  const [isOpen, setIsOpen] = useState(false)
  const closeBackdrop = () => {
    if(isOpen) setIsOpen(false)
  }
  const onClose = () => {
    setIsOpen(false)
  }
  return (
    <DefaultLayout className='with'>
        <RecipeList className={isOpen ? "open" : ""} onClose={onClose} recipeId={recipeId}/>
        {isOpen && <Backdrop onClose={closeBackdrop} />}
        <RecipeIngre setIsOpen={setIsOpen}/>
        <RecipeFollow setIsOpen={setIsOpen}/>
        <RecipePopular setIsOpen={setIsOpen}/>
    </DefaultLayout>
  )
}

export default HomePage