import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import classes from './defaultLayout.module.css'

function DefaultLayout({ children }) {
    return (
        <div className={classes.wrapper}>
            <Header />
            <div className={classes.container}>
                <div className={classes.content}>{children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout
