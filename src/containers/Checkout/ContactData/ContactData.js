import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import instance from '../../../axios-orders';

class ContactData extends Component {
    
    state = {
        orderForm: {
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
        },
        formIsValid: false,
        loading: false,
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
            // console.log("min: ", isValid );
        }
        
        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid ;
            // console.log("max: ", isValid );
        }

        return isValid;
    }
    
    order = ( event ) => {
        event.preventDefault();

        this.setState( { loading: true } );
        
        const formData = {};
        for( let element in this.state.orderForm ){
            formData[element] = this.state.orderForm[element].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        instance.post('/orders.json', order ).then( 
            ( response ) => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            }
            ).catch(
                ( error ) => {
                this.setState( { loading: false } );    
            }
        );
    }

    inputchange = ( event, inputId ) =>{
        const updateOrderForm = { ...this.state.orderForm };
        
        const element = { ...updateOrderForm[inputId] };
        element.value = event.target.value;

        element.valid = this.checkValidation( element.value, element.validation );
        
        element.touched = true;

        updateOrderForm[inputId] = element;
        
        
        let formValid = true;
        for( let inputIde in updateOrderForm ){
            formValid = updateOrderForm[inputIde].valid && formValid;
        }
        // console.log( formValid );

        this.setState( { orderForm: updateOrderForm, formIsValid: formValid } );
    }
    
    render(){
        const arrayInput = [];
        for( let key in this.state.orderForm ){
            arrayInput.push( {
                id: key,
                config: this.state.orderForm[ key ]
            } );
        }

        let form = (
            <div className={ classes.ContactData } >
                <h4>Enter your Contact Data</h4>
                <form onSubmit={ this.order } >
                    { 
                        arrayInput.map( 
                            ( input ) => { 
                                return <Input 
                                    touched={ input.config.touched }
                                    shouldValidate={ input.config.validation }
                                    invalid={ !input.config.valid }
                                    changed={ (event) => this.inputchange( event, input.id ) }
                                    key={ input.id }
                                    inputtype={ input.config.elementType } 
                                    elementConfig={ input.config.elementConfig } 
                                    value={ input.config.value } /> 
                            }
                        )
                    }
                    <Button inhabilitado={ !this.state.formIsValid } btnType="Success" >Order</Button>
                </form>
            </div>
        );
        if( this.state.loading ){
            form = <Spinner/>
        }
        return ( form );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredientes,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);