import {authAPI} from "../API/API";
import {stopSubmit} from "redux-form";
import {getAuthUserProfile} from "./profile-reducer";

const SET_USER_DATA = 'SET-USER-DATA';
const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
const SET_CAPTCHA_IMG = 'SET-CAPTCHA-IMG';
const SET_FETCHING_STATUS = 'SET-FETCHING-STATUS';
const CLEAR_CAPTCHA_IMG = 'CLEAR-CAPTCHA-IMG';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaImg: null,
    isFetching: false
};


const authReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        case CLEAR_USER_DATA:
            return {
                ...state,
                id: null,
                login: null,
                email: null,
                isAuth: false
            };
        case SET_CAPTCHA_IMG:
            return {
                ...state,
                captchaImg: action.url
            };
        case SET_FETCHING_STATUS:
            return {
                ...state,
                isFetching: action.status
            };
        case CLEAR_CAPTCHA_IMG:
            return {
                ...state,captchaImg:null
            }

        default:
            return state
    }

};


export const setAuthUserData = (id, login, email) => ({type: SET_USER_DATA, data: {id, login, email}});
export const clearAuthUserData = () => ({type: CLEAR_USER_DATA});
export const setCaptchaImg = (url) => ({type: SET_CAPTCHA_IMG, url});
export const clearCaptcha = () => ({type: CLEAR_CAPTCHA_IMG})
const setFetchingStatus = (status) => ({type: SET_FETCHING_STATUS, status});

export const headerSetAuth = () => async (dispatch) => {
    let response = await authAPI.getAuth()
    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, login, email));
        await dispatch(getAuthUserProfile(id))
    }
};
export const login = (data) => async (dispatch) => {
    dispatch(setFetchingStatus(true));
    let response = await authAPI.login(data);
    if (response.resultCode === 0) {
        await dispatch(headerSetAuth())
        dispatch(clearCaptcha())
    } else if (response.resultCode === 10) {
        let captchaResponse = await authAPI.getCaptcha();
        dispatch(setCaptchaImg(captchaResponse));
    } else {
        if (response.messages.length > 0) {
            dispatch(stopSubmit('Login', {_error: response.messages}))
        }
    }
    dispatch(setFetchingStatus(false))
};

export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
        if (response.resultCode === 0) {
            dispatch(clearAuthUserData());
        }
    })
};


export default authReducer;