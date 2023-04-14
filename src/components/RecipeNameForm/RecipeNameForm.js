import { useEffect, useRef } from 'react'
import RecipeBlock from '../UI/RecipeBlock'
import classes from './RecipeNameForm.module.css'

const status = [
  {
    id: 'CK',
    value: 'Công khai'
  },
  {
    id: 'RT',
    value: 'Riêng tư'
  }
]

const RecipeNameForm = ({recipe, handleChange}) => {
    const textareaRef = useRef(null)

    useEffect(() => {
        textareaRef.current.style.height = "74px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [recipe.description]);

  return (
    <RecipeBlock>
      <input maxLength={30} className={classes["recipe-name"]} onChange={handleChange} name='recipeName' value={recipe.recipeName} type='text' placeholder='Tên món: Beafsteak ngon nhất nhà mình'/>
      <textarea ref={textareaRef} value={recipe.description} name='description' onChange={handleChange} className={classes.description} placeholder="Hãy chia sẻ với mọi người về món này của bạn nhé - ai đã truyền cảm hứng cho bạn, tại sao nó đặc biệt, bạn thích thưởng thức nó thế nào?"/>
      <div className={classes["input-container"]}>
        <p style={{color: '#606060'}}>Khẩu phần</p>
        <input type='text'className={classes.input} value={recipe.amount} name='amount' onChange={handleChange} placeholder='2 phần ăn'/>
      </div>
      <div className={classes["input-container"]}>
        <p style={{color: '#606060'}}>Thời gian chuẩn bị</p>
        <input type='text'className={classes.input} value={recipe.prepareTime} name='prepareTime' onChange={handleChange} placeholder='10 phút'/>
      </div>
      <div className={classes["input-container"]}>
        <p style={{color: '#606060'}}>Thời gian nấu</p>
        <input type='text'className={classes.input} value={recipe.cookTime} name='cookTime' onChange={handleChange} placeholder='10 phút'/>
      </div>
      <div className={classes["input-container"]}>
        <label style={{color: '#606060'}}>Quyền riêng tư</label>

        <select className={classes.privacy} name='status' value={recipe.selected} onChange={handleChange}>
          {status.map(item => (
            <option key={item.id} value={item.id}>{item.value}</option>
          ))}
        </select>
      </div>
      
    </RecipeBlock>
  )
}

export default RecipeNameForm
