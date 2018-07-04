export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';

export function loginAct(credentials) {
    return {
        type: LOG_IN,
        payload: {
            request: {
                method: 'post',
                url: '/auth/login',
                data: credentials
            }
        }
    }
}

export function signUpAct(details) {
    return {
        type: SIGN_UP,
        payload: {
            request: {
                method: 'post',
                url: '/auth/signup',
                data: details
            }
        }
    }
}

export function logOut() {
    return {
        type: LOG_OUT,
    }
}
