import React from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {createNewField, InputArea} from "../common/inputs/inputs";
import {Redirect} from "react-router-dom";
import style from './Login.module.css'
import cn from 'classnames'
import ButtonWithPreloader from "../common/ButtonWithPreloader/ButtonWithPreloader";
import logo from '../../assets/images/mobile_login_logo.png'




function LoginContainer(props) {

    let onSubmit = (data) => {
        props.login({...data,rememberMe:true})
    };

    if (props.isAuth) return <Redirect to='/profile'/>;

    return (
        <Login onSubmit={onSubmit} {...props} />
    )
}

function Login(props) {


    return (
        <div className={style.loginContainer}>
            <div className={cn('block', style.loginWrapper)}>
                <img alt='logo' src={logo} className={style.logo}/>
                <div>
                    <h1>Login</h1>
                    <LoginFormContainer isFetching={props.isFetching} captchaImg={props.captchaImg} onSubmit={props.onSubmit}/>
                </div>
            </div>
        </div>
    )
}

function LoginForm(props) {
    return (
        <form onSubmit={props.handleSubmit} className={style.form}>
            <div>
                {createNewField("Email", "email", null, InputArea,)}
            </div>
            <div>
                {createNewField("Password", "password", null, InputArea, {type: 'password'})}
            </div>
            {props.error && <div className='errorStyle'>{props.error}</div>}
            {props.captchaImg &&
            <div>
                <img alt='captcha' className={style.captcha} src={props.captchaImg}/>
                {createNewField("Captcha", "captcha", null, InputArea, )}
            </div>}
            <div>
                <ButtonWithPreloader isFetching={props.isFetching} name={"Login"}/>
            </div>
        </form>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaImg: state.auth.captchaImg,
        isFetching: state.auth.isFetching
    }
};

let LoginFormContainer = reduxForm({form: 'Login'})(LoginForm);

export default connect(mapStateToProps, {login})(LoginContainer);