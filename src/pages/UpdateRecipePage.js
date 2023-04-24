import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import { ToastContainer, toast } from 'react-toastify'
import { useRecipesContext } from '../contexts/recipeContext'
import { useParams } from 'react-router-dom'
import IngredientForm from '../components/IngredientForm/IngredientForm'
import StepForm from '../components/StepForm/StepForm'
import { imageUrl } from '../utils/constant'
import Loading from '../components/UI/Loading/Loading'
import ImageForm from '../components/ImageForm/ImageForm'
import RecipeNameForm from '../components/RecipeNameForm/RecipeNameForm'

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

const UpdateRecipePage = () => {
    const {singleRecipe, singleRecipeLoading, fetchSingleRecipe, updateRecipe} = useRecipesContext()
    const [recipe, setRecipe] = useState(initialRecipe)
    const [ingredientChild, setIngredientChild] = useState([])
    const [stepId, setStepId] = useState([])
    const [stepChild, setStepChild] = useState([])
    const {recipeId} = useParams()

    
    useEffect(() => {
        fetchSingleRecipe(recipeId)
    }, [recipeId])

    useEffect(() => {
        if(!singleRecipeLoading){
            const newArr = []
            console.log(singleRecipe)
            singleRecipe.Steps.map(item => {
                newArr.push(item.stepId)
                console.log(item)
                item.image = item.image ? `${imageUrl + item.image}` : ''
                item.imageFile = ''
                return item
            })
            console.log(singleRecipe.description)
            setStepId(newArr)
            setRecipe({...recipe,
                recipeName: singleRecipe.recipeName,
                amount: singleRecipe.amount,
                cookTime: singleRecipe.cookingTime,
                prepareTime: singleRecipe.preparationTime,
                status: singleRecipe.status,
                description: singleRecipe.description ? singleRecipe.description : '',
                preview: singleRecipe.image ? `${imageUrl + singleRecipe.image}` : '',
                recipe: ''
            })
            setStepChild(singleRecipe.Steps)
            setIngredientChild(singleRecipe.DetailIngredients)
        }
    }, [singleRecipe])
    
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
        newArr[index] = {...newArr[index], [e.target.name]: e.target.files[0], image: URL.createObjectURL(e.target.files[0]), imageFile: URL.createObjectURL(e.target.files[0])}
        setStepChild(newArr)
    }
    
    const handleDeleteStepImage = (index) => {
        const newArr = [...stepChild]
        newArr[index] = {...newArr[index], step: '', image: '', imageFile: ''}
        setStepChild(newArr)
    }
    
    
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

    console.log(stepChild, stepId)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const frmData = new FormData()
        let newArr = [...stepChild]
        newArr = newArr.map((item, index) => {
          frmData.append('step', item.step)
          item.image = item.image.includes(imageUrl) ? item.image.substring(imageUrl.length, item.image.length) : item.image
          item.stepId = stepId[index]
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
        const result = await updateRecipe(recipeId, frmData)
        if(result.success){
          toast.success('Cập nhật công thức thành công', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
          })
        //   setRecipe(initialRecipe)
        //   setIngredientChild(initialIngredient)
        //   setStepChild(initialStep)
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
    <DefaultLayout type='myRecipe' width='680px' handleSubmit={handleSubmit} text='Cập nhật' form='update-recipe'>
        {singleRecipeLoading ? <Loading/> :
            <form id='update-recipe' encType='multipart/form-data'>
                <ImageForm 
                    handleChangeRecipeImage={handleChangeRecipeImage} 
                    handleDeleteRecipeImage={handleDeleteRecipeImage} 
                    image={recipe.preview}
                />
                <RecipeNameForm 
                    recipe={recipe} 
                    handleChange={(e) => handleChange(e)}
                />
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
        }
    <ToastContainer/>
  </DefaultLayout>
  )
}

export default UpdateRecipePage
