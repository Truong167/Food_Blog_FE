import { Link } from "react-router-dom";


import classes from './Header.module.css'
import icon from '../../assets/images/logo.png'
import icon1 from '../../assets/images/logo1.png'


import Search from "../Search/Search";
import BreadCrumbs from "../UI/BreadCrumbs";
import User from "../UI/User";

import useAuth from "../../hooks/useAuth";
import Button from "../UI/Button/Button";
import useViewport from "../../hooks/useViewPort";
import { imageUrl } from "../../utils/constant";
import { useState } from "react";
import Mobile from "../UI/Modal/Mobile/Mobile";
import BackDrop from "../UI/Modal/BackDrop";


const Header = ({type = 'normal', handleSubmit, text, form}) => {
  const {authState: {user}} = useAuth()
  const { width: deviceWidth } = useViewport()
  const [isOpen, setIsOpen] = useState(false)

  const closeBackDrop = () => {
    if(isOpen) setIsOpen(false)
  }

  return (
    <header className={classes.bg}>
        <Mobile className={isOpen ? 'open' : ''}/>
        {isOpen && <BackDrop onClose={closeBackDrop}/>}
        <div className={classes.container}>
          <div className={type === 'myRecipe' ? classes.content1 : classes.content}>
            <div className={classes.left}>
              <Link to="/">
                <img src={icon} className={classes.image1} alt="icon"/>
                <img src={icon1} className={classes.image2} alt="name"/>
              </Link>
            </div>
            {type === 'myRecipe' ?
              <button form={form} className={classes.btn} type="submit" onClick={handleSubmit}>{text}</button>
              :  <>
                <Search/>
                {deviceWidth < 476  ? 
                  <div className={classes.mobile} onClick={() => setIsOpen(true)}>
                    <img src={`${imageUrl + user.avatar}`}/>
                  </div> 
                  : 
                  <>
                    <BreadCrumbs/>
                    <User user={user}/> 
                  </>
                }
              </>
          }
          </div>
        </div>
    </header>
  )
}

export default Header
