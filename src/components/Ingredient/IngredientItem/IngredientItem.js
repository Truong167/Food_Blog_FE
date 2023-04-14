import classes from './IngredientItem.module.css'
import { imageUrl } from '../../../utils/constant'
import { useIngredientsContext } from '../../../contexts/ingredientContext'
const IngredientItem = ({name, image, isActive}) => {
  const {setName} = useIngredientsContext()
  const sendData = () => {
    setName(name)
  }
  return (
    <div className={classes.container} name={name} style={isActive === name ? {backgroundColor: '#ffebd6'} : {}} onClick={sendData}>
      <img src={imageUrl + image} alt={name} className={classes.image}/>
      <span className={classes.name}>{name}</span>
    </div>
  )
}

export default IngredientItem
