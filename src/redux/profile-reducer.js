import {profileAPI, usersAPI} from "../API/API";
import {stopSubmit} from "redux-form";
import {errorHandler} from "../utils/profileEditErrorHandler/profileEditErrorHandler";
import {push} from 'connected-react-router'
import {followUnfollowHandler} from "./findUsers-reducer";


const SET_CURRENT_USER_PROFILE = 'SET-CURRENT-USER-PROFILE';
const SET_AUTH_USER_PROFILE = 'SET-AUTH-USER-PROFILE';
const SET_CURRENT_USER_STATUS = 'SET_CURRENT_USER_STATUS';
const SET_AUTH_USER_STATUS = 'SET_AUTH_USER_STATUS';
const PROFILE_TOGGLE_FETCHING = 'PROFILE-TOGGLE-FETCHING';
const LOAD_PROFILE_PHOTO = 'LOAD-PROFILE-PHOTO';
const SET_BUTTON_FETCHING_STATUS = 'SET-BUTTON-FETCHING-STATUS';
const SET_FOLLOW_STATUS = 'SET-FOLLOW-STATUS';
const PAGE_FOLLOW_IS_FETCHING = 'PAGE-FOLLOW-IS-FETCHING';


let initialPost = {
    authUserProfile: {
        profileData:null,
        profileStatus: ""
    },
    currentUserProfile: {
        profileData:null,
        profileStatus: ""
    },
    isFetching: true,
    buttonIsFetching: false,
    isFollow: false,
    followIsFetching:false
};

const profileReducer = (state = initialPost, action) => {

    switch ( action.type ) {

        case SET_CURRENT_USER_PROFILE:
            return {
                ...state, currentUserProfile: {...state.currentUserProfile,profileData: action.data}
            };
        case SET_AUTH_USER_PROFILE:
            return {
                ...state,authUserProfile: {...state.authUserProfile,profileData: action.data}
            };
        case SET_CURRENT_USER_STATUS:
            return {
                ...state, currentUserProfile:{...state.currentUserProfile,profileStatus:action.status}
            };
        case SET_AUTH_USER_STATUS:
            return {
                ...state, authUserProfile:{...state.authUserProfile,profileStatus:action.status}
            };
        case PROFILE_TOGGLE_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case SET_FOLLOW_STATUS:
            return {
                ...state, isFollow: action.followStatus
            };
        case PAGE_FOLLOW_IS_FETCHING: {
            return {
                ...state,followIsFetching: action.fetchingStatus
            }
        }

        case SET_BUTTON_FETCHING_STATUS:
            return {
                ...state,
                buttonIsFetching: action.status
            }
        case LOAD_PROFILE_PHOTO:
            return {
                ...state, authUserProfile: {...state.authUserProfile, profileData:{...state.authUserProfile.profileData,photos: action.file}}
            };


        default:
            return state;
    }
};


export const setCurrentUserProfile = (data) => ({type: SET_CURRENT_USER_PROFILE, data});
export const setAuthUserProfile = (data) => ({type:SET_AUTH_USER_PROFILE,data});
export const setCurrentUserProfileStatus = (status) => ({type: SET_CURRENT_USER_STATUS, status});
export const setAuthUserProfileStatus = (status) => ({type: SET_AUTH_USER_STATUS, status});
export const profileToggleFetching = (isFetching) => ({type: PROFILE_TOGGLE_FETCHING, isFetching});
export const saveNewPhoto = (file) => ({type: LOAD_PROFILE_PHOTO, file});
export const setButtonFetchingStatus = (status) => ({type: SET_BUTTON_FETCHING_STATUS, status});
export const setFollowStatus = (followStatus) => ({type:SET_FOLLOW_STATUS,followStatus});
export const setFollowFetchingStatus = (fetchingStatus) => ({type:PAGE_FOLLOW_IS_FETCHING,fetchingStatus});

export const editProfile = (data,id) => async (dispatch) => {
    dispatch(setButtonFetchingStatus(true));
    const response = await profileAPI.editProfile(data);
    if (response.data.resultCode === 0) {
        let profile = await profileAPI.getProfile(id);
        dispatch(setAuthUserProfile(profile));
        dispatch(push('/profile'))
    } else {
        let error = errorHandler(response.data.messages);
        let action = stopSubmit('ProfileEdit', {contacts: error});
        dispatch(action);
    }
    dispatch(setButtonFetchingStatus(false))
};

export const profileLoader = async (dispatch,id,setProfile,setStatus) => {
    dispatch(profileToggleFetching(true));

    let profile = await profileAPI.getProfile(id);
     dispatch(setProfile(profile));

    let status = await profileAPI.getStatus(id);
    dispatch(setStatus(status.data));

    dispatch(profileToggleFetching(false));
};

export const getAuthUserProfile = (id) => async (dispatch) => {
    await profileLoader(dispatch,id,setAuthUserProfile,setAuthUserProfileStatus)
};

export const getCurrentUserProfile = (id) => async (dispatch) => {
    await profileLoader(dispatch,id,setCurrentUserProfile,setCurrentUserProfileStatus)
    const response = await profileAPI.getFollowStatus(id)
    dispatch(setFollowStatus(response.data))
};




export const profileStatusUpdate = (status) => (dispatch) => {
    profileAPI.setStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserProfileStatus(status));
        }
    })
};
export const loadProfilePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.setPhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(saveNewPhoto(response.data.data.photos));
    }

};

export const pageFollow = (id) => async (dispatch) => {
    return followUnfollowHandler(dispatch,id,usersAPI.followUser,() => setFollowStatus(true))
};
export const pageUnfollow = (id) => async (dispatch) => {
    return followUnfollowHandler(dispatch,id,usersAPI.unfollowUser,() => setFollowStatus(false))
};

export default profileReducer;

