export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

export function authenticate(credentials) {
    console.log(credentials)
    return {
        type: AUTHENTICATE,
        payload: {
            request: {
                method: 'post',
                url: '/auth/login',
                data: credentials
                
            }
        }
    }
}

export function logOut() {
    return {
        type: LOG_OUT,
    }
}
