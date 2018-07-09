import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createHashHistory } from 'history';
import { 
    connectRouter, 
    routerMiddleware 
} from 'connected-react-router';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import appReducer from './reducers';
import { BASE_URL } from './constants';


const client = axios.create({
    baseURL:  BASE_URL,
    responseType: 'json',
});

const axiosMiddlewareConfig = {
    interceptors: {
        request: [
            ({ getState }, config) => {
                if (config.baseURL.startsWith(BASE_URL)) {
                    const payload = getState().auth.login.payload;
                    if (payload && payload.access_token) {
                        config.headers['Authorization'] = `Bearer ${payload.access_token}`
                    }
                } 
                return config;
            }
        ]
    }
};

export const history = createHashHistory();

const persistedReducer = persistReducer({
    key: 'root',
    storage,
}, connectRouter(history)(appReducer));


export const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunk,
        axiosMiddleware(client, axiosMiddlewareConfig), 
        routerMiddleware(history),
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL']
        })
    )
);

export const persistor = persistStore(store);
