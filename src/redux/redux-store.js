import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import findUsersReducer from "./findUsers-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./app-reducer";
import {connectRouter} from "connected-react-router";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory } from 'history'
import dialogsPageReducer from "./dialogs-reducer";


export const history = createBrowserHistory();

const createRootReducers = (history) => combineReducers({
    router: connectRouter(history),
    dialogs:dialogsPageReducer,
    profilePage: profileReducer,
    findUsersPage:findUsersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(createRootReducers(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware)
    )
);

window.store = store;

export default store