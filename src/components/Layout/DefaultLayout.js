import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import classes from './defaultLayout.module.css'

function DefaultLayout({ children, type = 'normal', width = '990px', handleSubmit, text, form, className }) {
    return (
        <div className={classes.wrapper}>
            <Header type={type} handleSubmit={handleSubmit} text={text} form={form}/>
            <div className={classes.container}>
                <div className={`${classes.content} ${classes[`${className}`]}`}>{children}</div>
            </div>
            {type !== 'myRecipe' && <Footer/>}
        </div>
    );
}

export default DefaultLayout
