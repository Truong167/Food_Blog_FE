import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import RecipeItem from './RecipeItem/RecipeItem'
import classes from './RecipeList.module.css'
import useViewport from '../../hooks/useViewPort';

const RecipeList = ({recipes}) => {
  const { width: deviceWidth } = useViewport()
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
  })
  useEffect(() => {
    if (deviceWidth <= 476) setSettings({...settings, slidesToShow: 1, slidesToScroll: 1});
  }, [deviceWidth]);
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 2
  // };
  return (
    <div className={classes.container}>
      {recipes.length > 0 ? ( recipes.length > 4 ?
        <Slider {...settings}>
        {recipes.map(item => (
          <RecipeItem {...item} key={item.recipeId}/>
        ))}
      </Slider> : <div className={classes.content}>{recipes.map(item => (
        <RecipeItem {...item} key={item.recipeId}/>
      ))}</div>
      ) : <h3>Không có công thức phù hợp</h3>
      }   
    </div>
    
  )
}

export default RecipeList
