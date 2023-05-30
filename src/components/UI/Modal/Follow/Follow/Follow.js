import { apiUrl, imageUrl } from '../../../../../utils/constant'
import classes from './Follow.module.css'

import no_avatar from '../../../../../assets/images/no_avatar.png'
import axios from 'axios'
import useAuth from '../../../../../hooks/useAuth'
import { useParams } from 'react-router-dom'

const Follow = ({avatar, fullName, userId, type}) => {
  const {getUserFollowing, getUserFollow, getUser} = useAuth()
  const {id} = useParams()
  const deleteFollow = async () => {
    try {
      let request = `${apiUrl}/follow/`
      if(type === 'following'){
        request += `delete/${userId}`
      } else {
        request += `delete1/${userId}`
      }
      console.log(request)
      const result = await axios.delete(request)
      if(result.data.success){
        if(type === 'following'){
          getUserFollowing(id)

        } else {
          getUserFollow(id)
        }
        await getUser(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    console.log(userId)
    deleteFollow()

  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <img src={avatar ? `${imageUrl + avatar}` : no_avatar} className={classes.img}/>
        <h6>{fullName}</h6>
      </div>
      <button id={userId} onClick={handleDelete} className={classes.btn}>Bỏ theo dõi</button>
    </div>
  )
}

export default Follow
