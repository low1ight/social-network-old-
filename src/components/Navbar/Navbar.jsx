import React,{useEffect} from 'react'
import style from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {checkNewMessageCount} from "../../redux/dialogs-reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome,faEnvelope,faSearch} from '@fortawesome/free-solid-svg-icons'


function Navbar({newMessageCount}) {
    return(
        <nav className={style.nav}>
            <ul>
                <li><NavLink to='/profile' activeClassName={style.active}><FontAwesomeIcon icon={faHome} className={style.icons} /><p>Profile</p></NavLink></li>
                <li><NavLink to='/find-users' activeClassName={style.active}><FontAwesomeIcon icon={faSearch} className={style.icons} /><p>Find Users</p></NavLink></li>
                <li><NavLink to='/dialogs' activeClassName={style.active}><FontAwesomeIcon icon={faEnvelope} className={style.icons} /><p>Dialogs</p></NavLink>{newMessageCount > 0 && <div className={style.newMessageCounter}><span><p>{newMessageCount >= 100 ? '99+' : newMessageCount }</p></span></div>}</li>
            </ul>
        </nav>
    )
}

function NavbarConteiner(props) {



    useEffect(() => {
        props.checkNewMessageCount();
        const interval = setInterval(props.checkNewMessageCount,5000)
        return () => clearInterval(interval)
    },[props]);

    return (
        <Navbar {...props} />
    )
}


const mapStateToProps = (state) => {
    return {
        newMessageCount: state.dialogs.newMessageCount
    }
};

export default connect(mapStateToProps,{checkNewMessageCount})(NavbarConteiner)