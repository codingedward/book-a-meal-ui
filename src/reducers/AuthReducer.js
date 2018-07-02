import { AUTHENTICATE }  from '../actions/AuthActions';

const initialState = {
    auth: {
        active: false,
        token: null,
        user: null
    }
}

function authenticate(state = initialState, action) {
    switch (action.type) {
        case `${AUTHENTICATE}_SUCCESS`:
            return Object.assign({}, state, {
                auth: {
                    active: true,
                    token: action.payload.data.access_token,
                    user: action.payload.data.user,
                }
            });
        case `${AUTHENTICATE}_FAIL`:
            return {...state};
        default:
            return state;
    }
}

export default authenticate;
