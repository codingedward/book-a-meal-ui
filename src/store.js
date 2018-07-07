import { createStore, applyMiddleware } from 'redux';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createBrowserHistory } from 'history';
import { 
    connectRouter, 
    routerMiddleware 
} from 'connected-react-router';

import appReducer from './reducers';


const client = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    responseType: 'json',
});

const axiosMiddlewareConfig = {
    interceptors: {
        request: [
            ({ getState }, config) => {
                const payload = getState().auth.login.payload;
                if (payload && payload.access_token) {
                    config.headers['Authorization'] = `Bearer ${payload.access_token}`
                }
                return config;
            }
        ]
    }
};

export const history = createBrowserHistory();

const persistedReducer = persistReducer({
    key: 'auth',
    storage,
}, connectRouter(history)(appReducer));


export const store = createStore(
    persistedReducer,
    applyMiddleware(
        axiosMiddleware(client, axiosMiddlewareConfig), 
        routerMiddleware(history),
    )
);

export const persistor = persistStore(store);
