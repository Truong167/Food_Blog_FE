import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap , faHeart, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../UI/Loading/Loading'
import { apiUrl, imageUrl } from '../../../utils/constant'
import DetailIngredient from '../../DetailIngredient/DettailIngredient'
import classes from './RecipeDetail.module.css'
import no_avatar from '../../../assets/images/no_avatar.png'
import { formatDate } from '../../../utils/formatDate'
import Button from '../../UI/Button/Button'
import CommentForm from '../../UI/Comment/CommentForm'
import { useRecipesContext } from '../../../contexts/recipeContext'

const RecipeDetail = () => {
    const {fetchSingleRecipe, singleRecipe, singleRecipeLoading} = useRecipesContext()
    const [success, setSuccess] = useState(false)
    const [comments, setComments] = useState([])
    const [showMore, setShowMore] = useState(false)
    const {id} = useParams()
    const getComment = async (id) => {
      try {
        const result = await axios.get(`${apiUrl}/comment/getCommentOfRecipe/${id}`)
        if(result.data.success){
          setComments(result.data.data.comment)
        }
      } catch (error) {
        console.log(error)    
      }
    }

    useEffect(() => {
        getComment(id)
        fetchSingleRecipe(id)
    }, [id, success])

    if(singleRecipeLoading){
      return <Loading/>
    }


    const handleClick = () => {
      setShowMore(!showMore)
    }

    const handleSubmit = (success) => {
      setSuccess(success)
    } 

    return (
      <div>
            {/* {loading ? <Loading/> :  */}
                <div className={classes.container}>
                    <div>
                    <img src={`${imageUrl + singleRecipe.image}`} className={classes.img} alt={singleRecipe.recipeName}/>
                    <div className={classes.name}>
                        <h3>{singleRecipe.recipeName}</h3>
                    </div>
                    <div className={classes.user}>
                        <div className={classes['user-content']}>
                          <Link to={`/user/${singleRecipe.User.userId}`}>
                            <img src={`${singleRecipe.User.avatar ? imageUrl + singleRecipe.User.avatar : no_avatar}`} alt={singleRecipe.User.fullName}/>
                          </Link>
                            <div>
                                <Link to={`/user/${singleRecipe.User.userId}`} className={classes.username}>
                                  <h6>{singleRecipe.User.fullName}</h6>
                                </Link>
                                <div>
                                    <FontAwesomeIcon icon={faMap} style={{marginRight: 8}}/>
                                    <span>Hiện tại đang sống tại {singleRecipe.User.address}</span>
                                </div>
                            </div>
                        </div>
                        <p></p>
                        {singleRecipe.description && singleRecipe.description.length > 100 ? (showMore ? 
                          <p>{singleRecipe.description} <span className={classes.btn} onClick={handleClick}>Ẩn bớt</span></p> : 
                          <p>{singleRecipe.description.substring(0,100)}...<span className={classes.btn} onClick={handleClick}>Xem thêm</span></p>)
                          : <p>{singleRecipe.description}</p>
                        }
                    </div>
                    <DetailIngredient detailIngredient={singleRecipe.DetailIngredients} {...singleRecipe}/>
                    <div className={classes.steps}>
                      <h3>Hướng dẫn nấu nướng</h3>
                      {singleRecipe.Steps.map(item => {
                        return (
                          <div key={item.stepId} className={classes.step}>
                            <span><b>Bước {item.stepIndex}</b></span>
                            <p>{item.description}</p>
                            {item.image && 
                              <img src={`${imageUrl + item.image}`} alt={item.stepId} className={classes["step-image"]}/>
                            }
                          </div>
                        )
                      })}
                    </div>
                    <div className={classes.react}>
                      <div className={classes.header}>
                        <FontAwesomeIcon icon={faHeart} className={classes.icon}/>
                        <h3>Phản ứng</h3>
                      </div>
                      <div className={classes['react-detail']}>
                        <div className={classes.like}>
                          <FontAwesomeIcon icon={faHandsClapping} style={{color: '#ffc83d', marginRight: 4}}/>
                          {singleRecipe.numberOfLikes}
                          </div>
                        <div className={classes.like1}>
                          <FontAwesomeIcon icon={faHeart} style={{color: 'black'}}/>
                        </div>
                      </div>
                    </div>
                    <div className={classes.comment}>
                      <div className={classes.header}>
                          <FontAwesomeIcon icon={faComment} className={classes.icon}/>
                          <h3>Bình luận</h3>
                      </div>
                      <div className={classes["comment-container"]}>
                          <div className={classes["comment-content-block"]}>
                            {comments.length > 0 ? comments.map(item => {
                              return (
                                <Link key={item.userId} className={classes['comment-content']} to={`/user/${item.userId}`}>
                                    <img src={`${item.User.avatar ? imageUrl + item.User.avatar : no_avatar}`} alt={item.User.fullName}/>
                                    <div>
                                        <h6>{item.User.fullName + " " +  formatDate(item.date)}</h6>
                                    <span>{item.comment}</span>
                                    </div>
                                </Link>
                              )
                            }) : <h3>Chưa có bình luận nào</h3>}
                          </div>
                          {/* <div className={classes['comment-form']}>
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
                          </div> */}
                          <CommentForm handleSubmit={handleSubmit}/>
                      </div>  
                    </div>
                    </div>
                    <div className={classes.save}>
                      <Button color='#FF9933'>
                        <FontAwesomeIcon icon={faBookmark} style={{marginRight: 10}}/>
                        Lưu món
                      </Button>
                      <Button color='#45464f'>Chia sẻ</Button>
                      <Button color='#45464f'>In</Button>
                      <Button color='#45464f'>Báo cáo</Button>
                    </div>
                </div>
            {/* } */}
      </div>
    )
}

export default RecipeDetail
