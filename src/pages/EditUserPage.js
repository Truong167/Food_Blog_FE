import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"


import DefaultLayout from "../components/Layout/DefaultLayout"
import UserForm from "../components/User/UserForm/UserForm"
import useAuth from "../hooks/useAuth"
import { imageUrl } from "../utils/constant"
import { formatDate1 } from "../utils/formatDate"


const EditUserPage = () => {
  const {authState: {user}, editUser} = useAuth()
  const [infor, setInfor] = useState({...user, avatar: `${imageUrl+user.avatar}`, user: '', dateOfBirth: formatDate1(user.dateOfBirth)})
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const frmData = new FormData()
    frmData.append('fullName', infor.fullName)
    frmData.append('dateOfBirth', infor.dateOfBirth)
    frmData.append('address', infor.address)
    frmData.append('email', infor.email)
    frmData.append('introduce', infor.introduce)
    frmData.append('user', infor.user)
    const result = await editUser(frmData)
    if(result.success){
      toast.success('Cập nhật thông tin thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true
      })
    } else {
      if(result.status === 440){
        toast.warning('Có lỗi khi tải hình', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      } else if(result.status === 418){
        toast.warning('Vui lòng nhập đầy đủ thông tin', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      } else if(result.status === 422){
        toast.warning('Email đã tồn tại', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      } else if(result.status === 500){
        toast.warning('Lỗi không xác định', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        })
      }
    }

  }
  return (
    <DefaultLayout type='myRecipe' width='680px' text='Cập nhật' form="edit-user" handleSubmit={handleSubmit}>
      <form id="edit-user" encType='multipart/form-data'>
        <UserForm handleOnChange={handleOnChange} infor={infor} handleOnChangeUserImage={handleOnChangeUserImage} handleDeleteUserImage={handleDeleteUserImage}/>
      </form>
      <ToastContainer />
    </DefaultLayout>
  )
}

export default EditUserPage
