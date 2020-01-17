import {usersAPI} from "../API/API";
import {updateObjectOnArray} from "../utils/object-helper/object-helper";

const LOAD_USERS = 'LOAD-USERS';
const LOAD_NEW_USERS = 'LOAD-NEW-USERS';
const USER_FOLLOW = 'USER-FOLLOW';
const USER_UNFOLLOWING = 'USER-UNFOLLOWING';
const SET_USER_PAGE_COUNT = 'SET-USER-PAGE-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';


let initialState = {
    users: [],
    userPageCount:1,
    isFetching: false,
    followingInProgress: [],
};


const FindUsersReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case USER_FOLLOW:
            return {
                ...state,
                users: updateObjectOnArray(state.users, 'id', action.id, {followed: true})
            };
        case USER_UNFOLLOWING:
            return {
                ...state,
                users: updateObjectOnArray(state.users, 'id', action.id, {followed: false})
            };
        case LOAD_USERS:
            return {
                ...state,users:action.users
            }
        case LOAD_NEW_USERS:
            return {
                ...state, users: [...state.users, ...action.users]
            };
        case SET_USER_PAGE_COUNT:
            return {
                ...state, userPageCount: Math.ceil(action.userCount / 35)
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state

    }

};

export const loadUsers = (users) => ({type:LOAD_USERS,users})
export const loadNewUsers = (users) => ({type: LOAD_NEW_USERS, users});
export const userFollow = (id) => ({type: USER_FOLLOW, id});
export const userUnfollowing = (id) => ({type: USER_UNFOLLOWING, id});
export const setUserPageCount = (userCount) => ({type: SET_USER_PAGE_COUNT, userCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const followingInProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId});


export const getUsers = (currentPage) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage)
        .then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUserPageCount(data.totalCount));
            dispatch(loadUsers(data.items));

        })
};

export const getNewUser = (currentPage) => async (dispatch) => {
    let response = await usersAPI.getUsers(currentPage)
    dispatch(loadNewUsers(response.items))
}

export const followUnfollowHandler = async (dispatch,id,apiMethod,reducerMethod) => {
    dispatch(followingInProgress(true, id));

    let response = await apiMethod(id)
    if (response.resultCode === 0) {
        dispatch(reducerMethod(id));
    }
    dispatch(followingInProgress(false, id));

}
export const follow = (id) => async (dispatch) => {
  return followUnfollowHandler(dispatch,id,usersAPI.followUser,userFollow)
};

export const unfollow = (id) => async (dispatch) => {
    return followUnfollowHandler(dispatch,id,usersAPI.unfollowUser,userUnfollowing)
};


export default FindUsersReducer