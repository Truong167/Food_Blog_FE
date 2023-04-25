import React, { Fragment } from 'react'
import ReactDOM from "react-dom";
import classes from './Mobile.module.css'
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Mobile = (props) => {
    const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`;
    const {authState: {user}, logout} = useAuth()

    const action = [
        {
            id: 1,
            text: 'Viết món mới',
            link: '/createRecipe'
        },
        {
            id: 2,
            text: 'Xem trang cá nhân',
            link: `/user/${user.userId}`
        },
        {
            id: 3,
            text: 'Chỉnh sửa thông tin',
            link: '/editUser'
        },
        {
            id: 4,
            text: 'Đổi mật khẩu',
            link: '/changePassword'
        },
    ]

    return (
        <Fragment>
          {ReactDOM.createPortal(
            <div className={classesName}>
               <header className={classes.header}>
                    <h6>{user.fullName}</h6>
               </header>
               <div className={classes.container}>
                    {action.map(item => (
                        <Link className={classes.item} key={item.id} to={item.link}>{item.text}</Link>
                    ))}
                    <button onClick={logout}>Đăng xuất</button>
               </div>
            </div>,
            document.getElementById("overlay-root")
          )}
        </Fragment>
    )
}

export default Mobile
