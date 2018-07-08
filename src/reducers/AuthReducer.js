import { combineReducers } from 'redux';
import { LOG_IN, SIGN_UP } from '../actions/AuthActions';


// login and sing up reducers have same structure
const authReducer = ({ actionName, initialState }) => {

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case actionName:
                return {
                    loading: true,
                };

            case `${actionName}_SUCCESS`:
                console.log(action)
                return {
                    payload: action.payload.data,
                    loading: false,
                };

            case `${actionName}_FAIL`:
                return {
                    error: action.error.response,
                    loading: false,
                };

            default:
                return state;
        }
    }
    return reducer;
}

const login = authReducer({
    actionName: LOG_IN,
    initialState: {
        loading: false,
        payload: {}
    },
});


const signUp = authReducer({
    actionName: SIGN_UP,
    initialState: {
    }, 
});

export default combineReducers({
    login,
    signUp,
})
