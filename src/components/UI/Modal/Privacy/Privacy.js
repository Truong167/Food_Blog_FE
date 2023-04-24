import { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEarthAmericas, faLock } from "@fortawesome/free-solid-svg-icons";

import classes from "./Privacy.module.css"
import { useRecipesContext } from "../../../../contexts/recipeContext";
import { toast } from "react-toastify";

const Privacy = (props) => {
  const {updatePrivacy} = useRecipesContext()
    const classesName = `${classes.wrapper} ${classes[`${props.className}`]}`
    const handleSubmit = async (e) => {
      e.preventDefault()
      const result = await updatePrivacy(props.recipeId, props.status)
      console.log(result)
      if(result.success){
          toast.success('Thay đổi quyền riêng tư thành công', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true
          })
          props.onClose()
      } else {
          if(result.status === 500){
              toast.warning('Lỗi không xác định', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
              })
          }
      }
    }
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classesName}>
          <header className={classes.header}>
            <h6>Chỉnh sửa quyền riêng tư</h6>
            <FontAwesomeIcon icon={faXmark} onClick={props.onClose} className={classes.icon}/>
          </header>
          <div className={classes.form}>
            <form onSubmit={handleSubmit}>
                <div className={classes["container-form"]}>
                    <div className={classes["content-form"]}>
                        <div className={classes["container-icon"]}>
                          <FontAwesomeIcon icon={faEarthAmericas} className={classes["privacy-icon"]}/>
                        </div>
                        <div className={classes.text}>
                          <h6>Công khai</h6>
                          <p>Bất kì ai đều có thể thấy công thức của bạn</p>
                        </div>
                    </div>
                    <input type="radio" name="status" checked={props.status === 'CK' ? true : false} onChange={props.onChangeStatus} value="CK"/>
                </div>
                <div className={classes["container-form"]}>
                    <div className={classes["content-form"]}>
                        <div className={classes["container-icon"]}>
                          <FontAwesomeIcon icon={faLock} className={classes["privacy-icon"]}/>
                        </div>
                        <div className={classes.text}>
                          <h6>Riêng tư</h6>
                          <p>Ẩn công thức của bạn với mọi người</p>
                        </div>
                    </div>
                  <input type="radio" name="status" checked={props.status === 'RT' ? true : false} onChange={props.onChangeStatus} value="RT"/>
                </div>
                <button className={classes.btn} type='submit'>Xác nhận</button>
            </form>
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Privacy;