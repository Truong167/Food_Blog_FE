import { useState } from "react"
import DefaultLayout from "../components/Layout/DefaultLayout"
import UserForm from "../components/User/UserForm/UserForm"
import useAuth from "../hooks/useAuth"
import { imageUrl } from "../utils/constant"


const EditUserPage = () => {
  const {authState: {user}, editUser} = useAuth()
  const [infor, setInfor] = useState({...user, avatar: `${imageUrl+user.avatar}`, user: ''})
  const handleOnChange = (e) => {
    setInfor({...infor, [e.target.name]: e.target.value})
  }
  const handleOnChangeUserImage = (e) => {
    setInfor({...infor, avatar: URL.createObjectURL(e.target.files[0]), user: e.target.files[0]})
  }

  const handleDeleteUserImage = () => {
    setInfor({...infor, avatar: '', user: ''})
  }
  console.log(infor)

  const handleSubmit = (e) => {
    e.preventDefault()
    const frmData = new FormData()
    frmData.append('fullName', infor.fullName)
    frmData.append('dateOfBirth', infor.dateOfBirth)
    frmData.append('address', infor.address)
    frmData.append('email', infor.email)
    frmData.append('introduce', infor.introduce)
    frmData.append('user', infor.user)
    editUser(frmData)

  }
  return (
    <DefaultLayout type='myRecipe' width='680px' text='Cập nhật' form="edit-user" handleSubmit={handleSubmit}>
      <form id="edit-user" encType='multipart/form-data'>
        <UserForm handleOnChange={handleOnChange} infor={infor} handleOnChangeUserImage={handleOnChangeUserImage} handleDeleteUserImage={handleDeleteUserImage}/>
      </form>
    </DefaultLayout>
  )
}

export default EditUserPage
