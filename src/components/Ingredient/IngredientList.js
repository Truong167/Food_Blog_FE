import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import IngredientItem from "./IngredientItem/IngredientItem"
import classes from './Ingredient.module.css'


const IngredientList = ({ingredient, isActive, handleClick}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
  };
  return (
    <div>
        <div className={classes.container}>
            {ingredient.map(item => (
                <IngredientItem isActive={isActive} {...item} key={item.ingredientId} handleClick={handleClick}/>
            ))}
        </div>
    </div>
  )
}

export default IngredientList
