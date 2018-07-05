import { combineReducers } from 'redux';
import reducerFactory from './reducerFactory';
import { LOG_IN, SIGN_UP } from '../actions/AuthActions';

const login = reducerFactory({
    actionName: LOG_IN,
    initialState: {
        loading: false,
        payload: {}
    },
});


const signUp = reducerFactory({
    actionName: SIGN_UP,
    initialState: {
    }, 
});

export default combineReducers({
    login,
    signUp,
})
