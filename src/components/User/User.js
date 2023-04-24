import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiUrl, imageUrl } from '../../utils/constant'
import useAuth from '../../hooks/useAuth'
import Button from '../UI/Button/Button'

import classes from './User.module.css'

const User = () => {
    const {authState, getUser} = useAuth()
    const {id} = useParams()
    let check = true
    if(authState.user.userId === parseInt(id)){
        check = false
    }
    // const getUser = async (id) => {
    //     try {
    //         const result = await axios.get(`${apiUrl}/user/getUser/${id}`)
    //         if(result.data.message) {
    //             console.log(result.data.data)
    //             setUserObject(result.data.data)
    //             setLoading(false)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        getUser(id)
    }, [id])
    console.log(authState.userInfor)
    return (
    <div className={classes.wrapper}>
        {!authState.userInforLoading && 
            <div className={classes.container}>
                <div className={classes.left}>
                    <img src={`${imageUrl + authState.userInfor.avatar}`} alt={authState.userInfor.fullName}/>
                </div>
                <div className={classes.right}>
                    <div className={classes.header}>
                        <h3>{authState.userInfor.fullName}</h3>
                        <div className={classes.btn}>
                            {check && (authState.userInfor.isFollow ? 
                                        <Button color='#FF9933'>Đang theo dõi</Button> : 
                                        <Button>Theo dõi</Button>
                                    )}    
                        </div>
                    </div>
                    <div className={classes.detail}>
                        <span><b>{authState.userInfor.countRecipe}</b> công thức</span>
                        <span><b>{authState.userInfor.countFollowed}</b> người theo dõi</span>
                        <span><b>{authState.userInfor.countFollowing}</b> người đang theo dõi</span>
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
