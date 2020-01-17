import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import {history} from "./redux/redux-store";

let rerenderAllState = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                <App/>
                </ConnectedRouter>
            </Provider>
        </BrowserRouter>
        , document.getElementById('root'));
};

rerenderAllState();

store.subscribe(rerenderAllState);

serviceWorker.unregister();
