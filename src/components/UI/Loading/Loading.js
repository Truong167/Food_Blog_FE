import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import classes from './Loading.module.css'


const Loading = () => {
    return (
        <FontAwesomeIcon icon={faCircleNotch} className={classes.loading}/>
    )
}

export default Loading