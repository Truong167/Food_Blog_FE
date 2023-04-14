import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless';


import classes from './StepItemForm.module.css'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const StepItemForm = ({description, stepIndex, handleAddStep, handleDeleteStep, handleOnChangeStep, handleDeleteStepImage, handleOnChangeStepImage, image}) => {
    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        setVisible(!visible)
    }
    const handleClickOutSide = () => {
        setVisible(false)
    }

    let menuItem = [
        {
            id: 1,
            title: "Thêm bước",
            onClick: handleAddStep
        },
        {   
            id: 2,
            title: "Xóa bước",
            onClick: handleDeleteStep
        }
      ];

    const renderResult = () => (
        <div className={classes["menu-list"]} tabIndex="-1">
            <div className={classes["menu-poper"]}>
                <div className={classes["menu-body"]}>
                    {menuItem.map(item => {
                        return (
                            <section key={item.id} className={classes["menu-item"]} 
                                onClick={() => {
                                    item.onClick()
                                    setVisible(false)
                                }}>
                                <span>{item.title}</span>
                            </section>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )

  return (
    <div className={classes.wrapper}>
      <div className={classes["step-index"]}>{stepIndex + 1}</div>
      <div>
        <input className={classes["step-name"]} name='description' value={description} onChange={handleOnChangeStep} type='text' placeholder='Trộn bột và nước đến khi đặc lại'/>
        {image  ?
            <div className={classes.preview}>
                <img src={image} alt='Upload' className={classes["preview-img"]}/>
                <div className={classes["custom-img"]}>
                    <div className={classes.upload}>
                        <input type='file' accept='image/*' name='step' className={classes.input} onChange={handleOnChangeStepImage}/>
                        <FontAwesomeIcon icon={faCameraRetro} className={classes.icon}/>
                    </div>
                    <div className={classes.delete} onClick={handleDeleteStepImage}>
                        <FontAwesomeIcon icon={faTrashCan} className={classes.icon}/>
                    </div>
                </div>
            </div> :
            <div className={classes.img}>
                <FontAwesomeIcon icon={faCameraRetro} className={classes["camera-icon"]}/>
                <input type='file' accept='image/*' name='step' onChange={handleOnChangeStepImage}/>
            </div>
        }
      </div>
      <div>
        <Tippy
            delay={[0, 500]}
            offset={[20, 16]}
            visible={visible}
            interactive
            placement='bottom-end'
            render={renderResult}
            onClickOutside={handleClickOutSide}
        >
            <FontAwesomeIcon icon={faEllipsis} className={classes.icon1} onClick={handleClick}/> 
        </Tippy>
      </div>
    </div>
  )
}

export default StepItemForm
