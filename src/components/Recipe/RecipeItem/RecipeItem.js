import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHeart as faLiked } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons'
import classes from './RecipeItem.module.css'
import { imageUrl } from '../../../utils/constant'
import no_avatar from '../../../assets/images/no_avatar.png'
import { formatDate } from '../../../utils/formatDate'
import { Link } from 'react-router-dom'
import { useRecipesContext } from '../../../contexts/recipeContext'

const RecipeItem = ({User, date, recipeId, image, isFavorite, recipeName, numberOfLikes, isLiked}) => {
  const {handleLike, handleDisLike} = useRecipesContext()
  
  return (
    <div className={classes.container}>
      <Link className={classes.header} to={`/user/${User.userId}`}>
        <img src={User.avatar ? `${imageUrl + User.avatar}` : `${no_avatar}`} className={classes.avatar} alt=''/>
        <span>{User.fullName}</span> 
      </Link>
      <Link className={classes['recipe-img']} to={`/detail/${recipeId}`}>
        <img src={`${imageUrl + image}`} alt='' className={classes.img}/>
        <span>{formatDate(date)}</span>
      </Link>
      <div className={classes.name}>
        <span>{recipeName}</span>
        <button className={classes.btn}>
            <FontAwesomeIcon icon={faBookmark}/>
          </button>
      </div>
      <div>
        <div>
          <button className={classes.btn}>
            {isFavorite || isLiked ? <FontAwesomeIcon className={classes.active} icon={faLiked} onClick={() => handleDisLike(recipeId, 'main')}/> 
              : 
              <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(recipeId, 'main')}/>
            }
          </button>
          <span>{numberOfLikes}</span>
        </div>
      </div>
    </div>
  )
}

export default RecipeItem
