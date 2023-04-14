import { Link } from "react-router-dom";


import classes from './Header.module.css'
import icon from '../../assets/images/logo.png'
import icon1 from '../../assets/images/logo1.png'


import Search from "../Search/Search";
import BreadCrumbs from "../UI/BreadCrumbs";
import User from "../UI/User";

import useAuth from "../../hooks/useAuth";
import Button from "../UI/Button/Button";

const Header = ({type = 'normal', handleSubmit, text, form}) => {
  const {authState: {user}} = useAuth()
  return (
    <header className={classes.bg}>
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
                <BreadCrumbs/>
                <User user={user}/>
              </>
          }
          </div>
        </div>
    </header>
  )
}

export default Header
