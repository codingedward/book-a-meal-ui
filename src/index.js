import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    Provider
} from 'react-redux';
import mainReducer from './reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    responseType: 'json',
});

const store = createStore(mainReducer,
    applyMiddleware(axiosMiddleware(client)));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
