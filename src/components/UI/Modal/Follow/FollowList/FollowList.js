import React, { useEffect, useState } from 'react'
import Follow from '../Follow/Follow'
import useAuth from '../../../../../hooks/useAuth'
import { useParams } from 'react-router-dom'

const FollowList = ({type}) => {
    const {authState: {userFollowing, userFollow}, getUserFollowing, getUserFollow} = useAuth()
    const {id} = useParams()
    console.log(type)

    useEffect(() => {
        getUserFollowing(id)
        getUserFollow(id)
    }, [id])

  return (
    <div style={{marginTop: 20}}>
      {type === 'following' ? userFollowing.map(item => (
        <Follow {...item} key={item.userId} type={type}/>
      )):
      userFollow.map(item => (
        <Follow {...item} key={item.userId} type={type}/>
      ))
      }
    </div>
  )
}

export default FollowList
