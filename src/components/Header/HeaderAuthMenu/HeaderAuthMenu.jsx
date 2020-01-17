import React,{useState,useEffect,useRef} from 'react'
import style from './HeaderAuthMenu.module.css'
import cn from 'classnames'
import bottomArrow from '../../../assets/images/white_bottom_arrow.png'
import {NavLink} from "react-router-dom";




function HeaderAuthMenuContainer(props) {

    const [menuIsOpen,setMenuStatus] = useState(false);



    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setMenuStatus(false)
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });


    const onKeyDown = (e) => {
        if (e.key === 'Enter') setMenuStatus(!menuIsOpen)
    };

    const onClickHandler = () => {
        setMenuStatus(!menuIsOpen)
    };



    return (
        <HeaderAuthMenu {...props}
                        myRef={myRef}
                        onClickHandler={onClickHandler}
                        menuIsOpen={menuIsOpen}
                        onKeyDown={onKeyDown}
        />
    )
};


function HeaderAuthMenu({login,photo,logout,myRef,onClickHandler,menuIsOpen,onKeyDown}) {

    return (
        <div ref={myRef} className={cn(style.wrapper,menuIsOpen && style.active)} tabIndex="1" onKeyDown={(e) => onKeyDown(e)}>
            <div onClick={onClickHandler} className={cn(style.headerMenuInfo,{[style.active]:menuIsOpen})}>
                <span>{login}</span>
                <img className={style.img} src={photo} alt=""/>
                <img className={cn(style.arrow,menuIsOpen && style.active)} src={bottomArrow} alt=""/>
            </div>

            <div  className={cn(style.menu, menuIsOpen ? style.menuIsOpen : style.menuIsHidden)}>
                <ul>
                    <li><NavLink to='/edit'><p>Edit profile</p></NavLink></li>
                    <li onClick={logout}><p>Log out</p></li>
                </ul>
            </div>

        </div>
    )
}

export default HeaderAuthMenuContainer