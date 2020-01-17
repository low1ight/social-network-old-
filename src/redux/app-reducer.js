import {headerSetAuth} from "./auth-reducer";

const SET_INITIALISED = 'SET-INITIALISED';


let initialState = {
    initializedState: false
};

export const appReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case SET_INITIALISED:
            return {
                ...state,
                initializedState: true
            };
        default:
            return state

    }
};


const setInitialized = () => ({type: SET_INITIALISED});


export const initializedSuccess = () => async (dispatch) => {
    await dispatch(headerSetAuth());
    dispatch(setInitialized());
};