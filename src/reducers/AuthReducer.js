import { combineReducers } from 'redux';
import { LOG_IN, SIGN_UP } from '../actions/AuthActions';

const loginInitialState = {
    login: {},
}


const login = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                login: {
                    loading: true,
                }
            };

        case `${LOG_IN}_SUCCESS`:
            return {
                ...state,
                login: {
                    payload: action.payload,
                    loading: false,
                }
            };

        case `${LOG_IN}_FAIL`:
            return {
                ...state,
                login: {
                    error: action.error.response,
                    loading: false,
                }
            };

        default:
            return state;
    }
}

const signUpInitialState = {
    signUp: {}
}

const signUp = (state = signUpInitialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                signUp: {
                    loading: true,
                }
            };

        case `${SIGN_UP}_SUCCESS`:
            return {
                ...state,
                signUp: {
                    payload: action.payload,
                    loading: false,
                }
            };

        case `${SIGN_UP}_FAIL`:
            return {
                ...state,
                signUp: {
                    error: action.error.response,
                    loading: false,
                }
            };

        default:
            return state;
    }
}

export default combineReducers({
    login,
    signUp,
})
