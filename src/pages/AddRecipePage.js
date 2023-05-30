import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import DefaultLayout from '../components/Layout/DefaultLayout'
import ImageForm from '../components/ImageForm/ImageForm'
import RecipeNameForm from '../components/RecipeNameForm/RecipeNameForm'
import IngredientForm from '../components/IngredientForm/IngredientForm'
import StepForm from '../components/StepForm/StepForm'
import { useRecipesContext } from '../contexts/recipeContext'

const initialRecipe = {
    preview: '',
    recipe: '',
    recipeName: '',
    description: '',
    amount: '',
    prepareTime: '',
    cookTime: '',
    status: 'CK'
}

const initialIngredient = [
  {
    ingredientId: '',
    name: '',
    amount: '',
  }
]
const initialStep = [
  {
    description: '',
    image: '',
    step: ''
  }
]
const AddRecipePage = () => {
  const {createRecipe, fetchRecipePopular} = useRecipesContext()
  const [recipe, setRecipe] = useState(initialRecipe)
  const [ingredientChild, setIngredientChild] = useState(initialIngredient)
  const [stepChild, setStepChild] = useState(initialStep)

  const handleChangeRecipeImage = (e) => {
    setRecipe({...recipe, preview: URL.createObjectURL(e.target.files[0]), [e.target.name]: e.target.files[0]})
  }

  const handleDeleteRecipeImage = () => {
    setRecipe({...recipe, recipe: '', preview: ''})
  }

  const handleChange = (e) => {
    setRecipe({...recipe, [e.target.name]: e.target.value})
  }

  const handleOnChangeIngredient = (index, e) => {
    console.log(e.target.id)
    const newArr = [...ingredientChild]
    newArr[index] = {...newArr[index], [e.target.name]: e.target.value}
    setIngredientChild(newArr)
  }

  const handleOnChangeIngredientName = (index, e) => {
    console.log(e.target.textContent)
    const newArr = [...ingredientChild]
    newArr[index] = {...newArr[index], name: e.target.textContent, ingredientId: e.target.id}
    setIngredientChild(newArr)
  }

  console.log(ingredientChild)

  const handleDeleteIngredientForm = (index) => {
      const newArr = [...ingredientChild]
      newArr.splice(index, 1)
      setIngredientChild(newArr)
  }
  const handleAddIngredientForm = () => {
      setIngredientChild([...ingredientChild, {name: '', amount: ''}])
  }

  const handleOnChangeStep = (index, e) => {
    console.log(e)
    const newArr = [...stepChild]
    newArr[index] = {...newArr[index], [e.target.name]: e.target.value}
    setStepChild(newArr)
  }

  const handleOnChangeStepImage = (index, e) => {
    console.log(e)
    const newArr = [...stepChild]
    newArr[index] = {...newArr[index], [e.target.name]: e.target.files[0], image: URL.createObjectURL(e.target.files[0])}
    setStepChild(newArr)
  }

  const handleDeleteStepImage = (index) => {
    const newArr = [...stepChild]
    newArr[index] = {...newArr[index], step: '', image: ''}
    setStepChild(newArr)
  }

  console.log(stepChild)

  const handleDeleteStep = (index) => {
    console.log(index)
    const newArr = [...stepChild]
    newArr.splice(index, 1)
    setStepChild(newArr)
  }

  const handleAddStep = (index) => {
    const newArr = [...stepChild]
    newArr.splice(index + 1, 0, {description: '', image: ''})
    setStepChild(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const frmData = new FormData()
    let newArr = [...stepChild]
    newArr = newArr.map((item, index) => {
      frmData.append('step', item.step)
      item.stepIndex = index + 1
      return item
    })
    frmData.append("recipe", recipe.recipe)
    frmData.append("description", recipe.description)
    frmData.append("recipeName", recipe.recipeName)
    frmData.append("amount", recipe.amount)
    frmData.append("status", recipe.status)
    frmData.append("preparationTime", recipe.prepareTime)
    frmData.append("cookingTime", recipe.cookTime)
    frmData.append("Steps", JSON.stringify(newArr))
    frmData.append("DetailIngredients", JSON.stringify(ingredientChild))
    const result = await createRecipe(frmData)
    if(result.success){
      await fetchRecipePopular()
      toast.success('Thêm công thức thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true
      })
      setRecipe(initialRecipe)
      setIngredientChild(initialIngredient)
      setStepChild(initialStep)
    } else {
      if(result.status === 418){
        toast.warning('Vui lòng nhập đầy đủ thông tin', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      } else if(result.status === 440){
        toast.warning('Có lỗi khi tải hình', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      } else if(result.status === 500){
        toast.warning('Lỗi không xác định', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      }
    }
  }


  return (
    <DefaultLayout type='myRecipe' width='680px' className='with1' handleSubmit={handleSubmit} text='Lên sóng' form='add-recipe'>
      <form id='add-recipe' encType='multipart/form-data'>
        <ImageForm handleChangeRecipeImage={handleChangeRecipeImage} handleDeleteRecipeImage={handleDeleteRecipeImage} image={recipe.preview}/>
        <RecipeNameForm recipe={recipe} handleChange={(e) => handleChange(e)}/>
        <IngredientForm 
          ingredientChild={ingredientChild} 
          handleOnChangeIngredient={handleOnChangeIngredient}
          handleDeleteIngredientForm={handleDeleteIngredientForm}
          handleAddIngredientForm={handleAddIngredientForm}
          handleOnChangeIngredientName={handleOnChangeIngredientName}
        />
        <StepForm
          stepChild={stepChild}
          handleOnChangeStep={handleOnChangeStep}
          handleOnChangeStepImage={handleOnChangeStepImage}
          handleDeleteStepImage={handleDeleteStepImage}
          handleDeleteStep={handleDeleteStep}
          handleAddStep={handleAddStep}
        />
      </form>
      <ToastContainer/>
    </DefaultLayout>
  )
}

export default AddRecipePage
