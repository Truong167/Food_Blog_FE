import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import HeadLessTippy from '@tippyjs/react/headless';


import classes from './IngredientItemForm.module.css'
import { useIngredientsContext } from '../../../contexts/ingredientContext'
import { useEffect, useRef, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const IngredientItemForm = ({handleDeleteIngredientForm, id, name, amount, handleOnChangeIngredient, handleOnChangeIngredientName}) => {
  const {searchIngredient, ingredientState: {searchResult}} = useIngredientsContext()
  const [showResult, setShowResult] = useState(false)
  
  const handleFocus = () => {
    setShowResult(true)
  }
  useEffect(() => {
    searchIngredient(name)
  }, [name])

  const handleClickOutSide = () => {
    setShowResult(false)
  }

  const renderResult = () => (
    <>
      {searchResult.length > 0 &&
        <div className={classes["menu-list"]} tabIndex="-1">
          <div className={classes["menu-poper"]}>
            <div className={classes["menu-body"]}>
                {searchResult.map((result) => {
                  return (
                      <div key={result.ingredientId} id={result.ingredientId} className={classes["menu-item"]} onClick={(e) => {
                        handleClickOutSide()
                        handleOnChangeIngredientName(e)
                      }}>
                        {result.name}
                      </div>

                  )})} 
            </div>   
          </div>
      </div>
      
      }
    </>
  )
  return (
    // <div className={classes.container}>
          <HeadLessTippy
            delay={[0, 500]}
            offset={[0, 0]}
            visible={showResult}
            interactive
            placement='bottom-end'
            render={renderResult}
            onClickOutside={handleClickOutSide}
        >
          <div className={classes.wrapper}>
            <input className={classes.input} onFocus={handleFocus} name='name' id={id} value={name} type="text" autoComplete='off' placeholder='Trứng gà' onChange={handleOnChangeIngredient}/>
            <input className={classes.input} name='amount' value={amount} type="text" placeholder='2 quả' onChange={handleOnChangeIngredient}/>
            <FontAwesomeIcon icon={faTrashCan} className={classes.icon} onClick={handleDeleteIngredientForm}/>
          </div>
        </HeadLessTippy>
    // </div>
  )
}

export default IngredientItemForm
