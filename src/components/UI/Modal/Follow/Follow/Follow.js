import { imageUrl } from '../../../../../utils/constant'
import classes from './Follow.module.css'

import no_avatar from '../../../../../assets/images/no_avatar.png'

const Follow = ({avatar, fullName}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <img src={avatar ? `${imageUrl + avatar}` : no_avatar} className={classes.img}/>
        <h6>{fullName}</h6>
      </div>
      <button className={classes.btn}>Bỏ theo dõi</button>
    </div>
  )
}

export default Follow
