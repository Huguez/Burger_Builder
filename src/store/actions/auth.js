import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( authData ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = ( email, password ) => {
    return dispatch => {
        dispatch( authStart() );
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // AIzaSyAE6H0JoN2W3gvPUGjeJXPSWpyjS7YPOsY
        // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        const endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE6H0JoN2W3gvPUGjeJXPSWpyjS7YPOsY';
        axios.post( endPoint, authData )
        .then( ( response ) => {
            console.log(response);
            dispatch( authSuccess( response.data ) );

        } )
        .catch( error => { 
            dispatch( authFail( error ) ) 
        });
    };
};

