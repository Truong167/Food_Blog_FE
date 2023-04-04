import { Link } from "react-router-dom";


import classes from './Header.module.css'
import icon from '../../assets/images/logo.png'
import icon1 from '../../assets/images/logo1.png'


import Search from "../Search/Search";
import BreadCrumbs from "../UI/BreadCrumbs";
import User from "../UI/User";

import useAuth from "../../hooks/useAuth";

const Header = () => {
  const {authState: {user}} = useAuth()
  return (
    <header className={classes.bg}>
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.left}>
              <Link to="/">
                <img src={icon} className={classes.image1} alt="icon"/>
                <img src={icon1} className={classes.image2} alt="name"/>
              </Link>
            </div>
           <Search/>
           <BreadCrumbs/>
            {/* <div>
                <Button>Tải ứng dụng</Button>
            </div> */}
            <User user={user}>
            </User>
          </div>
        </div>
    </header>
  )
}

export default Header
