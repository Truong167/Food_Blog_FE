import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUserPen, faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import no_avatar from '../../../assets/images/no_avatar.png'

import classes from './index.module.css'
import { imageUrl } from '../../../utils/constant';
import useAuth from '../../../hooks/useAuth';


const User = (props) => {
    const {logout} = useAuth()
    const [visible, setVisible] = useState(false)
    const user = props.user
    // console.log(props.user)
    let userItem = [
        {
            id: 1,
            title: "Xem trang cá nhân",
            link: `/user/${user.userId}`,
            icon: <FontAwesomeIcon icon={faUser} className={classes.icon}/>,
            onClick: ''
        },
        {   
            id: 2,
            title: "Chỉnh sửa thông tin",
            link: "/editUser",
            icon: <FontAwesomeIcon icon={faUserPen} className={classes.icon}/>,
            onClick: ''
        },
        {   
            id: 3,
            title: "Đổi mật khẩu",
            link: "/changePassword",
            icon: <FontAwesomeIcon icon={faLock} className={classes.icon}/>,
            onClick: ''
        },
        {   
            id: 4,
            title: "Đăng xuất",
            link: "/login",
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} className={classes.icon}/>,
            onClick: logout           
        }
      ];
    
      const renderResult = () => (
        <div className={classes["menu-list"]} tabIndex="-1">
            <div className={classes["menu-poper"]}>
                <div className={classes["menu-body"]}>
                    {userItem.map(item => {
                        return (
                            <section key={item.id} className={classes["menu-item"]}>
                                <NavLink to={item.link} className={classes.content} onClick={item.onClick && item.onClick}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </section>
                        )
                    })}
                </div>
                
            </div>
        </div>
            
    )

    const handleClick = () => {
        setVisible(!visible)
    }
    const handleClickOutSide = () => {
        setVisible(false)
    }
  return (
    <Tippy
            delay={[0, 500]}
            offset={[20, 16]}
            visible={visible}
            interactive
            placement='bottom-end'
            render={renderResult}
            onClickOutside={handleClickOutSide}
        >
            <div onClick={handleClick} style={{cursor: 'pointer'}}>
                <img src={user.avatar ? `${imageUrl +  user.avatar}` : `${no_avatar}`} alt={user.fullName} className={classes["user-img"]}/>
                <span>{user.fullName}</span>
              </div>
        </Tippy>
  )
}

export default User
