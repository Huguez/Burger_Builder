import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = ( email, password, isSignUp ) => {
    return dispatch => {
        dispatch( authStart() );
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        const apiKey = 'AIzaSyAE6H0JoN2W3gvPUGjeJXPSWpyjS7YPOsY';

        // You can create a new email and password user 
        let endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        
        
        if( !isSignUp ){
            // You can sign in a user with an email and password 
            endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        }
        
        endPoint = endPoint.concat( apiKey );

        axios.post( endPoint, authData )
        .then( ( response ) => {
            // console.log(response);
            dispatch( authSuccess( response.data.idToken, response.data.localId ) );

        } )
        .catch( err => {
            console.log( "error: ", err ); 
            dispatch( authFail( err.response.data.error ) ) 
        });
    };
};

