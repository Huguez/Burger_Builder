import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

import * as actions from '../../store/actions/index';

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
        }
    }

    inputchange = ( event, controlName ) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        }
        this.setState( { controls: updateControls } );
    }

    checkValidation( value, rules ){
        let isValid = true;

        if( !rules ){
            return true;
        }

        if( rules.required ){
            isValid = value.trim() !== '' && isValid ;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength && isValid ;
        }
        
        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid ;
        }

        if( rules.isEmail ){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submit = ( event ) => {
        event.preventDefault();

        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value  );
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
        
        const form = arrayInput.map( element =>{
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

        return (
            <div className={ classes.Auth } >
                <form onSubmit={ this.submit }>
                    { form }
                    <Button btnType='Success' > Log in </Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) =>  dispatch( actions.auth( email, password ) ),

    }
}

export default connect(null, mapDispatchToProps )(Auth);