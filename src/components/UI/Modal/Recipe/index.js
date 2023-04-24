import React, { Fragment } from 'react'
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classes from './index.module.css'
import RecipeList from './RecipeList/RecipeList';

const Index = (props) => {
  const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classesName}>
          <header className={classes.header}>
            <h4>Danh sách công thức</h4>
            <FontAwesomeIcon icon={faXmark} onClick={props.onClose} className={classes.icon}/>
          </header>
          <div className={classes.recipe}>
            <RecipeList recipeListId={props.recipeListId}/>
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  )
}

export default Index
