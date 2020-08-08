import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/spinner/spinner';

import instance from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        addres: {
            street: '',
            zipcode: '',
            country: '' 
        },
        loading: false
    }

    order = (event) => {
        event.preventDefault();

        this.setState( { loading: true } );

        const order ={
            ingredients: this.props.ingredientes,
            price: this.state.totalPrice,
            customer: {
                name: 'Huguez',
                addres: {
                    street: 'calle 123',
                    zipcode: '12345',
                    country: 'Mexico' 
                },
                email: 'carlos.huguez@test.com'
            },
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
        

        console.log(this.state.ingredientes);
    }
    
    render(){
        let form = (
            <div className={ classes.ContactData } >
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={ classes.Input } type="text" name="name"   id="name" placeholder="Your name" />
                    <input className={ classes.Input } type="email" name="email"  id="email" placeholder="Your e-mail" />
                    <input className={ classes.Input } type="text" name="street" id="street" placeholder="street" />
                    <input className={ classes.Input } type="text" name="postal" id="postal" placeholder="Postal Code" />
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