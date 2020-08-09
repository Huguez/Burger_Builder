import React, { Component } from 'react';
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
                value: 'Huguez'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: 'test@test.com'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: 'street'
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '12345'
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: 'Sonora'
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                }
            }
        },
        loading: false,
    }

    order = ( event ) => {
        event.preventDefault();

        this.setState( { loading: true } );
        
        // console.log( this.props.price );

        const order ={
            ingredients: this.props.ingredientes,
            price: this.props.price,
            deliveryMethod: 'fastest'
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
        

        // console.log(this.state.ingredientes);
    }

    inputchange = ( event, inputId ) =>{
        //const updateOrderForm = { ...this.state.orderForm };
        
        // updateOrderForm[inputId];

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
                <form>
                    { 
                        arrayInput.map( 
                            ( input ) => { 
                               return <Input 
                                    changed={ (event) => this.inputchange( event, input.id ) }
                                    key={ input.id }
                                    inputtype={ input.config.elementType } 
                                    elementConfig={ input.config.elementConfig } 
                                    value={ input.config.value } /> 
                            }
                        )
                    }
                    <Button  clicked={ this.order } btnType="Success" >Order</Button>
                </form>
            </div>
        );

        if( this.state.loading ){
            form =<Spinner/>
        }

        return ( form );
    }
}

export default ContactData;