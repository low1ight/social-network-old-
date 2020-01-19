import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import {history} from "./redux/redux-store";

let rerenderAllState = () => {
    ReactDOM.render(
        <HashRouter>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                <App/>
                </ConnectedRouter>
            </Provider>
        </HashRouter>
        , document.getElementById('root'));
};

rerenderAllState();

store.subscribe(rerenderAllState);

serviceWorker.unregister();
