import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


import RecipeBlock from '../UI/RecipeBlock'
import StepItemForm from './StepItemForm/StepItemForm'

import classes from './StepForm.module.css'

const StepForm = ({stepChild, handleAddStep, handleDeleteStep, handleOnChangeStep, handleDeleteStepImage, handleOnChangeStepImage}) => {
  return (
    <RecipeBlock>
      <h4 style={{marginBottom: 10, color: '#606060'}}>Các bước</h4>
      {stepChild.map((item, index) => (
        <StepItemForm 
          key={index}
          stepIndex={index}
          description={item.description}
          image={item.image}
          handleAddStep={() => handleAddStep(index)}
          handleDeleteStep={() => handleDeleteStep(index)}
          handleOnChangeStep={(e) => handleOnChangeStep(index, e)}
          handleOnChangeStepImage={(e) => handleOnChangeStepImage(index, e)}
          handleDeleteStepImage={() => handleDeleteStepImage(index)}
        />
      ))}
      <div className={classes.btn} onClick={() => handleAddStep(stepChild.length)}>
            <FontAwesomeIcon icon={faPlus}/>
            <span style={{marginLeft: 6}}>Bước làm</span>
        </div>
    </RecipeBlock>
  )
}

export default StepForm
