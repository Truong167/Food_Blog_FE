import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import classes from './index.module.css'

const BreadCrumbs = () => {
    let breadcrumbs = [
        {
            id: 1,
            title: "Cập nhật",
            link: "/",
            icon: <FontAwesomeIcon icon={faHouse} className={classes.icon}/>
        },
        {   
            id: 2,
            title: "Viết món mới",
            link: "/createRecipe",
            icon: <FontAwesomeIcon icon={faSquarePlus} className={classes.icon}/>
        }
      ];
  return (
    <div className={classes.container}>
      {breadcrumbs.map(item => {
        return (
            <section key={item.id} >
                <NavLink to={item.link} className={({isActive}) => 
                    [
                        isActive ? classes.active : classes.content
                    ]
                } >
                    {item.icon}
                    <span>{item.title}</span>
                </NavLink>
            </section>
        )
      })}
    </div>
  )
}

export default BreadCrumbs
