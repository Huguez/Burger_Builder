import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/spinner/spinner';

import * as actions from '../../store/actions/index';

import { updateObject, checkValidation } from '../../shared/utility';

class Auth extends Component {
    
    state = {
        controls: {
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
        },
        isSingUp: true
    }

    inputchange = ( event, controlName ) => {
        const updateControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value:   event.target.value,
                valid:   checkValidation( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        });
        
        this.setState( { controls: updateControls } );
    }


    submit = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp );
    }

    switchAuthMode = () => {
        this.setState( { isSingUp: !this.state.isSingUp } )
    }

    componentDidMount(){
        if( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ){
            this.onSetAuthRedirectPath();
        }
    }

    render(){
        const arrayInput = [];
        for( let key in this.state.controls ){
            arrayInput.push( {
                id: key,
                config: this.state.controls[ key ]
            } );
        }
        // console.log( arrayInput );

        let form = arrayInput.map( element =>{
            return <Input 
                touched={ element.config.touched }
                shouldValidate={ element.config.validation }
                invalid={ !element.config.valid }
                changed={ (event) => this.inputchange( event, element.id ) }
                key={ element.id }
                inputtype={ element.config.elementType } 
                elementConfig={ element.config.elementConfig } 
                value={ element.config.value } /> 
        } );
        
        if( this.props.loading ){
            form = <Spinner/>;
        }

        let errorMessage = null;
        
        if( this.props.loading ){
            // console.log( "this.props", this.props );
            errorMessage = ( <p> { this.props.error } </p> );
        }

        let authRedirect = null;
        if( this.props.isAuthenticated ){
            authRedirect = <Redirect to={ this.props.authRedirectPath } />
        }

        return (
            <div className={ classes.Auth } >
                { authRedirect }
                { errorMessage }
                <form onSubmit={ this.submit }>
                    { form }
                    <Button btnType='Success' > Submit </Button>
                </form>
                <Button 
                    clicked={ this.switchAuthMode }
                    btnType='Danger' > { this.state.isSingUp ? 'Create User' : 'Log In'  } </Button>
            </div>
        );
    }
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

export default connect( mapStateToProps, mapDispatchToProps )(Auth);