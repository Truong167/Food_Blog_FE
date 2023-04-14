import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons'

import classes from './DetailIngredient.module.css'
import { formatTime } from '../../utils/formatDate'

const DetailIngredient = ({detailIngredient, preparationTime, cookingTime, amount}) => {
    let output = []
    detailIngredient.map(item => {
        output.push(<p key={item.ingredientId}><b>{item.amount}</b> {item.name}</p>)
        output.push(<p key={item.name} className={classes.line}></p>)
    })
    output.pop()
  return (
    <div className={classes.container}>
      <div>
        <h4>Nguyên liệu</h4>
        <div className={classes.content}>
            <div className={classes.detail}>
                <FontAwesomeIcon icon={faClock}/>
                <span>{formatTime(preparationTime)}</span>
            </div>
            <div className={classes.detail}>
                <FontAwesomeIcon icon={faUser}/>
                <span>{amount} người</span>
            </div>
            <div className={classes.detail}>
                <FontAwesomeIcon icon={faClock}/>
                <span>{formatTime(cookingTime)}</span>
            </div>
        </div>
      </div>
    {output.map(item => (
        item
    ))}
    </div>
  )
}

export default DetailIngredient
