import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import RecipeBlock from '../UI/RecipeBlock'
import IngredientItemForm from './IngredientItemForm/IngredientItemForm'

import classes from './IngredientForm.module.css'

const IngredientForm = ({ingredientChild, handleOnChangeIngredient, handleDeleteIngredientForm, handleAddIngredientForm, handleOnChangeIngredientName}) => {
  return (
    <RecipeBlock>
        <h4 style={{marginBottom: 10, color: '#606060'}}>Nguyên liệu</h4>
        {ingredientChild.map((item, index) => (
          <IngredientItemForm 
                key={index} 
                name={item.name}
                id={item.ingredientId}
                amount={item.amount} 
                handleDeleteIngredientForm={() => handleDeleteIngredientForm(index)} 
                handleOnChangeIngredient={(e) => handleOnChangeIngredient(index, e)}
                handleOnChangeIngredientName={(e) => handleOnChangeIngredientName(index, e)}
          />  
        ))}
        <div className={classes.btn} onClick={handleAddIngredientForm}>
            <FontAwesomeIcon icon={faPlus}/>
            <span style={{marginLeft: 6}}>Nguyên liệu</span>
        </div>
    </RecipeBlock>
  )
}

export default IngredientForm
