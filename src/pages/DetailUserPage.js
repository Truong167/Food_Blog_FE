import React, { useState } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import NavBar from '../components/NavBarUser/NavBar'
import User from '../components/User/User'
import BookmarkList from '../components/Bookmark/BookmarkList'
import useAuth from '../hooks/useAuth'
import { useParams } from 'react-router-dom'
import FavoriteRecipe from '../components/FavoriteRecipe/FavoriteRecipe'
import MyRecipeList from '../components/Recipe/MyRecipeList/MyRecipeList'

const DetailUserPage = () => {
  const {authState} = useAuth()
    const {id} = useParams()
    const [toggle, setToggle] = useState(1)
    let check = false
    if(authState.user.userId === parseInt(id)){
        check = true
    }
    const handleToggle = (index) => {
        setToggle(index)
    }
  return (
    <DefaultLayout>
        <User/>
        <NavBar toggle={toggle} handleToggle={handleToggle} check={check}/>
        {!check && <MyRecipeList type='recipeUser'/>}
        {check && toggle === 1 && <MyRecipeList/>}
        {check && toggle === 2 && <BookmarkList/>}
        {check && toggle === 3 && <FavoriteRecipe />}

    </DefaultLayout>
  )
}

export default DetailUserPage
