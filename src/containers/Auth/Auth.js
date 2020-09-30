import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/spinner/spinner';

import * as actions from '../../store/actions/index';

import { updateObject, checkValidation } from '../../shared/utility';

const auth = ( props ) => {
    
    const [ state, setState ] =  useState( {
        email: {
            elementType:   'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail Adress'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        }
    });

    const [ isSingUp, setIsSingUp ] =  useState( true );
    
    const inputchange = ( event, controlName ) => {
        const updateControls = updateObject( state, {
            [controlName]: updateObject( state[controlName], {
                value:   event.target.value,
                valid:   checkValidation( event.target.value, state[controlName].validation ),
                touched: true
            } )
        });
        
        setState( updateControls );
    }


    const submit = ( event ) => {
        event.preventDefault();
        props.onAuth( state.email.value, state.password.value, isSingUp );
    }

    const switchAuthMode = () => {
        setIsSingUp( !isSingUp );
    }

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props

    useEffect(() => {
        if( !buildingBurger && authRedirectPath !== '/' ){
            onSetAuthRedirectPath();
        }
    }, [ authRedirectPath, buildingBurger, onSetAuthRedirectPath ] );
    

    const arrayInput = [];
    for( let key in state ){
        arrayInput.push( {
            id: key,
            config: state[ key ]
        } );
    }
    
    
    let form = arrayInput.map( element =>{
        return <Input 
            touched={ element.config.touched }
            shouldValidate={ element.config.validation }
            invalid={ !element.config.valid }
            changed={ (event) => inputchange( event, element.id ) }
            key={ element.id }
            inputtype={ element.config.elementType } 
            elementConfig={ element.config.elementConfig } 
            value={ element.config.value } /> 
    } );
    
    if( props.loading ){
        form = <Spinner/>;
    }

    let errorMessage = null;
    
    if( props.loading ){
        errorMessage = ( <p> { props.error } </p> );
    }

    let authRedirect = null;
    if( props.isAuthenticated ){
        authRedirect = <Redirect to={ props.authRedirectPath } />
    }

    return (
        <div className={ classes.Auth } >
            { authRedirect }
            { errorMessage }
            <form onSubmit={ submit }>
                { form }
                <Button btnType='Success' > Submit </Button>
            </form>
            <Button 
                clicked={ switchAuthMode }
                btnType='Danger' > { isSingUp ? 'Create User' : 'Log In'  } </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error:            state.auth.error,
        loading:          state.auth.loading,
        isAuthenticated:  state.auth.token !== null,
        buildingBurger:   state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSingUp ) =>  dispatch( actions.auth( email, password, isSingUp ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(auth);