import classes from './IngredientItem.module.css'
import { imageUrl } from '../../../contexts/constant'
const IngredientItem = ({name, image, isActive, handleClick}) => {
  const sendData = () => {
    handleClick(name)
  }
  return (
    <button className={classes.container} name={name} style={isActive === name ? {backgroundColor: '#ffebd6'} : {}} onClick={sendData}>
      <img src={imageUrl + image} alt={name} className={classes.image}/>
      <span className={classes.name}>{name}</span>
    </button>
  )
}

export default IngredientItem
