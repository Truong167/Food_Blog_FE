import React from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import NavBar from '../components/NavBarUser/NavBar'
import User from '../components/User/User'

const DetailUserPage = () => {
  return (
    <DefaultLayout>
        <User/>
        <NavBar/>
    </DefaultLayout>
  )
}

export default DetailUserPage
