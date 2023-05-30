import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap , faHeart, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faHandsClapping } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../UI/Loading/Loading'
import { apiUrl, imageUrl } from '../../../utils/constant'
import DetailIngredient from '../../DetailIngredient/DettailIngredient'
import classes from './RecipeDetail.module.css'
import no_avatar from '../../../assets/images/no_avatar.png'
import { formatDate } from '../../../utils/formatDate'
import Button from '../../UI/Button/Button'
import CommentForm from '../../UI/Comment/CommentForm'
import { useRecipesContext } from '../../../contexts/recipeContext'
import Tippy from '@tippyjs/react/headless'

const RecipeDetail = () => {
    const {fetchSingleRecipe, singleRecipe, singleRecipeLoading} = useRecipesContext()
    const [success, setSuccess] = useState(false)
    const [comments, setComments] = useState([])
    const [myComment, setMyComment] = useState()
    const [visible, setVisible] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [comment, setComment] = useState('')
    const [type, setType] = useState(0)

    const {id} = useParams()
    const getComment = async (id) => {
      try {
        const result = await axios.get(`${apiUrl}/comment/getCommentOfRecipe/${id}`)
        if(result.data.success){
          setComments(result.data.data.comment)
          console.log(result.data.data)
          if(result.data.data.myComment){
            setMyComment(result.data.data.myComment)
          } else {
            setMyComment('')
          }
        }
      } catch (error) {
        console.log(error)    
      }
    }

    const deleteComment = async (id) => {
      try {
        const result = await axios.delete(`${apiUrl}/comment/deleteComment/${id}`)
        if(result.data.success){
          await getComment(id)
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

    const handleClick1 = () => {
      setVisible(true)

    }

    const handleClickOutSide = () => {
      setVisible(false)
  }

    const handleSubmit = (success) => {
      setSuccess(success)
    } 

    const handleGetDataComment = () => {
      setComment(myComment.comment)
      setSuccess(false)
      setType(1)
    }

    const handleDeleteComment = () => {
      deleteComment(id)
    }

    let menuItem = [
      {
          id: 1,
          title: "Cập nhật",
          onClick: handleGetDataComment,
          // to: '/updateRecipe/'
      },
      {   
          id: 2,
          title: "Xóa bình luận",
          onClick: handleDeleteComment,
          to: ''
      }
    ];
  
  const renderResult = () => (
      <div className={classes["menu-list"]} tabIndex="-1">
          <div className={classes["menu-poper"]}>
              <div className={classes["menu-body"]}>
                  {menuItem.map(item => {
                      return (
                          <section key={item.id} className={classes["menu-item"]} 
                              onClick={() => setVisible(false)}>
                              <span onClick={(e) => item.onClick(e)}>{item.title}</span>
                          </section>
                        )
                  })}
              </div>
              
          </div>
      </div>
  )

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
                      <div className={classes["comment-container"]}>
                      <div className={classes.header}>
                          <FontAwesomeIcon icon={faComment} className={classes.icon}/>
                          <h3>Bình luận</h3>
                      </div>
                          <div className={classes["comment-content-block"]}>
                            {myComment && 
                            <>
                            <h6>Bình luận của bạn</h6>
                              <div key={myComment.userId} className={classes['comment-content']}>
                                <img src={`${myComment.User.avatar ? imageUrl + myComment.User.avatar : no_avatar}`} alt={myComment.User.fullName}/>
                                <div>
                                    <h6>{myComment.User.fullName + " " +  formatDate(myComment.date)}</h6>
                                <span>{myComment.comment}</span>
                              </div>
                                <Tippy
                                  delay={[0, 500]}
                                  offset={[20, 16]}
                                  visible={visible}
                                  interactive
                                  placement='bottom-end'
                                  render={renderResult}
                                  onClickOutside={handleClickOutSide}
                                >
                                    <FontAwesomeIcon icon={faEllipsis} className={classes.icon} onClick={handleClick1}/> 
                                </Tippy>
                          </div>
                            </>
                            }
                            <h6>Tất cả tương tác</h6>
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
                          <CommentForm handleSubmit={handleSubmit} comment={comment} setComment={setComment} type={type} setType={setType}/>
                      </div>  
                    </div>
                    </div>
                    {/* <div className={classes.save}>
                      <Button color='#FF9933'>
                        <FontAwesomeIcon icon={faBookmark} style={{marginRight: 10}}/>
                        Lưu món
                      </Button>
                      <Button color='#45464f'>Chia sẻ</Button>
                      <Button color='#45464f'>In</Button>
                      <Button color='#45464f'>Báo cáo</Button>
                    </div> */}
                </div>
            {/* } */}
      </div>
    )
}

export default RecipeDetail
