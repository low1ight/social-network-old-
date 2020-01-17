import React from 'react'
import style from './Header.module.css'
import cn from 'classnames'
import HeaderAuthMenu from "./HeaderAuthMenu/HeaderAuthMenu";
import logo from '../../assets/images/logo.png'
import defaultUserPhoto from '../../assets/images/defaultUserAvatar.png'

import HeaderMobileMenu from "./HeaderMobileMenu/HeaderMobileMenu";

function Header(props) {

    return (
        <header className={style.header}>
            <div className={cn('container',style.wrapper)}>


                {props.isAuth &&
                <HeaderMobileMenu login={props.login}
                                  logout={props.logout}
                                  photo={props.photos.profileData ? props.photos.profileData.photos.small : defaultUserPhoto }/>}

                    <img className={style.logo} src={logo} alt='logo'/>
                    {props.isAuth ? <div><HeaderAuthMenu photo={props.photos.profileData ? props.photos.profileData.photos.small : defaultUserPhoto }
                                                         login={props.login}
                                                         logout={props.logout}/>
                        </div> :
                        <div>{/*space for register/login buttons*/}</div>}


            </div>
        </header>
    )
}

export default Header