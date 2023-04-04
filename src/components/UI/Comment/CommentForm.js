import React, { useState } from 'react'
import classes from './CommentForm.module.css'
import no_avatar from '../../../assets/images/no_avatar.png'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuth from '../../../hooks/useAuth'
import { apiUrl, imageUrl } from '../../../contexts/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CommentForm = ({handleSubmit}) => {
    const {authState} = useAuth()
    const [comment, setComment] = useState('')
    const {id} = useParams()

    const addComment = async () => {
        if(!comment){
            alert('Không được để trống')
            return
        }
        try {
          const result = await axios.post(`${apiUrl}/comment/createComment/${id}`, {comment})
          if(result.data.success){
            handleSubmit(result.data.success)
          } 
        } catch (error) {
            alert(`${error.response.data.message}`)
          console.log(error)
        }
      }
    const handleChange = (e) => {
        const comment = e.target.value
          if(!comment.startsWith(' ')) {
            setComment(comment)
          } 
      }
  
      const createComment = (e) => {
        e.preventDefault()
        addComment()
        setComment('')
      }
  return (
    <div className={classes['comment-form']}>
            <img src={`${authState.user.avatar ? imageUrl + authState.user.avatar : no_avatar}`} alt={authState.user.fullName}/>
            <form onSubmit={createComment}>
            <input
                type='text'
                placeholder='Thêm bình luận'
                name='comment'
                value={comment}
                onChange={handleChange}
            />
            <button className={classes["comment-send"]} type='submit'>
                <FontAwesomeIcon icon={faReply} />
            </button>
        </form>
     </div>
  )
}

export default CommentForm
