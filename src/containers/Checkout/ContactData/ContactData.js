import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import instance from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';  

import { updateObject } from '../../../shared/utility';

const contactData = props => {
    
    const [ orderForm, setOrderForm ] = useState( {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation:{
                required: true,
                minLength: 5      
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your e-mail'
            },
            value: '',
            validation:{
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your street'
            },
            value: '',
            validation:{
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your zipcode'
            },
            value: '',
            validation:{
                required: true,
                minLength: 5, 
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        country:  {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            validation:{
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        deliveryMethod:{
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            valid: true,
            validatio: {}
        }
    })
    const [ formIsValid, setFormIsValid ] = useState( false );


    const checkValidation = ( value, rules ) => {
        let isValid = true;

        if( !rules ){
            return true;
        }

        if( rules.required ){
            isValid = value.trim() !== '' && isValid ;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength && isValid ;
            // console.log("min: ", isValid );
        }
        
        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid ;
            // console.log("max: ", isValid );
        }

        return isValid;
    }
    
    const order = ( event ) => {
        event.preventDefault();
        
        const formData = {};
        for( let element in orderForm ){
            formData[element] = orderForm[element].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        
        props.onOrderBurger( order, props.token );
        props.history.push('/');
    }

    const inputchange = ( event, inputId ) =>{
        
        const element = updateObject( orderForm[inputId], { 
            value : event.target.value,
            valid : checkValidation( event.target.value, orderForm[inputId].validation ),
            touched : true 
        } );
        
        const updateOrderForm = updateObject( orderForm, { [inputId]: element } );
        
        let formValid = true;
        for( let inputIde in updateOrderForm ){
            formValid = updateOrderForm[inputIde].valid && formValid;
        }

        setOrderForm( updateOrderForm );
        setFormIsValid( formValid );
    }
    
    const arrayInput = [];
    for( let key in orderForm ){
        arrayInput.push( {
            id: key,
            config: orderForm[ key ]
        } );
    }

    let form = (
        <div className={ classes.ContactData } >
            <h4>Enter your Contact Data</h4>
            <form onSubmit={ order } >
                { 
                    arrayInput.map( 
                        ( input ) => { 
                            return <Input 
                                touched={ input.config.touched }
                                shouldValidate={ input.config.validation }
                                invalid={ !input.config.valid }
                                changed={ (event) => inputchange( event, input.id ) }
                                key={ input.id }
                                inputtype={ input.config.elementType } 
                                elementConfig={ input.config.elementConfig } 
                                value={ input.config.value } /> 
                        }
                    )
                }
                <Button inhabilitado={ !formIsValid } btnType="Success" >Order</Button>
            </form>
        </div>
    );
    if( props.loading ){
        form = <Spinner/>
    }
    return ( form );
}

const mapStateToProps = state => {
    // console.log( "contactData: ", state);
    return {
        ings:    state.burgerBuilder.ingredients,
        price:   state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token:   state.auth.token,
        userId:  state.auth.userId
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: ( orderData, token ) => dispatch( actions.purchaseBurger( orderData, token ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps )( withErrorHandler( contactData, instance ) );