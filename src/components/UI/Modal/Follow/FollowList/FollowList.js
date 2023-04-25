import React, { useEffect, useState } from 'react'
import Follow from '../Follow/Follow'
import useAuth from '../../../../../hooks/useAuth'
import { useParams } from 'react-router-dom'

const FollowList = ({type}) => {
    const {authState, getUserFollowing, getUserFollow} = useAuth()
    const [user, setUser] = useState([])
    const {id} = useParams()
    console.log(type)

    useEffect(() => {
        getUserFollowing(id)
        getUserFollow(id)
    }, [id])

    useEffect(() => {
        if(type === 'following'){
            if(!authState.userFollowingLoading) {
                setUser(authState.userFollowing)
            }
        } else {
            if(!authState.userFollowLoading) {
                setUser(authState.userFollow)
            }
        }
    }, [type, id])

    console.log(authState.userFollow, authState.userFollowing, user, type)
  return (
    <div style={{marginTop: 20}}>
      {user.map(item => (
        <Follow {...item} key={item.userId}/>
      ))}
    </div>
  )
}

export default FollowList
