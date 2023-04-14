import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import IngredientItem from "./IngredientItem/IngredientItem"
import classes from './Ingredient.module.css'


const IngredientList = ({ingredient, isActive}) => {
  return (
    <div>
        <div className={classes.container}>
            {ingredient.map(item => (
                <IngredientItem isActive={isActive} {...item} key={item.ingredientId}/>
            ))}
        </div>
    </div>
  )
}

export default IngredientList
