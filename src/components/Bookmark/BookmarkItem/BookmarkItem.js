import React, { useEffect, useState } from 'react'
import classes from './BookmarkItem.module.css'
import axios from 'axios'
import { apiUrl, imageUrl } from '../../../utils/constant'


const BookmarkItem = ({handleClick}) => {
    const [recipeList, setRecipeList] = useState([])
    const fetchData = async () => {
        try {
            const result = await axios.get(`${apiUrl}/recipeList/getRecipeList`)
            if(result.data.success){
                setRecipeList(result.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(recipeList)
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
            {recipeList.map(item => (
                <div key={item.recipeListId} className={classes.content} onClick={handleClick}>
                    <img src={`${imageUrl + item.image}`} alt={item.name}/>
                    <div id={item.recipeListId} className={classes['over-lay']}>
                    </div>
                    <span>{item.name}</span>    
                </div>
                ))}
            </div>
    </div>
  )
}

export default BookmarkItem
