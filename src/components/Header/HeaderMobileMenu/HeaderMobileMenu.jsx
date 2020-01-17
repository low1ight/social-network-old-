import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChevronRight,
    faEdit,
    faEnvelope,
    faSearch,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import style from './HeaderMobileMenu.module.css'
import cn from 'classnames'
import {NavLink} from "react-router-dom";


function HeaderMobileMenu({photo, login,logout}) {

    const [isOpen, setOpen] = useState(false);

    const onClickLogOut = () => {
        setOpen(false);
        logout()

    }

    return (
        <div className={cn(style.wrapper, {[style.hidden]: !isOpen})}>
            <FontAwesomeIcon icon={faBars} onClick={() => setOpen(!isOpen)}/>
            <div className={style.menu}>
                <div className={style.nav}>

                    <NavLink onClick={() => setOpen(false)} to='/profile' className={style.myProfile}>
                        <div>
                            <img src={photo} alt=""/>
                            <p>{login}</p>
                            <span>go to profile</span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </div>
                    </NavLink>
                    <div className={style.otherNav}>
                        <NavLink onClick={() => setOpen(false)} to='/dialogs'><FontAwesomeIcon icon={faEnvelope}/><p>Message</p></NavLink>
                        <NavLink onClick={() => setOpen(false)} to='/find-users'><FontAwesomeIcon icon={faSearch}/><p>Find user</p></NavLink>
                    </div>
                    <div className={style.otherNav}>
                        <NavLink onClick={() => setOpen(false)} to='/edit'><FontAwesomeIcon icon={faEdit}/><p>Edit profile</p></NavLink>
                        <div onClick={onClickLogOut} ><FontAwesomeIcon icon={faSignOutAlt}/><p>Log out</p></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HeaderMobileMenu