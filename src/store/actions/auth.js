import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START

    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckExpiry = (expiryTime) => {
    console.log('authCheckExpiry: ', expiryTime);
    return dispatch => {
        setTimeout(() => {
           dispatch(authLogout()); 
        }, expiryTime*1000)
    };
}

export const auth = (email, pass, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        console.log('auth');
        const authData = {email: email, password:pass, returnSecureToken: true};
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPefqoH44XzCTzdwlUTLjsx36Cx01jnxM';
        if (!isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPefqoH44XzCTzdwlUTLjsx36Cx01jnxM';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expiryDate = new Date(new Date().getTime() + response.data.expiresIn *1000);
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('expiryDate', expiryDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authCheckExpiry(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response.data.error.message));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        if (!token) {
            console.log('[authCheckState] no token. Logout');
            dispatch(authLogout);
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if (new Date() > expiryDate) {
                console.log('[authCheckState] now is greater than expiry. Logout');
                dispatch(authLogout);
            } else {
                console.log('[authCheckState] token and in date. Auto login');
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authCheckExpiry((expiryDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}