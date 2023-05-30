import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEarthAmericas, faHeart as faLiked, faLock, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons'
import Tippy from '@tippyjs/react/headless';

import classes from './MyRecipe.module.css'
import { Link } from 'react-router-dom'
import { imageUrl } from '../../../utils/constant'
import { useRecipesContext } from '../../../contexts/recipeContext';


const MyRecipe = ({status, isFavorite, recipeId, recipeName, numberOfLikes, image, type, handleOpenModal, setStatus, setRecipeId, handleOpenDialog, userId}) => {
  const {handleLike, handleDisLike, fetchSingleRecipe} = useRecipesContext()
  const [visible, setVisible] = useState(false)
    const handleClick = () => {
        setVisible(!visible)
    }
    const handleClickOutSide = () => {
        setVisible(false)
    }

    const handleOnClick = (e) => {
      handleOpenModal()
      setStatus(status)
      setRecipeId(e.target.id)
      console.log(e.target.id)
    }
  let menuItem = [
    {
        id: 1,
        title: "Cập nhật",
        onClick: '',
        to: '/updateRecipe/'
    },
    {   
        id: 2,
        title: "Xóa công thức",
        onClick: handleOpenDialog,
        to: ''
    }
  ];

const renderResult = () => (
    <div className={classes["menu-list"]} tabIndex="-1">
        <div className={classes["menu-poper"]}>
            <div className={classes["menu-body"]}>
                {menuItem.map(item => {
                    return (
                      item.to ? (
                        <Link id={recipeId} key={item.id} className={classes["menu-item"]} to={`${item.to + recipeId}`} 
                            onClick={() => setVisible(false)}>
                            <span id={recipeId}>{item.title}</span>
                        </Link>
                      )
                      :
                      (
                        <section id={recipeId} key={item.id} className={classes["menu-item"]} 
                            onClick={() => setVisible(false)}>
                            <span id={recipeId} onClick={(e) => item.onClick(e)}>{item.title}</span>
                        </section>
                      )
                    )
                })}
            </div>
            
        </div>
    </div>
)
  return (
    <div>
       <div className={classes.container}>
      <Link className={classes['recipe-img']} to={`/detail/${recipeId}`}>
        <img src={`${imageUrl + image}`} alt='' className={classes.img}/>
      </Link>
      <div className={classes.name}>
        <div>
            <span>{recipeName}</span>
            {type === 'myRecipe' &&
              <button className={classes.btn} id={recipeId} onClick={handleOpenModal} value={status}>
                  {status === 'CK' ? <FontAwesomeIcon  icon={faEarthAmericas}/> : <FontAwesomeIcon icon={faLock}/>}
              </button>
            }
        </div>
        {type === 'myRecipe' ?
                <Tippy
                delay={[0, 500]}
                offset={[20, 16]}
                visible={visible}
                interactive
                placement='bottom-end'
                render={renderResult}
                onClickOutside={handleClickOutSide}
            >
                <FontAwesomeIcon icon={faEllipsis} className={classes.icon} onClick={handleClick}/> 
            </Tippy>
            :
          <button className={classes.btn}>
              <FontAwesomeIcon icon={faBookmark}/>
          </button>
        }
      </div>
      <div>
        <div>
          <button className={classes.btn}>
            {isFavorite ? <FontAwesomeIcon className={classes.active} icon={faLiked} onClick={() => handleDisLike(recipeId, 'user', type === 'myRecipe' ? '' : userId)}/> 
              : <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(recipeId, 'user', type === 'myRecipe' ? '' : userId)}/>
            }

          </button>
          <span>{numberOfLikes}</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MyRecipe
