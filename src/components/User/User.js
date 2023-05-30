import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { imageUrl } from '../../utils/constant'
import ModalFollow from '../UI/Modal/Follow'

import useAuth from '../../hooks/useAuth'
import Button from '../UI/Button/Button'

import classes from './User.module.css'
import Backdrop from '../UI/Modal/BackDrop'
import no_avatar from '../../assets/images/no_avatar.png'
import { useRecipesContext } from '../../contexts/recipeContext'

const User = () => {
    const {authState, getUser, unFollowUser, followUser} = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState()

    const closeBackdrop = () => {
        if(isOpen) setIsOpen(false)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const openFollowing = () => {
        setIsOpen(true)
        setType('following')
    }

    const openFollow = () => {
        setIsOpen(true)
        setType('follow')
    }

    
    const {id} = useParams()
    let check = true
    if(authState.user.userId === parseInt(id)){
        check = false
    }

    const handleFollow = async () => {
        await followUser(id)
    }

    const handleUnFollow = async () => {
        await unFollowUser(id)
    }

    useEffect(() => {
        getUser(id)
    }, [id])
    console.log(authState.userInfor)
    return (
    <div className={classes.wrapper}>
        <ModalFollow type={type} className={isOpen ? "open" : ""} onClose={onClose}/>
        {isOpen && <Backdrop onClose={closeBackdrop} />}
        {!authState.userInforLoading && 
            <div className={classes.container}>
                <div className={classes.left}>
                    <img src={authState.userInfor.avatar ? `${imageUrl + authState.userInfor.avatar}` : `${no_avatar}`} alt={authState.userInfor.fullName}/>
                </div>
                <div className={classes.right}>
                    <div className={classes.header}>
                        <h3>{authState.userInfor.fullName}</h3>
                        <div className={classes.btn}>
                            {check && (authState.userInfor.isFollow ? 
                                        <Button color='#FF9933' onClick={handleUnFollow}>Đang theo dõi</Button> : 
                                        <Button onClick={handleFollow}>Theo dõi</Button>
                                    )}    
                        </div>
                    </div>
                    <div className={classes.detail}>
                        <span><b>{authState.userInfor.countRecipe}</b> công thức</span>
                        <span onClick={!check ? openFollow : undefined}><b>{authState.userInfor.countFollowed}</b> người theo dõi</span>
                        <span onClick={!check ? openFollowing : undefined}><b>{authState.userInfor.countFollowing}</b> người đang theo dõi</span>
                    </div>
                    <div className={classes.address} style={{marginTop: 20}}>Hiện đang sinh sống tại {authState.userInfor.address}</div>
                    <div className={classes.description}>
                        <p>{authState.userInfor.introduce && authState.userInfor.introduce}</p>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default User
