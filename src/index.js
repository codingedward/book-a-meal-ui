import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import { createBrowserHistory } from 'history';
import { 
    ConnectedRouter,
    connectRouter, 
    routerMiddleware 
} from 'connected-react-router';

import App from './App';
import appReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const client = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    responseType: 'json',
});

const store = createStore(
    connectRouter(history)(appReducer),
    applyMiddleware(axiosMiddleware(client), routerMiddleware(history))
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
