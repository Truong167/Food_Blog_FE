import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart, faListAlt } from '@fortawesome/free-regular-svg-icons'

import classes from './NavBar.module.css'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'

const NavBar = ({toggle, handleToggle, check}) => {

  return (
    <div className={classes.wrapper}>
        {check && 
            <nav className={classes.nav}>
                <div className={toggle === 1 ? classes.active : classes["nav-item"]} onClick={() => handleToggle(1)}>
                    <FontAwesomeIcon icon={faListAlt}/>
                    <span>Công thức</span>
                </div>
                <div className={toggle === 2 ? classes.active : classes["nav-item"]} onClick={() => handleToggle(2)}>
                    <FontAwesomeIcon icon={faBookmark}/>
                    <span>Đã lưu</span>
                </div>
                <div className={toggle === 3 ? classes.active : classes["nav-item"]} onClick={() => handleToggle(3)}>
                    <FontAwesomeIcon icon={faHeart}/>
                    <span>Yêu thích</span>
                </div>
            </nav>   
        }
    </div>
  )
}

export default NavBar
