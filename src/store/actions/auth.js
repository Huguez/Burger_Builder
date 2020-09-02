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

export const logout = () => {
    // localStorage.removeItem( 'token' );
    // localStorage.removeItem( 'expiresDate' );
    // localStorage.removeItem( 'userId' );

    return {
        type: actionTypes.AUTH_INITITATE_LOGOUT
    }
}

export const checkAuthTimeout = ( expirationTime ) => {
    
    return dispatch => { 
        setTimeout( () => {
            dispatch( logout() );
        }, expirationTime*3600 );
     }
};

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
            const esperiesDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 ) ;
            
            localStorage.setItem('token', response.data.idToken );
            localStorage.setItem('expiresDate', esperiesDate );
            localStorage.setItem('userId', response.data.localId );

            dispatch( authSuccess( response.data.idToken, response.data.localId ) );
            
            dispatch( checkAuthTimeout( response.data.expiresIn ) );
        } )
        .catch( err => {
            // console.log( "error: ", err ); 
            dispatch( authFail( err.response.data.error ) ) 
        });
    };
};

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if( !token ){
            dispatch( logout() );
        }else{
            const expirationDate = new Date( localStorage.getItem( 'expiresDate' ) );
            if( expirationDate <= new Date() ){
                dispatch( logout() );
            }else{
                const userId = localStorage.getItem('userId');
                dispatch( authSuccess( token, userId ) );
                dispatch( checkAuthTimeout( expirationDate.getSeconds() - new Date().getSeconds() ) )
            }
        }
    }
}