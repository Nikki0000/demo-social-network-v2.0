import React, {FC} from "react"
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'


const Navbar: FC = () => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to="/profile" className={ navData => navData.isActive ? s.active: s.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={ navData => navData.isActive ? s.active: s.item}>Users</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={ navData => navData.isActive ? s.active: s.item}>Message</NavLink>
            </div>
            <div>
                <NavLink to="/news" className={ navData => navData.isActive ? s.active: s.item}>News</NavLink>
            </div>
            <div>
                <NavLink to="/sectionbook" className={ navData => navData.isActive ? s.active: s.item}>Book section</NavLink>
            </div>
            
            {/* <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Setting</a>
            </div> */}
        </nav>
    )
}

export default Navbar;