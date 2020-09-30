import { useState, useEffect } from 'react';

export default httpClient => {
    const [ error, setError ] = useState( null );    

    const reqInterceptor = httpClient.interceptors.response.use( req => { 
        setError( null )
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use( res => res, err => { 
        setError( err );
    });


    useEffect( () => {
        return () => {
            httpClient.interceptors.request.eject( reqInterceptor );
            httpClient.interceptors.response.eject( resInterceptor );
        }
    }, [ reqInterceptor, resInterceptor ]);

    const errorConfirmed = () => {
        setError( null );
    }

    return [ error , errorConfirmed ];
}