import {dialogsAPI} from "../API/API";
import {push} from 'connected-react-router'
import {reset} from "redux-form";

const GET_DIALOGS = 'GET-DIALOGS';
const GET_CURRENT_DIALOGS_MESSAGE = ' GET-CURRENT-DIALOGS-MESSAGE';
const UP_DIALOG_ON_TOP = 'UP-DIALOG-ON-TOP';
const UNREAD_MESSAGE_COUNT = 'UNREAD-MESSAGE-COUNT';
const SET_NEW_MESSAGE_COUNT = 'SET-NEW-MESSAGE-COUNT';
const CLEAR_CURRENT_MESSAGE = 'CLEAR-CURRENT-MESSAGE';
const SET_NEW_MESSAGE_IN_STATE = 'SET-NEW-MESSAGE-IN-STATE';
const SET_MESSAGE_VIEWED_STATUS = 'SET-MESSAGE-VIEWED_STATUS'

let initialState = {
    dialogs: null,
    initialDialogs: false,
    currentDialogsMessage: null,
    newMessageCount: 0,
    unreadMessageCount: 0,
};


const dialogsPageReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case GET_DIALOGS:
            return {...state, dialogs: [...action.dialogs]};

        case GET_CURRENT_DIALOGS_MESSAGE:
            return {...state, currentDialogsMessage: [...action.messageArr]};
        case UP_DIALOG_ON_TOP:
            return {
                ...state,
                dialogs: [...state.dialogs]
                    .sort((x, y) => x.id === action.id ? -1 : y.id === action.id ? 1 : 0)
            };
        case UNREAD_MESSAGE_COUNT:
            return {
                ...state,
                unreadMessageCount: action.count
            };

        case SET_NEW_MESSAGE_COUNT:
            return {...state, newMessageCount: action.count};

        case CLEAR_CURRENT_MESSAGE:
            return {...state, currentDialogsMessage: null};

        case SET_NEW_MESSAGE_IN_STATE:
            return {...state, currentDialogsMessage: [...state.currentDialogsMessage,action.message]};

        case SET_MESSAGE_VIEWED_STATUS:
            return {...state,currentDialogsMessage:[...state.currentDialogsMessage.map(m => action.unreadMessage.includes(m,0) ?
                    {...m,viewed:true} :
                    m)]};
        default:
            return state
    }
};


const setDialogs = (dialogs) => ({type: GET_DIALOGS, dialogs});
const setMessage = (messageArr) => ({type: GET_CURRENT_DIALOGS_MESSAGE, messageArr});
export const clearMessage = () => ({type:CLEAR_CURRENT_MESSAGE});
const upDialogOnTop = (id) => ({type: UP_DIALOG_ON_TOP, id});
const setUnreadMessageCount = (count) => ({type: UNREAD_MESSAGE_COUNT, count});
const setNewMessageCount = (count) => ({type: SET_NEW_MESSAGE_COUNT, count});
const setNewMessageInState = (message) => ({type:SET_NEW_MESSAGE_IN_STATE,message});
const setMessageViewedStatus = (unreadMessage) => ({type:SET_MESSAGE_VIEWED_STATUS,unreadMessage})


export const getDialogs = (companionId) => async (dispatch,getState) => {
    let state = getState()

    let response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response.data));
    dispatch(setUnreadMessageCount(response.data.reduce(function (p, c) {
        return p + c.newMessagesCount
    }, 0)));
    if (companionId && state.dialogs.dialogs) {
        let currentDialogUnreadMessage = state.dialogs.dialogs.find(d => d.id === +companionId).newMessagesCount;
        if (currentDialogUnreadMessage !== 0) {
            dispatch(setNewMessageCount(state.dialogs.newMessageCount - currentDialogUnreadMessage));
            dispatch(getCurrentDialogsMessage(companionId))
        }
    }
};

export const getCurrentDialogsMessage = (id) => async (dispatch) => {
    let response = await dialogsAPI.getCurrentDialogsMessage(id);
        dispatch(setMessage(response));

};

export const sendMessage = (id,message) => async (dispatch) => {
    dispatch(reset('Message'));
    let response = await dialogsAPI.sendMessage(id,message);
    if (response.data.resultCode === 0) {
        dispatch(upDialogOnTop(id));
        dispatch(setNewMessageInState(response.data.data.message))
    }
};

export const startDialog = (id) => async (dispatch) => {
    let response = await dialogsAPI.startDialog(id);
    if (response.data.resultCode === 0) {
        dispatch(push(`/dialogs/${id}`))
    }
};

export const checkNewMessageCount = () => async (dispatch, getState) => {
    let state = getState();
    let message = state.dialogs.currentDialogsMessage;
    if(message) {
        dispatch(checkUserMessageViewedStatus(message))
    }
    let response = await dialogsAPI.checkNewMessage();
    if (response.data !== state.dialogs.newMessageCount) {
        dispatch(setNewMessageCount(response.data))
    }
};
const checkUserMessageViewedStatus = (message) => async (dispatch) => {
    let unreadMessage = message.filter(m => m.viewed === false);
    if(unreadMessage.length !== 0) {
        let response = await dialogsAPI.checkMessageViewedStatus(unreadMessage[0].id)
        if(response.data === true) {
            dispatch(setMessageViewedStatus(unreadMessage))
        }
    }
}


export default dialogsPageReducer